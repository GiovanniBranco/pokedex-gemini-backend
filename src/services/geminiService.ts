import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  getModelClient = () => {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
    return genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  };

  fileToGenerativePart = (input: IInputDto) => {
    if (!input.fileBase64 || !input.mimeType)
      throw new Error("No file provided.");

    return {
      inlineData: {
        data: input.fileBase64,
        mimeType: input.mimeType,
      },
    };
  };

  getPokemon = async (input: IInputDto) => {
    const client = this.getModelClient();
    const prompt =
      "What Pokémon is this? Bring information about Name, Type, a brief summary, and the evolutions.";

    const imageParts = [this.fileToGenerativePart(input)];

    const result = await client.generateContent([prompt, ...imageParts]);
    const response = result.response;
    const text = response.text();
    console.log(text);
  };
}

export default new GeminiService();
