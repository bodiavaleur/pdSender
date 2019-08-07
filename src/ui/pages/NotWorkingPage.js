import styled from "styled-components";
export const NotWorkingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  background: white;
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
  font-size: ${props => props.size + "rem"};
  color: rgb(44, 44, 46);
  line-height: 2rem;

  ${({ bold }) =>
    bold &&
    `
    font-weight: 600;
    margin: 45px 0;
  `}
`;
