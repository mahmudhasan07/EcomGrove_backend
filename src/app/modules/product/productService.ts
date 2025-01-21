import { PrismaClient, Product } from "@prisma/client";
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

const deleteProductFromDb = async (id: string) => {
    const result = await prisma.product.delete({
        where: {
            id: id
        }
    })
    return result
}

const updateProductInDb = async (id: string, req: Request) => {

    const payload = req.body;
    const file = req.files as any;

    const uploadImages = file && file.map((e: { location: string }) => e?.location);

    const findProduct = await prisma.product.findUnique({
        where: {
            id
        }
    })


    const result = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            ...payload,
            images: uploadImages.length > 0 ? uploadImages : findProduct?.images
        }
    })
    return result
}

export const productServices = { createProductInDb, getAllProductsFromDb, deleteProductFromDb, updateProductInDb }