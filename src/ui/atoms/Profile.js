import styled from "styled-components";

export const ProfileAvatar = styled.div`
  width: ${props => props.w};
  height: ${props => props.h};
  border-radius: 100%;
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  ${({ modal }) =>
    modal &&
    `
    margin: 20px 0;
  `}

  ${({ cubic }) =>
    cubic &&
    `
  border-radius: 15px;
  box-shadow: 0 0 3px 3px rgba(20,20,20, 0.3);
  `}
`;

export const ProfileText = styled.span`
  color: rgb(255, 255, 255, 0.5);
  margin: 15px 0;
  font-family: "SF Display", Arial, Helvetica, sans-serif;

  ${({ title }) =>
    title &&
    `
    font-size: 2rem;
    font-weight: 500;
  `}
  ${({ about }) =>
    about &&
    `
    font-size: 1.2rem;
  `};

  ${({ name }) =>
    name &&
    `
    font-size: 1.1rem;
  

  `};
`;
