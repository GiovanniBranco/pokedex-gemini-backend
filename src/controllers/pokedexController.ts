import { Request, Response } from "express";
import GeminiService from "../services/geminiService";

class PokedexController {
  async handle(request: Request, response: Response) {
    try {
      const file: Express.Multer.File | undefined = request.file;

      if (!file) return response.status(400).send("No file sended");

      const result = await GeminiService.getPokemon(file);

      response.json(result);
    } catch (error) {
      console.error("Failed on process file upload", error);
      response.status(500).send("Erro interno ao processar upload.");
    }
  }
}

export default new PokedexController();
