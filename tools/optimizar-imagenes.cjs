// Genera los derivados de imagen del piloto (AVIF + WebP en el hero; WebP en eventos) a partir de las imágenes de referencia/.
// Herramienta manual (NO es un paso de build): sus resultados se versionan en img/.
//
// Uso (sharp no es dependencia del repo; se instala fuera, p. ej. en una carpeta temporal):
//   NODE_PATH=<carpeta con node_modules/sharp> node tools/optimizar-imagenes.cjs
//
// Hero:   referencia/images/hero.webp (1728x1080) -> escritorio 960/1600 px y recorte vertical 4:5 de móvil 480/800 px.
// Eventos: referencia/images/<evento>.webp (530x386, provisionales) -> se copian en WebP (los AVIF no ahorran peso con orígenes de 530 px).

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const origen = (f) => path.join(RAIZ, 'referencia', 'images', f);
const destino = (...p) => path.join(RAIZ, 'img', ...p);

const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 78, effort: 6 };

async function derivados(entrada, salidaBase, anchos, extra = (s) => s) {
  for (const w of anchos) {
    const base = extra(sharp(entrada)).resize({ width: w });
    await base.clone().avif(AVIF).toFile(`${salidaBase}-${w}.avif`);
    await base.clone().webp(WEBP).toFile(`${salidaBase}-${w}.webp`);
  }
}

(async () => {
  fs.mkdirSync(destino('hero'), { recursive: true });
  fs.mkdirSync(destino('eventos'), { recursive: true });

  // Hero escritorio/tablet: 16:10 completo
  await derivados(origen('hero.webp'), destino('hero', 'hero-d'), [960, 1600]);

  // Hero móvil: recorte vertical 4:5 centrado en la pérgola (columna izquierda/central de la foto)
  await derivados(origen('hero.webp'), destino('hero', 'hero-m'), [480, 800],
    (s) => s.extract({ left: 242, top: 0, width: 864, height: 1080 }));

  // Eventos (provisionales de 530x386): solo WebP tal cual (AVIF no reduce el peso con estas fuentes pequeñas)
  for (const e of ['bautizo', 'comunion', 'xv', 'boda', 'graduacion', 'empresarial']) {
    fs.copyFileSync(origen(`${e}.webp`), destino('eventos', `${e}.webp`));
  }

  // Nosotros, galería y mapa (provisionales de la referencia): WebP tal cual
  for (const [dir, archivos] of [['nosotros', ['nosotros']], ['galeria', ['galeria01', 'galeria02', 'galeria03', 'galeria04', 'galeria05', 'galeria06']], ['ubicacion', ['maps']]]) {
    fs.mkdirSync(destino(dir), { recursive: true });
    for (const f of archivos) fs.copyFileSync(origen(`${f}.webp`), destino(dir, `${f}.webp`));
  }

  const lista = [...fs.readdirSync(destino('hero')).map((f) => `hero/${f}`), ...fs.readdirSync(destino('eventos')).map((f) => `eventos/${f}`)];
  for (const f of lista) console.log(String(fs.statSync(destino(f)).size).padStart(7), f);
})();
