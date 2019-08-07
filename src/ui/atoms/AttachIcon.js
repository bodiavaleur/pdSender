import styled from "styled-components";

export const AttachIcon = styled.div`
  width: 75px;
  height: 75px;
  background: url(${props => props.src});
  background-size: cover;
  margin: 2.5px;
  position: relative;

  ${({ xs }) =>
    xs &&
    `
    width: 25px;
    height: 25px;
    border-radius: 100%;
    position: absolute;
    z-index: 2;
    right: -3%;
    bottom: -3%;
    box-shadow: 0 0 10px;
  `}

  ${({ lg }) =>
    lg &&
    `
    width: 100px;
    height: 100px;
  `}
`;

export const AttachIconLabel = styled.span`
  width: 100px;
  text-align: center;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
`;
