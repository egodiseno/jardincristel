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

## Registro de commits

- 2026-10-20 12:17 `a19da90` docs: configuración inicial, bitácora, baseline Lighthouse y hallazgos
