import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #ff6348;
    --red: #ff4757;
    --light-gray: #eaeaea;
  }

  * {
    padding: 0;
    margin: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
  }

  #logo {
    font-family: 'Lobster', cursive;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input[readonly] {
    cursor: not-allowed;
    color: #777;
  }

  input {
    width: 100%;
    padding: 0.575rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  textarea {
    font-family: inherit;
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    overflow: auto;
    resize: vertical;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .swiper-pagination-bullet {
    background: #bebebe;
  }

  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: white;
  }

  .DateRangePicker, .DateRangePickerInput {
    width: 100%
  }

  .CalendarDay__blocked_calendar, 
  .CalendarDay__blocked_calendar:active, 
  .CalendarDay__blocked_calendar:hover {
    background: none;
    border: 1px solid #e4e7e7;
    color: #cacccd;
  }

  .pagination {
    margin: 3rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      margin: 0 1rem;
      list-style: none;
      color: var(--primary);
      cursor: pointer;
      border-radius: 5px;

      a {
        display: block;
        padding: 0.3rem 0.7rem;
        outline: none;
      }

      &.active {
        border: 1px solid;
      }
    }
  }

`;

export default GlobalStyle;
