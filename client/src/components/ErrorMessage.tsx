import { FunctionComponent, ReactNode, CSSProperties } from "react";
import styled from "styled-components";

interface Props {
  style?: CSSProperties;
  children: ReactNode;
}

const ErrorMessage: FunctionComponent<Props> = ({ style, children }) => {
  return <Error style={style}>{children}</Error>;
};

const Error = styled.p`
  color: red;
  font-size: 1.1rem;
  margin: 0.8rem 0;
`;

export default ErrorMessage;
