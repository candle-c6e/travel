import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useAuth } from "../context/auth-context";
import { UpdateProfileInput } from "../types";

interface Props {
  onSubmit: (value: UpdateProfileInput) => void;
}

const UpdateProfile: FunctionComponent<Props> = ({ onSubmit }) => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    errors,
    watch,
  } = useForm<UpdateProfileInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <input
          type="text"
          name="name"
          placeholder="name"
          defaultValue={auth?.user.me.name}
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
          type="password"
          name="password"
          placeholder="password"
          ref={register()}
        />
      </FormGroup>
      <FormGroup>
        <input
          type="password"
          name="confirmPassword"
          placeholder="ConfirmPassword"
          ref={register({
            validate: (value) => value === watch("password"),
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage>
            {errors.confirmPassword.type === "validate" &&
              "Password and confirm password will match."}
          </ErrorMessage>
        )}
      </FormGroup>
      <Button type="submit" text="Save" />
    </form>
  );
};

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

export default UpdateProfile;
