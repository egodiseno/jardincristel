# Bitácora — Jardín Cristel (rama `modernizacion`)

Cada tarea termina con una entrada aquí: fecha, qué se hizo, por qué, archivos tocados, decisiones y pendientes. Los commits se registran solos al final del archivo (hook `.githooks/post-commit`).

## Entradas

### 2026-10-20 — Inicio del proyecto: configuración, baseline y auditoría

**Qué se hizo**
- Exploración del repo (estructura, pesos, dependencias, organización de CSS/JS).
- Creación de `CLAUDE.md` con descripción, stack, enfoque Mobile First y reglas de trabajo.
- Creación de esta bitácora y del hook `.githooks/post-commit` (activado con `core.hooksPath`).
- Benchmark baseline con Lighthouse (móvil y desktop) contra https://jardincristel.mx.
- Auditoría de código y entrega de `docs/benchmark/hallazgos.md`.

**Por qué**
Establecer reglas, trazabilidad y una línea base medible antes de modernizar el sitio.

**Archivos tocados**
`CLAUDE.md`, `.gitattributes`, `.githooks/post-commit`, `docs/BITACORA.md`, `docs/benchmark/baseline/*`, `docs/benchmark/hallazgos.md`. No se modificaron `index.html` ni assets.

**Decisiones**
- `.gitattributes` fuerza LF en `.githooks/*` para que el hook funcione en Windows.
- El hook solo escribe en el archivo (sin commit), por lo que deja `docs/BITACORA.md` modificado tras cada commit; se incluye en el siguiente.
- Lighthouse 12 vía `npx` con Chrome local en modo headless.

**Pendientes**
- Revisar `docs/benchmark/hallazgos.md` y decidir qué atacar primero.
- Definir diseño (fuera de alcance de esta sesión).

### 2026-10-20 — Inventario del sitio actual y propuesta de reconstrucción

**Qué se hizo**
- `docs/inventario.md`: textos por sección, imágenes (ruta, sección, dimensiones, peso), paleta con contrastes, tipografías, breakpoints, animaciones, enlaces, analítica/gtag, íconos y manifest, extraídos de `index.html`, el bundle JS y el CSS.
- `docs/propuesta.md`: arquitectura estática nueva, mapa de secciones con un solo h1, resolución de los 19 hallazgos, estrategia de LCP, dominio canónico sin www, tracking GA4 por delegación, plan por bloques y decisiones pendientes.

**Por qué**
Se decidió reconstruir como HTML semántico estático (sin build ni framework); hay que fijar contenido, alcance y plan antes de escribir el sitio.

**Archivos tocados**
`docs/inventario.md`, `docs/propuesta.md`, `docs/BITACORA.md`. No se escribió el sitio nuevo ni se modificaron `index.html` ni assets.

**Decisiones**
- Se conserva la identidad visual; único ajuste de color propuesto: malva más oscuro (`#9c5460`) para cumplir contraste AA.
- Los assets actuales no se borran: pasarían a `referencia/` hasta que Emmanuel lo apruebe.
- Hallazgos nuevos N1–N7 (p. ej. `hero.webp` de 78 KB se sirve también en móvil porque el estilo inline pisa la regla de `heroSm.webp`; `favicon.svg` es un PNG incrustado; `lavanda-700` no existe, el hover no hace nada; el modal es idéntico para los 6 eventos).

**Pendientes**
- Emmanuel debe responder las 24 decisiones de `docs/propuesta.md` §9 (contenido del paquete, originales de fotos, logo vectorial, licencia de la fuente, dominio canónico, etc.).
- Empezar el bloque 0 de implementación tras su aprobación.

### 2026-10-20 — Bloque 0, experiencia por dispositivo y decisiones aprobadas

**Qué se hizo**
- **Bloque 0:** el build anterior (`index.html`, `assets/`, `images/`, `fonts/`, `icons/`, `manifest.json`) se movió con `git mv` a `referencia/` (historial conservado; sigue funcionando en `/referencia/` porque sus rutas son relativas). Se crearon `css/`, `js/`, `img/`, `fonts/` (con `.gitkeep`), un `index.html` provisional (`noindex`) y `netlify.toml` (`publish = "."`, `X-Robots-Tag: noindex` para `/referencia/*`). Quedan en la raíz `robots.txt`, `sitemap.xml` y `favicon.ico` hasta el bloque 9.
- `docs/propuesta.md`: nueva **sección 10 “Experiencia por dispositivo”** (un HTML, tres layouts por CSS con media queries combinadas ancho + hover + pointer; móvil como app web, tablet y desktop); bloques 1 y 3–6 marcados como dependientes de la aprobación de la dirección visual; `referencia/` actualizado en §1.
- §9: decisiones **aprobadas** #4, #6, #12–#15 (sin `AggregateRating`), #16 (no en v1), #17 (no), #18 (imagen enlazada), #19 (solo galería, bajo demanda), #21 (sin www), #22 (dos semanas tras el merge), #23, #24. **Pendientes del cliente:** #1, #2, #3, #5, #7, #8, #9, #10, #11, #20.

**Por qué**
Dejar el repo listo para construir el sitio nuevo sin perder el anterior, y fijar por escrito cómo se comporta en cada dispositivo antes de escribir CSS.

**Archivos tocados**
Movidos a `referencia/`; nuevos: `index.html` (provisional), `netlify.toml`, `css/.gitkeep`, `js/.gitkeep`, `img/.gitkeep`, `fonts/.gitkeep`; editados: `docs/propuesta.md`, `docs/BITACORA.md`.

**Decisiones**
- El `index.html` provisional es solo para la rama: **no se debe hacer merge a `main` antes de los bloques 3–6**, porque reemplazaría el sitio en producción.
- Lo que lleva a la raíz el sitio viejo (`robots.txt`, `sitemap.xml`) no se toca todavía (bloque 9).
- El layout de tablet es el valor por defecto desde 48em; el de desktop exige ancho ≥ 75em **y** `hover: hover` **y** `pointer: fine`.
- Netlify no permite activar el deploy preview desde `netlify.toml` (es un ajuste del sitio en el panel). Netlify ya marca los deploys de rama y de PR con `noindex`.

**Pendientes**
- Activar en el panel de Netlify el branch deploy de `modernizacion` (pasos en la respuesta de esta sesión).
- Aprobación de la dirección visual (§10) para iniciar los bloques 1 y 3–6; el bloque 2 (head/SEO) y el 9 pueden avanzar antes.
- Respuestas del cliente a las decisiones pendientes.
- `docs/benchmark/competencia.md` está sin versionar (no es de esta sesión); se deja intacto.

### 2026-10-20 — Rediseño completo: prototipo de tres direcciones visuales

**Qué se hizo**
- Se versionó `docs/benchmark/competencia.md` y la línea pendiente de la bitácora (commit “docs: benchmark competitivo”).
- `docs/propuesta.md`: nuevo principio de identidad (rediseño completo; solo se conserva el nombre); H3 (malva `#9c5460`) y decisión #10 (Berthold Script) superadas — solo fuentes OFL autohospedadas; decisión #9 ahora es “wordmark nuevo, pendiente de aprobación del cliente”; nueva §11 con el comparativo de direcciones.
- `prototipo/`: portada (`index.html`) + `a.html`, `b.html`, `c.html` con **el mismo HTML** (verificado por hash del body normalizado) y CSS propio por dirección (`css/a.css`, `b.css`, `c.css`) sobre un `base.css` mínimo (reset, accesibilidad, mecánica del `<dialog>` y del carril). A: herrería y jardín (Fraunces + Instrument Sans). B: fiesta de pueblo (Bricolage Grotesque + Figtree). C: editorial cálido (Gloock + Manrope). Fuentes WOFF2 latin de Fontsource copiadas a `prototipo/fonts/` con sus licencias OFL; sin CDN ni GA.
- Sección 10 aplicada: barra inferior con “Cotizar” central en móvil, carril scroll-snap, paquete en `<dialog>` (bottom sheet / panel lateral / sección en desktop), menú horizontal con hover en desktop. JS de ≈2 KB.
- `docs/prototipo/`: README con contrastes, resultados y hallazgos; 24 capturas (390/820/1440 de página completa y primera pantalla, más paquete abierto en 390/820); reportes Lighthouse móvil de cada dirección.

**Por qué**
Elegir la dirección visual con evidencia (pantallas reales, contraste, rendimiento) antes de los bloques 1 y 3–6.

**Resultados Lighthouse móvil (servidor local sin compresión, `noindex`)**
A: 93 / 100 / 100 (LCP 2.9 s, CLS 0.052) · B: 95 / 100 / 100 (LCP 2.8 s, CLS 0.003) · C: 95 / 100 / 100 (LCP 2.8 s, CLS 0.001). SEO 66 en las tres por el `noindex` intencional. El LCP de las tres es la misma imagen provisional (`hero.webp` 1728 px sin `srcset`).

**Archivos tocados**
`prototipo/**` (nuevo), `docs/prototipo/**` (nuevo), `docs/propuesta.md`, `docs/BITACORA.md`. No se tocaron `main`, `referencia/` ni el `index.html` raíz.

**Decisiones**
- La portada del prototipo usa fuentes del sistema para no favorecer a ninguna dirección.
- Las capturas se recomprimen a PNG de paleta (24 MB → 8 MB) sin diferencia visible.
- Las fotos son las provisionales de `referencia/images`; el prototipo las enlaza por ruta relativa (`../referencia/images/`), por lo que **depende de `referencia/`** mientras exista.
- Se detuvo el servidor local del puerto 8123 por su PID exacto, sin comandos de cierre masivo.

**Pendientes**
- El cliente elige dirección (A, B o C) y aprueba el wordmark: desbloquea los bloques 1 y 3–6.
- Diagnosticar el CLS 0.052 de A si se elige.
- Orden de foco de “Cotizar” en tablet/desktop (se reordena con `order`); decidir solución en el sitio real.
- Originales de fotos, logo vectorial y resto de decisiones del cliente (#1, #2, #3, #5, #7, #8, #10 ya resuelta, #11, #20).

### 2026-10-20 — Cambio de dirección: optimizar la identidad de referencia

**Qué se hizo**
- **Cambio de dirección:** se descarta el rediseño de identidad. Se conserva y se optimiza el branding de `referencia/` (paleta malva/lavanda/marfil, Berthold Script en logo y título, acuarelas y arcos), sin Tailwind ni Vite.
- `docs/propuesta.md`: el principio de identidad vuelve a “conservar y optimizar”; las decisiones #9 (logo vectorial) y #10 (licencia web de Berthold Script: licencia web, compra o contornos SVG solo para logo y H1) y #11 revertidas a pendientes; **§11 marcada como descartada** (las tres direcciones se sentían plantilla y perdían el branding); §10 se mantiene aplicada al estilo de referencia, con el nuevo apartado §10.8 (sin modales); H3, N3, N4, el plan (bloque 5) y el mapa de secciones actualizados.
- **Eliminados** `prototipo/` y `docs/prototipo/` con `git rm`. **Recuperables en el commit `f14d291`**: `git show f14d291:prototipo/a.html` o `git checkout f14d291 -- prototipo docs/prototipo`.
- **`docs/diseno.md`** (nuevo): tokens de color (malva-400 solo títulos ≥ 24 px y decorativo; malva-500 para fondos con texto marfil; malva-600 hover y enlaces; lavanda-700/800/900; foco de 2 px) con **tabla de contraste verificada por script (25 pares, 0 fallos)**; imágenes sin borde oliva, sombra lavanda, arco proporcional con `cqw`, zoom lento dentro de la máscara y `prefers-reduced-motion`; **sin modales** (sección “Qué incluye tu evento” con 4 categorías, `<details>` en móvil; CTA “Cotizar mi <evento>” con WhatsApp prellenado por evento y enlace “Ver qué incluye”; galería en página con carrusel scroll-snap y contador en móvil e imagen principal + miniaturas en desktop); composición de acuarelas por sección con meta de peso; reglas de dirección de arte para imágenes de eventos con IA.
- **`docs/imagenes.md`** (nuevo): catálogo de las 36 imágenes de `referencia/images/`, los 11 iconos y los iconos SVG en línea, con comportamiento actual (sección, tamaño, peso, radio, borde, hover, lightbox, duplicados, fondo/contenido), **cambio propuesto** y la columna vacía **Notas de Emmanuel**.
- `tools/contraste.mjs` (nuevo): calcula los contrastes WCAG de los tokens y falla si alguno no cumple.
- `CLAUDE.md`: regla “Sin frameworks CSS ni bundlers. Todo cambio al sitio se hace desde Claude Code en terminal.”, `referencia/` y la identidad conservada descritas, y documentación enlazada.

**Por qué**
Las tres direcciones del prototipo perdían el branding del cliente. Es mejor optimizar lo que ya es suyo (identidad) mejorando contraste, interacción, peso e imágenes.

**Archivos tocados**
`docs/propuesta.md`, `docs/diseno.md`, `docs/imagenes.md`, `docs/BITACORA.md`, `CLAUDE.md`, `tools/contraste.mjs`; eliminados `prototipo/**` y `docs/prototipo/**`.

**Decisiones y hallazgos**
- Las acuarelas son lienzos casi vacíos (la pintura cubre del 2.9 % al 17.6 % del área); recortarlas y reducir piezas es la mayor palanca de peso: 953 KiB en escritorio y 275 KiB en móvil hoy, con metas de ≤ 250 KiB y ≤ 70 KiB (sujetas a validación al generarlas).
- Los alt actuales no coinciden con varias fotos (nosotros, bautizo, boda, galería); se corrigen en la implementación.
- `malva-400` como texto solo cumple AA para texto grande (3.4–3.8:1): por eso se restringe a títulos ≥ 24 px.
- `bg-modal.webp`, `bg-modal-mobile.webp` y las acuarelas sustituidas no se borran sin aprobación (regla de trabajo).
- Conflicto resuelto: §10 original usaba `<dialog>` para paquete y visor; ahora rige “sin modales” (§10.8 y `docs/diseno.md` §3).

**Pendientes**
- Emmanuel: aprobar `docs/diseno.md` (desbloquea los bloques 1 y 3–6), llenar la columna “Notas de Emmanuel” de `docs/imagenes.md` y resolver #1, #2, #3, #5, #7, #8, #9, #10 y #11 (y #20).
- Confirmar si `empresarial.webp` es foto real del jardín (se conservaría).
- Licencia web de Berthold Script antes de publicar.

### 2026-10-20 — Plan de medición (solo documentación) y prioridad de la licencia de Berthold Script

**Qué se hizo**
- `docs/medicion.md` (nuevo), para integrarse en el **bloque 7**; no se implementó nada:
  - **GA4 (`G-DNF30KJ0Y7`)** con tracking por delegación y atributos `data-*` (`data-track`, `data-track-location`, `data-event-type`, `data-categoria`): `click_whatsapp` (con `link_location`: hero, tarjeta, que-incluye, barra-movil, header, contacto; y `event_type`: boda, xv, bautizo, comunion, graduacion, empresarial, general), `click_phone`, `click_maps`, `click_facebook`, `view_que_incluye` (una vez por visita), `open_categoria_incluye` (al abrir cada `<details>`) y `gallery_navigate` (con índice). Dimensiones personalizadas (`link_location`, `event_type`, `categoria`) y eventos clave (`click_whatsapp`, `click_phone`) con los pasos del panel.
  - **Microsoft Clarity**: carga tras `load` con `requestIdleCallback`, integración con GA4 desde su panel, marcador `CLARITY_ID`, nota de que el sitio no tiene formularios.
  - **Search Console** (propiedad de dominio por DNS; alternativa: archivo HTML en la raíz que Emmanuel me pasa; enviar el sitemap tras el merge), **UTM** de Google Business Profile y Facebook, **aviso de privacidad** (qué herramientas mencionar; el texto legal lo valida el cliente), fase posterior en **Looker Studio** y **checklist de verificación** (DebugView, Tag Assistant, Clarity, LCP sin empeorar).
- `docs/propuesta.md`: el bloque 7 apunta a `docs/medicion.md` e incluye Clarity; la §7 avisa de que manda el nuevo documento; el árbol de archivos, la decisión #20 y las referencias a `docs/tracking.md` actualizados.
- **Decisión #10 (licencia web de Berthold Script) sube a prioridad alta** en `docs/propuesta.md`, `docs/diseno.md` y `CLAUDE.md`: el TTF ya se sirve públicamente (verificado: `https://jardincristel.mx/fonts/Berthold-Script.ttf` responde 200) y también desde `referencia/fonts/` en la rama y sus deploys.

**Por qué**
Dejar definido cómo se medirá el sitio antes de implementarlo y no mezclar la analítica con el LCP; y atender cuanto antes el riesgo de licencia de la tipografía.

**Archivos tocados**
`docs/medicion.md` (nuevo), `docs/propuesta.md`, `docs/diseno.md`, `CLAUDE.md`, `docs/BITACORA.md`. No se tocaron `main`, `referencia/` ni el `index.html` de la raíz.

**Decisiones**
- GA4 y Clarity solo se activan en `jardincristel.mx` (o con `?medicion=debug`), para que los deploy previews y `localhost` no contaminen los datos; se recomienda activar el filtro de tráfico de desarrollador en GA4.
- Los eventos `click_cta` y `select_event_type` de la propuesta original desaparecen; el evento genérico `click` del sitio de referencia no se porta.
- Propuesta de UTM de Facebook con `utm_medium=social` (no `organic`) para que GA4 lo clasifique como Organic Social; Emmanuel puede preferir `organic`.
- Antes del merge hay que decidir (con aprobación) si `referencia/fonts/Berthold-Script.ttf` se excluye del despliegue.

**Pendientes**
- Emmanuel: confirmar origen y licencia de Berthold Script (prioridad alta); crear el proyecto de Clarity y pasar el ID; verificar Search Console (DNS o archivo HTML); actualizar los enlaces de Google Business Profile y Facebook; registrar dimensiones y eventos clave en GA4; validar el aviso de privacidad y elegir el consentimiento (A o B).
- Datos que faltan para el aviso: correo ARCO y razón social/domicilio (decisión #5).

### 2026-10-20 — ID de Microsoft Clarity registrado en el plan de medición

**Qué se hizo**
- Emmanuel creó el proyecto de Clarity y pasó el snippet; el ID es `z0uyber2t9`. Se registra en `docs/medicion.md` (§2, checklist y pendientes) y en el bloque 7 de `docs/propuesta.md` (y decisión #20). Sigue siendo solo documentación: nada implementado.
- El snippet entregado se verificó contra el esqueleto documentado (misma cola `clarity.q`, `async`, `https://www.clarity.ms/tag/<ID>`).

**Por qué**
Cerrar el marcador `CLARITY_ID` con el valor real para que el bloque 7 se implemente sin pasos pendientes.

**Archivos tocados**
`docs/medicion.md`, `docs/propuesta.md`, `docs/BITACORA.md`.

**Decisiones**
- El snippet **no** va en el `<head>` como indica el panel: se inyecta desde `js/main.js` tras `load` y en `requestIdleCallback`, para no afectar el LCP.
- Se conserva la guarda: si `CLARITY_ID` está vacío o es el marcador, no se carga; y solo se carga en `jardincristel.mx` (o con `?medicion=debug`).

**Pendientes**
- Emmanuel: conectar Clarity con GA4 desde el panel de Clarity.
- Resto de pendientes de medición sin cambios (Search Console, UTM de Business Profile/Facebook, dimensiones y eventos clave en GA4, aviso de privacidad y consentimiento).

## Registro de commits

- 2026-10-20 12:17 `a19da90` docs: configuración inicial, bitácora, baseline Lighthouse y hallazgos
- 2026-10-20 12:26 `f09956c` docs: inventario del sitio actual y propuesta de reconstrucción
- 2026-10-20 12:39 `e03c554` docs: mover build actual a referencia y dejar esqueleto (bloque 0)
- 2026-10-20 12:39 `c695786` feat: esqueleto de carpetas, index provisional y netlify.toml (bloque 0)
- 2026-10-20 12:40 `4e2aa1f` docs: sección 10 de experiencia por dispositivo y decisiones aprobadas
- 2026-10-20 14:03 `21cf65d` docs: benchmark competitivo
- 2026-10-20 14:19 `f14d291` feat: prototipo de tres direcciones visuales (A, B, C)
- 2026-10-20 14:45 `af94542` docs: optimizar identidad de referencia (sistema de diseño, catálogo de imágenes) y retirar prototipo
- 2026-10-20 14:58 `cf8626d` docs: plan de medición (GA4, Clarity, Search Console) y prioridad de la licencia de Berthold Script
