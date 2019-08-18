import styled from "styled-components";

export const TextInfo = styled.span`
  font-size: 1rem;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 400;
  color: rgba(72, 72, 74, 1);
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0.4;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TextInfoCredits = styled.a`
  position: absolute;
  color: white;
  bottom: 15px;
  right: 15px;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.7;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 125px;

  ${({ left }) =>
    left &&
    `
    left: 15px;
    width: 165px;
    color: white !important;
  `}
`;

export const TextInfoMailing = styled.span`
  color: white;
  font-family: "SF Display", Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.7;
  text-decoration: none;
  margin: 3px 0;
`;

export const TextInfoMailingWrap = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  display: flex;
  flex-direction: column;
`;
