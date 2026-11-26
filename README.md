# DigitaHinos Flauta

**DigitaHinos Flauta** - 480 hinos e visualizador MIDI com flauta transversal animada.

- **Player**: abra um MIDI e veja a flauta tocando, com a digitação (mão esquerda vermelha, direita verde), a nota na pauta e o nome em solfejo. Quando a nota tem outra digitação, ela aparece menor no canto; toque nela para trocar.
- **Partitura ao vivo e PDF**: no player, a partitura do hino acompanha a música (barra laranja e nota acesa) e dá para baixar em PDF, com 8va/8vb nas notas muito agudas ou graves.
- **Partitura**: editor em piano roll (vozes, acordes, articulações, ligaduras), com a digitação da nota selecionada.
- **Extensão**: exatamente a da tabela de digitação, de C4 a D7. Notas de MIDI fora dela são dobradas por oitava.
- **Som**: gravações reais de flauta (Versilian Studio, CC0) embutidas no `index.html` (tocadas na íntegra, com loop só no final); funciona offline.
- Tipos: flauta em dó, flautim e flauta alto em sol (mudam a nota escrita e, portanto, a digitação).

Publique todos os arquivos na raiz do repositório (GitHub Pages). A cada atualização, mude o número em `CACHE_NAME` do `sw.js`.

- Partitura (PDF e ao vivo): diagrama das chaves sob cada nota (vermelho = mão esquerda, verde = direita), pela altura escrita do tipo de flauta escolhido.
- Acidentes: a partitura usa a mesma grafia do hinário (ex.: Fá♯ continua Fá♯) e a armadura do arquivo, adaptada ao tipo de flauta (flautim / alto em Sol).
- Repetições: casas lidas pelo número impresso; a repetição volta até completar todas as passagens (casas 1.2. + 3. = 3 passagens).

## Modo Pro (bloqueio)
- Site/PWA e APK: hinos 1–50 grátis, demais 15 s de prévia; Pro por Pix + código na planilha (app = `flute`).
- Google Play: hinos 1–10 grátis, demais por anúncio premiado (1 h) ou Pro pela Play.
- Configuração em `pro-config.js`. Workflow: Actions → Gerar APK assinado → canal `apkpure` (.apk) ou `play` (.aab).

## Celulares fracos (modo leve) e áudio
- **Modo leve (⚡ no topo):** liga sozinho em celulares/aparelhos com pouca memória ou poucos núcleos. Desliga o reverb, tira os brilhos do desenho, limita a animação a ~30 quadros/s e reduz a resolução do canvas. O botão força ligado/desligado e guarda a escolha.
- **Áudio estável:** buffer grande ("playback"), notas entregues ao relógio do áudio a cada ~120 ms (1,5 s de antecedência) e relógio da animação descontando a latência de saída.
- **Diagnóstico:** segure o ⚡ por ~1 s para ver estado do áudio, travadas, quadros/s e trocar a dica de latência.
- **Tone.js local:** `vendor/Tone.js` (funciona offline; se faltar, baixa do CDN).

## Publicar na Google Play
- **Nome do pacote:** `capacitor.config.json` (campo `appId`). Edite antes do primeiro envio: não muda depois de publicado. A variável `APP_ID` do repositório, se existir, tem prioridade.
- **Anúncios:** troque `ADMOB_APP_ID` (workflow) e `adRewardedId` (`pro-config.js`) pelos IDs reais do AdMob da Flauta.
- **Secrets:** `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`.
- **Gerar:** Actions → Gerar APK assinado → `canal = play` (`.aab`).
- Páginas para a ficha da loja: `privacidade.html`, `terms.html`. `app-ads.txt` fica na raiz do site do desenvolvedor.
