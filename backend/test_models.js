require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // For the current SDK, we might need to access the model list differently
    // or just try to generate content with a known fallback if listing isn't direct in the high-level client.
    // Actually, the SDK doesn't expose listModels directly on the main class in all versions, 
    // but let's try the direct inference or just standard models.

    // However, usually we can't easily "list" with just the helper. 
    // Let's rely on standard names.

    console.log("Testing API Key with common models...");

    const models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];

    for (const modelName of models) {
        try {
            console.log(`Trying model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello?");
            console.log(`SUCCESS: ${modelName} worked!`);
            break;
        } catch (error) {
            console.log(`FAILED: ${modelName} - ${error.message}`);
        }
    }
}

listModels();
