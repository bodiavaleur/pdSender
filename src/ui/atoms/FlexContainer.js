import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  height: ${props => props.height};

  ${({ center }) =>
    center &&
    `
    justify-content: center;
    align-items: center;
  `}

  ${({ around }) =>
    around &&
    `
    justify-content: space-around;
    align-items: center;
  `}

  ${({ column }) =>
    column &&
    `
    flex-flow: column nowrap;
  `};
`;
