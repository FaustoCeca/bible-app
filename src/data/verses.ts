export interface BibleVerse {
  reference: string;
  text: string;
}

/**
 * Pequeño corpus inicial (RVR1960, dominio público).
 * Podés ampliar esta lista a cientos o miles de versículos; el servicio
 * `dailyVerse` elige uno distinto cada día de forma determinista.
 */
export const VERSES: BibleVerse[] = [
  {
    reference: 'Juan 3:16',
    text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
  },
  {
    reference: 'Salmos 23:1',
    text: 'Jehová es mi pastor; nada me faltará.',
  },
  {
    reference: 'Filipenses 4:13',
    text: 'Todo lo puedo en Cristo que me fortalece.',
  },
  {
    reference: 'Proverbios 3:5-6',
    text: 'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.',
  },
  {
    reference: 'Isaías 41:10',
    text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.',
  },
  {
    reference: 'Romanos 8:28',
    text: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.',
  },
  {
    reference: 'Jeremías 29:11',
    text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.',
  },
  {
    reference: 'Mateo 11:28',
    text: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.',
  },
  {
    reference: 'Salmos 46:1',
    text: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.',
  },
  {
    reference: '1 Corintios 13:4-5',
    text: 'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor.',
  },
  {
    reference: 'Josué 1:9',
    text: '¿No te he mandado que te esfuerces y seas valiente? No temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.',
  },
  {
    reference: 'Santiago 1:2-3',
    text: 'Hermanos míos, tened por sumo gozo cuando os halléis en diversas pruebas, sabiendo que la prueba de vuestra fe produce paciencia.',
  },
  {
    reference: 'Salmos 91:1-2',
    text: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.',
  },
  {
    reference: 'Mateo 6:33',
    text: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.',
  },
  {
    reference: 'Efesios 2:8-9',
    text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.',
  },
  {
    reference: 'Gálatas 5:22-23',
    text: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.',
  },
  {
    reference: 'Salmos 119:105',
    text: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.',
  },
  {
    reference: 'Hebreos 11:1',
    text: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.',
  },
  {
    reference: '2 Timoteo 1:7',
    text: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.',
  },
  {
    reference: 'Apocalipsis 3:20',
    text: 'He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.',
  },
  {
    reference: 'Romanos 12:2',
    text: 'No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.',
  },
  {
    reference: 'Salmos 37:4',
    text: 'Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.',
  },
  {
    reference: '1 Pedro 5:7',
    text: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.',
  },
  {
    reference: 'Mateo 5:16',
    text: 'Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos.',
  },
  {
    reference: 'Juan 14:6',
    text: 'Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.',
  },
  {
    reference: 'Lamentaciones 3:22-23',
    text: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
  },
  {
    reference: 'Salmos 27:1',
    text: 'Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?',
  },
  {
    reference: 'Colosenses 3:23',
    text: 'Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.',
  },
  {
    reference: '1 Juan 4:19',
    text: 'Nosotros le amamos a él, porque él nos amó primero.',
  },
  {
    reference: 'Miqueas 6:8',
    text: 'Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.',
  },
];
