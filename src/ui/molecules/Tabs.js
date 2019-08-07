import styled from "styled-components";

export const Tab = styled.div`
  width: 75px;
  height: 25px;
  border: 1.65px solid rgb(255, 69, 58);
  border-right: none;
  border-left: none;
  line-height: 20px;
  text-align: center;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.85rem;
  font-weight: bold;
  color: rgb(0, 0, 0, 0.5);
  cursor: pointer;

  &:nth-child(2) {
    border-right: 1.65px solid rgb(255, 69, 58);
  }

  &:first-child {
    border-radius: 10px 0 0 10px;
    border: 1.65px solid rgb(255, 69, 58);
  }

  &:last-child {
    border-radius: 0 10px 10px 0;
    border: 1.65px solid rgb(255, 69, 58);
  }

  ${({ vertical }) =>
    vertical &&
    `
    border: none !important;
    font-size: 1.5rem;
    color: rgb(0,0,0, 0.5);
    height: 45px;
    line-height: 45px;

    &:nth-child(2) {
      border-radius: 0;
    }
  
    &:first-child {
      border-radius: 10px 10px 0 0;

    }
  
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
`}

  ${({ red }) =>
    red &&
    `
    background: rgb(255, 69, 58);
    color: white;
`}
`;

export const TabsWrapper = styled.div`
  width: 100%;
  height: 25px;
  margin: 30px auto;
  display: flex;
  justify-content: center;

  ${({ vertical }) =>
    vertical &&
    `
   flex-direction: column;
   height: 100%;
   position: absolute;
   margin: 0;
   border-radius: 15px;
`}
`;
