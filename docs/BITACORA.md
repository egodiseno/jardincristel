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

## Registro de commits

