// API utility for fetching emojis
// TODO: INSERT YOUR API NINJAS API KEY HERE
const API_KEY = "wLBJdBxQo/+mJen0VMYsZA==jwtCCpAhHs3HTQMt";
const BASE_URL = "https://api.api-ninjas.com/v1/emoji";

// Fetch emoji for a given keyword
export const fetchEmoji = async (keyword) => {
  try {
    const response = await fetch(`${BASE_URL}?name=${encodeURIComponent(keyword)}`, {
      headers: {
        'X-Api-Key': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the first emoji found, or a fallback
    if (data && data.length > 0) {
      return data[0].character;
    }
    
    // Fallback emojis for common keywords
    const fallbackEmojis = {
      'wizard': '🧙‍♂️',
      'ring': '💍',
      'volcano': '🌋',
      'spider': '🕷️',
      'man': '👨',
      'web': '🕸️',
      'star': '⭐',
      'wars': '⚔️',
      'lightsaber': '⚡',
      'bat': '🦇',
      'gotham': '🏙️',
      'iron': '🦾',
      'arc': '🏹',
      'harry': '👓',
      'potter': '🏺',
      'wand': '🪄',
      'jedi': '⚔️',
      'knight': '🤺',
      'force': '💫',
      'super': '🦸',
      'krypton': '🪐',
      'captain': '👨‍✈️',
      'america': '🇺🇸',
      'shield': '🛡️',
      'thor': '⚡',
      'hammer': '🔨',
      'asgard': '🏰'
    };
    
    return fallbackEmojis[keyword.toLowerCase()] || '❓';
  } catch (error) {
    console.error('Error fetching emoji:', error);
    
    // Return fallback emoji on error
    const fallbackEmojis = {
      'wizard': '🧙‍♂️',
      'ring': '💍',
      'volcano': '🌋',
      'spider': '🕷️',
      'man': '👨',
      'web': '🕸️',
      'star': '⭐',
      'wars': '⚔️',
      'lightsaber': '⚡',
      'bat': '🦇',
      'gotham': '🏙️',
      'iron': '🦾',
      'arc': '🏹',
      'harry': '👓',
      'potter': '🏺',
      'wand': '🪄',
      'jedi': '⚔️',
      'knight': '🤺',
      'force': '💫',
      'super': '🦸',
      'krypton': '🪐',
      'captain': '👨‍✈️',
      'america': '🇺🇸',
      'shield': '🛡️',
      'thor': '⚡',
      'hammer': '🔨',
      'asgard': '🏰'
    };
    
    return fallbackEmojis[keyword.toLowerCase()] || '❓';
  }
};

// Fetch emojis for multiple keywords
export const fetchEmojisForKeywords = async (keywords) => {
  const emojiPromises = keywords.map(keyword => fetchEmoji(keyword));
  const emojis = await Promise.all(emojiPromises);
  return emojis;
};
