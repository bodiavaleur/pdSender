import styled from "styled-components";

export const Message = styled.textarea`
  border-radius: 20px;
  background: rgba(0, 0, 0, 0);
  font-size: 1.1rem;
  padding: 10px 15px;
  width: 100%;
  height: 90%;
  margin: auto 0;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-weight: 600;
  line-height: 1.3rem;
  overflow-y: scroll;
  scrollbar-width: none

  ::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  ::-webkit-scrollbar {
    display: none;
  }

  ${({ input }) =>
    input &&
    `

    background: linear-gradient(0deg, rgba(89,89,89,1) 0%, rgba(118,118,118,1) 100%);
    width: 90%;
    height: 85%;
  `}
`;
