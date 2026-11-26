// ===== CONFIGURAÇÃO DO MODO PRO — edite só este arquivo =====
window.PRO_CFG = {
  modo: 'pix',                                  // 'pix' = site (PWA) e APK | 'play' = versão da Google Play (o workflow define sozinho)
  produtoId: 'pro_desbloqueio',                 // ID do produto criado na Play Console (só vale no modo 'play')
  app: 'flute',                                 // nome do app na planilha (gere os códigos com app = flute)
  scriptUrl: 'https://script.google.com/macros/s/AKfycbwx_CEnVMpRdDSI1mkXNNoLwQLf0X_0gCHZRuWYfosaGGJUz3bxhFyc-zOviWb64sVH/exec',   // URL /exec do Apps Script (a mesma do Trompete e da Tuba)
  pixKey: 'meuidwp@duck.com',                   // chave Pix (e-mail)
  pixName: 'WESLEY PHILIP A CAPUCHO',           // nome do recebedor (até 25 letras, sem acento)
  pixCity: 'SAO SEBASTIAO',                     // cidade (até 15 letras, sem acento)
  price: 19.90,                                 // valor em reais
  whatsapp: '5512974087661',                    // WhatsApp (com 55 + DDD) para receber o comprovante
  freeHinos: 50,                                // hinos 1 a N completos no modo grátis (site/PWA e APK, sem anúncio)
  freeHinosPlay: 10,                            // idem na versão da Google Play (lá há o anúncio para liberar 1 hino por 1 h)
  previewSec: 15,                               // segundos de prévia nos demais hinos
  playCompra: true,                             // Play: mostrar também o botão "Comprar Pro" (Google Play Billing). false = só anúncio
  adRewardedId: 'ca-app-pub-4518875317226768/4870573245',  // bloco PREMIADO do AdMob da Flauta (só vale no modo 'play')
  adHoras: 1                                    // horas de hino liberado ao assistir o anúncio
};
