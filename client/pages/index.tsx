import AuthManager, { Manager } from "api/auth/manager";
import Client from "api/client";
import { createUser } from "api/user";
import { NavLogo } from "components/brand/logo";
import Button from "components/button";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>orim | collaborate. simply.</title>
        <meta name="description" content="a lean mean collaboration app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Formik
        initialValues={{
          name: "",
        }}
        validate={(values) => {
          const errors = {} as FormikErrors<{ name: string }>;
          if (!values.name) {
            errors.name = "please provide a username to get started";
          }
          return errors;
        }}
        onSubmit={async (form) => {
          let user = await createUser(form.name);
          AuthManager.setToken(user.id.toString());
          await Router.push("/board/90210");
        }}
      >
        <div>
          <ErrorMessage name="name">
            {(msg) => (
              <div className="alert alert-error text-center mb-2">{msg}</div>
            )}
          </ErrorMessage>

          <div className="card w-96 bg-base-100 shadow-xl text-left p-4 border">
            <NavLogo />
            <h3 className="mb-4">collaborate. simply.</h3>
            <Form className="flex flex-row justify-between">
              <Field
                className="w-full mr-3 input border-white"
                name="name"
                placeholder="username"
              />
              <Button type="submit">try it out</Button>
            </Form>
          </div>
        </div>
      </Formik>

      <footer></footer>
    </div>
  );
};

export default Home;
