import styled from "styled-components";


const calenderWrapper = styled.div`
.rbc-toolbar button:hover {
  background-color: #31313159;
}
.rbc-date-cell.rbc-now  button{
  color: white;
}
.rbc-events-container{
  width: 100%;
}
  .rbc-time-column {
    height: 150% !important; 
  }
  .rbc-time-header{
    border-right: 0;
    margin-right: 0px !important;
  }
  .rbc-button-link span {
    white-space: 'pre-line';
  }
  .rbc-btn-group {
    background-color: #EDEDED !important;
    border-radius: 16px;
  }
  .rbc-addons-dnd {
    max-width: 100% !important;
  }
  .rbc-label {
    // padding: 8px 6px;
    // font-family: "muli-semi-bold";
  }
  .rbc-toolbar button.rbc-active{
    background-color: #4C8AB1;
    border-radius: 16px;
  } 
  .rbc-today {
    background-color: "transparent";
  }
  .rbc-agenda-view table {
    tbody > tr > td {
      padding: 12px 6px;
    }
  }
  .rbc-time-view {
    border: 0px solid #dae5f0;
    border-bottom: 0;
    .rbc-time-header-content {
      border: 0;
      // padding-right: 12px;
      .rbc-allday-cell {
        height: 0px;
      }
    }
  }
  .rbc-header {
    border: 0 !important;
    text-align: center !important;
    min-height: 25px;
    color: #484848;
    text-align: center;
    font-size: 13px;
    span {
      font-family: Inter, sans-serif;
      white-space: pre-line !important;
    }
  }
  .rbc-month-view {
    border: 0;
    padding-left: 5px;
    .rbc-month-row {
      border: 0;
      min-height: 80px;
     
    }
  }
  .rbc-day-slot .rbc-time-slot {
    opacity: 0.5;
  }
  .rbc-day-slot .rbc-event-label{
    display: none;
  }
  .rbc-time-gutter {
    border-top: 0px solid #dae5f0;
    font-family: Montserrat, sans-serif;
    color: #6A6A6A;
  }
  rbc-time-gutter rbc-time-column{

  }
  .rbc-timeslot-group {rbc-event
    min-height: 64px;
    border-bottom: 1px solid #dae5f0;
  }
  .rbc-time-content {
    border: 0;
    scrollbar-width: none;
  }
  .rbc-date-cell {
    padding: 4px;
    font-size: 16px !important;
    text-align: center;
    > a {
      color: #6c757d !important;
      font-family: "muli-semi-bold";
    }
  }

  .rbc-date-cell button {
    padding: 4px;
    text-align: center;
    color: #9B9B9B;
    font-family: "Inter", sans-serif !important;
    font-weight: 600 !important;
    font-size: 12px;
  }
  .rbc-event.rbc-selected {
    background-color: transparent;
  }

  .rbc-show-more {
    color: #563c91;
  }

  .rbc-event {
    max-width: 100% !important;
    width: 100% !important;
    // border-radius: 4;
    //padding: 2px 10px;
    padding:0px !important;
    // min-height: 40px !important;
    background-color: transparent;
    color: black;
    border: 0px;
    // border-right: 6px solid #563c91;
    // box-shadow: 0 0.46875rem 2.1875rem rgba(0, 0, 0, 0.03),
    //   0 0.9375rem 1.40625rem rgba(0, 0, 0, 0.03),
    //   0 0.25rem 0.53125rem rgba(0, 0, 0, 0.05),
    //   0 0.125rem 0.1875rem rgba(0, 0, 0, 0.03);
    .rbc-event-content {
      font-size: 14px;
      font-family: "muli-semi-bold";
      white-space: pre-line;
    }
    &:focus {
      outline: 0 !important;
    }
  }

  .rbc-month-row {
    .rbc-event {
      // min-height: 20px !important;
    }
  }

  .rbc-row-segment {
    padding: 0;
    margin-top: 2px;

  .rbc-addons-dnd
    .rbc-addons-dnd-resizable-month-event
    .rbc-addons-dnd-resize-month-event-anchor:first-child {
    left: 0;
    top: 0;
    bottom: 0;
    height: auto;
  }
  .rbc-addons-dnd
    .rbc-addons-dnd-resizable-month-event
    .rbc-addons-dnd-resize-month-event-anchor:last-child {
    right: 0;
    top: 0;
    bottom: 0;
    height: auto;
  }

  .rbc-day-bg {
    border: 1px solid #dae5f0 !important;
    margin: 1px;
    border-radius: 6px;
  }

  .rbc-allday-cell {
    .rbc-row-bg {
      .rbc-day-bg {
        border: 1px solid #dae5f0 !important;
        border-top: 0 !important;
        border-right: 0 !important;
        margin: 0px !important;
        border-radius: 0px !important;
      }
    }
  }

  .rbc-off-range-bg {
    background: #f1f2f5 !important;
  }

  .rbc-agenda-view table.rbc-agenda-table {
    border: 0 !important;
    .rbc-agenda-date-cell {
      font-family: "muli-bold" !important;
    }
    td,
    span {
      font-family: "muli-regular";
      font-size: 13px;
      color: #6c757d !important;
    }
  }

  .rbc-agenda-content {
    border: 1px solid #dae5f0 !important;
    margin-top: 10px;
  }

  .calender-toolbar-container {
    background-color: #fff;
    margin: 0px -15px 15px;
    // box-shadow: 0 0.46875rem 2.1875rem rgba(0,0,0,0.03), 0 0.9375rem 1.40625rem rgba(0,0,0,0.03), 0 0.25rem 0.53125rem rgba(0,0,0,0.05), 0 0.125rem 0.1875rem rgba(0,0,0,0.03);
    border-radius: 6px 6px 0px 0px;
    // border: 1px solid rgba(0,0,0,0.125);
    padding: 15px;

    .label-date {
      b {
        font-family: "muli-bold";
      }
      span {
        font-family: "muli-medium";
      }
    }

    .navigation-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        background-color: white;
        color: #563c91;
        transition: all 0.3s ease-in;
        &:hover {
          box-shadow: 0 0.46875rem 2.1875rem rgba(0, 0, 0, 0.03),
            0 0.9375rem 1.40625rem rgba(0, 0, 0, 0.03),
            0 0.25rem 0.53125rem rgba(0, 0, 0, 0.05),
            0 0.125rem 0.1875rem rgba(0, 0, 0, 0.03);
          border-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.125);
        }
        &:focus {
          box-shadow: none;
        }
        @media (max-width: 575.98px) {
          margin-left: 5px;
        }
      }
    }
  }

  .filter-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    @media (max-width: 575.98px) {
      .title {
        min-width: 100%;
        margin-left: 5px;
        margin-bottom: 10px;
      }
      flex-wrap: wrap;
    }
    .btn {
      background-color: white;
      padding: 0;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      transition: all 0.3s ease-in;
      &:hover {
        box-shadow: 0 0.46875rem 2.1875rem rgba(0, 0, 0, 0.03),
          0 0.9375rem 1.40625rem rgba(0, 0, 0, 0.03),
          0 0.25rem 0.53125rem rgba(0, 0, 0, 0.05),
          0 0.125rem 0.1875rem rgba(0, 0, 0, 0.03);
        border-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.125);
      }
      &:focus {
        box-shadow: none;
      }
    }
  }
`;

export default calenderWrapper;
