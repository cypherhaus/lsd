import React from "react";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";

// Components
import { Input } from "../common/Input";

// Constants
import { LoginSchema } from "../../constants/validationSchema";
import { Button } from "../common/Button";
import { useStore } from "../../store";

export const LoginForm = observer(() => {
  const { authView } = useStore();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => authView.handleLoginClick(values)}
    >
      {() => (
        <Form>
          <div className="flex flex-col">
            <Field name="email">
              {({ field, meta }: any) => (
                <Input
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  placeholder="Email"
                />
              )}
            </Field>
            <Field
              validate={(v: string) => {
                if (v.length < 8)
                  return "Password must be at least 8 charecters";
              }}
              name="password"
            >
              {({ field, meta }: any) => (
                <Input
                  {...field}
                  error={!!(meta.touched && meta.error)}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Field>
          </div>

          <Button type="submit">LOGIN</Button>
        </Form>
      )}
    </Formik>
  );
});
