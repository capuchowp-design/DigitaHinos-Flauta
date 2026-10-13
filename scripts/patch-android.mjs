// Ajusta o projeto Android gerado pelo Capacitor: versão, ícones, tela de abertura.
// Roda depois de "npx cap add android". Se algo não for encontrado, para com erro.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const fail = (m) => { console.error('ERRO: ' + m); process.exit(1); };
const RES = 'android/app/src/main/res';
if (!fs.existsSync(RES)) fail('Pasta android não encontrada. Rode "npx cap add android" antes.');

const versionCode = parseInt(process.env.VERSION_CODE || '1', 10);
const versionName = (process.env.VERSION_NAME || '1.0.0').replace(/[^0-9A-Za-z._-]/g, '');
if (!Number.isInteger(versionCode) || versionCode < 1) fail('VERSION_CODE inválido.');

// ---- 1) Versão ----
const gradlePath = 'android/app/build.gradle';
let g = fs.readFileSync(gradlePath, 'utf8');
if (!/versionCode \d+/.test(g) || !/versionName "[^"]*"/.test(g)) fail('versionCode/versionName não encontrados no build.gradle.');
g = g.replace(/versionCode \d+/, 'versionCode ' + versionCode).replace(/versionName "[^"]*"/, 'versionName "' + versionName + '"');
fs.writeFileSync(gradlePath, g);

// ---- 2) Ícones (a partir do icon-512x512.png do repositório) ----
const SRC = 'icon-512x512.png';
if (!fs.existsSync(SRC)) fail('icon-512x512.png não encontrado.');
const C1 = '#F7A024', C2 = '#FF5A2A'; // cores do degradê do ícone
const gradSvg = (s) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C1}"/><stop offset="1" stop-color="${C2}"/></linearGradient></defs><rect width="${s}" height="${s}" fill="url(#g)"/></svg>`);
const circleSvg = (s) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#fff"/></svg>`);

async function iconLayer(size, scale) { // ícone redimensionado, centralizado, fundo transparente
  const inner = Math.round(size * scale);
  const icon = await sharp(SRC).resize(inner, inner).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: icon, gravity: 'center' }]).png().toBuffer();
}
const dens = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
for (const [d, f] of Object.entries(dens)) {
  const dir = path.join(RES, 'mipmap-' + d);
  const legacy = Math.round(48 * f), adaptive = Math.round(108 * f);
  // adaptive: frente (ícone a 80%) e fundo (degradê)
  fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), await iconLayer(adaptive, 0.8));
  fs.writeFileSync(path.join(dir, 'ic_launcher_background.png'), await sharp(gradSvg(adaptive)).png().toBuffer());
  // legado: quadrado arredondado (o próprio ícone) e redondo
  fs.writeFileSync(path.join(dir, 'ic_launcher.png'), await sharp(SRC).resize(legacy, legacy).png().toBuffer());
  const flat = await sharp(gradSvg(legacy)).composite([{ input: await iconLayer(legacy, 0.84) }]).png().toBuffer();
  fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'),
    await sharp(flat).composite([{ input: circleSvg(legacy), blend: 'dest-in' }]).png().toBuffer());
}
for (const n of ['ic_launcher', 'ic_launcher_round']) {
  fs.writeFileSync(path.join(RES, 'mipmap-anydpi-v26', n + '.xml'),
`<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@mipmap/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`);
}

// ---- 3) Tela de abertura: fundo escuro com o ícone (troca o logo padrão do Capacitor) ----
for (const e of fs.readdirSync(RES)) {
  if (!/^drawable/.test(e)) continue;
  const p = path.join(RES, e, 'splash.png');
  if (fs.existsSync(p)) fs.rmSync(p);
}
fs.mkdirSync(path.join(RES, 'drawable'), { recursive: true });
fs.writeFileSync(path.join(RES, 'drawable', 'splash.xml'),
`<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item><shape android:shape="rectangle"><solid android:color="#0F0D0A"/></shape></item>
    <item android:gravity="center"><bitmap android:gravity="center" android:src="@mipmap/ic_launcher"/></item>
</layer-list>
`);
const stylesPath = path.join(RES, 'values', 'styles.xml');
let st = fs.readFileSync(stylesPath, 'utf8');
if (!st.includes('AppTheme.NoActionBarLaunch')) fail('Tema de abertura não encontrado no styles.xml.');
if (!st.includes('windowSplashScreenBackground')) {
  st = st.replace(/(<style name="AppTheme\.NoActionBarLaunch"[^>]*>)/, '$1\n        <item name="windowSplashScreenBackground">#0F0D0A</item>');
  fs.writeFileSync(stylesPath, st);
}
console.log(`OK. versionCode=${versionCode} versionName=${versionName}; ícones e abertura ajustados.`);
