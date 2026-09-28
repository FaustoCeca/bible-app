export interface BibleVerse {
  reference: string;
  text: string;
}

/**
 * Corpus de versículos en Reina-Valera 1909 (dominio público).
 *
 * `dailyVerse` elige uno distinto cada día de forma determinista
 * (dayIndex % VERSES.length), así que cuantos más versículos haya,
 * más tarda el ciclo en repetirse.
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
    text: 'Fíate de Jehová de todo tu corazón, y no estribes en tu prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.',
  },
  {
    reference: 'Isaías 41:10',
    text: 'No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo: siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.',
  },
  {
    reference: 'Romanos 8:28',
    text: 'Y sabemos que a los que a Dios aman, todas las cosas les ayudan a bien, es a saber, a los que conforme al propósito son llamados.',
  },
  {
    reference: 'Jeremías 29:11',
    text: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.',
  },
  {
    reference: 'Mateo 11:28',
    text: 'Venid a mí todos los que estáis trabajados y cargados, que yo os haré descansar.',
  },
  {
    reference: 'Salmos 46:1',
    text: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.',
  },
  {
    reference: '1 Corintios 13:4-5',
    text: 'La caridad es sufrida, es benigna; la caridad no tiene envidia, la caridad no hace sinrazón, no se ensancha; No es injuriosa, no busca lo suyo, no se irrita, no piensa el mal;',
  },
  {
    reference: 'Josué 1:9',
    text: 'Mira que te mando que te esfuerces y seas valiente: no temas ni desmayes, porque Jehová tu Dios será contigo en donde quiera que fueres.',
  },
  {
    reference: 'Santiago 1:2-3',
    text: 'Hermanos míos, tened por sumo gozo cuando cayereis en diversas tentaciones; Sabiendo que la prueba de vuestra fe obra paciencia.',
  },
  {
    reference: 'Salmos 91:1-2',
    text: 'El que habita al abrigo del Altísimo, morará bajo la sombra del Omnipotente. Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en él confiaré.',
  },
  {
    reference: 'Mateo 6:33',
    text: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.',
  },
  {
    reference: 'Efesios 2:8-9',
    text: 'Porque por gracia sois salvos por la fe; y esto no de vosotros, pues es don de Dios: No por obras, para que nadie se gloríe.',
  },
  {
    reference: 'Gálatas 5:22-23',
    text: 'Mas el fruto del Espíritu es: caridad, gozo, paz, tolerancia, benignidad, bondad, fe, Mansedumbre, templanza: contra tales cosas no hay ley.',
  },
  {
    reference: 'Salmos 119:105',
    text: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.',
  },
  {
    reference: 'Hebreos 11:1',
    text: 'Es pues la fe la sustancia de las cosas que se esperan, la demostración de las cosas que no se ven.',
  },
  {
    reference: '2 Timoteo 1:7',
    text: 'Porque no nos ha dado Dios el espíritu de temor, sino el de fortaleza, y de amor, y de templanza.',
  },
  {
    reference: 'Apocalipsis 3:20',
    text: 'He aquí, yo estoy a la puerta y llamo: si alguno oyere mi voz y abriere la puerta, entraré a él, y cenaré con él, y él conmigo.',
  },
  {
    reference: 'Romanos 12:2',
    text: 'Y no os conforméis a este siglo; mas reformaos por la renovación de vuestro entendimiento, para que experimentéis cuál sea la buena voluntad de Dios, agradable y perfecta.',
  },
  {
    reference: 'Salmos 37:4',
    text: 'Pon asimismo tu delicia en Jehová, y él te dará las peticiones de tu corazón.',
  },
  {
    reference: '1 Pedro 5:7',
    text: 'Echando toda vuestra solicitud en él, porque él tiene cuidado de vosotros.',
  },
  {
    reference: 'Mateo 5:16',
    text: 'Así alumbre vuestra luz delante de los hombres, para que vean vuestras obras buenas, y glorifiquen a vuestro Padre que está en los cielos.',
  },
  {
    reference: 'Juan 14:6',
    text: 'Jesús le dice: Yo soy el camino, y la verdad, y la vida: nadie viene al Padre, sino por mí.',
  },
  {
    reference: 'Lamentaciones 3:22-23',
    text: 'Es por la misericordia de Jehová que no somos consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
  },
  {
    reference: 'Salmos 27:1',
    text: 'Jehová es mi luz y mi salvación: ¿de quién temeré? Jehová es la fortaleza de mi vida: ¿de quién he de atemorizarme?',
  },
  {
    reference: 'Colosenses 3:23',
    text: 'Y todo lo que hagáis, hacedlo de ánimo, como al Señor, y no a los hombres;',
  },
  {
    reference: '1 Juan 4:19',
    text: 'Nosotros le amamos a él, porque él nos amó primero.',
  },
  {
    reference: 'Miqueas 6:8',
    text: 'Oh hombre, él te ha declarado qué sea lo bueno, y qué pida de ti Jehová: solamente hacer juicio, y amar misericordia, y humillarte para andar con tu Dios.',
  },
];
