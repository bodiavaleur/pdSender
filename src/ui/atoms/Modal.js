import styled from "styled-components";

export const Modal = styled.div`
  display: flex;
  width: ${props => props.w};
  height: ${props => props.h};
  // background: rgba(242, 242, 247, 0.5);
  background: rgb(50,50,50);
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(50,50,50,0.5) 0%, rgba(65,65,65,0.5) 100%);
  box-shadow: 2px 2px 6px 2px rgba(0,0,0, 0.3);
  align-items: center;
  margin: 15px;
  position: relative;

  ${({ center }) =>
    center &&
    `
    justify-content: center;
    align-items: center;
  `}


  ${({ profile }) =>
    profile &&
    `
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin: 50px;
     transition: box-shadow 0.2s ease-in, transform 0.3s ease-in;
     &:active {
       transform: scale(1.05)
     }
  `}

${({ switches }) =>
  switches &&
  `
    flex-direction: column;
    justify-content: space-evenly;
    // color: rgb(99, 99, 102);
    color: rgba(255,255,255, 0.5);
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
    top: 10%;
    overflow-y: scroll;
    background: linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(65,65,65,1) 100%);
    box-shadow: 2px 2px 6px 2px rgba(0,0,0, 0.3);


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
  color: rgba(255,255,255, 1);
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
  background: linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(65,65,65,1) 100%);
  box-shadow: 2px 2px 6px 2px rgba(0,0,0, 0.3);
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
  color: rgba(255,255,255, 1);
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
  background: linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(65,65,65,1) 100%);
  box-shadow: 2px 2px 6px 2px rgba(0,0,0, 0.3);
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
  background: linear-gradient(0deg, rgba(50,50,50,1) 0%, rgba(65,65,65,1) 100%);
  box-shadow: 2px 2px 6px 2px rgba(0,0,0, 0.3);
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
  font-family: 'SF Display', Arial;
  font-weight: bold;
  color: rgba(255,255,255, 0.5);
  `}

  ${({ selected }) =>
    selected &&
    `
    box-shadow: 0 0 10px #61dafb, inset 0 0 10px #61dafb;
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

export const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
