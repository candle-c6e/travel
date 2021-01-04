import { useEffect, useState } from "react";
import styled from "styled-components";
import HotelCard from "../components/HotelCard";
import { useHotelsLazyQuery } from "../generated/graphql";
import Pagination from "./Pagination";

const Hotels = () => {
  const [fetchData, { data, fetchMore }] = useHotelsLazyQuery();

  useEffect(() => {
    fetchData({
      variables: {
        paginateInput: {
          offset: 0,
          limit: 6,
        },
      },
    });
  }, [fetchData]);

  const handleChangePage = async ({ selected }: { selected: number }) => {
    if (fetchMore) {
      fetchMore({
        variables: {
          paginateInput: {
            offset: selected * 6,
            limit: 6,
          },
        },
      });
    }
  };

  return (
    <Wrapper>
      <HotelsStyle>
        {data?.hotels &&
          data.hotels.hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              url={hotel.url}
            />
          ))}
      </HotelsStyle>
      <Pagination
        pageCount={data?.hotels.totalPages || 0}
        handleChangePage={handleChangePage}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const HotelsStyle = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export default Hotels;
