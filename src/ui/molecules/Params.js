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
  border: 1px solid rgba(72, 72, 74, 0.3);
  border-radius: 15px;
  position: relative;
  background: none;
  padding: 10px;
  font-family: "SF Display", Arial;

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
  left: 15px;
  font-size: 0.7rem;
  color: white;
  background: rgba(242, 242, 247, 1);
  padding: 0 10px;
  color: rgb(142, 142, 147);
  font-family: "SF Display", Arial;

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
