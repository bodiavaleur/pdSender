import styled from "styled-components";

export const DisplayMessages = styled.div`
  overflow-y: scroll;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5%;
  height: 600px;
  width: 400px;
  padding: 20px;
  margin: auto 0;
  z-index: 11;
  color: rgba(72, 72, 74, 1);

  ::-webkit-scrollbar {
    display: none;
  }
`;
