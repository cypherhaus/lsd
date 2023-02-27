import * as Yup from "yup";
import { PASSWORD_REGEX } from "./regex";

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .matches(
      PASSWORD_REGEX,
      "Contains 1 uppercase letter, 1 lowercase letter, 1 number, and greater than 8 characters"
    )
    .required("Required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string().matches(PASSWORD_REGEX).required("Required"),
});
