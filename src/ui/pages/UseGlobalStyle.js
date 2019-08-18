import { createGlobalStyle } from "styled-components";

export const UseGlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    overflow: hidden;
    background: black;

  }

  #root {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .list-group-item{
    display: flex !important;
    justify-content: space-between !important;
  }

  .rangeslider.rangeslider-vertical {
    background: white !important;
    border-radius: 15px;
    width: 40px !important;
    max-width: auto !important;
  }

  .rangeslider__fill {
    background: rgb(0, 122, 255) !important;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .rangeslider__handle {
    width: 20px !important;
    height: 10px !important;
    border-radius: 10px;
    left: -5px !important;

    ::after {
      display: none !important;
    }
  }

  .overflow-y {
    overflow: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .text-center {
    text-align: center;
  }

  .grey {
    color: rgb(142, 142, 147);
  }

  .f-md {
    font-size: 1.4rem;
  }

  .f-sm {
    font-size: 1.1rem;
  }
  
  
  .topleft {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  a {
    text-decoration: none !important;
    outline:none !important;
  }

  .tooltip {
    top: auto !important;
    left: auto !important;
    transform: none !important;
  }
`;
