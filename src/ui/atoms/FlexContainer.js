import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;

  ${({ center }) =>
    center &&
    `
    justify-content: center;
    align-items: center;
  `}

  ${({ column }) =>
    column &&
    `
    flex-flow: column nowrap;
  `}
`;
