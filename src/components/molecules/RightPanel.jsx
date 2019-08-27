import React from "react";
import { PrefItem, PrefGroup } from "../../ui/organisms";
import { Link } from "react-router-dom";
import TooltipPref from "../atoms/TooltipPref";

const RightPanel = props => {
  return (
    <React.Fragment>
      <PrefGroup rightPanel>
        <PrefItem cubical onClick={props.toggleBlacklist} id="blackList">
          <i className="fas fa-user-lock" />
        </PrefItem>
        <PrefItem cubical onClick={props.toggleListing} id="toggleListing">
          <i className="fas fa-clipboard-list" />
        </PrefItem>
        <PrefItem cubical onClick={props.toggleSendParams} id="sendParams">
          <i className="fas fa-search" />
        </PrefItem>
        <Link to={process.env.PUBLIC_URL + "/mailing"}>
          <PrefItem cubical onClick={props.startSender}>
            <i className="fas fa-play" />
          </PrefItem>
        </Link>
      </PrefGroup>

      <TooltipPref target="blackList" container="blackList" label="Blacklist" />
      <TooltipPref
        target="toggleListing"
        container="toggleListing"
        label="List"
      />
      <TooltipPref target="sendParams" container="sendParams" label="Filters" />
    </React.Fragment>
  );
};

export default RightPanel;
