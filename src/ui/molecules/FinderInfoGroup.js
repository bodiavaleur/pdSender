import styled from "styled-components";

export const FinderInfoGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${({ column }) =>
    column &&
    `
  width: 60%;
  margin-left: 10px;

  `}

  ${({ info }) =>
    info &&
    `
  width: 20%;

  `}
`;
