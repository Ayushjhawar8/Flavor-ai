export const checkApiKeys = () => {
  const groqApiKey = process.env.GROQ_API_KEY;
  const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  return {
    groqApiKey: groqApiKey ? true : false,
    googleApiKey: googleApiKey ? true : false,
  };
};

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Validate environment variables
function validateEnv() {
  const requiredKeys = ["GROQ_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];
  let hasError = false;

  requiredKeys.forEach((key) => {
    if (!process.env[key] || process.env[key].trim() === "") {
      console.error(`Missing required environment variable: ${key}. Please set it in .env.local.`);
      hasError = true;
    }
  });

  if (hasError) {
    console.error("Application cannot start without the above environment variables.");
    process.exit(1); // Fail fast
  }
}

// Run validation at startup
validateEnv();

// Export env safely for app usage
export const config = {
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
};
