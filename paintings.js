// ─────────────────────────────────────────────────────────────────────────
//  THE COLLECTION — 10 masterpieces
//  Images are public-domain, downloaded locally into ./img/ (served offline).
//  Each "closeup" uses a normalized focus point (fx, fy) in 0..1 across the
//  source image; the gallery generates a magnified crop centered there.
// ─────────────────────────────────────────────────────────────────────────

export const PAINTINGS = [
  {
    id: 'mona-lisa',
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    meta: 'c. 1503–1519 · Oil on poplar panel · Louvre, Paris',
    img: './img/mona-lisa.jpg',
    desc: 'Arguably the most famous painting on Earth. Leonardo’s portrait of Lisa Gherardini is a triumph of sfumato — the smoke-like blending of tones that makes her expression shift the longer you look. He carried it with him for years, refining it endlessly, and never delivered it to the man who commissioned it.',
    facts: [
      'The enigmatic smile appears to change because Leonardo blurred the corners of her mouth and eyes, letting your peripheral vision “complete” the expression.',
      'There are no visible brushstrokes — Leonardo built up dozens of ultra-thin translucent glazes, some only a few microns thick.',
      'She has no eyebrows or eyelashes; whether they faded or were never painted is still debated.',
      'Stolen from the Louvre in 1911 by an Italian handyman, its two-year disappearance turned it into a global celebrity.'
    ],
    closeups: [
      { fx: 0.50, fy: 0.42, cap: 'The smile' },
      { fx: 0.43, fy: 0.30, cap: 'The eyes' },
      { fx: 0.50, fy: 0.78, cap: 'Folded hands' },
      { fx: 0.80, fy: 0.55, cap: 'Distant landscape' }
    ],
    color: '#6b5a3a'
  },
  {
    id: 'starry-night',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    meta: '1889 · Oil on canvas · Museum of Modern Art, New York',
    img: './img/starry-night.jpg',
    desc: 'Painted from the window of his room at the Saint-Rémy asylum, just before sunrise, from memory and imagination. Van Gogh rendered the night sky as a living, swirling current of energy — thick impasto strokes of blue and yellow that seem to breathe and rotate above a quiet village.',
    facts: [
      'Van Gogh painted it during a voluntary stay in an asylum, in a year he produced roughly 150 works.',
      'The swirling vortices in the sky bear an uncanny resemblance to mathematical models of turbulent fluid flow.',
      'The village below is largely invented — the church spire is more Dutch than Provençal, a memory of home.',
      'He thought little of it, calling it a “failure” in letters to his brother Theo.'
    ],
    closeups: [
      { fx: 0.30, fy: 0.30, cap: 'The great swirl' },
      { fx: 0.15, fy: 0.40, cap: 'The cypress tree' },
      { fx: 0.80, fy: 0.25, cap: 'Crescent moon' },
      { fx: 0.50, fy: 0.80, cap: 'The sleeping village' }
    ],
    color: '#1e3a5f'
  },
  {
    id: 'scream',
    title: 'The Scream',
    artist: 'Edvard Munch',
    meta: '1893 · Oil, tempera & pastel on cardboard · National Gallery, Oslo',
    img: './img/scream.jpg',
    desc: 'The defining image of modern anxiety. Munch described the moment of inspiration: walking at sunset, he “felt a great, infinite scream pass through nature.” The figure does not scream — it clasps its head, shielding itself from a scream coming from the blood-red sky itself.',
    facts: [
      'Munch made four versions; one sold for nearly $120 million in 2012, then a record at auction.',
      'A faint pencil inscription reads, “Can only have been painted by a madman” — confirmed in 2021 to be Munch’s own hand.',
      'The lurid red sky may reflect real skies — ash from the 1883 Krakatoa eruption tinted European sunsets for years.',
      'Two versions were famously stolen (1994 and 2004); both were later recovered.'
    ],
    closeups: [
      { fx: 0.40, fy: 0.30, cap: 'The hollow face' },
      { fx: 0.50, fy: 0.10, cap: 'Blood-red sky' },
      { fx: 0.75, fy: 0.20, cap: 'Figures on the bridge' },
      { fx: 0.20, fy: 0.60, cap: 'Swirling fjord' }
    ],
    color: '#8a3a1a'
  },
  {
    id: 'pearl-earring',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    meta: 'c. 1665 · Oil on canvas · Mauritshuis, The Hague',
    img: './img/pearl-earring.jpg',
    desc: 'Often called “the Dutch Mona Lisa,” this is not a portrait but a tronie — a study of a type, a face, an expression. A girl turns toward us out of pure darkness, lips parted as if to speak, the single pearl catching the light at her throat.',
    facts: [
      'The background was originally a deep green glaze that has darkened to black over the centuries.',
      'The “pearl” is an illusion — just two strokes of white paint and a soft reflection; it may have been polished glass.',
      'Vermeer used costly natural ultramarine, ground from lapis lazuli, for the luminous blue turban.',
      'There is no underdrawing — Vermeer composed directly with paint, possibly aided by a camera obscura.'
    ],
    closeups: [
      { fx: 0.45, fy: 0.40, cap: 'The gaze' },
      { fx: 0.58, fy: 0.60, cap: 'The pearl' },
      { fx: 0.40, fy: 0.55, cap: 'Parted lips' },
      { fx: 0.35, fy: 0.25, cap: 'The blue turban' }
    ],
    color: '#2a3a4a'
  },
  {
    id: 'birth-venus',
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    meta: 'c. 1485 · Tempera on canvas · Uffizi Gallery, Florence',
    img: './img/birth-venus.jpg',
    desc: 'The goddess of love arrives full-grown on the shore, born from sea foam, standing on a giant scallop shell. A landmark of the Italian Renaissance, it revived the monumental female nude from antiquity and wrapped it in poetic, weightless grace.',
    facts: [
      'Venus’s pose echoes the classical “Venus Pudica” — modestly shielding herself — from ancient Greek statues.',
      'Botticelli laced the surface with a touch of gold and used an unusually fine, plaster-light tempera on canvas, rare for the time.',
      'The west wind Zephyr and a nymph blow her to shore on the left; a Hora of Spring waits to clothe her on the right.',
      'It was likely painted for the Medici family — the most powerful patrons of the Florentine Renaissance.'
    ],
    closeups: [
      { fx: 0.45, fy: 0.30, cap: 'Venus’s face' },
      { fx: 0.45, fy: 0.85, cap: 'The scallop shell' },
      { fx: 0.12, fy: 0.30, cap: 'Zephyr, the west wind' },
      { fx: 0.85, fy: 0.45, cap: 'The Hora of Spring' }
    ],
    color: '#5a6a4a'
  },
  {
    id: 'great-wave',
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    meta: 'c. 1831 · Woodblock print · (Series: Thirty-six Views of Mount Fuji)',
    img: './img/great-wave.jpg',
    desc: 'The most famous image in all of Japanese art, and one of the most reproduced images on Earth. A colossal wave, its foam clawing like talons, towers over three slender fishing boats while a tiny, serene Mount Fuji sits far in the distance — dwarfed by the sea yet utterly still at the center of the chaos.',
    facts: [
      'It is a woodblock print, not a painting — thousands of impressions were pulled, which is why it spread across the world.',
      'The deep blue is Prussian blue, a then-new imported pigment that gave the print its striking, durable color.',
      'Hokusai made it in his seventies, as part of a series obsessively devoted to Mount Fuji from every angle.',
      'It shaped European art profoundly — Monet collected Hokusai prints, and Debussy kept this one while composing “La Mer.”'
    ],
    closeups: [
      { fx: 0.22, fy: 0.28, cap: 'The clawing crest' },
      { fx: 0.62, fy: 0.55, cap: 'Mount Fuji' },
      { fx: 0.40, fy: 0.62, cap: 'The fishing boats' },
      { fx: 0.15, fy: 0.45, cap: 'Foam like talons' }
    ],
    color: '#1f4a66'
  },
  {
    id: 'the-kiss',
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    meta: '1907–1908 · Oil & gold leaf on canvas · Belvedere, Vienna',
    img: './img/the-kiss.jpg',
    desc: 'The crowning work of Klimt’s “Golden Phase.” Two lovers kneel at the edge of a flowering meadow, wrapped in a single shimmering robe of gold. It fuses Byzantine mosaic, Art Nouveau ornament, and raw intimacy into one of the most reproduced images of love ever made.',
    facts: [
      'Klimt used real gold and silver leaf, inspired by the glittering Byzantine mosaics he saw in Ravenna.',
      'The man’s robe is patterned with hard rectangles; the woman’s with soft circles and flowers — a visual duet of masculine and feminine.',
      'The couple kneels at a perilous edge — a cliff of wildflowers — hinting that the embrace is both blissful and precarious.',
      'The Austrian state bought it straight off the easel in 1908; it has never left Vienna since.'
    ],
    closeups: [
      { fx: 0.50, fy: 0.22, cap: 'The kiss' },
      { fx: 0.40, fy: 0.45, cap: 'Golden robe' },
      { fx: 0.55, fy: 0.35, cap: 'Her face' },
      { fx: 0.45, fy: 0.85, cap: 'Meadow of flowers' }
    ],
    color: '#7a5a1a'
  },
  {
    id: 'water-lilies',
    title: 'Water Lilies (Nymphéas)',
    artist: 'Claude Monet',
    meta: 'c. 1916–1919 · Oil on canvas · (Series, various museums)',
    img: './img/water-lilies.jpg',
    desc: 'Monet painted his lily pond at Giverny some 250 times over the last 30 years of his life. There is no horizon, no shore — just the surface of the water, the floating lilies, and the sky reflected within it. It is Impressionism dissolving into pure abstraction.',
    facts: [
      'Monet designed and dug the water garden himself, then spent decades painting nothing else.',
      'In his final years he painted through cataracts; surgery later revealed he’d been seeing in shifted reds and yellows.',
      'The largest canvases were conceived as immersive, wraparound murals — now displayed in the oval rooms of the Orangerie in Paris.',
      'By erasing the horizon, Monet anticipated the all-over abstraction of painters decades later.'
    ],
    closeups: [
      { fx: 0.45, fy: 0.45, cap: 'A single lily' },
      { fx: 0.25, fy: 0.70, cap: 'Reflected sky' },
      { fx: 0.70, fy: 0.30, cap: 'Broken brushwork' },
      { fx: 0.55, fy: 0.80, cap: 'Water’s surface' }
    ],
    color: '#2a5a4a'
  },
  {
    id: 'night-watch',
    title: 'The Night Watch',
    artist: 'Rembrandt van Rijn',
    meta: '1642 · Oil on canvas · Rijksmuseum, Amsterdam',
    img: './img/night-watch.jpg',
    desc: 'Rembrandt’s vast group portrait of a civic militia company — and a revolution in the genre. Instead of a stiff row of faces, he caught the company in mid-action, surging forward out of shadow into light, banner raised, drum beating. It is theatre, motion, and the most dramatic use of light and dark in Dutch art.',
    facts: [
      'It is huge — nearly 12 by 14.5 feet (3.6 × 4.4 m), though it was once even larger before being trimmed in 1715.',
      'The “night” in its name is a mistake — centuries of grime darkened the varnish; it actually depicts broad daylight.',
      'Rembrandt was paid by each militiaman portrayed, yet boldly threw some into shadow for the sake of the composition.',
      'A mysterious little girl in glowing gold — carrying a dead chicken, a militia emblem — is the secret focal point.'
    ],
    closeups: [
      { fx: 0.34, fy: 0.45, cap: 'Captain Cocq in black' },
      { fx: 0.46, fy: 0.42, cap: 'The lieutenant in gold' },
      { fx: 0.30, fy: 0.55, cap: 'The glowing girl' },
      { fx: 0.70, fy: 0.30, cap: 'The raised banner' }
    ],
    color: '#3a2c18'
  },
  {
    id: 'las-meninas',
    title: 'Las Meninas',
    artist: 'Diego Velázquez',
    meta: '1656 · Oil on canvas · Museo del Prado, Madrid',
    img: './img/las-meninas.jpg',
    desc: 'One of the most analyzed paintings in Western art — a puzzle box of looking. Velázquez paints himself at a giant canvas, the little princess and her maids in the foreground, and the king and queen reflected in a mirror at the back. Who is watching whom? You, the viewer, stand exactly where the royal couple must be.',
    facts: [
      'Velázquez paints himself at work, brush in hand — and wears the red cross of the Order of Santiago, added after a later knighthood.',
      'The blurred figures of King Philip IV and Queen Mariana appear only as a reflection in a mirror on the far wall.',
      'The whole scene is structured around your viewpoint, placing you in the position of the king and queen being painted.',
      'Picasso was so obsessed he produced 58 reinterpretations of it in 1957.'
    ],
    closeups: [
      { fx: 0.45, fy: 0.55, cap: 'The Infanta Margarita' },
      { fx: 0.15, fy: 0.45, cap: 'Velázquez self-portrait' },
      { fx: 0.62, fy: 0.40, cap: 'The mirror' },
      { fx: 0.80, fy: 0.55, cap: 'Figure in the doorway' }
    ],
    color: '#4a3a2a'
  }
];
