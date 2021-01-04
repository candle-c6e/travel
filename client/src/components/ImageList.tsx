import { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  images: File[];
  handleRemoveImage: (image: File) => void;
}

const FileList: FunctionComponent<Props> = ({ images, handleRemoveImage }) => {
  return (
    <Wrapper>
      {images.map((image: any) => {
        const blob =
          typeof image === "string"
            ? `${process.env.REACT_APP_API_URL}/uploads/hotels/${image}`
            : URL.createObjectURL(image);
        return (
          <List key={blob} onClick={() => handleRemoveImage(image)}>
            <img src={blob} alt="hotel" />
          </List>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const List = styled.div`
  margin-right: 1rem;
  cursor: pointer;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
`;

export default FileList;
