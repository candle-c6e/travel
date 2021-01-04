import { FunctionComponent } from "react";
import styled from "styled-components";
import { useReservedUsersQuery } from "../generated/graphql";
import HotelCard from "./HotelCard";
import Pagination from "./Pagination";

const MyReserved: FunctionComponent<{}> = () => {
  const {
    data: reserved,
    fetchMore: fetchMoreReserved,
  } = useReservedUsersQuery({
    fetchPolicy: "network-only",
    variables: {
      paginateInput: {
        offset: 0,
        limit: 3,
      },
    },
  });

  const handleChangePage = ({ selected }: { selected: number }) => {
    fetchMoreReserved({
      variables: {
        paginateInput: {
          offset: selected * 3,
          limit: 3,
        },
      },
    });
  };

  return (
    <MyReservedStyle>
      <h2>My Reserved</h2>
      <Wrapper>
        {reserved?.reservedUsers.reserved.length ? (
          reserved?.reservedUsers.reserved.map((reserve) => (
            <HotelCard
              key={reserve.created_at}
              id={reserve.hotel_id}
              name={reserve.name}
              url={reserve.url}
            />
          ))
        ) : (
          <p>Not found.</p>
        )}
      </Wrapper>
      {reserved?.reservedUsers.reserved.length ? (
        <Pagination
          handleChangePage={handleChangePage}
          pageCount={reserved?.reservedUsers.totalPages || 0}
        />
      ) : null}
    </MyReservedStyle>
  );
};

const MyReservedStyle = styled.div`
  h2 {
    margin-bottom: 2rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 1rem;
`;

export default MyReserved;
