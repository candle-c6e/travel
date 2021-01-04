import { FunctionComponent, CSSProperties } from "react";
import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

type ButtonType = "submit" | "reset" | "button";

interface Props {
  text: string;
  type: ButtonType;
  isLoading?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

const Button: FunctionComponent<Props> = ({
  text,
  type = "submit",
  isLoading,
  onClick,
  style,
}) => {
  return (
    <ButtonStyle style={style} type={type} onClick={onClick}>
      {text}
      {isLoading && <FaSpinner className="spinner" />}
    </ButtonStyle>
  );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  background-color: var(--red);
  color: #fff;

  svg {
    margin-left: 0.5rem;
  }

  .spinner {
    animation: ${spin} infinite 1s linear;
  }
`;

export default Button;
