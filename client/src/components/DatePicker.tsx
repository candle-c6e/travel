import { FunctionComponent, memo } from "react";
import { DateRangePicker } from "react-dates";
import { Moment } from "moment";
import styled from "styled-components";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

type ReserveDates = string[];

interface DateChage {
  startDate: any;
  endDate: any;
}

interface Props {
  startDate: any;
  endDate: any;
  reserveDates?: ReserveDates;
  handleDateChange: (dates: DateChage) => void;
  focusInput: any;
  handleFocusInput: any;
}

const DatePicker: FunctionComponent<Props> = ({
  startDate,
  endDate,
  reserveDates,
  handleDateChange,
  focusInput,
  handleFocusInput,
}) => {
  const blockedDates = (day: Moment) => {
    if (reserveDates) {
      return reserveDates.includes(day!.format("YYYY-MM-DD"));
    } else {
      return false;
    }
  };

  return (
    <Wrapper>
      <DateRangePicker
        isDayBlocked={blockedDates}
        startDate={startDate}
        startDateId="start_date"
        endDate={endDate}
        endDateId="end_date"
        onDatesChange={handleDateChange}
        focusedInput={focusInput}
        onFocusChange={handleFocusInput}
        withPortal={true}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem 0;
`;

export default memo(DatePicker);
