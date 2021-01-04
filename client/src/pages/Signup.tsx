import React, { FunctionComponent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useRegisterMutation, MeDocument } from "../generated/graphql";
import { setToken } from "../auth-provider";

type Input = {
  name: string;
  username: string;
  password: string;
};

const SignupPage: FunctionComponent<{}> = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [login, { loading: loadingLogin }] = useRegisterMutation({
    errorPolicy: "all",
  });
  const { register, handleSubmit, errors } = useForm<Input>();

  const onSubmit = async ({ name, username, password }: Input) => {
    const { data, errors } = await login({
      variables: {
        registerInput: {
          name,
          username,
          password,
        },
      },
      update: (cache, { data: register }) => {
        const newCache = register?.register.users;
        cache.writeQuery({
          query: MeDocument,
          data: {
            me: {
              ...newCache,
              avatar: null,
            },
          },
        });
      },
    });

    if (errors) {
      return setErrorMessage(errors[0].message);
    }

    if (data && data?.register) {
      setToken(data?.register.token);
      history.push("/");
    }
  };

  return (
    <Wrapper>
      <h1>Sign up with your account.</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <input
            name="name"
            placeholder="Name"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.name && (
            <ErrorMessage>
              {errors.name.type === "required"
                ? "Name is required"
                : "Name should be at least 3 characters long "}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <input
            name="username"
            placeholder="Username"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.username && (
            <ErrorMessage>
              {errors.username.type === "required"
                ? "Username is required"
                : "Username should be at least 3 characters long "}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.password && (
            <ErrorMessage>
              {errors.password.type === "required"
                ? "Password is required"
                : "Password should be at least 3 characters long "}
            </ErrorMessage>
          )}
        </FormGroup>
        {errorMessage && (
          <ErrorMessage style={{ textAlign: "center" }}>
            {errorMessage}
          </ErrorMessage>
        )}
        <FormGroup>
          <p>
            Have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)" }}>
              login
            </Link>
          </p>
        </FormGroup>
        <Button type="submit" isLoading={loadingLogin} text="Sign Up" />
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 600px;
  margin: 5rem auto;

  h1 {
    text-align: center;
  }

  form {
    margin-top: 3rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

export default SignupPage;
