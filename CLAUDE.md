# CLAUDE.md

Guía para Claude Code (claude.ai/code) en este repositorio.

## Proyecto

Sitio web de **Jardín Cristel**, jardín para eventos (bodas, XV años, bautizos, comuniones, graduaciones y eventos empresariales) en Tepotzotlán, Estado de México. En producción en https://jardincristel.mx (Netlify; `www` redirige 301 al dominio sin `www`).

Es una landing de una sola página con secciones ancla: `#inicio`, `#nosotros`, `#eventos`, `#galeria`, `#contacto`. El contacto principal es WhatsApp (`wa.me/5215536476032`).

## Stack

- Sitio estático servido desde la raíz del repo (`netlify.toml`, sin build). HTML semántico + `css/` + `js/` + `img/` + `fonts/` en la raíz. Hoy `index.html` contiene **todas las secciones** (inicio, nosotros, eventos, qué incluye, galería, reseñas, ubicación, contacto; `noindex` provisional), con tokens de `docs/diseno.md`.
- **`referencia/`** contiene el build anterior (`index.html`, `assets/main-*.js|css` compilados con Vite + Tailwind, `images/`, `fonts/`, `icons/`, `manifest.json`), funcional y `noindex`. Es solo referencia de diseño y contenido; el código fuente original no existe en el repo. No se borra nada de ahí sin aprobación.
- **Identidad:** se conserva y se optimiza (paleta malva/lavanda/marfil, logo “Jardín Cristel” y títulos en script caligráfico, acuarelas florales y arcos). Ver `docs/diseno.md`.
- **Logo y tipografía (decisión #10, resuelta con condición):** el logo será SVG; `img/logo.svg` es un marcador con la imagen actual del logo (`role="img"`, `aria-label="Jardín Cristel"`) hasta que el cliente compre la licencia Desktop. H1 y H2 usan **Pinyon Script (OFL)** en `fonts/pinyon-script-400.woff2` (temporal). **Nunca vectorizar ni desplegar `Berthold-Script.ttf`** (ya se retiró de `referencia/fonts/`; sigue en el historial de git). Merriweather es OFL.
- Analítica: Google Tag Manager / gtag (`G-DNF30KJ0Y7`), cargado desde `index.html`.
- Sin build, sin `package.json`. Para revisar localmente basta un servidor estático (p. ej. `npx serve .`).

## Enfoque Mobile First

- Diseñar y medir primero para móvil; escritorio es una mejora progresiva.
- El benchmark principal es Lighthouse en móvil (Performance, LCP, CLS, TBT).
- Imágenes responsivas (versiones `-mobile`), tamaños explícitos, `loading="lazy"` fuera del primer viewport.
- Áreas táctiles amplias, contraste AA, foco visible.

## Reglas de trabajo

- Trabajar **solo en la rama `modernizacion`**. Nunca hacer cambios ni push a `main`.
- Commits pequeños y en español, con prefijo: `feat:`, `fix:`, `perf:`, `docs:`, `style:`.
- **No borrar assets sin preguntar primero** (imágenes, fuentes, iconos, etc.).
- Hook de git: `.githooks/post-commit` agrega cada commit al "Registro de commits" de `docs/BITACORA.md`. Se activa con `git config core.hooksPath .githooks` (la config no se versiona; ejecutarla tras clonar).
- **No mergear a `main` sin el SVG final y la licencia confirmada.**
- **Sin frameworks CSS ni bundlers.** Todo cambio al sitio se hace desde Claude Code en terminal.
- Al terminar cada tarea, agrega una entrada en docs/BITACORA.md con fecha, qué se hizo, por qué, archivos tocados, decisiones y pendientes.

## Documentación

- `docs/BITACORA.md`: bitácora de entradas por tarea + registro automático de commits.
- `docs/benchmark/baseline/`: reportes Lighthouse (HTML/JSON) del estado inicial.
- `docs/benchmark/hallazgos.md`: hallazgos priorizados (matriz impacto/esfuerzo).
- `docs/benchmark/competencia.md`: benchmark competitivo.
- `docs/inventario.md`: textos, imágenes, paleta, tipografías, enlaces y analítica del sitio de referencia.
- `docs/propuesta.md`: arquitectura, plan por bloques, hallazgos, experiencia por dispositivo y decisiones.
- `docs/medicion.md`: plan de medición (GA4, Clarity, Search Console, UTM, aviso de privacidad); se integra en el bloque 7.
- `docs/diseno.md`: sistema de diseño optimizado (tokens, imágenes, sin modales, acuarelas, imágenes IA).
- `docs/imagenes.md`: catálogo de cada imagen de `referencia/` con el cambio propuesto.
- `tools/contraste.mjs`: verifica los contrastes WCAG de la paleta (`node tools/contraste.mjs`).
