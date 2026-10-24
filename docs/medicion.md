# Plan de medición — Jardín Cristel

**Estado (2026-10-21): implementado en el piloto** (`js/main.js`): GA4 por delegación, `gallery_navigate`, `click_maps` y carga diferida de gtag.js **y de Clarity** (tras `load`, `requestIdleCallback` con límite de 3 s; solo en `jardincristel.mx` o con `?medicion=debug`). Falta lo que depende del cliente (consentimiento #20, conexión Clarity↔GA4, registrar dimensiones en GA4). Plan original: Se integra en el **bloque 7** de `docs/propuesta.md` (§8): `js/main.js` con tracking GA4 por delegación y Microsoft Clarity diferido. Complementa `docs/propuesta.md` §7 (en caso de diferencia, **manda este documento**) y se apoya en el sistema de diseño de `docs/diseno.md` (§3: sección “Qué incluye tu evento”, CTA por tarjeta y galería en página).

**Objetivo de negocio:** saber cuántas personas intentan contactar (WhatsApp y teléfono), desde qué parte de la página y para qué tipo de evento, de dónde llegan (búsqueda, Google Maps, Facebook) y qué partes del sitio se usan o se ignoran, **sin empeorar el LCP**.

**Principios**
- **Una sola fuente de verdad en el HTML:** cada enlace relevante lleva atributos `data-*`; un único listener delegado en `document` los lee. Agregar un enlace nuevo no requiere tocar JS.
- **Nada de datos personales:** el sitio no tiene formularios; los eventos solo llevan ubicación del enlace, tipo de evento y categoría.
- **Solo se mide en producción:** GA4 y Clarity se activan únicamente si `location.hostname === 'jardincristel.mx'` (el sitio sin `www`), para no contaminar la propiedad con *deploy previews*, `localhost` ni la rama `modernizacion`. Para probar se usa un modo de depuración explícito (ver §7).
- **Carga diferida:** ningún script de medición compite con el LCP (ver §2 y §7).

---

## 1. Google Analytics 4 (`G-DNF30KJ0Y7`)

### 1.1 Atributos `data-*` (contrato)

| Atributo | Valores | Uso |
|---|---|---|
| `data-track` | `whatsapp` · `phone` · `maps` · `facebook` | Identifica el tipo de clic y decide el evento |
| `data-track-location` | ver tablas siguientes | Dónde está el enlace en la página (parámetro `link_location`) |
| `data-event-type` | `boda` · `xv` · `bautizo` · `comunion` · `graduacion` · `general` | Solo en WhatsApp (parámetro `event_type`) |
| `data-categoria` | `espacio-y-tiempo` · `mobiliario-y-decoracion` · `servicio-y-musica` · `banquete-y-bebidas` | En cada `<details>` de “Qué incluye tu evento” |

```html
<!-- tarjeta de evento -->
<a href="https://wa.me/5215536476032?text=…" target="_blank" rel="noopener noreferrer"
   aria-label="Cotizar mi boda por WhatsApp"
   data-track="whatsapp" data-track-location="tarjeta" data-event-type="boda">Cotizar mi boda</a>
<!-- barra inferior móvil -->
<a href="https://wa.me/5215536476032?text=…" data-track="whatsapp"
   data-track-location="barra-movil" data-event-type="general">Cotizar</a>
```

### 1.2 Eventos de clic

| Evento GA4 | Se dispara con | Parámetros | Valores de `link_location` |
|---|---|---|---|
| **`click_whatsapp`** | clic en cualquier enlace `wa.me` | `link_location`, `event_type`, `link_url` | `hero` (CTA principal) · `tarjeta` (“Cotizar mi <evento>”) · `que-incluye` (CTA de la sección) · `barra-movil` (botón central de la barra inferior) · `header` (“Cotizar” al final del menú en tablet y desktop) · `nosotros` (“Solicita tu presupuesto”) · `contacto` (botón de la sección Contacto) |
| **`click_phone`** | clic en `tel:` | `link_location` | `contacto` (y cualquier otro lugar donde se añada) |
| **`click_maps`** | clic en “Abrir en Google Maps” de la sección Ubicación (sobre la imagen en móvil, en la columna de texto en tablet y escritorio). Desde 2026-10-24 el “Cómo llegar” de la barra móvil ya no abre Maps (es un ancla a `#ubicacion`) y **no emite `click_maps`** | `link_location` | `ubicacion` |
| **`click_resenas_google`** | clic en “Ver todas las reseñas en Google” de la sección Reseñas (búsqueda `google.com/search?q=jardin+cristel`, que muestra el perfil y las reseñas). **No es `click_maps`**: no abre Maps ni da indicaciones, así que se mide aparte | `link_location` | `resenas` |
| **`click_facebook`** | clic en el enlace a Facebook | `link_location` | `galeria` (“Ver más fotos en Facebook”) · `contacto` · `pie` |

**Implementación (piloto):** “Cotizar” existe dos veces en el DOM —el botón central de la barra inferior móvil (`barra-movil`) y el botón del header en tablet y escritorio (`header`)— y el CSS oculta el que no corresponde (`display: none`); así cada elemento lleva un `data-track-location` fijo.

`event_type` en `click_whatsapp`: `boda`, `xv`, `bautizo`, `comunion`, `graduacion` en las tarjetas de evento; **`general`** en todos los demás CTA (hero, “Qué incluye”, barra móvil, header, contacto).

### 1.3 Eventos de interacción

| Evento GA4 | Cuándo | Parámetros | Regla |
|---|---|---|---|
| **`view_que_incluye`** | La sección `#incluye` entra en pantalla (≥ 35 % visible) | — | `IntersectionObserver`, **una vez por visita** (variable en memoria + `sessionStorage` dentro de `try/catch`); se desconecta tras disparar |
| **`open_categoria_incluye`** | El usuario **abre** un `<details>` de “Qué incluye” | `categoria` | Escucha `toggle` en fase de captura (el evento `toggle` no burbujea) y solo cuenta cuando `details.open` pasa a `true`. **No debe contar las aperturas hechas por el script** al sincronizar el estado por ancho de pantalla (tablet/desktop los abre solos): se marca una bandera `sincronizando` mientras el JS ajusta el atributo `open`, o solo se cuenta si hubo interacción previa (`pointerdown`/`keydown` en el `<summary>`) |
| **`gallery_navigate`** | El usuario avanza en la galería: desliza el carrusel (móvil/tablet), pulsa una miniatura o usa las flechas (desktop) | `gallery_index` (1–6), `interaction` (`swipe` · `thumbnail` · `arrow`) | Se dispara cuando el elemento activo **cambia y se asienta** (no en cada pixel de scroll; evento `scrollend` o `IntersectionObserver` con debounce de ≈ 250 ms); no se dispara por la foto inicial; máximo una vez por cambio |

### 1.4 Esqueleto del código (documentación; no implementar aún)

```js
// js/main.js (bloque 7)
const GA_ID = 'G-DNF30KJ0Y7';
const DEBUG = location.search.includes('medicion=debug');
const EN_PRODUCCION = location.hostname === 'jardincristel.mx';
const MEDIR = EN_PRODUCCION || DEBUG;                       // solo producción (o sesión de pruebas explícita)

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }           // cola: ningún evento se pierde aunque gtag.js tarde
gtag('js', new Date());
if (MEDIR) gtag('config', GA_ID, { debug_mode: DEBUG });   // sin 'config' no se envía nada (ni en previews ni en localhost)

const EVENTOS = { whatsapp: 'click_whatsapp', phone: 'click_phone', maps: 'click_maps', facebook: 'click_facebook', 'resenas-google': 'click_resenas_google' };

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-track]');
  if (!el || !EVENTOS[el.dataset.track]) return;
  const p = { link_location: el.dataset.trackLocation, link_url: el.href, transport_type: 'beacon' };
  if (el.dataset.track === 'whatsapp') p.event_type = el.dataset.eventType || 'general';
  gtag('event', EVENTOS[el.dataset.track], p);
  window.clarity && clarity('event', EVENTOS[el.dataset.track]);     // espejo opcional en Clarity (§2)
}, true);
```

Notas: `transport_type: 'beacon'` hace que el evento sobreviva a la apertura de WhatsApp o del marcador de llamada; el listener en fase de captura no depende de cuándo se pinta el DOM (corrige el fallo del script actual, que se engancha antes de que exista la página); las medidas de `link_text` no se envían (no aportan y aumentan la cardinalidad).

### 1.5 Dimensiones personalizadas a registrar en GA4

Los parámetros solo se pueden analizar en informes si se registran como **dimensiones personalizadas** (alcance **Evento**):

| Nombre de la dimensión | Parámetro del evento | Alcance | Eventos que lo usan |
|---|---|---|---|
| `link_location` | `link_location` | Evento | `click_whatsapp`, `click_phone`, `click_maps`, `click_resenas_google`, `click_facebook` |
| `event_type` | `event_type` | Evento | `click_whatsapp` |
| `categoria` | `categoria` | Evento | `open_categoria_incluye` |

Opcional, solo si se quiere analizar la galería en informes: `gallery_index` (como métrica personalizada, unidad “estándar”) e `interaction` (dimensión).

**Pasos en el panel de GA4** (los nombres exactos del menú pueden variar según idioma y versión del panel):

1. Entrar a https://analytics.google.com → seleccionar la propiedad de `G-DNF30KJ0Y7`.
2. **Administrar** (engrane) → columna *Propiedad* → **Visualización de datos** → **Definiciones personalizadas**.
3. Pestaña **Dimensiones personalizadas** → **Crear dimensión personalizada**.
4. Rellenar: *Nombre de la dimensión* (`link_location`), *Alcance* = **Evento**, *Descripción* (“Lugar del enlace en la página”), *Parámetro del evento* (escribir o elegir `link_location`; el parámetro aparece en la lista solo después de que GA4 haya recibido el evento: si no aparece, se puede escribir a mano) → **Guardar**.
5. Repetir con `event_type` y `categoria`.
6. Los datos de una dimensión nueva **solo se acumulan desde que se crea** (no es retroactivo) y pueden tardar hasta ~24–48 h en verse: conviene crearlas **antes del lanzamiento**.

### 1.6 Eventos clave (antes “conversiones”)

Marcar **`click_whatsapp`** y **`click_phone`**.

1. **Administrar** → **Visualización de datos** → **Eventos**.
2. Cuando `click_whatsapp` y `click_phone` ya aparezcan en la lista (se disparan al menos una vez en producción o en DebugView), activar el interruptor **Marcar como evento clave** de cada uno.
3. Si aún no aparecen: botón **Nuevo evento clave**, escribir el nombre exacto del evento (`click_whatsapp`, `click_phone`) y guardar; empezará a contarse desde su creación.
4. No marcar `click_maps`, `click_resenas_google`, `click_facebook`, `view_que_incluye`, `open_categoria_incluye` ni `gallery_navigate`: son de comportamiento, no de contacto.

### 1.7 Otros ajustes recomendados de la propiedad

- **Retención de datos de eventos:** 14 meses (*Administrar → Recopilación y modificación de datos → Retención de datos*).
- **Filtro de tráfico de desarrollador:** activarlo (*Administrar → Recopilación y modificación de datos → Filtros de datos → Tráfico de desarrollador → Activo*), para que el modo `debug_mode` de las pruebas no contamine los informes.
- **Tráfico interno:** definir la IP de la oficina o de Emmanuel y activar el filtro de tráfico interno.
- **Medición mejorada:** conservar `page_view`, `scroll` y `file_download`; se puede desactivar *Clics de salida* porque `click_whatsapp`, `click_maps` y `click_facebook` ya los cubren con más detalle (así no se duplican).
- **No portar** el evento genérico `click` con `event_category: 'Botón'` del sitio de referencia.

---

## 2. Microsoft Clarity

Grabaciones de sesión y mapas de calor, sin costo. Sirve para ver cómo se usan el carrusel de eventos, la barra inferior móvil y “Qué incluye”.

- **ID del proyecto: `z0uyber2t9`** (recibido de Emmanuel el 2026-10-20; los IDs de Clarity son públicos, van en el HTML de cualquier sitio que lo use). El código lo define como `const CLARITY_ID = 'z0uyber2t9';` y conserva la guarda: **no carga nada si el valor está vacío o es el marcador `CLARITY_ID`** (así el ID se puede quitar o cambiar sin tocar la lógica).
- **Diferencia deliberada con el panel:** Clarity indica pegar su script en el `<head>`. Aquí **no** se pone en el `<head>`: el mismo snippet oficial se inyecta desde `js/main.js` después de `load` y en `requestIdleCallback`, para no competir con el LCP. La estructura del snippet es idéntica a la entregada por el panel (misma cola `clarity.q`, `async`, `https://www.clarity.ms/tag/<ID>`).
- **Carga:** el script se inyecta **después del evento `load`** y dentro de `requestIdleCallback` (con `setTimeout` de respaldo en navegadores sin esa API, p. ej. Safari), y solo en producción:

```js
const CLARITY_ID = 'z0uyber2t9';   // ID del proyecto de Clarity (si queda vacío o como 'CLARITY_ID', no se carga)
function cargarClarity() {
  if (!MEDIR || !CLARITY_ID || CLARITY_ID === 'CLARITY_ID') return;
  (function (c, l, a, r, i, t, y) {                    // snippet oficial de Clarity
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
}
addEventListener('load', () => ('requestIdleCallback' in window
  ? requestIdleCallback(cargarClarity, { timeout: 4000 })
  : setTimeout(cargarClarity, 2500)));
```

(Snippet verificado contra el entregado por el panel de Clarity el 2026-10-20.)

- **Integración con GA4:** en el panel de Clarity → **Settings → Setup → Google Analytics integration**, conectar la propiedad de GA4 (`G-DNF30KJ0Y7`); así se puede saltar de una sesión de GA4 a su grabación y filtrar grabaciones por eventos. Verificarla en DebugView/Clarity después de conectar (el panel guía el proceso; los nombres exactos del menú pueden variar).
- **Eventos y etiquetas en Clarity (opcional, bajo costo):** espejar `click_whatsapp`/`click_phone` con `clarity('event', 'click_whatsapp')` y etiquetar `clarity('set', 'event_type', 'boda')`, para filtrar grabaciones por tipo de evento.
- **Privacidad:** **el sitio no tiene formularios ni campos de texto, no hay nada sensible que enmascarar.** Clarity enmascara campos de entrada por defecto; se deja el modo predeterminado (*Balanced*). Verificar que ninguna URL ni parámetro lleve datos personales (los enlaces de WhatsApp solo llevan un mensaje genérico).
- **Consentimiento:** Clarity ofrece opciones de consentimiento; al implementar se revisa su documentación vigente y se alinea con la decisión #20 (§5 de este documento).

---

## 3. Google Search Console

- **Recomendado: propiedad de *Dominio*** (`jardincristel.mx`), verificada por **registro TXT en el DNS**. Cubre en una sola propiedad `www` y sin `www`, `http` y `https`, y todos los subdominios, y no depende de ningún archivo del sitio. Requiere acceso al panel donde se administra el DNS del dominio (el registrador o el DNS que use Netlify): Emmanuel (o quien administre el dominio) agrega el registro que Search Console indica.
- **Alternativa: archivo HTML de verificación en la raíz** (propiedad de *prefijo de URL* `https://jardincristel.mx/`). Emmanuel obtiene el archivo `google<código>.html` en Search Console y **me lo pasa**; yo lo agrego a la raíz del repo y hago el commit en `modernizacion`; queda verificado cuando el sitio llegue a producción. Cubre solo ese prefijo (el `www` redirige 301 a la raíz).
- **Enviar `sitemap.xml` tras el merge a `main`** (cuando ya esté publicado en `https://jardincristel.mx/sitemap.xml`; no se envía desde un deploy preview): *Search Console → Sitemaps → Añadir un sitemap* → `sitemap.xml`. Después, *Inspección de URL* de `https://jardincristel.mx/` → **Solicitar indexación**.
- **Después del lanzamiento:** revisar *Páginas* (indexación), *Experiencia* (Core Web Vitals) y *Rendimiento* (consultas, clics, impresiones, CTR, posición). Vincular la propiedad con GA4 (*Administrar → Vinculación de productos → Search Console*).
- **Coherencia del dominio:** canonical, Open Graph, JSON-LD y sitemap apuntan a `https://jardincristel.mx` (sin `www`; decisión #21).

---

## 4. Google Business Profile y Facebook: enlaces con UTM

Para que GA4 distinga las visitas que vienen del perfil de Google Maps y de Facebook, el campo **sitio web** debe llevar parámetros UTM (todo en minúsculas, sin espacios):

| Origen | Enlace al sitio |
|---|---|
| Google Business Profile (ficha de Maps/Búsqueda) | `https://jardincristel.mx/?utm_source=google&utm_medium=organic&utm_campaign=perfil-maps` |
| Facebook (página, botón “Sitio web”, información) | `https://jardincristel.mx/?utm_source=facebook&utm_medium=social&utm_campaign=perfil-facebook` |

Notas:
- Se usa `utm_source=facebook` como pediste; para Facebook se propone `utm_medium=social` (en lugar de `organic`) porque así GA4 lo clasifica como **Organic Social**; con `organic` quedaría mezclado con la búsqueda orgánica. Si prefieres `organic` también, `utm_campaign` bastaría para distinguirlo.
- Con `google / organic` las visitas del perfil se agrupan con la búsqueda orgánica de Google, pero la campaña `perfil-maps` permite separarlas (*Adquisición → Adquisición de tráfico → Campaña de sesión*).
- La etiqueta `<link rel="canonical">` (sin parámetros) evita que Google indexe las URL con UTM como páginas distintas.
- **No** poner UTM en enlaces internos del sitio (rompe la atribución de la sesión).
- Los enlaces de WhatsApp no llevan UTM; el origen se ve en GA4 por `click_whatsapp` y la sesión.
- Quién actualiza los enlaces: Emmanuel (o quien administre la ficha y la página); se anota en la bitácora cuando esté hecho.

---

## 5. Aviso de privacidad

La decisión #6 ya aprueba agregar aviso de privacidad y política de cookies/consentimiento. **El texto legal lo redacta o valida el cliente** (o su asesor legal); este documento solo lista qué debe mencionar, y **no es asesoría legal**.

**Herramientas y servicios que debe mencionar**

| Servicio | Qué hace en el sitio | Qué conviene decir |
|---|---|---|
| **Google Analytics 4** | Mide visitas y clics (eventos de §1) | Datos de navegación y dispositivo; cookies propias de analítica (típicamente `_ga` y `_ga_<ID>`); proveedor Google; finalidad: estadística y mejora del sitio |
| **Microsoft Clarity** | Grabaciones de sesión y mapas de calor | Registra interacciones (clics, desplazamientos, movimientos) de forma anónima; cookies propias (típicamente `_clck`, `_clsk`); proveedor Microsoft; el sitio no tiene formularios |
| **WhatsApp (Meta)** | Canal de contacto: al pulsar, se abre WhatsApp con un mensaje prellenado | El tratamiento posterior lo rige el aviso de WhatsApp; el sitio no recibe el mensaje |
| **Google Maps / Facebook** | Enlaces salientes | Al salir del sitio aplican sus propios avisos |
| **Netlify (hosting)** | Servidor del sitio | Registros técnicos del servidor (IP, fecha) |

Los nombres de cookies y su duración se **verifican en DevTools** al implementar; los de arriba son los habituales.

**Contenido mínimo a cubrir (a validar por el cliente):** identidad y domicilio del responsable, finalidades, datos tratados (de navegación; el sitio no recaba datos personales por formulario), transferencias a los proveedores anteriores, cómo **desactivar** o rechazar analítica y cookies (banner/consentimiento y configuración del navegador), mecanismo para ejercer derechos **ARCO** y datos de contacto (correo; decisión #5) y fecha de la última actualización.

**Consentimiento (decisión #20, pendiente):** hay dos caminos, a elegir con el cliente: **(A)** aviso informativo visible en el pie y analítica activa por defecto; **(B)** banner de consentimiento con *Consent Mode v2* de Google (`gtag('consent', 'default', { analytics_storage: 'denied' })` y se otorga al aceptar) y Clarity cargado solo tras el consentimiento. B es más protector pero reduce los datos medidos; en cualquier caso el pie del sitio enlaza al aviso.

---

## 6. Fase posterior: tablero en Looker Studio

No es parte del bloque 7; se hace cuando haya 2–4 semanas de datos y las dimensiones personalizadas estén registradas.

- **Fuentes:** conector de **Google Analytics 4** (propiedad `G-DNF30KJ0Y7`) y conector de **Search Console** (propiedad de dominio).
- **Páginas del tablero:**
  1. *Resumen*: usuarios, sesiones, canales y dispositivos (móvil vs. desktop).
  2. *Contacto*: `click_whatsapp` y `click_phone` por `link_location` y por `event_type`; tasa de contacto por sesión; embudo vista de “Qué incluye” → clic de WhatsApp.
  3. *Contenido*: `view_que_incluye`, `open_categoria_incluye` por `categoria`, `gallery_navigate` por `gallery_index`.
  4. *Origen*: campañas `perfil-maps` y `perfil-facebook`, búsqueda orgánica.
  5. *SEO*: clics, impresiones, CTR y posición de Search Console, consultas y páginas.
- **Entrega:** compartir el tablero en modo lectura con Emmanuel; programar el correo semanal o mensual.

---

## 7. Checklist de verificación (antes y después del lanzamiento)

**Antes de empezar:** el modo de pruebas es `?medicion=debug` (activa `debug_mode` y desactiva la restricción de dominio solo para esa sesión), y el filtro de tráfico de desarrollador debe estar **activo** en GA4 (§1.7) para que no ensucie los informes.

**GA4 / DebugView**
- [ ] *Administrar → DebugView* muestra el dispositivo de prueba en tiempo real.
- [ ] `page_view` al cargar.
- [ ] `click_whatsapp` con `link_location` y `event_type` correctos, en cada ubicación: hero, tarjeta (un evento de cada tipo), que-incluye, barra-movil, header, contacto; todos con `event_type` `general` salvo las tarjetas.
- [ ] `click_phone` y `click_maps` con `link_location=contacto`; `click_facebook` con su ubicación.
- [ ] `view_que_incluye` **una sola vez** al llegar a la sección, aunque se suba y se baje.
- [ ] `open_categoria_incluye` con la `categoria` correcta, **solo** al abrir manualmente (no al cargar en tablet/desktop, donde los `<details>` ya están abiertos).
- [ ] `gallery_navigate` con `gallery_index` correcto al deslizar, pulsar miniatura y usar flechas; no se dispara con la foto inicial.
- [ ] Las tres dimensiones personalizadas aparecen en *Informes → Exploración* (tras 24–48 h).
- [ ] `click_whatsapp` y `click_phone` figuran como eventos clave.

**Tag Assistant**
- [ ] Tag Assistant (https://tagassistant.google.com, modo *Connect*) detecta la etiqueta de GA4 sin errores y muestra los eventos al interactuar.
- [ ] La etiqueta carga solo en `jardincristel.mx` (en un deploy preview o en `localhost` no debe cargar sin `?medicion=debug`).

**Microsoft Clarity**
- [ ] El proyecto recibe sesiones (*Dashboard → Recordings*): al menos una grabación de móvil y una de desktop en 24 h.
- [ ] `CLARITY_ID` es `z0uyber2t9` y el script no se carga si el valor queda vacío o es el marcador; en el *waterfall* aparece `clarity.ms/tag/z0uyber2t9` solo después de `load`.
- [ ] La integración con GA4 aparece como conectada.
- [ ] El heatmap del carrusel de eventos y de la barra inferior móvil registra toques.

**Search Console / perfiles**
- [ ] Propiedad verificada (DNS o archivo HTML) y `sitemap.xml` enviado tras el merge; estado “Correcto”.
- [ ] Ficha de Google Business Profile y página de Facebook con los enlaces con UTM de §4; la visita de prueba aparece en GA4 con la campaña correcta.

**Rendimiento (la medición no debe costar LCP)**
- [ ] Lighthouse móvil, 3 corridas (mediana), **antes y después** de activar GA4 y Clarity (con `?medicion=debug` para que carguen): **LCP, TBT y CLS no empeoran** frente a la última medición del bloque anterior (referencia: baseline LCP 4.9 s; meta del sitio nuevo ≤ 2.0 s, TBT ≤ 50 ms, CLS ≤ 0.02).
- [ ] En el *waterfall* de red, ni gtag.js ni Clarity se solicitan antes del evento `load`; `gtag()` y `clarity()` aceptan llamadas anteriores (cola) sin errores de consola.
- [ ] Sin errores de consola y sin solicitudes bloqueantes nuevas en el `<head>` (solo el `preconnect` a googletagmanager, que puede añadirse al cargar).
- [ ] Peso de los scripts de terceros anotado en la bitácora.

---

## 8. Dependencias y pendientes

- **Bloque 7** (`docs/propuesta.md` §8): implementa §1, §2 y la carga diferida; depende de que los bloques 3–6 hayan puesto los atributos `data-*` en el HTML.
- **Decisión #20 (analítica):** mantener `G-DNF30KJ0Y7`, quién entra al panel de GA4, y elección de consentimiento (A o B).
- **Emmanuel debe:** conectar Clarity con GA4 en el panel de Clarity (el proyecto y su ID ya existen); verificar Search Console (DNS o archivo); actualizar los enlaces de Google Business Profile y Facebook; registrar las dimensiones y los eventos clave en GA4; validar el aviso de privacidad.
- **Datos que faltan:** correo para ejercer derechos ARCO y razón social/domicilio del responsable (decisión #5).
