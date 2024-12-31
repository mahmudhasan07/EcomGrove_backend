import { z } from "zod";

const createProductValidation = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    brandName: z.string(),
    categoryType : z.enum(["ELECTRONICS", "Home_Kitchen", "BEAUTY", "SPORTS", "FASHION", "TOYS"]),
    category: z.string(),
    images: z.array(z.string()).optional(),

})

export const productValidation = {createProductValidation};