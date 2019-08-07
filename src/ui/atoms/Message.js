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
  color: rgba(72, 72, 74, 1);
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-weight: 600;
  line-height: 1.3rem;
  overflow-y: scroll;

  ::placeholder {
    color: rgba(0, 0, 0, 0.35);
  }

  ::-webkit-scrollbar {
    display: none;
  }

  ${({ input }) =>
    input &&
    `
    width: 75px;
    height: 100px;
    background: rgba(242, 242, 247, 1);
    width: 90%;
    height: 90%;
  `}
`;
