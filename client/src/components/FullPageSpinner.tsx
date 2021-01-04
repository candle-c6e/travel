import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const FullPageSpinner = () => {
  return (
    <Wrapper>
      <FaSpinner className="spinner" size={60} />
    </Wrapper>
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

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    animation: ${spin} infinite 1s linear;
  }
`;

export default FullPageSpinner;
