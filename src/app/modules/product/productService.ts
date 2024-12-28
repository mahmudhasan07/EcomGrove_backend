import { Request } from "express";

const createProductInDb = async (req : Request) => {
const payload = req.body;
const file = req.files;
console.log(file);


}

export const productServices = { createProductInDb }