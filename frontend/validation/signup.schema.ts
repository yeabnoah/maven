import z from "zod";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be at least 2 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name should only contain alphabets and spaces",
    }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    })
    .regex(/^\S*$/, {
      message: "Password must not contain whitespace",
    }),
});

export default signupSchema;
