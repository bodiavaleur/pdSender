import { createGlobalStyle } from "styled-components";

export const UseGlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    overflow: hidden;
    background: black;
    scrollbar-width: none
  }

  input[type="radio"] {
    display: none;
  }

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
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
    background: linear-gradient(0deg, rgba(89,89,89,1) 0%, rgba(118,118,118,1) 100%) !important;
    padding: 10px 10px !important;
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

  .kenburns-top {
    -webkit-animation: kenburns-top 5s ease-out both;
            animation: kenburns-top 5s ease-out both;
  }
  
  .view {
    -webkit-perspective: 400;
            perspective: 400;
  }
  
  .plane {
    width: 120px;
    height: 120px;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    transition: color 1s ease;

  }
  .plane.main {
    margin-bottom: 25px;
    -webkit-transform: rotateX(60deg) rotateZ(-30deg);
            transform: rotateX(60deg) rotateZ(-30deg);
    -webkit-animation: rotate 20s infinite linear;
            animation: rotate 20s infinite linear;
    transition: color 1s ease;

  }
  .plane.main .circle {
    width: 120px;
    height: 120px;
    position: absolute;
    -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
    border-radius: 100%;
    box-sizing: border-box;
    box-shadow: 0 0 60px #61dafb, inset 0 0 60px #61dafb;
    transition: color 1s ease;
  }

  .circle-center {
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .red-circle  {
    box-shadow: 0 0 60px rgb(255,59,48), inset 0 0 60px rgb(255,59,48) !important;
  }

  .blue-circle  {
    box-shadow: 0 0 60px #61dafb, inset 0 0 60px #61dafb !important;
  }

  .orange-circle  {
    box-shadow: 0 0 60px rgb(255, 149, 0), inset 0 0 60px rgb(255, 149, 0) !important;
  }

  .green-circle  {
    box-shadow: 0 0 60px rgb(52, 199, 89), inset 0 0 60px rgb(52, 199, 89) !important;
  }

  .indigo-circle  {
    box-shadow: 0 0 60px rgb(90, 200, 250), inset 0 0 60px rgb(90, 200, 250) !important;
  }

  
  
  .plane.main .circle:nth-child(1) {
    -webkit-transform: rotateZ(72deg) rotateX(63.435deg);
            transform: rotateZ(72deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(2) {
    -webkit-transform: rotateZ(144deg) rotateX(63.435deg);
            transform: rotateZ(144deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(3) {
    -webkit-transform: rotateZ(216deg) rotateX(63.435deg);
            transform: rotateZ(216deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(4) {
    -webkit-transform: rotateZ(288deg) rotateX(63.435deg);
            transform: rotateZ(288deg) rotateX(63.435deg);
  }
  .plane.main .circle:nth-child(5) {
    -webkit-transform: rotateZ(360deg) rotateX(63.435deg);
            transform: rotateZ(360deg) rotateX(63.435deg);
  }
  
  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotateX(0) rotateY(0) rotateZ(0);
              transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    100% {
      -webkit-transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
              transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }
  
  @keyframes rotate {
    0% {
      -webkit-transform: rotateX(0) rotateY(0) rotateZ(0);
              transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    100% {
      -webkit-transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
              transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }


  @-webkit-keyframes kenburns-top {
    0% {
      -webkit-transform: scale(1) translateY(0);
              transform: scale(1) translateY(0);
      -webkit-transform-origin: 50% 16%;
              transform-origin: 50% 16%;
    }
    100% {
      -webkit-transform: scale(1.25) translateY(-15px);
              transform: scale(1.25) translateY(-15px);
      -webkit-transform-origin: top;
              transform-origin: top;
    }
  }
  @keyframes kenburns-top {
    0% {
      -webkit-transform: scale(1) translateY(0);
              transform: scale(1) translateY(0);
      -webkit-transform-origin: 50% 16%;
              transform-origin: 50% 16%;
    }
    100% {
      -webkit-transform: scale(1.25) translateY(-15px);
              transform: scale(1.25) translateY(-15px);
      -webkit-transform-origin: center;
              transform-origin: center;
    }
  }

  .text-focus-in {
    -webkit-animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
            animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }

  /* ----------------------------------------------
 * Generated by Animista on 2019-8-19 18:54:6
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-focus-in
 * ----------------------------------------
 */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}



`;
