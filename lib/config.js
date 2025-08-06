export const checkApiKeys = () => {
  const groqApiKey = process.env.GROQ_API_KEY;
  const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  return {
    groqApiKey: groqApiKey ? true : false,
    googleApiKey: googleApiKey ? true : false,
  };
};