import styled from "styled-components";

export const ProfileBackground = styled.div`
  position: absolute;
  width: 105%;
  height: 105%;
  top: -2.5%;
  left: -2.5%;
  filter: blur(20px);
  background-repeat: none;
  background-size: cover;
  background-position: 50% 50%;
  z-index: -1;
  ${({ img }) => img && `background-image: url(${img})`}
`;
