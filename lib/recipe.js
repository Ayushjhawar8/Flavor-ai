import { checkApiKeys } from './config';


export async function generateRecipe(ingredients, { timeoutMs = 10000 } = {}) {
  const { groqApiKey } = checkApiKeys();

  if (!groqApiKey) {
    throw new Error('Missing GROQ API key. Please set GROQ_API_KEY in your .env.local file.');
  }

  // NOTE: confirm this endpoint with the provider docs. Update if needed.
  const endpoint = 'https://api.groq.com/recipes';

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const signal = controller ? controller.signal : undefined;
  let timeout;
  if (controller) {
    timeout = setTimeout(() => controller.abort(), timeoutMs);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
      signal,
    });

    if (timeout) clearTimeout(timeout);

    if (!response.ok) {
      // try to include server body for better diagnostics
      let bodyText = '';
      try {
        bodyText = await response.text();
      } catch (e) {
        /* ignore */
      }
      throw new Error(`Recipe API error: ${response.status} ${response.statusText}${bodyText ? ` - ${bodyText}` : ''}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Recipe request timed out');
    }
    throw new Error(`Recipe generation failed: ${error.message}`);
  }
}