import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FocusedInputShape } from "react-dates";
import * as Moment from "moment";
import { Moment as MomentType } from "moment";
import { extendMoment } from "moment-range";
import Skeleton from "../components/Skeleton";
import { useHotelQuery, useAddReservationMutation } from "../generated/graphql";
import { detailBlock } from "../style";
import DatePicker from "../components/DatePicker";
// import MapBox from "../components/Mapbox";
import Button from "../components/Button";

const moment = extendMoment(Moment);

interface Params {
  id: any;
}

interface DateChage {
  startDate: any;
  endDate: any;
}

type FocusInput = FocusedInputShape | null;

const HotelDetailPage = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<MomentType>(moment());
  const [endDate, setEndDate] = useState<MomentType>(moment());
  const [focusInput, setFocusInput] = useState<FocusInput>(null);
  const [total, setTotal] = useState<number>(0);

  const history = useHistory();
  const params = useParams<Params>();
  const id = params.id;

  const [reserve] = useAddReservationMutation();
  const { loading, data } = useHotelQuery({
    variables: {
      id: parseInt(id),
    },
    errorPolicy: "all",
  });

  if (loading) return <Skeleton />;

  const handleDateChange = (dates: DateChage) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    if (dates.startDate && dates.endDate && data?.hotel?.hotel.price) {
      const range = moment.range(dates.startDate, dates.endDate);
      if (data.hotel.reservedDates.length) {
        const selectedDates = [];
        for (let date of Array.from(range.by("day"))) {
          selectedDates.push(date.format("YYYY-MM-DD"));
        }
        const isBlockingDateValid = selectedDates.filter((date) =>
          data?.hotel?.reservedDates.includes(date)
        );
        if (isBlockingDateValid.length) {
          setStartDate(moment());
          setEndDate(moment());
          alert("You cannot reserve between blocking date.");
          setTotal(0);
          return;
        }
      }
      const totalDates = moment(dates.endDate).diff(dates.startDate, "days");
      setTotal(data?.hotel?.hotel.price * totalDates);
    }
  };

  const handleBooking = async () => {
    if (startDate && endDate && total) {
      const { data } = await reserve({
        variables: {
          hotel_id: parseInt(id),
          start_date: startDate.format("yyyy-MM-DD"),
          end_date: endDate.format("yyyy-MM-DD"),
          price: total,
        },
      });

      if (data?.addReservation) {
        history.push("/account");
      }
    } else {
      alert("Please select reserve date");
    }
  };

  const handleFocusInput = (type: any) => {
    setFocusInput(type);
  };

  return (
    <Wrapper>
      <Header>
        <h2>{data?.hotel?.hotel.name}</h2>
        <Images>
          {data?.hotel?.hotelImages.map((image) => (
            <Image key={image.url}>
              {!loaded ? (
                <div
                  style={{ background: "gray", width: "100%", height: "100%" }}
                ></div>
              ) : null}
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/hotels/${image.url}`}
                alt={data?.hotel?.hotel.name}
                style={!loaded ? { visibility: "hidden" } : {}}
                onLoad={() => setLoaded(true)}
              />
            </Image>
          ))}
        </Images>
      </Header>
      <DetailAndBooking>
        <Detail>
          <DetailBlog>
            <h3>Deatil</h3>
            <p>{data?.hotel?.hotel.bio}</p>
          </DetailBlog>
          <DetailBlog>
            <h3>Address</h3>
            <p>{data?.hotel?.hotel.address}</p>
          </DetailBlog>
          <DetailBlog>
            <h3>Facilitator</h3>
            <UserProfile>
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${data?.hotel?.hotel.user.avatar}`}
                alt={data?.hotel?.hotel.user.name}
              />
              <p>{data?.hotel?.hotel.user.name}</p>
            </UserProfile>
          </DetailBlog>
        </Detail>
        <Booking>
          <Price>
            <h3>฿{data?.hotel?.hotel.price.toLocaleString()}</h3>
            <span>/ Night</span>
          </Price>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            reserveDates={data?.hotel?.reservedDates}
            focusInput={focusInput}
            handleDateChange={handleDateChange}
            handleFocusInput={handleFocusInput}
          />
          <Total>
            <h3>Total: ฿{total.toLocaleString()}</h3>
          </Total>
          <Button
            style={{ marginTop: 10 }}
            text="Reserve"
            type="button"
            onClick={handleBooking}
          />
        </Booking>
      </DetailAndBooking>
      {/* <Map>
        <MapBox
          draggableMarker={false}
          latitude={data?.hotel?.hotel.latitude}
          longitude={data?.hotel?.hotel.longitude}
          zoom={11}
        />
      </Map> */}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Header = styled.div`
  h2 {
    font-weight: lighter;
  }
`;

const Images = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-gap: 0.6rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 250px 250px;

  div:nth-child(1) {
    border-radius: 10px 0 0 10px;
    overflow: hidden;
    grid-column: 1/3;
    grid-row: 1/3;
  }

  div:nth-child(2) {
    grid-column: 3/4;
    grid-row: 1/2;
  }

  div:nth-child(3) {
    border-radius: 0 10px 0 0;
    overflow: hidden;
    grid-column: 4/4;
    grid-row: 1/2;
  }

  div:nth-child(4) {
    grid-column: 3/4;
    grid-row: 2/2;
  }

  div:nth-child(5) {
    border-radius: 0 0 10px 0;
    overflow: hidden;
    grid-column: 4/4;
    grid-row: 2/2;
  }
`;

const Image = styled.div`
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const DetailAndBooking = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 2rem;
`;

const Detail = styled.div`
  flex-basis: 60%;
`;

const Booking = styled.div`
  flex-basis: 40%;
  margin-left: 2rem;
  padding: 2rem;
  text-align: center;
  border: 1px solid var(--light-gray);
  border-radius: 10px;
`;

const Price = styled.div`
  display: flex;

  span {
    margin-left: 5px;
  }
`;

const DetailBlog = styled.div`
  ${detailBlock}
`;

const Total = styled.div`
  text-align: left;
`;

const Map = styled.div`
  height: 300px;
`;

const UserProfile = styled.div`
  margin-top: 1rem;
  display: flex;

  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 1rem;
  }
`;

export default HotelDetailPage;
