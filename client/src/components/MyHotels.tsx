import { FunctionComponent } from "react";
import styled from "styled-components";
import { useHotelsUserQuery } from "../generated/graphql";
import HotelCard from "./HotelCard";
import Pagination from "./Pagination";

const MyHotels: FunctionComponent<{}> = () => {
  const { data: hotels, fetchMore } = useHotelsUserQuery({
    fetchPolicy: "network-only",
    variables: {
      paginateInput: {
        offset: 0,
        limit: 3,
      },
    },
  });

  const handleChangePage = ({ selected }: { selected: number }) => {
    fetchMore({
      variables: {
        paginateInput: {
          offset: selected * 3,
          limit: 3,
        },
      },
    });
  };

  return (
    <MyHotelsStyle>
      <h2>My Hotels</h2>
      <Hotels>
        {hotels?.hotelsUser.hotel.length ? (
          hotels?.hotelsUser.hotel.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              url={hotel.url}
              link={`/edit-hotel/${hotel.id}`}
            />
          ))
        ) : (
          <p>Not found.</p>
        )}
      </Hotels>
      {hotels?.hotelsUser.hotel.length ? (
        <Pagination
          handleChangePage={handleChangePage}
          pageCount={hotels?.hotelsUser.totalPages || 0}
        />
      ) : null}
    </MyHotelsStyle>
  );
};

const MyHotelsStyle = styled.div`
  h2 {
    margin: 2rem 0;
  }
`;

const Hotels = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 1rem;
`;

export default MyHotels;
