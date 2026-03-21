require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testCurrent() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("hello");
        console.log("SUCCESS gen-1.5-flash");
    } catch (e) {
        console.error("FAIL gen-1.5-flash:", e.message);
    }
}

async function testLatest() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent("hello");
        console.log("SUCCESS gemini-flash-latest");
    } catch (e) {
        console.error("FAIL gemini-flash-latest:", e.message);
    }
}

async function run() {
    await testCurrent();
    await testLatest();
}
run();
