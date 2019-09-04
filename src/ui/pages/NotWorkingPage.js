import styled from "styled-components";
export const NotWorkingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.7);
  position: absolute;
  z-index: 9999;
  text-align: center;
  font-family: "SF Display", Arial;
`;

export const BlockSign = styled.span`
  font-weight: 600;
  font-size: 10rem;
  color: rgb(255, 69, 58);
  margin: 30px;
`;

export const BlockText = styled.span`
  font-family: "SF Display", Arial;
  font-size: ${props => props.size + "rem"};
  color: rgba(255, 255, 255, 0.5);
  line-height: 2rem;
  cursor: default;

  ${({ bold }) =>
    bold &&
    `
    display: flex;
    width: 230px;
    justify-content: space-around;
    font-weight: 600;
    margin: 45px auto;
    align-items: flex-end;
  `}
`;
