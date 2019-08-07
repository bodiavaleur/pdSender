import styled from "styled-components";

export const SenderPrefs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  align-self: center;
  flex-flow: row wrap;
  margin: auto;

  input:checked + label {
    background-color: rgb(255, 69, 58);
    color: white;
    opacity: 1;
  }

  input[type="radio"] {
    display: none;
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
  background: rgba(255, 255, 255, 0.5);
  border-radius: 100%;
  color: rgba(0, 0, 0, 0.5);
  margin: 5px;
  font-size: 1.35rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${({ inset }) =>
    inset &&
    `
    position: absolute;
    bottom: 1%;
    right: 1%;
  `}

  ${({ cubical }) =>
    cubical &&
    `
    border-radius: 14px;
    margin: 0 10px;
    width: 50px;
    height: 50px;
    background: rgba(255,255,255, 0.5);
  `}
`;
