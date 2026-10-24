# Sistema de diseño optimizado — Jardín Cristel

> **Estado: APROBADO el 2026-10-20.** Desbloquea los bloques 1 y 3–6 de `docs/propuesta.md`. El piloto (§8) ya lo aplica.

Optimización del diseño de `referencia/` **conservando su branding**: paleta malva / lavanda / marfil, logo “Jardín Cristel” y títulos en estilo script caligráfico (Berthold Script en la referencia; **Pinyon Script, OFL, como fuente temporal**; decisión #10, §7), acuarelas florales y arcos. Se mejora el diseño gráfico, la UX/UI y la tecnología, sin Tailwind ni Vite: HTML semántico, CSS propio con custom properties y JS vanilla. Este documento es el contrato de diseño para los bloques 1 y 3–6 de `docs/propuesta.md` (§8), que quedan bloqueados hasta su aprobación. Se apoya en `docs/inventario.md`, `docs/imagenes.md` y la experiencia por dispositivo de `docs/propuesta.md` §10 (ajustada por “sin modales”, §10.8).

**Qué se conserva:** nombre, logo “Jardín Cristel” (marcador SVG hasta recibir el final; §7), paleta, acuarelas, arcos, fotografías reales, tono de los textos, WhatsApp como canal principal.
**Qué cambia:** contraste (AA), foco visible, marcos de imagen (sin bordes oliva), interacciones (sin modales ni lightbox), peso de las acuarelas, estructura de los CTA, imágenes de eventos.

---

## 1. Tokens de color

### 1.1 Paleta

| Token | Hex | Rol | Notas |
|---|---|---|---|
| `--marfil-50` | `#fffff6` | Fondo base; texto sobre malva-500 y lavanda | Sin cambios |
| `--marfil-200` | `#fffee3` | Fondo de Eventos | Sin cambios |
| `--marfil-400` | `#fffdd0` | Fondo de Contacto | Sin cambios |
| `--malva-50` | `#f7f2f7` | Fondo de Galería, tarjetas | Sin cambios |
| `--malva-400` | `#b76e79` | **Solo títulos ≥ 24 px** (o ≥ 18.66 px en negrita) y elementos decorativos | Mantiene el rosa de marca. Nunca para texto de cuerpo ni botones |
| `--malva-500` | `#a0505c` | **Fondos con texto marfil**: header, footer, barra CTA móvil; color de foco | Nuevo. Reemplaza a malva-400 como fondo |
| `--malva-600` | `#8f4752` | Hover sobre superficies malva; **enlaces de texto** | Nuevo |
| `--malva-900` | `#49242a` | Texto oscuro de énfasis | Sin cambios (ya no se usa como borde de imagen) |
| `--lavanda-700` | `#855185` | **Hover** del botón primario | Antes no existía (el hover no hacía nada) |
| `--lavanda-800` | `#6c426c` | Botón primario (reposo); botón secundario | Sin cambios |
| `--lavanda-900` | `#482c48` | `:active` del botón primario | Sin cambios |
| `--pizarra-900` | `#3d464f` | Texto de cuerpo | Sin cambios |
| `--foco` | `#a0505c` (= malva-500) | Anillo de foco | 2 px con offset de 3 px; sobre superficies malva-500 el anillo es marfil-50 |

Eliminados: `oliva-900 #28350d` (bordes de las imágenes) y el color de enlace activo `#4a235a` (sin contraste suficiente sobre el header malva).

```css
:root {
  --marfil-50: #fffff6;  --marfil-200: #fffee3;  --marfil-400: #fffdd0;
  --malva-50:  #f7f2f7;  --malva-400:  #b76e79;  --malva-500:  #a0505c;
  --malva-600: #8f4752;  --malva-900:  #49242a;
  --lavanda-700: #855185; --lavanda-800: #6c426c; --lavanda-900: #482c48;
  --pizarra-900: #3d464f;
  --foco: #a0505c;
  --sombra-lavanda: 0 12px 32px -8px rgb(108 66 108 / .28), 0 2px 6px rgb(108 66 108 / .12);
}
:focus-visible { outline: 2px solid var(--foco); outline-offset: 3px; }
.sobre-malva :focus-visible { outline-color: var(--marfil-50); }   /* header, footer, barra CTA */
@media (forced-colors: active) { :focus-visible { outline-color: Highlight; } }
```

### 1.2 Reglas de uso

- **Texto normal** (< 24 px): `pizarra-900` sobre marfil/malva-50; `marfil-50` sobre `malva-500`, `lavanda-800/700/900`; enlaces en `malva-600`. Nunca `malva-400`.
- **Texto grande** (≥ 24 px, o ≥ 18.66 px en negrita): puede usar `malva-400` (3.4–3.8:1, cumple AA para texto grande, no AAA). Si un título baja de 24 px en móvil, pasa a `malva-600`.
- **Botón primario:** fondo `lavanda-800`, texto marfil-50; hover `lavanda-700`; active `lavanda-900`. **Botón secundario:** contorno y texto `lavanda-800` sobre fondo transparente; hover con fondo `lavanda-800` y texto marfil.
- **Títulos en Pinyon Script (H1 y H2):** los trazos finos de la caligrafía necesitan más contraste que el texto grande común, así que el H2 usa **`malva-600`** (6.4–6.5:1), no `malva-400`, y no baja de 36 px (§7). El H1 sobre el hero va en marfil-50 sobre el degradado.
- **Superficies malva** (header, footer, barra CTA): fondo `malva-500`, hover `malva-600`.
- Los hover viven bajo `@media (hover: hover)` y los estados `:active` y `:focus-visible` siempre.

### 1.3 Verificación de contraste

Calculada con `tools/contraste.mjs` (WCAG 2.x; `node tools/contraste.mjs` regenera la tabla y falla si algún par queda por debajo del mínimo). **25 pares, 0 fallos.**

| Uso | Primer plano | Fondo | Contraste | Requerido | AA |
|---|---|---|---|---|---|
| Texto del header, footer y barra CTA sobre malva-500 | `marfil-50` #fffff6 | `malva-500` #a0505c | 5.50:1 | ≥ 4.5:1 (texto) | ✔ |
| Texto sobre malva-500 en :hover (malva-600) | `marfil-50` #fffff6 | `malva-600` #8f4752 | 6.55:1 | ≥ 4.5:1 (texto) | ✔ |
| Botón primario (reposo) | `marfil-50` #fffff6 | `lavanda-800` #6c426c | 7.93:1 | ≥ 4.5:1 (texto) | ✔ |
| Botón primario :hover | `marfil-50` #fffff6 | `lavanda-700` #855185 | 5.95:1 | ≥ 4.5:1 (texto) | ✔ |
| Botón primario :active | `marfil-50` #fffff6 | `lavanda-900` #482c48 | 12.08:1 | ≥ 4.5:1 (texto) | ✔ |
| Texto de cuerpo sobre marfil-50 | `pizarra-900` #3d464f | `marfil-50` #fffff6 | 9.55:1 | ≥ 4.5:1 (texto) | ✔ |
| Texto de cuerpo sobre marfil-200 (eventos) | `pizarra-900` #3d464f | `marfil-200` #fffee3 | 9.39:1 | ≥ 4.5:1 (texto) | ✔ |
| Texto de cuerpo sobre marfil-400 (contacto) | `pizarra-900` #3d464f | `marfil-400` #fffdd0 | 9.24:1 | ≥ 4.5:1 (texto) | ✔ |
| Texto de cuerpo sobre malva-50 (galería, tarjetas) | `pizarra-900` #3d464f | `malva-50` #f7f2f7 | 8.69:1 | ≥ 4.5:1 (texto) | ✔ |
| Enlaces y bordes oscuros sobre malva-50 | `malva-900` #49242a | `malva-50` #f7f2f7 | 12.11:1 | ≥ 4.5:1 (texto) | ✔ |
| Enlaces de texto malva-600 sobre marfil-50 | `malva-600` #8f4752 | `marfil-50` #fffff6 | 6.55:1 | ≥ 4.5:1 (texto) | ✔ |
| Enlaces de texto malva-600 sobre marfil-200 | `malva-600` #8f4752 | `marfil-200` #fffee3 | 6.44:1 | ≥ 4.5:1 (texto) | ✔ |
| Enlaces de texto malva-600 sobre marfil-400 | `malva-600` #8f4752 | `marfil-400` #fffdd0 | 6.33:1 | ≥ 4.5:1 (texto) | ✔ |
| Enlaces de texto malva-600 sobre malva-50 | `malva-600` #8f4752 | `malva-50` #f7f2f7 | 5.95:1 | ≥ 4.5:1 (texto) | ✔ |
| Títulos ≥ 24 px malva-400 sobre marfil-50 | `malva-400` #b76e79 | `marfil-50` #fffff6 | 3.78:1 | ≥ 3:1 (texto grande) | ✔ |
| Títulos ≥ 24 px malva-400 sobre marfil-200 | `malva-400` #b76e79 | `marfil-200` #fffee3 | 3.72:1 | ≥ 3:1 (texto grande) | ✔ |
| Títulos ≥ 24 px malva-400 sobre marfil-400 | `malva-400` #b76e79 | `marfil-400` #fffdd0 | 3.66:1 | ≥ 3:1 (texto grande) | ✔ |
| Títulos ≥ 24 px malva-400 sobre malva-50 | `malva-400` #b76e79 | `malva-50` #f7f2f7 | 3.44:1 | ≥ 3:1 (texto grande) | ✔ |
| Foco 2 px malva-500 sobre marfil-50 | `malva-500` #a0505c | `marfil-50` #fffff6 | 5.50:1 | ≥ 3:1 (componente) | ✔ |
| Foco 2 px malva-500 sobre marfil-200 | `malva-500` #a0505c | `marfil-200` #fffee3 | 5.41:1 | ≥ 3:1 (componente) | ✔ |
| Foco 2 px malva-500 sobre marfil-400 | `malva-500` #a0505c | `marfil-400` #fffdd0 | 5.32:1 | ≥ 3:1 (componente) | ✔ |
| Foco 2 px malva-500 sobre malva-50 | `malva-500` #a0505c | `malva-50` #f7f2f7 | 5.00:1 | ≥ 3:1 (componente) | ✔ |
| Foco sobre superficies malva-500 (header/footer/barra): anillo marfil-50 | `marfil-50` #fffff6 | `malva-500` #a0505c | 5.50:1 | ≥ 3:1 (componente) | ✔ |
| Botón secundario (contorno y texto lavanda-800) sobre marfil-50 | `lavanda-800` #6c426c | `marfil-50` #fffff6 | 7.93:1 | ≥ 4.5:1 (texto) | ✔ |
| Botón secundario (contorno y texto lavanda-800) sobre malva-50 | `lavanda-800` #6c426c | `malva-50` #f7f2f7 | 7.21:1 | ≥ 4.5:1 (texto) | ✔ |

Límite conocido: `malva-400` como color de título pasa AA para texto grande pero **no** AA para texto normal; por eso se restringe a ≥ 24 px. Hay que revisar con axe/Lighthouse cuando exista el HTML.

---

## 2. Imágenes: marcos, sombra y hover

### 2.1 Reglas

- **Sin bordes oliva** (ni borde de 8 px de ningún color). El marco lo da la forma (arco) y una **sombra suave teñida de lavanda** (`--sombra-lavanda`).
- **Arco con radio proporcional al ancho**, no en píxeles fijos: hoy el radio es 117 px sea cual sea el ancho de la tarjeta, lo que deforma el arco en pantallas distintas. El marco declara `container-type: inline-size` y el radio se expresa en `cqw` (porcentaje del ancho del marco): equivalente a los 117 px sobre 530 px actuales = **22 cqw**; el arco completo de Nosotros = **50 cqw** (semicírculo).
- **Hover = zoom lento de la imagen dentro de su máscara**: el marco (forma, sombra, tamaño) no se mueve; solo la imagen escala de 1 a 1.06 en 700 ms. Aplica a tarjetas de evento, galería y mapa.
- **`prefers-reduced-motion`**: sin transición ni zoom.
- Las imágenes llevan `width` y `height` reales, `loading="lazy"` y `decoding="async"` (excepto el hero) y `srcset` AVIF/WebP.

```css
.marco { container-type: inline-size; }     /* envoltorio: mide el ancho disponible */
.marco__forma {                             /* la forma vive dentro: un elemento no puede usar cqw de sí mismo */
  overflow: hidden;
  isolation: isolate;                        /* evita artefactos en las esquinas al escalar */
  border-radius: var(--arco, 22cqw) var(--arco, 22cqw) 0 0;
  box-shadow: var(--sombra-lavanda);
}
.marco--completo { --arco: 50cqw; }          /* Nosotros: arco completo (semicírculo) */
.marco--galeria .marco__forma { border-radius: 8cqw 22cqw 8cqw 0; }   /* variante asimétrica de la galería actual */
.marco img { display: block; width: 100%; height: auto; transform: scale(1); }

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .marco img { transition: transform 700ms cubic-bezier(.2, .7, .2, 1); }
  .marco:hover img { transform: scale(1.06); }
}
```

Nota: las unidades `cqw` se resuelven contra el contenedor más cercano con `container-type`, por eso el marco se divide en un envoltorio (`.marco`, mide el ancho) y la forma (`.marco__forma`, lleva radio, sombra y `overflow`). Soporte de container queries: navegadores modernos desde 2023; fallback `border-radius: 22% 22% 0 0` para los pocos antiguos.

### 2.2 Dónde aplica

| Elemento | Marco |
|---|---|
| Nosotros (`nosotros.webp`) | `.marco--completo` (arco 50 cqw), sombra lavanda, una sola `<img>` |
| Tarjetas de evento | `.marco` + `.marco__forma` (22 cqw) |
| Galería en página | `.marco--galeria` o rectángulo con esquinas suaves en la imagen principal (desktop) |
| Mapa | `.marco` con esquinas opuestas redondeadas (variante actual), enlazado a Google Maps |

---

## 3. Sin modales

Se eliminan el modal “Paquete completo” y el lightbox de la galería, y con ellos el menú desplegable móvil (la navegación móvil es la barra inferior de §10). Se quita el JS asociado (`#modal`, `#lightbox`, `.open-modal`, `a[href="#"]`, animaciones `modal-*`) y las acuarelas del modal (`docs/imagenes.md` §2).

### 3.1 Sección “Qué incluye tu evento” (`#incluye`)

Una sola sección en la página, con el contenido del paquete actual repartido en **4 categorías** (tomadas literalmente del modal; el contenido por evento depende de la decisión #1):

| Categoría | Contenido |
|---|---|
| **Espacio y tiempo** | Jardín por 6 hrs (más media hora de entrada y media hora de salida) · Capacidad: mínimo 70, máximo 150 personas (de 120 a 150, costo extra para carpa y pista de baile) · Inflable |
| **Mobiliario y decoración** | Mesas cuadradas vestidas (cubre mantel color a su elección) · Sillas tiffany color chocolate · 1 arreglo floral por mesa (participantes) |
| **Servicio y música** | Meseros · DJ profesional 6 hrs |
| **Banquete y bebidas** | Vajilla y cristalería · Cubiertos · Hielo y refresco todo el evento (coca-cola, squirt, sidral mundet, agua mineral) · 2 garrafones de agua (jamaica) · Platos y cucharas desechables para pastel · Descorche libre · **Menú a elegir:** taquiza o tres tiempos |

Estructura (`<details>` en móvil; el mismo marcado en todos los anchos):

```html
<section id="incluye" aria-labelledby="t-incluye">
  <h2 id="t-incluye">Qué incluye tu evento</h2>
  <p>Mínimo 70 y máximo 150 personas. De 120 a 150, costo extra por carpa y pista de baile.</p>
  <div class="incluye__grupos">
    <details class="incluye__grupo" open>
      <summary><h3>Espacio y tiempo</h3></summary>
      <ul><li>Jardín por 6 hrs (más media hora de entrada y media hora de salida)</li>…</ul>
    </details>
    <!-- × 3 más: Mobiliario y decoración · Servicio y música · Banquete y bebidas -->
  </div>
  <a class="btn btn--primario" href="https://wa.me/5215536476032?text=…" data-track="whatsapp" data-track-location="incluye">Cotizar mi evento</a>
</section>
```

| Ancho | Presentación |
|---|---|
| Móvil (< 48em) | Acordeón con `<details>`: **cerrados salvo el primero**; el JS ajusta el atributo `open` según `matchMedia`; sin JS todos quedan abiertos |
| Tablet (≥ 48em) | Rejilla 2×2, todos abiertos |
| Desktop (≥ 75em, hover y puntero fino) | 4 columnas, todos abiertos, con las acuarelas laterales |

Accesibilidad: `<summary>` es nativo (teclado y lector de pantalla), con `<h3>` dentro para conservar la jerarquía; objetivo táctil ≥ 44 px; icono +/– decorativo (`aria-hidden`).

### 3.2 CTA por tarjeta de evento

Cada tarjeta lleva un **CTA principal “Cotizar mi <evento>”** con mensaje de WhatsApp prellenado por evento y un **enlace secundario “Ver qué incluye”** hacia `#incluye`. Se reemplazan los seis botones “Más información” y los `href="#"` que abrían el modal.

| Evento | Texto del botón | Mensaje prellenado | URL |
|---|---|---|---|
| bautizo | Cotizar mi bautizo | Hola, quiero cotizar un bautizo en Jardín Cristel. ¿Me pueden dar información y fechas disponibles? ¡Gracias! | `https://wa.me/5215536476032?text=Hola%2C%20quiero%20cotizar%20un%20bautizo%20en%20Jard%C3%ADn%20Cristel.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%20y%20fechas%20disponibles%3F%20%C2%A1Gracias!` |
| comunion | Cotizar mi comunión | Hola, quiero cotizar una primera comunión en Jardín Cristel. ¿Me pueden dar información y fechas disponibles? ¡Gracias! | `https://wa.me/5215536476032?text=Hola%2C%20quiero%20cotizar%20una%20primera%20comuni%C3%B3n%20en%20Jard%C3%ADn%20Cristel.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%20y%20fechas%20disponibles%3F%20%C2%A1Gracias!` |
| xv | Cotizar mis XV años | Hola, quiero cotizar mis XV años en Jardín Cristel. ¿Me pueden dar información y fechas disponibles? ¡Gracias! | `https://wa.me/5215536476032?text=Hola%2C%20quiero%20cotizar%20mis%20XV%20a%C3%B1os%20en%20Jard%C3%ADn%20Cristel.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%20y%20fechas%20disponibles%3F%20%C2%A1Gracias!` |
| boda | Cotizar mi boda | Hola, quiero cotizar una boda en Jardín Cristel. ¿Me pueden dar información y fechas disponibles? ¡Gracias! | `https://wa.me/5215536476032?text=Hola%2C%20quiero%20cotizar%20una%20boda%20en%20Jard%C3%ADn%20Cristel.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%20y%20fechas%20disponibles%3F%20%C2%A1Gracias!` |
| graduacion | Cotizar mi graduación | Hola, quiero cotizar una graduación en Jardín Cristel. ¿Me pueden dar información y fechas disponibles? ¡Gracias! | `https://wa.me/5215536476032?text=Hola%2C%20quiero%20cotizar%20una%20graduaci%C3%B3n%20en%20Jard%C3%ADn%20Cristel.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%20y%20fechas%20disponibles%3F%20%C2%A1Gracias!` |
| empresarial | Cotizar mi evento empresarial | Hola, quiero cotizar un evento empresarial en Jardín Cristel. ¿Me pueden dar información y fechas disponibles? ¡Gracias! | `https://wa.me/5215536476032?text=Hola%2C%20quiero%20cotizar%20un%20evento%20empresarial%20en%20Jard%C3%ADn%20Cristel.%20%C2%BFMe%20pueden%20dar%20informaci%C3%B3n%20y%20fechas%20disponibles%3F%20%C2%A1Gracias!` |

```html
<article class="evento">
  <div class="marco"><div class="marco__forma"><img src="…" alt="…" width="1600" height="2000" loading="lazy"></div></div>
  <h3>Boda</h3>
  <p><strong>Descubre la perfección en tu gran día.</strong> Nuestro jardín…</p>
  <a class="btn btn--primario" href="https://wa.me/5215536476032?text=…" target="_blank" rel="noopener noreferrer"
     aria-label="Cotizar mi boda por WhatsApp"
     data-track="whatsapp" data-track-location="evento-boda" data-event-type="boda">Cotizar mi boda</a>
  <a class="enlace" href="#incluye" aria-label="Ver qué incluye para mi boda">Ver qué incluye</a>
</article>
```

Reglas: el `aria-label` **empieza con el texto visible** (H11); `data-track` alimenta la delegación de eventos de `docs/propuesta.md` §7 (`click_whatsapp`, con `event_type`); el texto de cada mensaje lo aprueba Emmanuel (decisión #7). En la barra inferior móvil y en el header, “Cotizar” envía el mensaje genérico (el actual, ajustado).

### 3.3 Galería en página

Sin lightbox; las imágenes se ven en su lugar, en buena resolución (versión grande ≥ 1200 px, ya no la miniatura de 530 px ampliada).

```html
<section id="galeria" aria-labelledby="t-galeria">
  <h2 id="t-galeria">Galería</h2>
  <div class="galeria" role="region" aria-roledescription="carrusel" aria-label="Fotos del jardín">
    <ul class="galeria__lista">
      <li><button type="button" class="galeria__foto" data-grande="img/galeria/01-1200.avif" aria-label="Foto 1 de 6">
        <img src="…" srcset="…" sizes="…" alt="Descripción real de la foto" width="1200" height="900" loading="lazy"></button></li>
      <!-- × 5 -->
    </ul>
    <p class="galeria__contador" aria-live="polite"><span data-actual>1</span> / 6</p>
    <figure class="galeria__principal" hidden><img alt="" width="1200" height="900"><figcaption></figcaption></figure>
  </div>
</section>
```

| Ancho | Comportamiento |
|---|---|
| Móvil | **Carrusel con scroll-snap** horizontal (`scroll-snap-type: x mandatory`, cada foto ≈ 88 % del ancho para que asome la siguiente), **contador “3 / 6”** actualizado con `IntersectionObserver`, región enfocable operable con flechas del teclado; sin botones táctiles superfluos |
| Tablet | El mismo carrusel con 2 fotos visibles |
| Desktop (hover y puntero fino) | **Imagen principal grande + fila de 6 miniaturas**; clic o flechas ←/→ cambian la principal (`aria-current="true"` en la miniatura activa); la imagen principal se carga solo en este layout (sin descargar duplicados en móvil); hover con el zoom lento de §2 |

Sin JS: las 6 fotos se ven como lista/rejilla. Las miniaturas y las fotos del carrusel son **el mismo `<img>` con `srcset`** (no hay dos copias en el DOM).

---

## 4. Acuarelas

Hoy hay **15 acuarelas de fondo (+2 del modal)** que pesan **953 KiB en escritorio y 275 KiB en móvil**, repartidas en lienzos enormes donde la pintura ocupa del 3 % al 18 % (`docs/imagenes.md` §2). Propuesta: **menos piezas, recortadas a su contenido, sin tapar texto, más pequeñas en móvil**.

### 4.1 Principios

1. **Cada pieza es un recorte al área con pintura** (+ 24 px de margen), no un lienzo completo; se posiciona con CSS en el margen de la sección.
2. **Nunca sobre texto ni sobre fotos**: se ubican en las zonas laterales o en el borde de la sección, fuera de la columna de texto; cada pieza declara su “zona segura”.
3. **Se tratan como imágenes decorativas** (`<img alt="" aria-hidden="true" loading="lazy" decoding="async" fetchpriority="low">` absolutas, `pointer-events: none`), no como `background-image`: así no compiten con el LCP ni se descargan antes de necesitarse.
4. **Una pieza reutilizada y espejada** cuando el diseño lo permita (`transform: scaleX(-1)`), en lugar de dos archivos.
5. **AVIF con fallback WebP, con transparencia.**
6. **Sin acuarelas sobre el texto ni bajo el velo del texto** del hero, ni en el header, el footer o la barra inferior. *(Revisado el 2026-10-21: el hero admite una esquina acuarelada en el lado de la foto, lejos del texto; ver §9.)*
7. Versión móvil: piezas más pequeñas, pocas, en las esquinas o el borde inferior.

### 4.2 Composición por sección

| Sección | Escritorio (≥ 75em) | Móvil | Zona segura (donde no hay texto) |
|---|---|---|---|
| **Inicio** | ~~Ninguna~~ → 1 esquina + divisor (§9) | Solo el divisor | — |
| **Nosotros** | 1 pieza: la derecha (`bg-nosotros-right`, recorte ≈ 704×579) abajo a la derecha, bajo el texto. Se elimina la izquierda | 1 tira pequeña bajo el CTA (recorte de `bg-nosotros-mobile`) | Margen derecho/inferior; el texto mantiene un `max-width` que no llega a la pieza |
| **Qué incluye tu evento** | ~~Ninguna~~ → 2 laterales + divisor (§9) | Solo el divisor | — |
| **Eventos** | 2 piezas: tira superior (`bg-eventos-top` recortada) y racimo inferior (`bg-eventos-bottom` recortada) | 2 piezas pequeñas: esquina superior y borde inferior | Sobre el título y bajo las tarjetas, sin pisar las fotos |
| **Galería** | 2 laterales a partir de **una sola pieza espejada** (`bg-gallery-right` recortada, columna ≈ 375×1001) en los márgenes izquierdo y derecho | 1 esquina inferior derecha | Márgenes laterales: la imagen principal y las miniaturas quedan centradas |
| **Contacto** | 2 piezas: tira inferior (`bg-footer-bottom` recortada a 1920×319) y un racimo superior reducido (`bg-footer-top`) | 1 tira inferior | Zona inferior/derecha; la dirección, los botones y el mapa quedan por encima de las flores |
| **Modal / menú móvil** | Eliminadas | Eliminadas | — |

Totales: de **8 a 6 archivos en escritorio** y de **7 a 4 en móvil**, sin contar los 2 del modal que se eliminan (con tu aprobación).

### 4.3 Meta de peso

| | Hoy | Meta | Reducción |
|---|---|---|---|
| Acuarelas escritorio | 953 KiB | **≤ 250 KiB** (Nosotros 35 · Eventos 60 · Galería 70 · Contacto 85) | ≈ −74 % |
| Acuarelas móvil | 275 KiB (+ 61 KiB del menú) | **≤ 70 KiB** | ≈ −79 % |
| Peso total de la página (móvil) | 902 KiB | ≤ 300 KiB (objetivo de `docs/propuesta.md`) | — |

Son metas de diseño: se validan al generar las piezas (AVIF q ≈ 45–55 sobre el recorte); si alguna pieza no cabe en su presupuesto, se reduce su tamaño de render o se elimina. Las acuarelas pesan menos que las fotos y no son el LCP porque cargan en diferido.

---

## 5. Dirección de arte para imágenes de eventos generadas con IA

Las 6 tarjetas de evento (bautizo, comunión, XV años, boda, graduación, empresarial) se renuevan con imágenes **simbólicas** generadas con IA, con calidad consistente. Las fotos de la **galería** y las del **lugar** siguen siendo reales.

### 5.1 Reglas

1. **Solo simbólicas:** objetos, detalles y naturalezas muertas que evocan el evento (anillos y flores, un libro de oración y un rosario sobre tela, letras luminosas “XV”, un birrete y un diploma, copas y una mesa puesta genérica, un cuaderno con pluma). Nada que pretenda mostrar un servicio concreto del jardín.
2. **Nunca el lugar:** no representar el Jardín Cristel (ni la pérgola de herrería, ni la fachada, ni el jardín, ni escenarios que pudieran confundirse con él); la imagen no debe inducir a pensar que así luce el jardín. Si el espacio aparece, solo en fotografía real.
3. **Sin rostros ni personas reconocibles:** no caras, no retratos; manos solo si se ven naturales y sin defectos (preferible evitarlas).
4. **Paleta de marca:** malva, lavanda, marfil y rosas empolvados, con verdes naturales y blancos de apoyo; sin saturados ni colores ajenos (nada de neones). Luz cálida suave y natural.
5. **Sin texto, logotipos ni marcas** dentro de la imagen (las letras “XV” son un objeto, no un texto superpuesto).
6. **Formato 4:5 vertical, mínimo 1600 px de ancho** (1600×2000 o mayor; se exportan derivados 400/800/1200/1600 en AVIF/WebP). Sujeto principal **centrado en el 70 % inferior** y con aire arriba, porque el arco recorta las esquinas superiores y el hover escala un 6 %.
7. **Coherencia del conjunto:** misma familia de luz, profundidad de campo corta, mismo tratamiento de color y grano en las seis; se revisan juntas antes de aprobar.
8. **Calidad:** revisar manos, bordes, simetrías, texturas y artefactos a 100 %; descartar lo que se vea “generado”. Una imagen por evento aprobada por Emmanuel.
9. **Transparencia hacia el visitante:** el alt describe lo que se ve; se agrega la nota discreta “Imágenes ilustrativas” en la sección de eventos.
10. **Archivo y trazabilidad:** guardar en el repo (`img/eventos/`) solo los derivados finales y registrar en `docs/BITACORA.md` el prompt usado y la fecha. Los originales sin recortar se conservan fuera del repo.

### 5.2 Plantilla de instrucción

> *[Objeto simbólico del evento], naturaleza muerta, sobre tela marfil con flores en tonos malva y lavanda, luz cálida suave de ventana, fondo desenfocado en marfil, profundidad de campo corta, fotografía editorial, sujeto centrado en la parte inferior del encuadre con espacio libre arriba, formato vertical 4:5, sin personas, sin rostros, sin texto, sin logotipos, paleta marfil · malva · lavanda · verde follaje.*

| Evento | Sujeto simbólico sugerido |
|---|---|
| Bautizo | Pequeña vela y concha bautismal sobre tela marfil con flores blancas y lavanda |
| Comunión | Libro de oración y rosario de perlas sobre tela, con flores blancas |
| XV Años | Corona o tiara y letras luminosas “XV”, con rosas malva y listones |
| Boda | Dos anillos sobre una peonía rosa empolvada y hojas verdes |
| Graduación | Birrete y diploma enrollado con listón malva |
| Empresarial | Mesa puesta minimalista con copas y arreglo floral sobrio (**o conservar la foto real de la carreta del jardín**, ver `docs/imagenes.md`) |

Las sugerencias son punto de partida; Emmanuel puede preferir otros símbolos.

---

## 6. Decisiones y dependencias

- **#8 (originales de fotos) y #9 (logo vectorial):** pendientes del cliente. **#10 resuelta con condición (§7):** logo SVG con marcador, Pinyon Script temporal y **no mergear a `main` sin el SVG final y la licencia confirmada**.
- **#1 (paquete por evento):** si el paquete cambia por evento, la sección “Qué incluye tu evento” se parametriza por evento; mientras tanto es única.
- **Este documento fue aprobado el 2026-10-20** y desbloquea los bloques 1 y 3–6 (`docs/propuesta.md` §8).
- **Retiro de `bg-modal*.webp`** y de las acuarelas sustituidas: no se borra nada sin aprobación (regla de trabajo); la limpieza de `referencia/` se hace dos semanas después del merge (decisión #22).

---

## 7. Logo y tipografía de títulos (decisión #10)

**Decisión (2026-10-20):** el logo “Jardín Cristel” será SVG; hasta que el cliente compre la licencia Desktop de Berthold Script se usa la **imagen actual del logo como marcador**. H1 y títulos de sección usan una **fuente libre temporal**. `Berthold-Script.ttf` ya no se despliega desde la rama. **Condición: no mergear a `main` sin el SVG final y la licencia confirmada.**

### 7.1 Logo: marcador SVG accesible

- **Archivo:** `img/logo.svg` (20 KB). Incrusta como data URI WebP (256×256, con transparencia) la **imagen actual del logo**, es decir, la flor acuarelada que ya usan los iconos de `referencia/icons/` (`android-chrome-512x512.png`). Es lo único que existe hoy como imagen de logo: el nombre “Jardín Cristel” en la referencia es **texto** en Berthold Script, no una imagen. **No se vectorizó ni se derivó nada de `Berthold-Script.ttf`.**
- **Accesibilidad:** `<svg role="img" aria-label="Jardín Cristel" …>`. Si el SVG se inserta con `<img src="img/logo.svg" alt="Jardín Cristel">`, el nombre lo da el `alt` (los atributos ARIA dentro de un SVG usado como imagen no se exponen); para que `role="img"` y `aria-label` surtan efecto hay que **incrustar el `<svg>` en el HTML**:

```html
<a class="logo" href="/" aria-label="Jardín Cristel, inicio">
  <svg role="img" aria-label="Jardín Cristel" viewBox="0 0 256 256" width="56" height="56" focusable="false">
    <image width="256" height="256" href="data:image/webp;base64,…" />   <!-- contenido de img/logo.svg pegado en línea -->
  </svg>
</a>
```

- **Sustitución:** cuando llegue el SVG final se reemplaza el contenido de `img/logo.svg` (y el bloque en línea) conservando `role="img"` y `aria-label="Jardín Cristel"`. El favicon, los iconos y la imagen Open Graph se rehacen a partir del SVG final (decisión #9).
- **Límite del marcador:** muestra solo la flor, sin el nombre. Mientras tanto el nombre visible junto al logo (si se muestra) es **texto HTML** en la fuente temporal de §7.2, no una imagen del nombre.

### 7.2 Fuente temporal: Pinyon Script

| | |
|---|---|
| **Fuente** | Pinyon Script (Sorkin Type), licencia **SIL OFL 1.1** (`fonts/OFL-pinyon-script.txt`) |
| **Archivo** | `fonts/pinyon-script-400.woff2`: **24.5 KB** (el TTF de Berthold pesaba 188 KB). Subset latino generado con `fonttools` a partir del WOFF2 latino de Fontsource: U+0020–007E, U+00A0–00FF (acentos, ñ, ¡ ¿), comillas, rayas, puntos suspensivos y €; 200 glifos; funciones `kern`, `liga`, `calt`, `ccmp`; sin hinting |
| **Uso** | **Solo H1 y H2** (hero y títulos de sección), nunca por debajo de **36 px**. H3 y títulos de tarjeta, en Merriweather Bold |
| **Color** | H1 en marfil-50 sobre el hero; H2 en **malva-600** (§1.2) |

```css
@font-face {
  font-family: "Pinyon Script";
  src: url("../fonts/pinyon-script-400.woff2") format("woff2");
  font-weight: 400; font-style: normal;
  font-display: swap;
}
h1, h2 { font-family: "Pinyon Script", "Snell Roundhand", "Apple Chancery", cursive; font-weight: 400; font-synthesis: none; letter-spacing: 0; }
h1 { font-size: clamp(3.5rem, 13vw, 5.75rem); }
h2 { font-size: clamp(2.25rem, 7vw, 3.5rem); }      /* mínimo 36 px */
```

`<link rel="preload" as="font" type="font/woff2" href="fonts/pinyon-script-400.woff2" crossorigin>` para el H1 (probable elemento LCP). El cambio de fuente (`swap`) puede mover el layout: se afina con un fallback ajustado (`size-adjust`, `ascent-override`) al implementar el bloque 1 y se mide el CLS.

**Por qué Pinyon Script.** Es la script libre más cercana a la formalidad de Berthold Script (caligrafía inglesa de punta fina, mayúsculas ornamentadas, inclinación similar), cubre todo el latín con acentos y ñ, y es OFL (se puede autohospedar y modificar/subsetear). Se compararon, en el mismo texto (“Jardín Cristel”, “Nuestros eventos”, “Qué incluye tu evento”, “Galería”) a 64, 36 y 26 px:

| Candidata (OFL) | Resultado |
|---|---|
| **Pinyon Script** | **Elegida.** Formal y elegante como la referencia; legible desde 36 px |
| Great Vibes | Muy cercana, pero más condensada; las mayúsculas (J, N, C) se confunden y las minúsculas pierden claridad con acentos |
| Parisienne | La más legible en tamaños pequeños, pero más desenfadada, menos formal |
| Alex Brush | Trazo de pincel, más pesada y casual; se aleja de la caligrafía formal |
| Allura | Fina y ligera; a 24–36 px el trazo se pierde |
| Italianno | Comprimida y con x-altura pequeña; poco legible en móvil |
| Tangerine | Demasiado fina y pequeña para títulos |

**Límite conocido:** como la referencia, un script de trazo fino se lee mal por debajo de ~36 px y con poco contraste: por eso solo H1/H2, tamaño mínimo y color `malva-600` en los H2. Pinyon Script no es Berthold: la forma de las letras cambia ligeramente; es una solución **temporal** hasta que el cliente decida la licencia y el SVG final.

### 7.3 Condición de merge

**No mergear a `main` sin el SVG final y la licencia confirmada.** Mientras tanto, producción (`main`) sigue sirviendo `/fonts/Berthold-Script.ttf` (no se toca `main`); ese archivo desaparece con el merge porque el árbol nuevo no lo incluye.

---

## 8. Piloto: notas de implementación

Primera aplicación del sistema (hero, eventos y “Qué incluye tu evento”) en `index.html`, `css/styles.css` y `js/main.js`. Mediciones y capturas: `docs/benchmark/piloto/`. Decisiones tomadas al implementarlo:

- **Tokens:** solo los de §1 (13 valores). Verificado: ningún `#hex` ni `rgb()` del CSS queda fuera de los tokens (el velo del hero usa `rgb(72 44 72 / α)` = lavanda-900 con transparencia); `tools/contraste.mjs`: 25 pares, 0 fallos.
- **Hero:** foto de la referencia como `<picture>` (AVIF/WebP, recorte vertical 4:5 en móvil) bajo un **velo de lavanda-900** (degradado vertical en móvil/tablet y horizontal en escritorio, donde el texto ocupa la izquierda). El contraste del texto marfil se **midió sobre píxeles reales** (se oculta el texto, se captura el hero y se toma el percentil 98 de luminancia bajo cada bloque): peor píxel ≥ 5.3:1 a 320 px y ≥ 6.5:1 desde 360 px (kicker 12.8 px, H1 y párrafo). El CSS mantiene ese margen porque la foto final puede ser más clara.
- **Marco de las tarjetas de evento:** el arco (22 cqw, §2) se aplica a la **tarjeta completa** (foto + texto), como en la referencia, no solo a la foto; el zoom hover (1 → 1.06, 700 ms) actúa solo sobre la foto dentro de su marco fijo y se desactiva con `prefers-reduced-motion`. Foto cuadrada en móvil y 4:5 en tablet/escritorio (`object-fit: cover`).
- **Navegación del piloto:** solo enlaza las secciones que existen (Inicio, Eventos, Qué incluye). **“Cotizar” está dos veces en el DOM**: el botón central de la barra inferior (< 48em, `data-track-location="barra-movil"`) y el del header (≥ 48em, `header`); CSS oculta el que no corresponde (`display: none`, fuera del árbol de accesibilidad). Así se resuelve el problema de orden de foco del botón central que arrastraba el prototipo descartado y no hace falta un `data-track-location` dinámico.
- **Tipografía:** H1 `clamp(2.75rem, 15vw, 5.75rem)` (54 px a 360 px, 48 px a 320 px; **sin desbordar** a 320 ni 360 px) y H2 `clamp(2.25rem, 8vw, 3.5rem)` (mínimo 36 px), ambos en Pinyon Script; Merriweather 400/700 en WOFF2 propio (10.5 KB cada peso, subset latino).
- **Imágenes:** las actuales como marcador (`docs/imagenes.md` sin notas del cliente). Las de eventos son de 530×386 px recortadas a cuadrado o 4:5, por lo que se ven blandas en pantallas de alta densidad; se sustituyen por las imágenes finales (§5).
- **Mensaje de WhatsApp:** el de las tarjetas es el de §3.2; el genérico (hero, “Qué incluye”, barra y header) es provisional hasta resolver la decisión #7.
- **Medición:** atributos `data-*` y `js/main.js` según `docs/medicion.md`; solo mide en `jardincristel.mx` o con `?medicion=debug`. **Clarity no se carga todavía.**

---

## 9. Adornos acuarelados en escritorio (piloto)

Propuesta del 2026-10-21, escrita **antes** de implementarla. Motivo: las acuarelas de la referencia son lo que personaliza el sitio y el piloto las había omitido. Inventario y calidad de cada pieza: `docs/imagenes.md` §8. Reglas de §4.1 siguen vigentes (recortes al racimo, nunca sobre texto, `<img alt="" aria-hidden="true">`, `pointer-events: none`, AVIF/WebP con alfa), con dos ajustes: el hero admite una esquina (lejos del texto) y “Qué incluye” admite dos laterales (la lectura densa queda en las tarjetas, que son opacas).

### 9.1 Piezas (todas recortadas de `referencia/images/`, generadas con `tools/optimizar-adornos.cjs` en `img/adornos/`)

| Pieza | Origen (racimo) | Render escritorio | Peso AVIF (1x) |
|---|---|---|---|
| `hero-esquina` | `bg-nosotros-right` (eucalipto, nomeolvides y uvas) | 420 px de ancho | ≈ 23 KB |
| `eventos-sup-izq` | `bg-eventos-top` A (lirio rosa) | 130 px | ≈ 4 KB |
| `eventos-sup-der` | `bg-eventos-top` B (eucalipto) | 230 px | ≈ 7.6 KB |
| `eventos-inf-izq` | `bg-eventos-bottom` A (rosa antigua y zarcillo) | 400 px | ≈ 14 KB |
| `eventos-inf-der` | `bg-eventos-bottom` B (rosa magenta y gipsófila) | 270 px | ≈ 16 KB |
| `incluye-izq` | `bg-gallery-left` (lirio y uvas) | 180 px | ≈ 15 KB |
| `incluye-der` | `bg-gallery-right` (peonía y enredadera) | 190 px | ≈ 30 KB |
| `divisor` | `detail.webp` (guirnalda rosa) | 247 px (nativo) | ≈ 4–9 KB |

Meta: **suma < 150 KiB en escritorio** (≈ 115 KiB esperados). Cada pieza se reduce al ancho de render (1x); como el racimo nativo es 1.3–2x mayor, se ve bien en pantallas 1x y aceptable en retina (acuarela, sin bordes duros).

### 9.2 Composición por sección

Anclaje: las piezas que conservan un **borde plano del lienzo original** (`eventos-sup-izq`, `eventos-sup-der`, `incluye-izq`, `incluye-der`) van **pegadas al borde de la ventana** (`left/right: 0`), donde ese corte es natural; anclarlas al bloque de contenido las deja cortadas en seco a 1920 px (se probó). Las rosas inferiores y la esquina del hero están completas: las rosas se anclan al bloque de contenido (74 rem, `left/right: max(-2rem, calc(50% - 40rem))`) para que asomen siempre en el mismo sitio respecto de las tarjetas.

| Sección | Escritorio (≥ 75 em) | Tablet (48–75 em) | Móvil (< 48 em) |
|---|---|---|---|
| **Inicio** | `hero-esquina` en la **esquina inferior derecha** de la foto (sobre el velo, que ahí tiene 0.2–0.3 de opacidad), sin rotación, sin tocar el bloque de texto (que mide 40 rem a la izquierda). `divisor` bajo el H1, alineado a la izquierda. Se cargan sin `lazy` (están en el primer viewport) con `fetchpriority="low"` y `decoding="async"`; en móvil/tablet la esquina ni se descarga (`<source media>` solo de escritorio) | Solo el `divisor` | Solo el `divisor` (160 px) |
| **Eventos** | `eventos-sup-izq` y `eventos-sup-der` en las **esquinas superiores**, flanqueando el título (que queda centrado y libre); `eventos-inf-izq` y `eventos-inf-der` en las **esquinas inferiores**, parcialmente **detrás de las tarjetas de los extremos** (solapan unos 60–80 px; las tarjetas son opacas y quedan siempre arriba). `divisor` centrado bajo el H2 | `sup-izq` (104 px) y `sup-der` (144 px) y `inf-izq` (220 px) | solo `sup-der` (84 px) y `inf-izq` (152 px), dentro del relleno de la sección |
| **Qué incluye** | `incluye-izq` pegada arriba a la izquierda y `incluye-der` pegada abajo a la derecha, ambas **asomando por los lados de las tarjetas** (parte detrás de las columnas 1 y 4). `divisor` centrado bajo el H2 | ninguna (las tarjetas ocupan todo el ancho) | ninguna |

**Rotación:** ninguna (son recortes de esquina y deben conservar su orientación natural: crecen desde el borde de la sección hacia adentro). **Espejado:** no se usa; cada lado tiene su pieza propia.

### 9.3 Capas y contraste

1. Orden de pila dentro de cada sección (`isolation: isolate`): fondo de la sección → adornos (`z-index: -1`) → contenido. El contenido **siempre** queda por encima; las tarjetas (`--malva-50`, opacas) y los botones tapan lo que haya detrás.
2. **No hay texto sin fondo opaco sobre un adorno**: los adornos se ubican en las esquinas, fuera de la caja del H2, el `p.seccion__intro` y el bloque de texto del hero. Se verifica por geometría (ninguna caja de texto se cruza con un adorno) y, donde un adorno queda cerca, por medición de píxeles (mismo método que el hero).
3. El texto del hero sigue midiéndose **≥ 6.5:1** (kicker, H1, párrafo): la esquina está bajo ninguno de ellos.

### 9.4 Ajustes de layout que exige la composición (escritorio)

- `#eventos`: `padding-block-end` de 6 rem a **10 rem** para que las rosas inferiores se vean en el relleno y no solo detrás de las tarjetas.
- `#incluye`: `padding-block-end` de 6 rem a **9 rem** (arriba se queda en 6 rem); el CTA queda centrado y libre.
- Ancho máximo del contenido (74 rem) y del texto del hero (40 rem) **no cambian**: los adornos viven en los márgenes y en el solape de las esquinas.
- Las tres secciones pasan a `position: relative; isolation: isolate; overflow: clip` (con `overflow: hidden` como respaldo): sin desplazamiento horizontal aunque el adorno sobresalga.
- Se añade `.divisor` (imagen centrada, 160–247 px) bajo los títulos; en el hero va alineado a la izquierda.

### 9.5 Movimiento

**No se añade parallax ni animación** (los adornos son estáticos). Así `prefers-reduced-motion` no requiere reglas nuevas y no hay JS ni capas que promover a GPU.

### 9.6 Pendiente

- No se reintroduce `detail.webp` como SVG hasta tener el vector (§4.1); el `divisor` en AVIF/WebP es el puente.
- Las piezas de **Nosotros**, **Galería** y **Contacto** (`bg-nosotros-left`, `bg-footer-top/bottom`, etc.) se recortan al construir esas secciones, con el mismo método.
- Con las fotos de eventos definitivas se debe revisar de nuevo el solape de las rosas inferiores con las tarjetas.

---

## 10. Sitio completo: secciones, menú y barra inferior (2026-10-21)

### 10.1 Secciones (orden de la página)

| `id` | `<h2>` | Fondo | Contenido e imagen | Adornos (escritorio · tablet · móvil) |
|---|---|---|---|---|
| `inicio` | (h1) Jardín Cristel | foto + velo | `hero.webp` | esquina + divisor · divisor · divisor |
| `nosotros` | Una celebración inolvidable en Tepotzotlán | marfil-50 | `nosotros.webp` en arco + 4 párrafos + “Solicita tu presupuesto” | `nosotros-izq` · — · — |
| `eventos` | Nuestros eventos | marfil-200 | 6 tarjetas | 4 esquinas · 3 · 2 |
| `incluye` | Qué incluye tu evento | marfil-50 | 4 `<details>` | 2 laterales · — · — |
| `galeria` | Galería | marfil-200 | 6 fotos (marcador 530 px) | `galeria-izq`, `galeria-der` · — · — |
| `ubicacion` | Ubicación | marfil-50 | dirección, “Abrir en Google Maps”, mapa bajo demanda | — |
| `contacto` | Contacto | marfil-200 | WhatsApp, teléfono, Facebook | `contacto-inf-izq` y `-der` (franja inferior) · 2 · 1 |

Cada sección tiene `id` para anclas y `aria-labelledby`. `scroll-margin-top` es `calc(var(--alto-header) + .5rem)` desde 48 em (encabezado fijo de 57 px; medido: la sección queda a 64–69 px del borde tras pulsar un enlace) y 0 en móvil, donde el encabezado no es fijo. Ninguna sección quedó sin imagen, pero la galería y el mapa usan marcadores (ver `docs/imagenes.md` §10).

### 10.2 Menú de tablet y escritorio

`<nav aria-label="Principal">` en el encabezado: Inicio · Nosotros · Eventos · Qué incluye · Galería · Ubicación · Contacto y, **al final, “Cotizar”** (botón principal, WhatsApp con mensaje prellenado, `data-track-location="header"`). Sección activa con `aria-current="true"` (subrayado) mediante `IntersectionObserver` (banda 35–45 % del alto de la ventana) más una regla para marcar la última sección al llegar al final. En **tablet (48–75 em)** el enlace “Inicio” se oculta (el logo ya lo es) para que quepa en una fila desde 768 px (medido: 768, 820, 1024, 1180, 1280 y 1440 px, una sola fila, sin desbordar). Desde 75 em con mouse el menú tiene los 7 enlaces. Hover solo bajo `@media (hover: hover)`.

### 10.3 Barra inferior móvil (< 48 em)

`<nav aria-label="Navegación rápida">` fija abajo, **5 elementos**: **Eventos · Galería · COTIZAR · Cómo llegar · Más**. “Cotizar” siempre al centro, más grande y elevado, botón de acción (WhatsApp prellenado, `barra-movil`). “Cómo llegar” abre Google Maps (ver §10.4). “Más” lleva a `#contacto`, y **el pie de página trae el índice de todas las secciones** (`<nav aria-label="Secciones del sitio">`): así Inicio, Nosotros, Qué incluye y Ubicación siguen a un toque sin menús desplegables ni modales. Zonas táctiles medidas: 59×56 px (320 px de ancho) a 79×56 px (430); Cotizar 78×66. Foco visible (anillo marfil sobre malva), `padding-bottom: env(safe-area-inset-bottom)` en la barra y `padding-bottom` de 4.5 rem + safe-area en `body` para no tapar contenido. Desde 48 em la barra desaparece (`display: none`, fuera del árbol de accesibilidad) y “Cotizar” vive en el menú: en el DOM hay dos “Cotizar”, cada uno con su `data-track-location`.

### 10.4 “Cómo llegar” y mapa bajo demanda

- **Enlace universal:** `https://www.google.com/maps/search/?api=1&query=<nombre y dirección codificados>`, con la consulta “Jardín Cristel, Av. Lic. Benito Juárez 24, San Martín, 54600 Tepotzotlán, Estado de México” (dirección de `docs/inventario.md`; **no existe un `place_id` en el repositorio**, y no se inventa uno). El enlace corto de la referencia (`maps.app.goo.gl/GREPvSYNPcgL9c8D8`) resuelve a la ficha “Jardín Cristel” en 19.714825, −99.225371; ese dato queda documentado como respaldo (`query=19.714825,-99.225371`) por si la búsqueda por texto no apuntara a la ficha. Con `target="_blank" rel="noopener noreferrer"`; en móvil el sistema decide si abre la app de Maps (ver lo no verificado en la BITACORA).
- **Sección Ubicación:** dirección (`<address>`), botón “Abrir en Google Maps” (`data-track="maps" data-track-location="ubicacion"`) y un mapa **bajo demanda**: la imagen `maps.webp` no es un enlace; el botón “Ver mapa” (se muestra solo con JS) crea el `<iframe>` de Google Maps (`output=embed`, `loading="lazy"`, `title`, `referrerpolicy`) **solo al pulsarlo**. Verificado: cero peticiones a Google antes del clic.

### 10.5 Galería

Implementa §3.3: carrusel con scroll-snap y contador “n / 6” en móvil; carrusel de 2 fotos en tablet (sin contador); imagen principal + 6 miniaturas con `aria-current="true"`, clic y flechas ← → en escritorio con mouse. `gallery_navigate` (`gallery_index`, `interaction` = `swipe`/`thumbnail`/`arrow`) se envía cuando el desplazamiento se asienta (140 ms) o al cambiar la selección; la foto inicial no cuenta. Las regiones desplazables solo reciben `tabindex="0"` cuando de verdad desbordan (también el carril de eventos). Botón “Ver más fotos en Facebook”.

### 10.6 Desviaciones respecto de `docs/propuesta.md`

- **Ubicación separada de Contacto** (la propuesta tenía “Cómo llegar” como `<h3>` dentro de Contacto): el encargo nombra una sección Ubicación y un `link_location=ubicacion`.
- **Sin FAQ:** es opcional en la propuesta y no hay contenido real; no se inventó.
- **Barra:** Eventos · Galería · Cotizar · Cómo llegar · Más (antes Inicio · Eventos · Cotizar · Galería · Contacto).
- **Menú:** una sola nav no sirve a ambos layouts (los elementos difieren), así que hay dos `<nav>` (menú y barra) y una tercera en el pie; solo una se muestra por ancho.

---

## 11. Ajustes de la versión móvil (< 48 em) — 2026-10-23

Todo vive en un bloque `@media (max-width: 47.99em)` de `css/styles.css`; tablet y escritorio no cambian (verificado: capturas de 768 y 1280 px, página completa, idénticas píxel a píxel antes y después).

| # | Ajuste | Implementación |
|---|---|---|
| 1 | Sin encabezado en móvil | `.top { display: none }`; la navegación es la barra inferior. El `<h1>` es el primer encabezado, el skip link recibe foco y el hero empieza en 0 px. |
| 2 | Sin logo en el hero | `.hero__logo { display: none }`; el hero ocupa `calc(100svh - var(--alto-barra))` (sin tope de 44 rem, para no dejar una franja vacía sobre la barra) y centra su contenido en vertical. |
| 3 | Hero centrado | `.hero__contenido` en columna, `align-items: center; text-align: center`; botones a ancho completo (máx. 22 rem). |
| 4–5 | Nosotros centrado | `justify-items: center; text-align: center`; divisor con `margin-inline: auto`. |
| 6 | Remate y botón | `text-wrap: balance` (dos líneas de 237 y 212 px a 360, 390 y 412) con respaldo `@supports not` de `max-inline-size: 24ch` (mismo resultado). |
| 7 | Carriles de Eventos y Galería | `display: flex` + `::after` de `flex: 0 0 calc(var(--gutter) - 1rem)` (gap de 1 rem + espaciador = 20 px, igual que el margen inicial). El padding derecho de un contenedor con `overflow` no se respeta. Medido: 20 px a cada lado, gap 16 px; con `scroll-snap` el último card queda con el mismo margen que el primero. |
| 8 | Sin sombra en la galería | `.galeria__foto { box-shadow: none }` (sin contorno ni recortes). |
| 9 | Dos botones en Ubicación | «Abrir en Google Maps» (`click_maps`) y nuevo «Ver en Google» (`google.com/search?q=jardin+cristel`, `click_perfil_google`, `link_location: ubicacion`, ver `docs/medicion.md`). Este último se oculta desde 48 em (`.ubicacion__perfil`) para respetar el alcance solo móvil. |

### 11.1 Acuarelas florales en móvil

Se muestran más piezas y más grandes; las de borde plano de lienzo van pegadas al borde de la ventana. Ninguna tiene opacidad reducida (se ven al 100 %); ninguna cruza texto salvo la zona inferior de Nosotros.

| Sección | Pieza | Posición | Ancho (antes → ahora) |
|---|---|---|---|
| Eventos | `eventos-sup-izq` | arriba-izquierda | — → 5 rem |
| Eventos | `eventos-sup-der` | arriba-derecha | 5.25 → 6.5 rem |
| Eventos | `eventos-inf-izq` | abajo-izquierda | 9.5 → 12 rem |
| Nosotros | `nosotros-izq` | abajo-izquierda (`padding-bottom` 4 → 7 rem) | — → 7 rem |
| Qué incluye | `incluye-izq` | abajo-izquierda (tras los grupos, que son opacos) | — → 5.5 rem |
| Galería | `galeria-der` | arriba-derecha | — → 5 rem |
| Contacto | `contacto-inf-izq` / `-der` | franja inferior (máscara en el borde interior) | 11 rem → 13 rem (la derecha, nueva) |

**Peso:** adornos descargados en móvil 41.8 KB → 92.6 KB (**+49.6 KiB**; tope +60 KiB). Todas siguen con `loading="lazy"`.
**Contraste con píxeles reales** (se oculta el texto, se captura el fondo con los adornos y se compara con el peor píxel bajo cada línea; 360, 390 y 412 px): mínimo **4.72:1** (H1 blanco sobre la foto del hero, sin cambios); texto oscuro sobre marfil/adornos ≥ 5.95:1. **Sin scroll horizontal** (`scrollWidth == innerWidth` a 360, 390 y 412).

---

## 12. Ajustes móviles (2.ª ronda) y sección Reseñas — 2026-10-23

### 12.1 Móvil (< 48 em; tablet y escritorio sin cambios)

| # | Ajuste | Implementación |
|---|---|---|
| 1 | Hero centrado en vertical | `.hero { display: flex; flex-direction: column; justify-content: center; min-block-size: 100svh; padding-block-end: calc(var(--alto-barra) + env(safe-area-inset-bottom)) }` (`svh`, no `vh`, por la barra de URL de iOS). Para que la compensación sea exacta, `--alto-barra` pasó de 4.5 rem a **3.5 rem (56 px, la altura real)** y las etiquetas de la barra no se parten (`white-space: nowrap`, tamaño `clamp(.6rem, 2.9vw, .68rem)`): a 320 y 360 px «Cómo llegar» ocupaba dos líneas y la barra medía 64 px. Medido a 360, 390 y 412: espacio libre arriba = abajo (123, 176, 209 px). |
| 2 | Botón del hero | En móvil se oculta «Cotizar por WhatsApp» (`.hero__wa`) y el botón secundario dice «Ver eventos» (`.t-mov`); desde 48 em se conservan «Cotizar por WhatsApp» y «Conoce nuestros eventos» (`.t-esc`) con sus `data-*`. |
| 3 | Foto del hero | `object-position: 50% 35%` (ya era `center 35%`; ahora explícito). Con `cover` a 360–412 px se ve ≈ 56–58 % del ancho de la imagen (800×1000): el sujeto (pérgola con flores y escalinata) queda centrado, pero **la columna blanca grande del borde izquierdo de la foto se recorta**; si se quiere conservarla hace falta un recorte vertical propio para móvil. |
| 4 | Botones finales | Token `--aire-boton: 3rem`: mismo espacio entre el contenido anterior y el botón, y entre el botón y el fin de la sección (Nosotros: desde `.nosotros__remate`; Qué incluye: desde `.incluye__grupos`). Medido con `getBoundingClientRect` a 360, 390 y 412: **48 / 48 px en ambos botones (diferencia 0)**. |
| 5 | Ubicación | Dirección, luego la imagen estática con «Abrir en Google Maps» encima (`.mapa__abrir`, mismo enlace universal y `data-track="maps" data-track-location="ubicacion"`). Se ocultan «Ver mapa» y el botón de la columna de texto; «Ver en Google» se eliminó; el JS no crea el iframe en móvil. Tablet y escritorio conservan el botón de la columna y «Ver mapa». «Cómo llegar» sigue en la barra inferior. |

**Origen de la imagen del mapa y riesgo:** `img/ubicacion/maps.webp` (530×386) es la captura de Google Maps que ya usaba el sitio de `referencia/images/maps.webp` (con la marca «Google» y los textos de Google). Es una captura de un servicio de terceros: **riesgo de términos de uso** (las condiciones de Google Maps restringen reproducir o derivar sus imágenes de mapa sin atribución/permiso). **Alternativa propuesta:** un mapa ilustrado propio en SVG (calle principal, pin, nombre del jardín, referencias locales como la plaza o el Oxxo), de unos 5–10 KB, con el mismo recorte en arco; así no hay captura de terceros y se puede teñir con la paleta. Hasta tenerlo, la imagen se mantiene como marcador.

### 12.2 Sección Reseñas (`#resenas`)

**Posición:** justo antes de Ubicación (después de Galería). `docs/propuesta.md` no fija otra (§2 no la lista; #15 solo aprueba testimonios reales con permiso, sin `AggregateRating`). Razones: tras ver el jardín (Nosotros, Eventos, Qué incluye, Galería) la prueba social refuerza la decisión justo antes de las secciones de acción (cómo llegar y contactar), y Galería → Reseñas → Ubicación → Contacto alterna fondos (marfil-200, lavanda-50, marfil-50, marfil-200) sin dos iguales seguidos.

**Contenido:** dos reseñas de Google con el texto original en español, sin editar ni traducir (Alex G., María E.; el nombre mostrado está en un comentario `EDITAR` del HTML, junto al nombre completo); leyenda «Reseña en Google» (sin fecha relativa), sin logo de Google ni insignias; «Google» solo en texto. Enlace «Ver todas las reseñas en Google» → `https://www.google.com/search?q=jardin+cristel` (`target="_blank" rel="noopener noreferrer"`, `click_resenas_google`, `link_location: resenas`, ver `docs/medicion.md`). **Sin datos estructurados** (decisiones #12–#15 de `propuesta.md`).

**Marcado:** `<section aria-labelledby>` con `<h2>`; cada reseña en `<figure>` con `<blockquote><p>` y `<figcaption>`; estrellas en un SVG decorativo (`aria-hidden`) más el texto accesible «5 de 5 estrellas» (`.sr-only`).

**Tokens nuevos (`:root`):**

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--lavanda-50` | `#f5eff5` | fondo de la sección | texto `pizarra-900` 8.48:1 |
| `--avatar-fondo` | `#e9dcea` | círculo del avatar | — |
| `--avatar-icono` | `var(--lavanda-800)` (#6c426c) | icono del avatar | 6.03:1 sobre el círculo (≥ 3:1 exigido a un gráfico) |
| `--estrella` | `var(--malva-500)` | estrellas | 5.50:1 sobre marfil-50 |

**Avatar:** `img/resenas/person-fill.svg` aplicado como máscara CSS (`mask`) sobre un `::after` con `background-color: var(--avatar-icono)`: se recolorea con el token sin duplicar el SVG en el HTML. **Licencia:** es el icono `person-fill` de Bootstrap Icons (clase `bi bi-person-fill` en el archivo), **MIT, © The Bootstrap Authors**; se comprobó que el archivo es idéntico al de `github.com/twbs/icons` y la licencia está en `img/resenas/LICENSE-bootstrap-icons.txt`.

**Layout:** móvil, tarjetas apiladas y centradas (máx. 28 rem); desde 48 em, dos columnas (máx. 56 rem). Sin carrusel ni JS (salvo el seguimiento del clic); `text-wrap: pretty` en el texto y `balance` en el autor.

**Acuarelas (composición propia, ver también §9 y §11.1):** Incluye usa arriba-izquierda + abajo-derecha, Eventos las cuatro esquinas, Galería arriba a ambos lados. Reseñas usa la **diagonal opuesta** (arriba-derecha + abajo-izquierda) con **racimos de los lienzos móviles que ninguna otra sección usa**, y volteados en horizontal en el propio recurso (`flop` en `tools/optimizar-adornos.cjs`, así los bordes planos del lienzo quedan contra el borde de la ventana):

| Pieza | Origen | Posición | Ancho móvil · tablet · escritorio |
|---|---|---|---|
| `resenas-sup-der` | `bg-gallery-top-mobile` (anémona violeta y ramitas), volteada | arriba-derecha | 5 · 7 · 9.4 rem |
| `resenas-inf-izq` | `bg-gallery-bottom-mobile` (esquina de follaje, flores azules y blancas), volteada | abajo-izquierda | 9 · 13 · 23.75 rem |

`aria-hidden`, `alt=""`, `pointer-events: none`, `overflow: clip` en la sección, `loading="lazy"`. `padding-bottom` de 8 / 9 / 11 rem para que la pieza inferior quede en el relleno, bajo el botón (que es transparente). **Peso:** 8.3 + 14.5 KB AVIF = **22.8 KB (≈ 22 KiB)** en móvil y escritorio (tope 60 KiB). **Contraste medido con píxeles reales** (mismo método de §11.1): mínimo en Reseñas 5.81:1; en todo el sitio ≥ 4.99:1 a 360, 390, 412, 768 y 1280.

### 12.3 Menú

«Reseñas» entra al menú de escritorio y tablet entre Galería y Ubicación, y al índice del pie. En móvil la barra sigue siendo Eventos · Galería · **Cotizar** · Cómo llegar · Más; «Reseñas» se alcanza desde «Más» (→ Contacto, cuyo pie lista todas las secciones). Con ocho enlaces el menú de tablet desbordaba 8 px a 768 px, así que el relleno lateral de cada enlace en tablet baja de 0.55 a 0.4 rem (una fila de 768 a 1440; el escritorio con mouse no cambia).

---

## 13. Carriles con swipe en móvil (< 48 em) — 2026-10-23

Aplica a `.eventos__carril` y `.galeria__carril`; tablet y escritorio no cambian (comprobado por DOM a 768, 820, 1024, 1280 y 1440 px: 0 diferencias). **Sustituye** al espaciador `::after` de §11 (una sola solución).

```css
:root { --ancho-carril: min(82vw, 22rem); --pad-carril: calc((100% - var(--ancho-carril)) / 2); }
.eventos__carril, .galeria__carril { padding-inline: 0; scroll-snap-type: x mandatory; scroll-padding-inline: var(--pad-carril); overscroll-behavior-x: contain; touch-action: pan-x pan-y; }
.eventos__lista, .galeria__lista   { display: flex; gap: 1rem; inline-size: max-content; min-inline-size: 100%; padding-inline: var(--pad-carril); }
.eventos__lista > li, .galeria__lista > li { flex: 0 0 var(--ancho-carril); scroll-snap-align: center; scroll-snap-stop: always; }
```

- **Un solo token de ancho** (`--ancho-carril`, 82 vw hasta 22 rem) y un mismo `gap` de 1 rem: a 360 / 390 / 412 px cada elemento mide 295 / 320 / 338 px y asoma un fragmento de 16 / 19 / 21 px de cada vecino.
- **Desviación respecto del enunciado:** el `padding-inline` va en **la lista** (`ul`, hija del carril y contenedora de todos los elementos), no en el carril. Así el margen final forma parte de la caja de la lista y el último elemento puede centrarse en cualquier navegador, sin depender de que el contenedor con scroll respete su padding final. Como la lista mide `max-content` y su contenedor es el carril, el porcentaje de `--pad-carril` se mide sobre el mismo ancho (el del carril) tanto en `padding-inline` como en `scroll-padding-inline`: una sola variable compartida para ambos.
- `touch-action: pan-x pan-y` permite el gesto diagonal sin atorar el scroll vertical (efecto colateral: deshabilita el pellizco de zoom sobre los carriles, no sobre el resto de la página). `overscroll-behavior-x: contain` evita que el borde del carril arrastre la navegación del navegador.
- **Movimiento reducido:** el carril no define `scroll-behavior`; el único `smooth` es el de `html` (solo con `prefers-reduced-motion: no-preference`) y el JS de la galería usa `behavior: auto` si el usuario lo prefiere.
- **Botones/contador:** la galería móvil tiene un contador «n / 6» y las fotos son botones; ambos siguen funcionando con el snap (clic en una foto la centra, dif. −0.21 px; el contador marca 3, 6 y 1 al llegar a esas fotos y se emiten los `gallery_navigate` correspondientes). No se agregaron botones ni puntos.

### Verificación (Chrome 155 con emulación táctil, `docs/benchmark/piloto/carril-*.png`)

**Centrado** (centro del elemento − centro del viewport, `getBoundingClientRect`, tras `scrollIntoView({ inline: 'center' })` en cada uno de los 6 elementos; el desfase es la cuantización de subpíxel del snap):

| Ancho | Eventos: máx. \|dif.\| | Galería: máx. \|dif.\| |
|---|---|---|
| 360 px | 0.45 px | 0.45 px |
| 390 px | 0.41 px | 0.41 px |
| 412 px | 0.48 px | 0.48 px |

Todos ≤ 1 px, incluidos el primero y el último; `scrollWidth == innerWidth` (sin scroll horizontal de la página).

**Swipe rápido** (toques sintéticos con `Input.dispatchTouchEvent`, 10 movimientos; tarjetas avanzadas desde la primera con `scroll-snap-stop: always`; entre paréntesis, lo mismo sin `stop: always`):

| Duración \ Arrastre | 100 px | 150 px | 200 px | 250 px | 300 px |
|---|---|---|---|---|---|
| 40 ms | 1 (2) | 1 (2) | 1 (2) | **2** (2) | **2** (2) |
| 60 ms | 1 (1) | 1 (1) | 1 (3) | 1 (2) | **2** (2) |
| 100 ms | 1 (1) | 1 (1) | 1 (2) | 1 (3) | **2** (3) |
| 150 ms | 1 (1) | 1 (1) | 1 (1) | 1 (2) | 1 (2) |
| 250 ms | 1 (1) | 1 (1) | 1 (1) | 1 (1) | 1 (1) |

(Eventos y Galería dan la misma tabla.) El paso de una tarjeta a la siguiente es de 336 px (390 de ancho). **Con `stop: always` cada swipe avanza una sola tarjeta salvo en los gestos extremos** (≥ 250 px de arrastre en ≤ 40 ms o 300 px en ≤ 100 ms, es decir, casi el ancho de una tarjeta a más de 3 000 px/s), donde Chrome dejó pasar una segunda. Sin `stop: always` los gestos rápidos avanzan 2–3. No hay propiedad CSS adicional que lo impida; si se exige una tarjeta exacta también en esos casos haría falta una pequeña lógica en JS (por ejemplo, limitar el destino a la tarjeta siguiente al soltar). No se añadió porque el encargo pedía la solución en CSS.

**No verificado:** la inercia real del dedo en iOS (Safari) y Android (Chrome); el emulador no reproduce la física del fling. Safari: `scroll-snap-stop` se admite desde 15.

---

## 14. Barra inferior: «Cómo llegar» y aviso de salida — 2026-10-24

Solo móvil (< 48 em); tablet y escritorio no cambian.

- **Motivo:** evitar salidas del sitio sin aviso. «Cómo llegar» abría Google Maps directamente desde la barra; ahora es un ancla a `#ubicacion` (scroll suave salvo `prefers-reduced-motion`) con `aria-current="true"` por scroll-spy, igual que Eventos y Galería.
- **Posición:** `scroll-margin-top` de `#ubicacion` queda en 0 en móvil (no hay header): dirección, imagen del mapa, botón y aviso caben sobre la barra a 360, 390 y 412 px (`docs/benchmark/piloto/ubicacion-barra-{360,390,412}.png`).
- **«Abrir en Google Maps» (sobre la imagen):** icono de enlace externo (flecha diagonal), línea visible «Se abre en la app de Google Maps» bajo la imagen (`.mapa__aviso`), `aria-label="Abrir en Google Maps (se abre en la app o en una pestaña nueva)"`, `target="_blank"` y `rel="noopener noreferrer"`. Sin modal ni confirmación.
- **Medición:** la barra ya no emite `click_maps`; `barra-movil` deja de ser valor de `link_location` en `click_maps` (ver `docs/medicion.md`). No se añadió evento de navegación genérico.
