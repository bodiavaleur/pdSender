import { fetchFemaleData, getBonuses, getLimit } from "./api";
import Iframe from "react-iframe";
import React, { Component } from "react";
import ProfilePage from "./components/pages/ProfilePage";
import SenderPage from "./components/pages/SenderPage";
import MailingPage from "./components/pages/MailingPage";
import { UseGlobalStyle } from "./ui/pages/UseGlobalStyle";
import "./ui/pages/resets.css";
import { connect } from "react-redux";
import { SET_FEMALE_DATA, SET_BONUSES, SET_USER_DATA } from "./redux/actions";
import {
  ArrowButton,
  TextInfoCredits,
  Button,
  Input,
  InputGroup
} from "./ui/atoms";
import TopPanel from "./components/organisms/TopPanel";
import { TOGGLE_TOP_PANEL } from "./redux/ui/uiActions";
import NotWorking from "./components/pages/NotWorking";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { HeartSpinner } from "react-spinners-kit";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase/firebaseConfig";
import PrivateRoute from "./components/atoms/PrivateRoute";
import { PageWrapper } from "./ui/pages/Login";
import { ParamLabel, ParamLabelBlock } from "./ui/molecules";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  emailProvider: new firebase.auth.EmailAuthProvider()
};

class PrimeDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "test@gmail.com",
      password: "123123123",
      loggedIn: false
    };

    this.toggleTopPanel = this.toggleTopPanel.bind(this);
    this.countBonuses = this.countBonuses.bind(this);
    this.authUser = this.authUser.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);

    this.state = {
      audio50: document.getElementById("audio50"),
      audio10: document.getElementById("audio10"),
      audio5: document.getElementById("audio5"),
      audio2: document.getElementById("audio2")
    };
  }

  toggleTopPanel() {
    return this.props.dispatch({ type: TOGGLE_TOP_PANEL });
  }

  countBonuses(update = false) {
    return getBonuses(bonuses => {
      const current = this.props.currentBonuses;

      if (update) {
        if (bonuses - current >= 50 && bonuses - current <= 60) {
          this.state.audio50.play();
        }

        if (bonuses - current >= 10 && bonuses - current < 50) {
          this.state.audio10.play();
        }

        if (bonuses - current >= 5 && bonuses - current < 10) {
          this.state.audio5.play();
        }

        if (bonuses - current >= 2 && bonuses - current < 5) {
          this.state.audio2.play();
        }
      }

      this.props.dispatch({ type: SET_BONUSES, payload: bonuses });
    });
  }

  handleLoginChange(evt) {
    const { value, name } = evt.target;
    this.setState({ [name]: value });
  }

  authUser() {
    return async () => {
      await this.props.signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
      localStorage.setItem(
        "authToken",
        this.props.user ? this.props.user.refreshToken : ""
      );
      this.setState({ loggedIn: true });
    };
  }

  componentDidMount() {
    setInterval(() => this.countBonuses(true), 2000);
    fetchFemaleData(model =>
      this.props.dispatch({ type: SET_FEMALE_DATA, payload: model })
    );
  }

  render() {
    document.title = `Sender | ${this.props.currentBonuses}`;
    return (
      <Router>
        <UseGlobalStyle />

        {!!this.props.user &&
          (this.props.showTopPanel ? (
            <TopPanel toggleTopPanel={this.toggleTopPanel} />
          ) : (
            <ArrowButton onClick={this.toggleTopPanel}>
              <i className="fas fa-chevron-down" />
            </ArrowButton>
          ))}

        <Iframe
          key="pdIframe"
          url="https://beta.prime.date/#chat"
          id="pdFrame"
          width="0"
          height="0"
          display="none"
        />

        {!!this.props.modelData.length && (
          <Redirect to={process.env.PUBLIC_URL + "/error"} />
        )}

        <Switch>
          <PrivateRoute
            exact
            path={process.env.PUBLIC_URL + "/profile"}
            component={ProfilePage}
          />
          <PrivateRoute
            exact
            path={process.env.PUBLIC_URL + "/sender"}
            component={SenderPage}
            user={this.props.user}
          />
          <PrivateRoute
            exact
            path={process.env.PUBLIC_URL + "/mailing"}
            component={MailingPage}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/error"}
            component={NotWorking}
          />
        </Switch>

        {!!localStorage.getItem("authToken") ? (
          <Redirect to={process.env.PUBLIC_URL + "/profile"} />
        ) : (
          <PageWrapper>
            <InputGroup>
              <ParamLabelBlock>
                <ParamLabel login>Email</ParamLabel>
                <Input login name="email" onChange={this.handleLoginChange} />
              </ParamLabelBlock>
              <ParamLabelBlock>
                <ParamLabel login>Password</ParamLabel>
                <Input
                  login
                  name="password"
                  type="password"
                  onChange={this.handleLoginChange}
                />
              </ParamLabelBlock>
            </InputGroup>
            <Button onClick={this.authUser()}>SIGN IN</Button>
          </PageWrapper>
        )}

        <TextInfoCredits href="https://t.me/bodiavaleur" target="_blank">
          by Bodyan with
          <HeartSpinner size={20} color="red" loading={true} />
        </TextInfoCredits>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  modelData: state.pdReducer.modelData,
  showTopPanel: state.uiReducer.showTopPanel,
  modeFilters: state.pdReducer.modeFilters,
  message: state.pdReducer.message,
  showProfilePage: state.uiReducer.showProfilePage,
  showSenderPage: state.uiReducer.showSenderPage,
  showMailingPage: state.uiReducer.showMailingPage,
  currentBonuses: state.pdReducer.currentBonuses
});

export default connect(mapStateToProps)(
  withFirebaseAuth({ providers, firebaseAppAuth })(PrimeDate)
);
