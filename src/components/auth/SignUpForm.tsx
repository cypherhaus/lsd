import React from "react";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";

// Components
import { Input } from "../common/Input";

// Constants
import { SignupSchema } from "../../constants/validationSchema";
import { Button } from "../common/Button";
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

            <Field name="lastName">
              {({ field, meta }: any) => (
                <Input
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  placeholder="Last Name"
                />
              )}
            </Field>

            <Field name="email">
              {({ field, meta }: any) => (
                <Input
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  placeholder="Email"
                />
              )}
            </Field>
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
              <ul className="text-brandOrange text-xs font-normal list-inside list-disc">
                <li>8 Characters minimum</li>
                <li>At least 1 lowercase letter</li>
                <li>At least 1 uppercase letter</li>
                <li>At least 1 number</li>
              </ul>
            ) : null}
          </div>

          <Button type="submit">Sign up</Button>
        </Form>
      )}
    </Formik>
  );
});
