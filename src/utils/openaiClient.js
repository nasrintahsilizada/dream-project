// OpenAI client for generating travel tips
// NOTE: In production, this should call a serverless function to keep API key secure

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const PROMPTS = {
  facts: (place) => `Tell me 3 must-see places in ${place}. Keep each item to one sentence with specific details.`,
  etiquette: (place) => `What cultural etiquette should travelers know when visiting ${place}? Provide 3 specific bullet points.`,
  packing: (place) => `Suggest 3 essential items to pack for ${place} with brief reasons why they're important.`,
  thingsToDo: (place) => `What are 3 unique experiences or activities travelers should try in ${place}? Be specific and concise.`
};
export const getAiTips = async (place, type = 'facts') => {
  if (!place || place.trim() === '') {
    throw new Error('Place name is required');
  }

  const prompt = PROMPTS[type] ? PROMPTS[type](place) : PROMPTS.facts(place);

  // Check if API key is available
  if (!OPENAI_API_KEY) {
    console.warn('OpenAI API key not found. Returning mock data.');
    return getMockTips(place, type);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel assistant. Provide concise, friendly, and accurate travel tips.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No tips available.';
  } catch (error) {
    console.error('Error fetching AI tips:', error);
    // Fallback to mock tips if API fails
    return getMockTips(place, type);
  }
};

/**
 * Generate mock tips when API is unavailable (for testing)
 * @param {string} place - Destination name
 * @param {string} type - Type of tips
 * @returns {string} Mock tips
 */
const getMockTips = (place, type) => {
  const mockTips = {
    facts: `🏛️ Explore the historic landmarks and museums in ${place}\n🍽️ Try the local cuisine at traditional restaurants\n🌆 Visit during sunset for amazing photo opportunities`,
    etiquette: `🤝 Learn a few basic phrases in the local language\n👕 Dress appropriately for cultural sites\n💰 Understand local tipping customs`,
    packing: `📷 Camera - Capture the beautiful sights\n🗺️ Travel guide - Navigate like a local\n🧴 Sunscreen - Protect yourself from the sun`,
    thingsToDo: `🚶 Take a walking tour of the old town\n🛍️ Visit local markets for authentic souvenirs\n🎭 Attend a cultural performance or festival`
  };

  return mockTips[type] || mockTips.facts;
};

export default getAiTips;
