import styled from "styled-components";

export const Line = styled.hr`
  ${({ horizontal }) =>
    horizontal &&
    `
    position: absolute;
    background: black;
    width: 80%;
    top: 39%;
    opacity: 0.1;
  `}

  ${({ vertical }) =>
    vertical &&
    `
    position: absolute;
    width: 1px;
    height: 50%;
    top: 1%;
    left: 50%;
    opacity: 0.2;
  `}

  ${({ smH }) =>
    smH &&
    `
    width: 50%;
  `}
`;
