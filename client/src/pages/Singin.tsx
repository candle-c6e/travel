import React, { FunctionComponent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useLoginMutation, MeDocument } from "../generated/graphql";
import { setToken } from "../auth-provider";

type Input = {
  username: string;
  password: string;
};

const SignInPage: FunctionComponent<{}> = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [login, { loading: loadingLogin }] = useLoginMutation({
    errorPolicy: "all",
  });
  const { register, handleSubmit, errors } = useForm<Input>();

  const onSubmit = async ({ username, password }: Input) => {
    const { data, errors } = await login({
      variables: {
        loginInput: {
          username,
          password,
        },
      },
      update: (cache, { data: login }) => {
        const newCache = login?.login.users;
        cache.writeQuery({
          query: MeDocument,
          data: {
            me: newCache,
          },
        });
      },
    });

    if (errors) {
      return setErrorMessage(errors[0].message);
    }

    if (data && data?.login) {
      setToken(data.login.token);
      history.push("/");
    }
  };

  return (
    <Wrapper>
      <h1>Sign in with your account.</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Don't have account?{" "}
            <Link to="/register" style={{ color: "var(--primary)" }}>
              register
            </Link>
          </p>
        </FormGroup>
        <Button type="submit" isLoading={loadingLogin} text="Sign In" />
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

export default SignInPage;
