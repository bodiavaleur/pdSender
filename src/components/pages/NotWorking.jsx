import React from "react";
import {
  NotWorkingWrapper,
  BlockSign,
  BlockText
} from "../../ui/pages/NotWorkingPage";
import { Link } from "react-router-dom";

const NotWorking = () => {
  return (
    <NotWorkingWrapper>
      <BlockSign>
        <i className="fas fa-ban" />
      </BlockSign>
      <BlockText bold size={3}>
        Sender not working!
      </BlockText>
      <BlockText>
        Possible solutions:
        <ul>
          <li>
            Log in to PrimeDate and then <Link to="/">click here</Link>
          </li>
          <li>
            Add to Chrome shortcut --disable-web-security
            --user-data-dir="C:\PD"
          </li>
        </ul>
        If you still have problems,{" "}
        <a href="https://t.me/bodiavaleur" target="_blank">
          contact me
        </a>
      </BlockText>
    </NotWorkingWrapper>
  );
};

export default NotWorking;
