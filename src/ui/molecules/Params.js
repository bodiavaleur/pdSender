import styled from "styled-components";

export const ParamsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  font-family: "SF Display", Arial;
  font-weight: 500;
`;

export const ParamLabelBlock = styled.div`
  position: relative;
  background: none;
  padding: 10px;
  font-family: "SF Display", Arial;
  text-align: center;

  select {
    font-size: 0.9rem;
  }

  ${({ age }) =>
    age &&
    `

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  `}

  ${({ country }) =>
    country &&
    `
  
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  `}
`;

export const ParamLabel = styled.label`
  position: absolute;
  top: -7px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-size: 0.7rem;
  background: none;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.5);
  font-family: "SF Display", Arial;

  ${({ moderation }) =>
    moderation &&
    `
    right: auto;
  `}

  ${({ login }) =>
    login &&
    `
    background: white;
  `}

  ${({ modal }) =>
    modal &&
    `
    background: none;
    color: rgb(235, 235, 235, 0.3);
    font-size: 0.8rem;
    font-weight: 500;
    top: auto;
    left: auto;
    bottom: 7px;
  `}
`;
