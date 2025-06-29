import { z } from "zod";

// User registration schema
export const registerSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
  //   "Password must contain uppercase, lowercase, number, and special character",
  // ),
  phoneNumber: z.string().min(1, "Phone Number is Required"),
});

// User login schema
export const loginSchema = z.object({
  phoneNumber: z.string().min(4, "Enter Valid Phone Number"),
  password: z.string().min(1, "Password is required"),
});
export const spamSchema = z.object({
  phoneNumber: z.string().min(4, "Enter Valid Phone Number"),
});
export const contactSchema = z.object({
  phoneNumber: z.string().min(4, "Enter Valid Phone Number"),
  name: z.string().min(1, "Enter Valid Name"),
});

// Validation middleware
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      next(error);
    }
  };
};
