import React from "react";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";

// Components
import { Input } from "../common/Input";

// Constants
import { SignupSchema } from "../../constants/validationSchema";
import { Button } from "../common/Button";
import { ErrorLabel } from "../common/ErrorLabel";
import { useStore } from "../../store";

export const SignUpForm = observer(() => {
  const { authView } = useStore();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => authView.handleSignUpClick(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex flex-col">
            <Field name="firstName">
              {({ field, meta }: any) => (
                <Input
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  placeholder="First Name"
                />
              )}
            </Field>
            {errors.firstName && touched.firstName ? (
              <ErrorLabel>{errors.firstName}</ErrorLabel>
            ) : null}
            <Field name="lastName">
              {({ field, meta }: any) => (
                <Input
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  placeholder="Last Name"
                />
              )}
            </Field>
            {errors.lastName && touched.lastName ? (
              <ErrorLabel>{errors.lastName}</ErrorLabel>
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
