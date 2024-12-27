import { z } from "zod";

const userRegisterValidationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 characters long"),
  role: z.enum(["ADMIN", "USER"]),
  address: z.string().min(2, "Address must be at least 2 characters long"),
  city: z.string().min(2, "City must be at least 2 characters long"),
  state: z.string().min(2, "Country must be at least 2 characters long"),
  zipCode: z.string().min(2, "Zip code must be at least 2 characters long"),
  uploadImage : z.string().optional(),
  status: z.enum(["ACTIVE", "BLOCKED", "PENDING"]),

});


export const userValidation = { userRegisterValidationSchema }