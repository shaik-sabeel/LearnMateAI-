require('dotenv').config();
const axios = require('axios');

async function checkModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API Key found in .env");
        return;
    }

    try {
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        console.log("Available Models:");
        response.data.models.forEach(m => {
            if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                console.log(`- ${m.name}`);
            }
        });
    } catch (error) {
        console.error("Error fetching models:", error.response ? error.response.data : error.message);
    }
}

checkModels();
