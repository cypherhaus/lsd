import * as Yup from "yup";
import { PASSWORD_REGEX } from "./regex";

export const PASSWORD_CONTAINS = "password-contains";

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_CONTAINS)
    .required("Required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_CONTAINS)
    .required("Required"),
});
