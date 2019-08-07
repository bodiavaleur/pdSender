import styled from "styled-components";

export const Shade = styled.div`
  height: 100%;
  width: 100%;
  opacity: 0.4;
  background: black;
  position: absolute;
  z-index: 9;
  top: ${props => (props.full ? "0" : "75px")};
  left: 0;
`;
