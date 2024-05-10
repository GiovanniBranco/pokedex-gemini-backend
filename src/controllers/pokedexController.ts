import { Request, Response } from "express";
import GeminiService from "../services/geminiService";

class PokedexController {
  async handle(request: Request, response: Response) {
    try {
      const fileBase64: string = request.params.fileBase64;
      const mimeType: string = request.params.mimeType;

      const input: IInputDto = {
        fileBase64,
        mimeType,
      };

      if (!input.fileBase64 || !input.mimeType)
        return response.status(400).send("Nenhum arquivo enviado.");

      const result = await GeminiService.getPokemon(input);

      response.json({ result });
    } catch (error) {
      console.error("Erro ao processar upload:", error);
      response.status(500).send("Erro interno ao processar upload.");
    }
  }
}

export { PokedexController };
