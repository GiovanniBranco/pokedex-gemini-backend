import { Router } from "express";
import PokedexController from "../controllers/pokedexController";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router();

router.post(
  "/pokedex/pokemon/search",
  upload.single("image"),
  PokedexController.handle
);

export { router };
