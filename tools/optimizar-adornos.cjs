// Genera los adornos acuarelados (AVIF + WebP con transparencia) recortando racimos de las acuarelas de referencia/.
// Herramienta manual (NO es un paso de build): sus resultados se versionan en img/adornos/.
//
// Uso (sharp no es dependencia del repo; se instala fuera, p. ej. en una carpeta temporal):
//   NODE_PATH=<carpeta con node_modules/sharp> node tools/optimizar-adornos.cjs
//
// Cada pieza es un recorte al racimo (coordenadas medidas por alfa sobre el lienzo original, ver docs/imagenes.md §2)
// reducido al ancho de render de escritorio (en px CSS) x ESCALA (1 por omisión) para conservar nitidez sin pagar el lienzo completo.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const origen = (f) => path.join(RAIZ, 'referencia', 'images', f);
const destino = (...p) => path.join(RAIZ, 'img', 'adornos', ...p);

const AVIF = { quality: 46, effort: 6 };
const WEBP = { quality: 68, effort: 6, alphaQuality: 80 };

// nombre: [archivo origen, left, top, ancho, alto, ancho de render en px CSS (escritorio), opciones]
// opciones.flop: voltea la pieza en horizontal (así un recorte de esquina izquierda sirve para la derecha sin transform en CSS)
const PIEZAS = {
  'hero-esquina':   ['bg-nosotros-right.webp', 1216, 362, 704, 579, 420],
  'eventos-sup-izq': ['bg-eventos-top.webp', 0, 1, 172, 259, 130],
  'eventos-sup-der': ['bg-eventos-top.webp', 557, 1, 287, 196, 230],
  'eventos-inf-izq': ['bg-eventos-bottom.webp', 22, 1544, 796, 474, 400],
  'eventos-inf-der': ['bg-eventos-bottom.webp', 1358, 1412, 532, 590, 270],
  'incluye-izq':    ['bg-gallery-left.webp', 0, 19, 358, 990, 180],
  'incluye-der':    ['bg-gallery-right.webp', 1545, 29, 375, 1001, 190],
  'nosotros-izq':   ['bg-nosotros-left.webp', 0, 359, 318, 583, 170],
  'galeria-izq':    ['bg-footer-top.webp', 0, 10, 1038, 349, 420],
  'galeria-der':    ['bg-footer-top.webp', 1656, 0, 264, 655, 150],
  'contacto-inf-izq': ['bg-footer-bottom.webp', 0, 642, 800, 319, 440],
  'contacto-inf-der': ['bg-footer-bottom.webp', 1120, 642, 800, 319, 440],
  'divisor':        ['detail.webp', 4, 3, 247, 69, 247],
  // Reseñas: racimos de los lienzos móviles (no usados en otras secciones), volteados
  'resenas-sup-der': ['bg-gallery-top-mobile.webp', 0, 4, 399, 545, 150, { flop: true }],
  'resenas-inf-izq': ['bg-gallery-bottom-mobile.webp', 216, 1643, 909, 718, 380, { flop: true }],
};
const ESCALA = Number(process.env.ESCALA || 1);
const SOLO = process.env.SOLO ? process.env.SOLO.split(',') : null;   // p. ej. SOLO=resenas-sup-der,resenas-inf-izq regenera solo esas piezas

(async () => {
  fs.mkdirSync(destino(), { recursive: true });
  const filas = [];
  for (const [nombre, [f, left, top, width, height, render, opc = {}]] of Object.entries(PIEZAS)) {
    if (SOLO && !SOLO.includes(nombre)) continue;
    const ancho = Math.min(width, Math.round(render * ESCALA));
    let base = sharp(origen(f)).extract({ left, top, width, height });
    if (opc.flop) base = base.flop();
    base = base.resize({ width: ancho });
    const { height: alto } = await base.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
    await base.clone().avif(AVIF).toFile(destino(`${nombre}.avif`));
    await base.clone().webp(WEBP).toFile(destino(`${nombre}.webp`));
    filas.push(`${nombre}: ${ancho}x${alto}  avif ${fs.statSync(destino(`${nombre}.avif`)).size} B  webp ${fs.statSync(destino(`${nombre}.webp`)).size} B`);
  }
  console.log(filas.join('\n'));
})();
