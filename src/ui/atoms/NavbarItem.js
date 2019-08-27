import styled from "styled-components";

export const NavbarItem = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-weight: bold;
  margin: 0 20px;
  cursor: pointer;
  color: rgb(255, 255, 255, 0.5);

  ${({ selected }) =>
    selected &&
    `
    color: rgb(0, 122, 255);
  `}
`;

export const NavbarItemIcon = styled.div`
  font-size: 2rem;
`;

export const NavbarItemLabel = styled.span`
  font-size: 0.9rem;
  margin: 5px 0;
`;
