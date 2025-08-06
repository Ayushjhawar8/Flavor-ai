import { checkApiKeys } from './config';

export async function generateRecipe(ingredients) {
  const { groqApiKey } = checkApiKeys();

  if (!groqApiKey) {
    throw new Error('Missing GROQ API key. Please set GROQ_API_KEY in your .env.local file.');
  }

  try{
    const response = await fetch('https://api.grok.com/recipes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });
    return await response.json();
  } catch (error) {
    throw new Error(`Recipe generation failed: ${error.message}`);
  }
}