import styled from "styled-components";

export const Modal = styled.div`
  display: flex;
  width: ${props => props.w};
  height: ${props => props.h};
  background: rgba(242, 242, 247, 0.5);
  border-radius: 15px;
  box-shadow: 2px 6px 15px rgba(44, 44, 46, 0.8);
  align-items: center;
  margin: 15px;
  position: relative;

  ${({ profile }) =>
    profile &&
    `
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin: auto;
  `}

${({ switches }) =>
  switches &&
  `
    flex-direction: column;
    justify-content: space-evenly;
    // color: rgb(99, 99, 102);
    color: rgba(72, 72, 74, 0.7);
    text-align: left;
    position: relative;

    input {
      display: none;
    }
  `}

  ${({ prefGroup }) =>
    prefGroup &&
    `
    flex-flow: row wrap;
    justify-content: space-evenly;
    position: relative;
  `}

${({ message }) =>
  message &&
  `
  flex-flow: row wrap;
  align-items: center;
    padding: 2px 6px;
    position: relative;
    margin-bottom: 15px;
  `}

${({ gallery }) =>
  gallery &&
  `
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
    padding: 2px 6px;
    position: absolute;
    z-index: 10;
    opacity: 0.9;
    top: 10%;
    overflow-y: scroll;
  background: rgba(242, 242, 247, 0.9);


    ::-webkit-scrollbar {
      display: none
    }
  `}

${({ attachments }) =>
  attachments &&
  `
  align-items: center;
  margin: 0;
  margin-top: 25px;
  `}

${({ displayMessage }) =>
  displayMessage &&
  `
  margin: 25px 0;
  color: rgba(72, 72, 74, 1);
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'SF Display', Arial;
  padding: 15px;
  overflow-y: scroll;
  height: auto;
  min-height: auto;

  ::-webkit-scrollbar { 
    display: none; 
}
  `}

${({ blacklist }) =>
  blacklist &&
  `
  width: 300px;
  height: 700px;
  position: absolute;
  margin: auto 0;
  right: 0;
  background: rgba(242, 242, 247, 0.9);
  border-radius: 15px 0 0 15px;

  z-index: 10;
  overflow-y: scroll;

  ::-webkit-scrollbar { 
    display: none; 
}
  `}

${({ messageBlock }) =>
  messageBlock &&
  `
  padding: 15px;
  font-weight: bold;
  margin: 15px;
  cursor: pointer;
  position: relative;
  color: rgba(72, 72, 74, 1);
  font-family: 'SF Display', Arial;
  height: 50px;
  `}


  ${({ params }) =>
    params &&
    `
  width: 300px;
  height: 700px;
  position: absolute;
  right: 0;
  z-index: 10;
  background: rgba(242, 242, 247, 1);
  border-radius: 15px 0 0 15px;
  `}

  ${({ listing }) =>
    listing &&
    `
  width: 300px;
  height: 700px;
  position: absolute;
  right: 0;
  z-index: 10;
  background: rgba(242, 242, 247, 0.9);
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
  `}
`;

export const ModalGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  justify-content: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;
