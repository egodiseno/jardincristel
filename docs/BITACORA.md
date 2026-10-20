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

## Registro de commits

- 2026-10-20 12:17 `a19da90` docs: configuración inicial, bitácora, baseline Lighthouse y hallazgos
- 2026-10-20 12:26 `f09956c` docs: inventario del sitio actual y propuesta de reconstrucción
- 2026-10-20 12:39 `e03c554` docs: mover build actual a referencia y dejar esqueleto (bloque 0)
- 2026-10-20 12:39 `c695786` feat: esqueleto de carpetas, index provisional y netlify.toml (bloque 0)
