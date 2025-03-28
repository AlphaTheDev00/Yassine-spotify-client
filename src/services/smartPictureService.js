/**
 * Smart Picture Service
 * 
 * This service provides intelligent image selection based on content type and metadata.
 * It uses a combination of predefined genre-based images and dynamic image generation
 * to ensure all content has visually appealing and contextually relevant imagery.
 */

// Map of music genres to thematic image collections
const genreImageMap = {
  pop: [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745'
  ],
  rock: [
    'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc'
  ],
  jazz: [
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
    'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f'
  ],
  classical: [
    'https://images.unsplash.com/photo-1507924538820-ede94a04019d',
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6',
    'https://images.unsplash.com/photo-1566913485242-694e995639db'
  ],
  electronic: [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742',
    'https://images.unsplash.com/photo-1571330735066-03aaa9429d89'
  ],
  hiphop: [
    'https://images.unsplash.com/photo-1547355253-ff0740f6e8c1',
    'https://images.unsplash.com/photo-1512036666432-2181c1f26420',
    'https://images.unsplash.com/photo-1520872024865-3ff2805d8bb3'
  ],
  rnb: [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    'https://images.unsplash.com/photo-1551740994-c82f894ecd13'
  ],
  country: [
    'https://images.unsplash.com/photo-1543872084-c7bd3822856f',
    'https://images.unsplash.com/photo-1605015239913-ded15e598ab0',
    'https://images.unsplash.com/photo-1605806616949-59175538bc06'
  ],
  default: [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063'
  ]
};

// Random music-themed images collection
const musicThemedImages = [
  // Vinyl Records & Turntables
  'https://images.unsplash.com/photo-1461360228754-6e81c478b882',
  'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1',
  'https://images.unsplash.com/photo-1527269534026-c86f4009eace',
  'https://images.unsplash.com/photo-1542208998-f2e9a5bf1b09',
  
  // Music Production & Studios
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0',
  'https://images.unsplash.com/photo-1598653222000-6b7b7a552625',
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89',
  
  // Musical Instruments
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76',
  'https://images.unsplash.com/photo-1447160430190-9d1cae0b73db',
  'https://images.unsplash.com/photo-1445985543470-41fba5c3144a',
  
  // Concerts & Live Music
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
  
  // Headphones & Listening
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
  
  // Abstract Music Visuals
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
  'https://images.unsplash.com/photo-1459305272254-33a7d593a851',
  
  // Music Notation & Sheets
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76',
  'https://images.unsplash.com/photo-1465847899084-d164df4dedc6',
  'https://images.unsplash.com/photo-1570294646112-27ce4f174e38',
  'https://images.unsplash.com/photo-1593697972672-b1c1362d780b'
];

// Mood-based image collections
const moodImageMap = {
  happy: [
    'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806',
    'https://images.unsplash.com/photo-1542810634-71277d95dcbb',
    'https://images.unsplash.com/photo-1520052205864-92d242b3a76c'
  ],
  sad: [
    'https://images.unsplash.com/photo-1516981879613-9f5da904015f',
    'https://images.unsplash.com/photo-1499377193864-82682aefed04',
    'https://images.unsplash.com/photo-1494368308039-ed3393a402a4'
  ],
  energetic: [
    'https://images.unsplash.com/photo-1535223289827-42f1e9919769',
    'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
  ],
  calm: [
    'https://images.unsplash.com/photo-1506259091721-347e791bab0f',
    'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba'
  ]
};

// Get a random image from an array
const getRandomImage = (images) => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

// Format image URL with size parameters
const formatImageUrl = (url, width = 300, height = 300, quality = 80) => {
  // For Unsplash images, we can add size parameters
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&q=${quality}&fit=crop&crop=faces,center`;
  }
  
  // For Picsum photos, we can specify size directly
  if (url.includes('picsum.photos')) {
    return `https://picsum.photos/id/${url.split('/id/')[1].split('/')[0]}/${width}/${height}`;
  }
  
  // For other URLs, return as is
  return url;
};

/**
 * Get a random music-themed image
 * @param {number} width - Desired image width
 * @param {number} height - Desired image height
 * @returns {string} - The image URL
 */
export const getRandomMusicImage = (width = 300, height = 300) => {
  const imageUrl = getRandomImage(musicThemedImages);
  return formatImageUrl(imageUrl, width, height);
};

/**
 * Get a smart image for a song based on its metadata
 * @param {Object} song - The song object
 * @param {number} width - Desired image width
 * @param {number} height - Desired image height
 * @returns {string} - The image URL
 */
export const getSmartSongImage = (song, width = 300, height = 300) => {
  // If song already has a valid image, use it
  if (song.cover_Image && song.cover_Image.trim() !== "" && !song.cover_Image.includes('default')) {
    return formatImageUrl(song.cover_Image, width, height);
  }
  
  if (song.imageUrl && song.imageUrl.trim() !== "" && !song.imageUrl.includes('default')) {
    return formatImageUrl(song.imageUrl, width, height);
  }
  
  // Otherwise, select an image based on genre
  const genre = (song.genre || '').toLowerCase();
  
  // Check if we have images for this genre
  let imageCollection;
  if (genre && genreImageMap[genre]) {
    imageCollection = genreImageMap[genre];
  } else {
    // Try to match partial genre names
    const matchedGenre = Object.keys(genreImageMap).find(key => 
      genre.includes(key) || key.includes(genre)
    );
    
    imageCollection = matchedGenre 
      ? genreImageMap[matchedGenre] 
      : musicThemedImages; // Use music-themed images as fallback
  }
  
  // Get a random image from the collection
  const imageUrl = getRandomImage(imageCollection);
  return formatImageUrl(imageUrl, width, height);
};

/**
 * Get a smart image for a playlist based on its metadata
 * @param {Object} playlist - The playlist object
 * @param {number} width - Desired image width
 * @param {number} height - Desired image height
 * @returns {string} - The image URL
 */
export const getSmartPlaylistImage = (playlist, width = 300, height = 300) => {
  // If playlist already has a valid image, use it
  if (playlist.coverImage && playlist.coverImage.trim() !== "") {
    return formatImageUrl(playlist.coverImage, width, height);
  }
  
  // If playlist has a name that suggests a mood, use mood-based image
  const name = (playlist.name || '').toLowerCase();
  const moodKeys = Object.keys(moodImageMap);
  
  for (const mood of moodKeys) {
    if (name.includes(mood)) {
      const imageUrl = getRandomImage(moodImageMap[mood]);
      return formatImageUrl(imageUrl, width, height);
    }
  }
  
  // Default to a random music image
  return getRandomMusicImage(width, height);
};

/**
 * Get a smart profile image for a user
 * @param {Object} user - The user object
 * @param {number} width - Desired image width
 * @param {number} height - Desired image height
 * @returns {string} - The image URL
 */
export const getSmartProfileImage = (user, width = 300, height = 300) => {
  // If user already has a valid profile image, use it
  if (user.profileImage && user.profileImage.trim() !== "") {
    return formatImageUrl(user.profileImage, width, height);
  }
  
  // Generate a unique but consistent avatar based on user ID or username
  const seed = user._id || user.username || Math.random().toString();
  return `https://avatars.dicebear.com/api/personas/${seed}.svg?width=${width}&height=${height}`;
};

export default {
  getSmartSongImage,
  getSmartPlaylistImage,
  getSmartProfileImage,
  getRandomMusicImage
};
