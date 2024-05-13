import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

class GeminiService {
  getModelClient = () => {
    console.log(process.env.API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
    return genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  };

  fileToGenerativePart = (file: Express.Multer.File) => {
    const imageBuffer = fs.readFileSync(file.path);

    const base64Image = Buffer.from(imageBuffer).toString("base64");

    return {
      inlineData: {
        data: base64Image,
        mimeType: file.mimetype,
      },
    };
  };

  getPokemon = async (file: Express.Multer.File) => {
    const client = this.getModelClient();
    const prompt =
      "What Pokémon is this? Bring information about Name, Type, description and evolutions.In evolution information, include the type and name only. Translate into Brazilian Portuguese. Format in Json. return only the content inside the keys";

    const imageParts = [this.fileToGenerativePart(file)];

    const result = await client.generateContent([prompt, ...imageParts]);
    const response = result.response;
    let text = response.text();
    text = text.replace("```json\n", "");
    text = text.replace("```", "");
    console.log(text);
    const pokemon: IOutputDto = JSON.parse(text);

    return pokemon;
  };
}

export default new GeminiService();
