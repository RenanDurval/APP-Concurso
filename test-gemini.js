
const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config({ path: '.env.local' });

async function main() {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found in .env.local");
        process.exit(1);
    }
    console.log("Found API Key:", apiKey.substring(0, 8) + "...");

    const genAI = new GoogleGenerativeAI(apiKey);
    const models = ["gemini-1.5-flash", "gemini-pro", "gemini-1.5-pro"];

    for (const modelName of models) {
        console.log(`\nTesting model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            console.log(`SUCCESS with ${modelName}! Response:`, response.text());
            return; // Exit on first success
        } catch (error) {
            console.error(`FAILED with ${modelName}:`, error.message);
            if (error.response) {
                console.error(`Status: ${error.response.status} ${error.response.statusText}`);
            }
        }
    }
    console.log("\nAll models failed.");
}

main();
