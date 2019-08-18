import styled from "styled-components";

export const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-left: 20px;

  ${({ links }) =>
    links &&
    `
    width: 100px;
  `}
`;
