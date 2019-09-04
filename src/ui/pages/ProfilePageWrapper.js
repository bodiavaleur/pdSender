import styled from "styled-components";

export const ProfilePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2;

  ${({ magic }) =>
    magic &&
    `
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  `}

  ${({ finder }) =>
    finder &&
    `
  flex-direction: column;
  `}

  ${({ profile }) =>
    profile &&
    `
  flex-flow: row wrap;
  overflow-y: scroll;
  ;

  ::-webkit-scrollbar {
    display: none;
  }
  `};
`;
