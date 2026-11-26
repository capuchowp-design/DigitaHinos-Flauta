// Ajusta o projeto Android gerado pelo Capacitor: versão, ícones, tela de abertura.
// Roda depois de "npx cap add android". Se algo não for encontrado, para com erro.
import fs from 'node:fs';
import path from 'node:path';

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

// ---- 2) Ícones (prontos na pasta android-icons/, gerados a partir de design/icone-original.png) ----
for (const d of ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi']) {
  for (const f of ['ic_launcher', 'ic_launcher_round', 'ic_launcher_foreground', 'ic_launcher_background']) {
    const from = path.join('android-icons', 'mipmap-' + d, f + '.png');
    if (!fs.existsSync(from)) fail('Ícone não encontrado: ' + from);
    fs.copyFileSync(from, path.join(RES, 'mipmap-' + d, f + '.png'));
  }
}
fs.mkdirSync(path.join(RES, 'mipmap-anydpi-v26'), { recursive: true });
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
