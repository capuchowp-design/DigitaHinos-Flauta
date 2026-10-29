# DigitaHinos Flauta

**DigitaHinos Flauta** - 480 hinos e visualizador MIDI com flauta transversal animada. 100% gratuito.

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
