import React from "react";
import { ButtonStart } from "../../ui/atoms";
import { PrefItem, PrefGroup } from "../../ui/organisms";
import { Link } from "react-router-dom";
const RightPanel = props => {
  return (
    <PrefGroup rightPanel>
      <PrefItem cubical onClick={props.toggleBlacklist}>
        <i className="fas fa-user-lock" />
      </PrefItem>
      <PrefItem cubical onClick={props.toggleListing}>
        <i className="fas fa-clipboard-list" />
      </PrefItem>
      <PrefItem cubical onClick={props.toggleSendParams}>
        <i className="fas fa-search" />
      </PrefItem>
      <Link to="/mailing">
        <PrefItem cubical onClick={props.startSender}>
          <i className="fas fa-play" />
        </PrefItem>
      </Link>
    </PrefGroup>
  );
};

export default RightPanel;
