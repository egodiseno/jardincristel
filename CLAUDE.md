# CLAUDE.md

Guía para Claude Code (claude.ai/code) en este repositorio.

## Proyecto

Sitio web de **Jardín Cristel**, jardín para eventos (bodas, XV años, bautizos, comuniones, graduaciones y eventos empresariales) en Tepotzotlán, Estado de México. En producción en https://jardincristel.mx (Netlify; `www` redirige 301 al dominio sin `www`).

Es una landing de una sola página con secciones ancla: `#inicio`, `#nosotros`, `#eventos`, `#galeria`, `#contacto`. El contacto principal es WhatsApp (`wa.me/5215536476032`).

## Stack

- Sitio estático servido desde la raíz del repo (`index.html`).
- `assets/main-*.js` y `assets/main-*.css` son **artefactos compilados** (aparentemente Vite + Tailwind, con hash en el nombre). El código fuente original **no está en este repo**; el HTML de la página se genera desde el JS.
- Imágenes en `images/` (WebP, salvo `meta.jpg` y `x.jpg` para redes), fuentes locales TTF en `fonts/` (Berthold Script, Merriweather), iconos y favicons en `icons/`.
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
- Al terminar cada tarea, agrega una entrada en docs/BITACORA.md con fecha, qué se hizo, por qué, archivos tocados, decisiones y pendientes.

## Documentación

- `docs/BITACORA.md`: bitácora de entradas por tarea + registro automático de commits.
- `docs/benchmark/baseline/`: reportes Lighthouse (HTML/JSON) del estado inicial.
- `docs/benchmark/hallazgos.md`: hallazgos priorizados (matriz impacto/esfuerzo).
