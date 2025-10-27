import { Router } from "express";
import {newText} from "../types";
import{
     readAllTexts,
    readOneText,
    deleteOneText,
    createOneText,
    getAllFiltered,
    replaceOneText,
} from "../services/texts";


const router = Router();

const expectedLevels = ["easy", "medium", "hard"];

router.get("/filter", (req, res) => {
 const level = String(req.query.level);
 const text = getAllFiltered(level);
 if(!level && !expectedLevels.includes(level))
{
  return res.sendStatus(404);
} 
return res.json(text); 
});


router.get("/", (_req, res) => {
const texts = readAllTexts();
return res.json(texts);
});

router.get("/:id", (req, res) => {
 const id = String(req.params.id);
 const text = readOneText(id);
 if(!text)
{
  return res.sendStatus(404);
} 
return res.json(text); 
});

router.get("/filter", (req, res) => {
 const level = String(req.query.level);
 const text = getAllFiltered(level);
 if(!level)
{
  return res.sendStatus(404);
} 
return res.json(text); 
});


router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof body.content !== "string" ||
    typeof body.level !== "string" ||
    !body.content.trim() ||
     !expectedLevels.includes(body.level)
  ) {
    return res.sendStatus(400);
  }

  const newText = body as newText;

  const createdText = createOneText(newText);

  if (!createdText) {
    return res.sendStatus(409);
  }

  return res.json(createdText);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.sendStatus(400);
  }

  const deletedText = deleteOneText(id);

  if (!deletedText) {
    return res.sendStatus(404);
  }

  return res.send(deletedText);
});

router.put("/:id", (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof body.content !== "string" ||
    typeof body.level !== "string" ||
    !body.content.trim() ||
    !expectedLevels.includes(body.level)
  ) {
    return res.sendStatus(400);
  }
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.sendStatus(400);
  }

  const updatedText = replaceOneText(id, body as newText);

  if (!updatedText) {
    return res.sendStatus(404);
  }

  return res.send(updatedText);
});

export default router;
