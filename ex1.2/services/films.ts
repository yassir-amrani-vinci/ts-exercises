import { parse , serialize } from "../utils/json";
import { Film , newFilm } from "../types";
import path from "node:path";
const jsonDbPath = path.join(__dirname,"data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Shang-Chi and the Legend of the Ten Rings",
    director: "Destin Daniel Cretton",
    duration: 132,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
    description:
      "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    budget: 150,
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    budget: 63,
  },
  {
    id: 3,
    title: "Summer Wars",
    director: "Mamoru Hosoda",
    duration: 114,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
    description:
      "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
    budget: 18.7,
  },
  {
    id: 4,
    title: "The Meyerowitz Stories",
    director: "Noah Baumbach",
    duration: 112,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
    description:
      "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
  },
  {
    id: 5,
    title: "her",
    director: "Spike Jonze",
    duration: 126,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    budget: 23,
  },
];


function readAllFilms(durationMax: number): Film[] {
  const films = parse(jsonDbPath,defaultFilms);
  if(!durationMax){
    return films;
  }
  const durationMaxNumber = Number(durationMax);
  const filteredFilms = films.filter((film)=>{
    return film.duration <= durationMaxNumber;
  });
  return filteredFilms;
}


function readOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath,defaultFilms);
 const film =  films.find((film) => film.id === id);
  if(!film){
    return undefined;
  }
  return film;
}

// Create a pizza to be added to the menu.
function createOneFilm(NewFilm: newFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);
  const nextId = films.reduce((maxId,film)=> (film.id > maxId ? film.id: maxId),0)+1;
  const createdFilm: Film = {
    id: nextId,
    title: NewFilm.title,
    director: NewFilm.director,
    duration: NewFilm.duration,
    imageUrl: NewFilm.imageUrl,
    description: NewFilm.description,
    budget: NewFilm.budget
  };

  films.push(createdFilm);
  serialize(jsonDbPath, films);
  
  return createdFilm;
}


function deleteOneFilm(filmId: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === filmId);
  if (index === -1) {
    return undefined;
  }

  const deletedElements = films.splice(index, 1);
  serialize(jsonDbPath, films);
  return deletedElements[0];
}

function updatedOneFilm(filmId : number, newFilm:Partial<newFilm>):Film | undefined{
  const films = parse(jsonDbPath,defaultFilms);
  const film = films.find((film) => film.id === filmId);

  if(!film){
    return undefined;
  }
  if(newFilm.title !== undefined){
    film.title = newFilm.title;
  }
  if(newFilm.imageUrl !== undefined){
    film.imageUrl = newFilm.imageUrl;
  }
  if(newFilm.duration !== undefined){
    film.duration = newFilm.duration;
  }
  if(newFilm.director !== undefined){
    film.director = newFilm.director;
  }
  if(newFilm.description !== undefined){
    film.description = newFilm.description;
  }
  if(newFilm.budget !== undefined){
    film.budget = newFilm.budget;
  }

  serialize(jsonDbPath,films);
  return film;
}

function replaceOrCreateFilm(filmId: number, filmData: newFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);
  const movieIndex = films.findIndex(film => film.id === filmId);

  if(movieIndex !== -1) {
    // Film exists, replace it
    films[movieIndex] = {
      id: filmId,
      ...filmData
    };
    serialize(jsonDbPath, films);
    return films[movieIndex];
  } else {
    // Film doesn't exist, create it
    const createdFilm: Film = {
      id: filmId,
      ...filmData
    };
    films.push(createdFilm);
    serialize(jsonDbPath, films);
    return createdFilm;
  }
}



export{
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updatedOneFilm,
  replaceOrCreateFilm,
};





