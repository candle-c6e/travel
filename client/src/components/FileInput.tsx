import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { FormEvent, FunctionComponent } from "react";

interface Props {
  onChange: (image: File) => void;
}

const FileInput: FunctionComponent<Props> = ({ onChange }) => {
  const handleChange = async (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity && event.currentTarget.files?.length) {
      onChange(event.currentTarget.files[0]);
    }
  };

  return (
    <Wrapper>
      <label htmlFor="file">
        <Box>
          <AiOutlinePlus size={30} />
          <input id="file" onChange={handleChange} type="file" />
        </Box>
      </label>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Box = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  input {
    display: none;
  }
`;

export default FileInput;
