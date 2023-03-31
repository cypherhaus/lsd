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
            <Field name="username">
              {({ field, meta }: any) => (
                <Input
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  placeholder="Username"
                />
              )}
            </Field>
            {errors.username && touched.username ? (
              <ErrorLabel>{errors.username}</ErrorLabel>
            ) : null}

            <Field name="email">
              {({ field, meta }: any) => (
                <Input
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
                <Input
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
