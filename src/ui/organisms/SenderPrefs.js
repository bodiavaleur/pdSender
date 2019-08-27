import styled from "styled-components";

export const SenderPrefs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  align-self: center;
  flex-flow: row wrap;
  margin: auto;

  ${({ parse }) =>
    parse &&
    `
    width: auto;
  `}

  input:checked + label {
    background-color: rgb(0, 122, 255);
    color: white;
    opacity: 1;
  }
`;

export const PrefGroup = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  font-family: "SF Display", Arial, Helvetica,sans-serif;
      ${({ msgAttach }) =>
        msgAttach &&
        `
    align-items: flex-start;
  `}
      ${({ rightPanel }) =>
        rightPanel &&
        `
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    width: 65%;
    height: 75px;
  `}
      ${({ blacklist }) =>
        blacklist &&
        `
    position: absolute;
    left: 0;
    right: 0;
    top: 20px;
    
  `};
`;

export const PrefItem = styled.label`
  width: 45px;
  height: 45px;
  background: #626365;
  opacity: 0.8;
  color: #bcbcbd;
  border-radius: 100%;
  margin: 5px;
  font-size: 1.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  ${({ inset }) =>
    inset &&
    `
    position: absolute;
    bottom: 1%;
    right: 1%;
  `}
  
  ${({ stop }) =>
    stop &&
    `
    z-index: 12;
  `}

  ${({ cubical }) =>
    cubical &&
    `
    border-radius: 14px;
    margin: 0 10px;
    width: 50px;
    height: 50px;
    background: linear-gradient(0deg, rgba(50,50,50,0.5) 0%, rgba(65,65,65,0.5) 100%);
  box-shadow: 2px 2px 6px 2px rgba(0,0,0, 0.3);
  `}

  &:active {
    transform: scale(1.2);
  }
`;
