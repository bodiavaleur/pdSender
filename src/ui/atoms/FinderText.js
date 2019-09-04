import styled from "styled-components";

export const FinderText = styled.span`
  font-family: "SF Display", Arial, sans-serif;
  ${({ weight }) => weight && `font-weight: ${weight}`};
  ${({ size }) => size && `font-size: ${size}`};
  ${({ color }) =>
    color ? `color: ${color}` : `color: rgba(255,255,255, 0.5)`};
  ${({ marginY }) =>
    marginY && `margin-bottom: ${marginY}; margin-top: ${marginY}`};
  ${({ marginX }) =>
    marginX && `margin-left: ${marginX}; margin-right: ${marginX}`};
  ${({ width }) => width && `width: ${width}`};

  ${({ scroll }) =>
    scroll &&
    `
    overflow-y: scroll; 
    ::-webkit-scrollbar {
      display: none;
    }`};
`;
