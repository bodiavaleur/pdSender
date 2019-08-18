import styled from "styled-components";

export const UserText = styled.span`
  color: black;
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

  ${({ text }) =>
    text &&
    `
    flex-direction: column;
    align-items: flex-end;
    width: 200px;
    margin-right: 5px;
  `}
`;
