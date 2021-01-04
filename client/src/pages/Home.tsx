import styled from "styled-components";
import Hotels from "../components/Hotels";

function HomePage() {
  return (
    <Wrapper className="App">
      <Hotels />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default HomePage;
