import { Router } from "express";
import {newFilm } from "../types";
import{
  readAllFilms,
  readOneFilm,
  deleteOneFilm,
  updatedOneFilm,
  createOneFilm,
  replaceOrCreateFilm
} from "../services/films";


const router = Router();

// Read all films
router.get("/", (req, res) => {
const durationMax = Number(req.query["duration-max"]);
const films = readAllFilms(durationMax);
return res.json(films);
});


router.get("/:id", (req, res) => {
 const id = Number(req.params.id);
 const drink = readOneFilm(id);
 if(!drink)
{
  return res.sendStatus(404);
} 
return res.json(drink); 
});

router.post("/", (req, res) => {
  const body : unknown= req.body;
  if(
    !body ||
    typeof body !== 'object' ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0
  ){
    return res.sendStatus(400);
  }

  const { title, director, duration, imageUrl, description, budget } = body as newFilm;

  const newFilm = createOneFilm({title,director,duration,imageUrl,description,budget});
  return res.json(newFilm);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
   const deletedFilm = deleteOneFilm(id);
   if(!deletedFilm){
    return res.sendStatus(404);
   }
  return res.json(deletedFilm);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body && (typeof body.duration !== "number" || body.duration <= 0))
  ) {
    return res.sendStatus(400);
  }

  const { title, director, duration }: Partial<newFilm> = body;
  const updatedFilm = updatedOneFilm(id,{title,director,duration});

  if(!updatedFilm){
    res.sendStatus(400);
  }

  return res.json(updatedFilm);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  if(isNaN(id) || id <= 0){
    return res.sendStatus(400);
  }
  
  const body: unknown = req.body;
  if(
    !body ||
    typeof body !== 'object' ||
    !('title' in body) ||
    !('director' in body) ||
    !('duration' in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0
  ){
    return res.sendStatus(400);
  }

  const { title, director, duration, imageUrl, description, budget } = body as newFilm;
  const film = replaceOrCreateFilm(id, {title, director, duration, imageUrl, description, budget});
  
  return res.json(film);
});



export default router;
