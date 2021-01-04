import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  id: number;
  name: string;
  bio?: string;
  url: string;
  link?: string;
}

const HotelCard: FunctionComponent<Props> = ({ id, name, bio, url, link }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <Link to={!link ? `/hotel/${id}` : link}>
      <Wrapper>
        <Image>
          {!loaded ? (
            <div
              style={{ background: "gray", width: "100%", height: "100%" }}
            ></div>
          ) : null}
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/hotels/${url}`}
            alt={name}
            style={!loaded ? { visibility: "hidden" } : {}}
            onLoad={() => setLoaded(true)}
          />
        </Image>
        <HotelName>{name}</HotelName>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div``;

const Image = styled.div`
  height: 260px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HotelName = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export default HotelCard;
