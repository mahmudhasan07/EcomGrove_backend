import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient()

const createProductInDb = async (req: Request) => {
    const payload = req.body;
    const file = req.files as any;

    const images = file && file.map((e: { location: string }) => e?.location);

    const result = await prisma.product.create({
        data: {
            ...payload,
            images
        }
    })

    return result

}

const getAllProductsFromDb = async () => {

    const result = await prisma.product.findMany()
    return result

}

export const productServices = { createProductInDb, getAllProductsFromDb }