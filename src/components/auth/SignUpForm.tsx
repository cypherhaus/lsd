import React from "react";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Components
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { ErrorLabel } from "../common/ErrorLabel";

// Constants
import { SignupSchema } from "../../constants/validationSchema";

export const SignUpForm = observer(() => {
  const { authView } = useStore();
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => authView.handleSignUpClick(values)}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Field name="email">
              {({ field, meta }: any) => (
                <input
                  className={`placeholder:text-dark200 outline-none font-white my-2 border-b-2  border-black  p-2 text-xl bg-transparent ${
                    !!(meta.touched && meta.error) && "border-primary"
                  }`}
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  placeholder="Email"
                />
              )}
            </Field>
            {errors.email && touched.email ? (
              <ErrorLabel>{errors.email}</ErrorLabel>
            ) : null}
            <Field name="password">
              {({ field, meta }: any) => (
                <input
                  className={`placeholder:text-dark200 outline-none font-white my-2 border-b-2  border-black  p-2 text-xl bg-transparent ${
                    !!(meta.touched && meta.error) && "border-primary"
                  }`}
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Field>
            {errors.password && touched.password ? (
              <ErrorLabel>{errors.password}</ErrorLabel>
            ) : null}
          </div>

          <Button type="submit">Sign up</Button>
        </Form>
      )}
    </Formik>
  );
});
