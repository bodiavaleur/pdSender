import React, { Component } from "react";
import { connect } from "react-redux";
import { TopBar, NavbarWrapper } from "../../ui/molecules";
import {
  Shade,
  NavbarItem,
  NavbarItemIcon,
  NavbarItemLabel,
  UserText,
  ProfileAvatar,
  UserWrapper,
  Button
} from "../../ui/atoms";
import {
  TOGGLE_SENDER_PAGE,
  TOGGLE_PROFILE_PAGE
} from "../../redux/ui/uiActions";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-router-dom";

class TopPanel extends Component {
  constructor(props) {
    super(props);

    this.redirectTo = this.redirectTo.bind(this);
  }

  redirectTo(page) {
    switch (page) {
      case "sender":
        this.props.dispatch({ type: TOGGLE_SENDER_PAGE });
        break;

      case "profile":
        this.props.dispatch({ type: TOGGLE_PROFILE_PAGE });
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Spring
          from={{
            top: "-64px"
          }}
          to={{
            top: "0"
          }}
        >
          {props => (
            <TopBar style={props}>
              <NavbarWrapper>
                <NavbarWrapper links>
                  <Link to={process.env.PUBLIC_URL + "/profile"}>
                    <NavbarItem>
                      <NavbarItemIcon>
                        <i className="far fa-user" />
                      </NavbarItemIcon>
                      <NavbarItemLabel>Profile</NavbarItemLabel>
                    </NavbarItem>
                  </Link>

                  <Link to={process.env.PUBLIC_URL + "/sender"}>
                    <NavbarItem>
                      <NavbarItemIcon>
                        <i className="far fa-paper-plane" />
                      </NavbarItemIcon>
                      <NavbarItemLabel>Sender</NavbarItemLabel>
                    </NavbarItem>
                  </Link>

                  <Link to={process.env.PUBLIC_URL + "/magic"}>
                    <NavbarItem>
                      <NavbarItemIcon>
                        <i className="fas fa-magic" />
                      </NavbarItemIcon>
                      <NavbarItemLabel>Magic</NavbarItemLabel>
                    </NavbarItem>
                  </Link>
                </NavbarWrapper>
                <UserWrapper>
                  <UserWrapper text>
                    <UserText>{this.props.user.email.split("@")[0]}</UserText>
                    <UserText email>{this.props.user.email}</UserText>
                  </UserWrapper>
                  <ProfileAvatar
                    w="32px"
                    h="32px"
                    src="http://mumbaigrill.com.au/img/user.png"
                  />
                  <Button logout onClick={this.props.userLogout}>
                    Log out
                  </Button>
                </UserWrapper>
              </NavbarWrapper>
            </TopBar>
          )}
        </Spring>

        <Shade onClick={this.props.toggleTopPanel} full />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  showTopPanel: state.uiReducer.showTopPanel,
  showSenderPage: state.uiReducer.showSenderPage
});

export default connect(mapStateToProps)(TopPanel);
