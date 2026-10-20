// Verifica los contrastes WCAG 2.x de los tokens de docs/diseno.md y escribe la tabla en Markdown.
// Uso: node tools/contraste.mjs   (no es un paso de build; se corre a mano al cambiar la paleta)

const c = {
  'malva-50': '#f7f2f7',
  'malva-400': '#b76e79',
  'malva-500': '#a0505c',
  'malva-600': '#8f4752',
  'malva-900': '#49242a',
  'lavanda-700': '#855185',
  'lavanda-800': '#6c426c',
  'lavanda-900': '#482c48',
  'marfil-50': '#fffff6',
  'marfil-200': '#fffee3',
  'marfil-400': '#fffdd0',
  'pizarra-900': '#3d464f',
};

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(c[a]), lum(c[b])];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

// [primer plano, fondo, uso, mínimo requerido, tipo]
const AA_TEXTO = 4.5;
const AA_GRANDE = 3; // texto >= 24 px (o >= 18.66 px en negrita) y componentes de interfaz / foco
const pares = [
  ['marfil-50', 'malva-500', 'Texto del header, footer y barra CTA sobre malva-500', AA_TEXTO, 'texto'],
  ['marfil-50', 'malva-600', 'Texto sobre malva-500 en :hover (malva-600)', AA_TEXTO, 'texto'],
  ['marfil-50', 'lavanda-800', 'Botón primario (reposo)', AA_TEXTO, 'texto'],
  ['marfil-50', 'lavanda-700', 'Botón primario :hover', AA_TEXTO, 'texto'],
  ['marfil-50', 'lavanda-900', 'Botón primario :active', AA_TEXTO, 'texto'],
  ['pizarra-900', 'marfil-50', 'Texto de cuerpo sobre marfil-50', AA_TEXTO, 'texto'],
  ['pizarra-900', 'marfil-200', 'Texto de cuerpo sobre marfil-200 (eventos)', AA_TEXTO, 'texto'],
  ['pizarra-900', 'marfil-400', 'Texto de cuerpo sobre marfil-400 (contacto)', AA_TEXTO, 'texto'],
  ['pizarra-900', 'malva-50', 'Texto de cuerpo sobre malva-50 (galería, tarjetas)', AA_TEXTO, 'texto'],
  ['malva-900', 'malva-50', 'Enlaces y bordes oscuros sobre malva-50', AA_TEXTO, 'texto'],
  ['malva-600', 'marfil-50', 'Enlaces de texto malva-600 sobre marfil-50', AA_TEXTO, 'texto'],
  ['malva-600', 'marfil-200', 'Enlaces de texto malva-600 sobre marfil-200', AA_TEXTO, 'texto'],
  ['malva-600', 'marfil-400', 'Enlaces de texto malva-600 sobre marfil-400', AA_TEXTO, 'texto'],
  ['malva-600', 'malva-50', 'Enlaces de texto malva-600 sobre malva-50', AA_TEXTO, 'texto'],
  ['malva-400', 'marfil-50', 'Títulos ≥ 24 px malva-400 sobre marfil-50', AA_GRANDE, 'texto grande'],
  ['malva-400', 'marfil-200', 'Títulos ≥ 24 px malva-400 sobre marfil-200', AA_GRANDE, 'texto grande'],
  ['malva-400', 'marfil-400', 'Títulos ≥ 24 px malva-400 sobre marfil-400', AA_GRANDE, 'texto grande'],
  ['malva-400', 'malva-50', 'Títulos ≥ 24 px malva-400 sobre malva-50', AA_GRANDE, 'texto grande'],
  ['malva-500', 'marfil-50', 'Foco 2 px malva-500 sobre marfil-50', AA_GRANDE, 'componente'],
  ['malva-500', 'marfil-200', 'Foco 2 px malva-500 sobre marfil-200', AA_GRANDE, 'componente'],
  ['malva-500', 'marfil-400', 'Foco 2 px malva-500 sobre marfil-400', AA_GRANDE, 'componente'],
  ['malva-500', 'malva-50', 'Foco 2 px malva-500 sobre malva-50', AA_GRANDE, 'componente'],
  ['marfil-50', 'malva-500', 'Foco sobre superficies malva-500 (header/footer/barra): anillo marfil-50', AA_GRANDE, 'componente'],
  ['lavanda-800', 'marfil-50', 'Botón secundario (contorno y texto lavanda-800) sobre marfil-50', AA_TEXTO, 'texto'],
  ['lavanda-800', 'malva-50', 'Botón secundario (contorno y texto lavanda-800) sobre malva-50', AA_TEXTO, 'texto'],
];

const fila = ([fg, bg, uso, min, tipo]) => {
  const r = ratio(fg, bg);
  return `| ${uso} | \`${fg}\` ${c[fg]} | \`${bg}\` ${c[bg]} | ${r.toFixed(2)}:1 | ≥ ${min}:1 (${tipo}) | ${r >= min ? '✔' : '✘'} |`;
};

console.log('| Uso | Primer plano | Fondo | Contraste | Requerido | AA |');
console.log('|---|---|---|---|---|---|');
let fallos = 0;
for (const p of pares) {
  console.log(fila(p));
  if (ratio(p[0], p[1]) < p[3]) fallos++;
}
console.error(`\n${pares.length} pares, ${fallos} fallos`);
process.exitCode = fallos ? 1 : 0;
