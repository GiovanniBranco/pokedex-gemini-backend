import { Router } from "express";
import { PokedexController } from "../controllers/pokedexController";

const router = Router();

router.get("/pokedex/pokemon/search", new PokedexController().handle);

export { router };
