import styled from "styled-components";

export const UserText = styled.span`
  color: rgb(255, 255, 255, 0.5);
  font-size: 0.9rem;

  ${({ email }) =>
    email &&
    `
  font-size: 0.7rem;
    color: rgb(99,99,102);
  `}
`;

export const UserWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 400px;
  font-family: "SF Display", Arial;
  cursor: default;

  ${({ text }) =>
    text &&
    `
    flex-direction: column;
    align-items: flex-end;
    width: 200px;
    margin-right: 5px;
  `}

  ${({ left }) =>
    left &&
    `
    width: 300px;
    margin-left: 5px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  `}

  ${({ bottom }) =>
    bottom &&
    `
    position: absolute;
    z-index: 1;
    width: 300px;
    bottom: 15px;
    left: 15px;
  justify-content: flex-start;
  `}
`;
