import styled from "styled-components";

export const IconButton = styled.div`
  width: 40px;
  height: 40px;
  font-size: 2.4rem;

  ${({ red }) =>
    red &&
    `
    color: rgb(255, 59, 48);
  `}

  ${({ orange }) =>
    orange &&
    `
    color: rgb(255, 159, 10);
  `}
`;
