import { fetchFemaleData, getBonuses, getLimit, login, logout } from "./api";
import Iframe from "react-iframe";
import React, { Component } from "react";
import ProfilePage from "./components/pages/ProfilePage";
import SenderPage from "./components/pages/SenderPage";
import MailingPage from "./components/pages/MailingPage";
import MagicPage from "./components/pages/MagicPage";
import { UseGlobalStyle } from "./ui/pages/UseGlobalStyle";
import "./ui/pages/resets.css";
import { connect } from "react-redux";
import { SET_FEMALE_DATA, SET_BONUSES, SET_USER_DATA } from "./redux/actions";
import {
  ArrowButton,
  TextInfoCredits,
  Button,
  Input,
  InputGroup,
  Logo,
  ProfileBackground
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

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  emailProvider: new firebase.auth.EmailAuthProvider()
};

class PrimeDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false
    };

    this.toggleTopPanel = this.toggleTopPanel.bind(this);
    this.countBonuses = this.countBonuses.bind(this);
    this.authUser = this.authUser.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.userLogout = this.userLogout.bind(this);

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

  authUser(email = "", password = "") {
    email = email ? email : this.state.email;
    password = password ? password : this.state.password;
    return async () => {
      await this.props.signInWithEmailAndPassword(email, password);

      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);

      await login(email, password);

      await fetchFemaleData(model =>
        this.props.dispatch({ type: SET_FEMALE_DATA, payload: model })
      );

      await setInterval(() => this.countBonuses(true), 10000);
      this.setState({ loggedIn: true });
    };
  }

  userLogout() {
    return async () => {
      await firebase.auth().signOut();
      logout();
      sessionStorage.setItem("email", null);
      sessionStorage.setItem("password", null);
      this.setState({ loggedIn: false });
    };
  }

  componentDidMount() {
    const savedEmail = sessionStorage.getItem("email");
    const savedPwd = sessionStorage.getItem("password");

    if (savedEmail && savedPwd) {
      login(savedEmail, savedPwd);
      this.authUser(savedEmail, savedPwd)();
    } else {
      logout();
    }
  }

  render() {
    const isLoggedIn = !!firebase.auth().currentUser;
    console.log("isLoggedIn :", isLoggedIn);
    document.title = `Sender | ${this.props.currentBonuses}`;
    return (
      <Router>
        <UseGlobalStyle />

        {!!this.props.user &&
          (this.props.showTopPanel ? (
            <TopPanel
              user={this.props.user}
              userLogout={this.userLogout()}
              toggleTopPanel={this.toggleTopPanel}
            />
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
            isLoggedIn={isLoggedIn}
            exact
            path={process.env.PUBLIC_URL + "/profile"}
            component={ProfilePage}
          />
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path={process.env.PUBLIC_URL + "/sender"}
            component={SenderPage}
            user={this.props.user}
          />
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path={process.env.PUBLIC_URL + "/mailing"}
            component={MailingPage}
          />
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path={process.env.PUBLIC_URL + "/magic"}
            component={MagicPage}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/error"}
            component={NotWorking}
          />
        </Switch>

        {isLoggedIn ? (
          <Redirect to={process.env.PUBLIC_URL + "/profile"} />
        ) : (
          <PageWrapper>
            <ProfileBackground img="https://www.gizdev.com/wp-content/uploads/2018/11/MacBook-Air-2018-Stock-Walls-2.jpg" />
            <Logo color="white">Sender</Logo>
            <InputGroup>
              <Input
                login
                placeholder="Email"
                name="email"
                onChange={this.handleLoginChange}
              />
              <Input
                login
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleLoginChange}
              />
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
