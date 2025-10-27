import { parse , serialize } from "../utils/json";
import { Text, newText } from "../types";
import { v4 as uuidv4 } from 'uuid';
import path from "node:path";

const jsonDbPath = path.join(__dirname, "data/texts.json");


const defaultText: Text[]=[
    {
        id:"3838938383-3939393DDIU83D83H",
        content : "content 1",
        level : "easy"
    },
    {
        id:"38ejnejn83-39enjdnejnendn83H",
        content : "content 2",
        level : "medium"
    },
    {
        id:"3uhduhddjbdnjd-dbudbd83883837bddjd",
        content : "content 3",
        level : "hard"
    }
];

function readAllTexts(): Text[]{
    const texts = parse(jsonDbPath,defaultText);
    return texts;
}

function readOneText(id:string): Text | undefined {
    const texts = parse(jsonDbPath,defaultText);
    const text = texts.find((text) => text.id === id);
    if(!text){
        return undefined;
    }
    return text;
}

function createOneText(textData: newText): Text {
    const texts = parse(jsonDbPath, defaultText);
    const createdText: Text = {
        id: uuidv4(),
        ...textData
    };
    texts.push(createdText);
    serialize(jsonDbPath, texts);
    return createdText;
}

function deleteOneText(id: string): Text | undefined {
  const texts = parse(jsonDbPath, defaultText);
  const index = texts.findIndex((text) => text.id === id);
  if (index === -1) {
    return undefined;
  }

  const deletedElements = texts.splice(index, 1);
  serialize(jsonDbPath, texts);
  return deletedElements[0];
}

function getAllFiltered(level: string): Text[] {
    const texts = parse(jsonDbPath, defaultText);
    const filteredTexts = texts.filter((text) => text.level === level);
    return filteredTexts;
}

function updateOneText(textId : string , newText:Partial<newText>):Text | undefined{
    const texts = parse(jsonDbPath,defaultText);
    const text = texts.find((text)=> text.id === textId);

    if(!text){
        return undefined;
    }

    if(newText.content !== undefined){
        text.content= newText.content;
    }
    if(newText.level !== undefined){
        text.level = newText.level;
    }

    serialize(jsonDbPath,texts);
    return text;
}

function replaceOneText(textId: string, newTextData: newText): Text | undefined {
    const texts = parse(jsonDbPath, defaultText);
    const index = texts.findIndex((text) => text.id === textId);

    if (index === -1) {
        return undefined;
    }

    // Remplacer l'entièreté de la ressource par les nouvelles données
    const replacedText: Text = {
        id: textId,
        ...newTextData
    };

    texts[index] = replacedText;
    serialize(jsonDbPath, texts);
    return replacedText;
}

export{
    readAllTexts,
    readOneText,
    deleteOneText,
    createOneText,
    updateOneText,
    replaceOneText,
    getAllFiltered,
};



