import { fetchFemaleData, getBonuses, login, logout } from "./api";
import Iframe from "react-iframe";
import React, { Component } from "react";
import ProfilePage from "./components/pages/ProfilePage";
import SenderPage from "./components/pages/SenderPage";
import MailingPage from "./components/pages/MailingPage";
import MagicPage from "./components/pages/MagicPage";
import { UseGlobalStyle } from "./ui/pages/UseGlobalStyle";
import "./ui/pages/resets.css";
import { connect } from "react-redux";
import {
  SET_FEMALE_DATA,
  SET_BONUSES,
  SET_BLACKLIST,
  SET_ADD_BM_FN,
  SET_REMOVE_BM_FN,
  SET_GET_BM_FN,
  SET_REG_FN
} from "./redux/actions";
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
import * as firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "./firebase/firebaseConfig";
import PrivateRoute from "./components/atoms/PrivateRoute";
import { PageWrapper } from "./ui/pages/Login";
import FinderPage from "./components/pages/FinderPage";

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
      loggedIn: false,
      error: false,
      idxBlocked: null,
      audio50: document.getElementById("audio50"),
      audio10: document.getElementById("audio10"),
      audio5: document.getElementById("audio5"),
      audio2: document.getElementById("audio2")
    };

    this.toggleTopPanel = this.toggleTopPanel.bind(this);
    this.countBonuses = this.countBonuses.bind(this);
    this.authUser = this.authUser.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this.addBmToDatabase = this.addBmToDatabase.bind(this);
    this.removeBmFromDatabase = this.removeBmFromDatabase.bind(this);
    this.getBlacklist = this.getBlacklist.bind(this);
    this.isRegistered = this.isRegistered.bind(this);
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

      await localStorage.setItem("email", email);
      await localStorage.setItem("password", password);

      // await login(email, password);

      this.setState({ loggedIn: true });

      setInterval(() => this.countBonuses(true), 10000);
    };
  }

  userLogout() {
    return async () => {
      await firebase.auth().signOut();
      logout();
      localStorage.setItem("email", null);
      localStorage.setItem("password", null);
      this.setState({ loggedIn: false });
      document.location.assign(process.env.PUBLIC_URL);
    };
  }

  isRegistered(idx) {
    const checkRegistered = cb =>
      firebase
        .database()
        .ref("/modelsArray/")
        .once("value")
        .then(snapshot => {
          cb(snapshot.val().array);
        });
    fetchFemaleData(modelList => {
      const model = modelList[idx];
      checkRegistered(array => {
        if (array.includes(model.id)) {
          this.props.dispatch({ type: SET_FEMALE_DATA, payload: model });
          this.getBlacklist(model.id, snap => {
            this.props.dispatch({ type: SET_BLACKLIST, payload: snap });
          });
          this.props.dispatch({
            type: SET_ADD_BM_FN,
            payload: this.addBmToDatabase
          });
          this.props.dispatch({
            type: SET_REMOVE_BM_FN,
            payload: this.removeBmFromDatabase
          });
          this.setState({ loggedIn: true });
        } else {
          this.props.dispatch({ type: SET_FEMALE_DATA, payload: [] });
          this.setState({ loggedIn: false });
          this.userLogout();
        }
      });
    });
  }

  getBlacklist(modelId, cb) {
    firebase
      .database()
      .ref("/blacklist/" + modelId)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          cb(Object.values(snapshot.val()).map(el => parseInt(el)));
        } else {
          firebase
            .database()
            .ref("/blacklist/" + this.props.modelData.id)
            .push([]);
        }
      });
  }

  addBmToDatabase(id) {
    firebase
      .database()
      .ref("/blacklist/" + this.props.modelData.id)
      .push(parseInt(id));
  }

  removeBmFromDatabase(id) {
    firebase
      .database()
      .ref("/blacklist/" + this.props.modelData.id)
      .once("value")
      .then(snapshot => {
        firebase
          .database()
          .ref(
            `/blacklist/${this.props.modelData.id}/${Object.keys(
              snapshot.val()
            ).find(key => snapshot.val()[key] === id)}`
          )
          .remove();
      });
  }

  componentDidMount() {
    const savedEmail = localStorage.getItem("email");
    const savedPwd = localStorage.getItem("password");

    if (savedEmail && savedPwd) {
      // login(savedEmail, savedPwd);
      this.authUser(savedEmail, savedPwd)();
    } else {
      logout();
    }

    this.props.dispatch({ type: SET_REG_FN, payload: this.isRegistered });
  }

  render() {
    const isLoggedIn = !!firebase.auth().currentUser;
    document.title = `Sender | ${this.props.currentBonuses}`;
    return (
      <Router>
        <UseGlobalStyle />

        {!!this.props.user && this.props.showTopPanel && (
          <TopPanel
            user={this.props.user}
            userLogout={this.userLogout()}
            toggleTopPanel={this.toggleTopPanel}
          />
        )}

        <ArrowButton
          onClick={this.toggleTopPanel}
          style={{ visibility: this.props.showTopPanel ? "hidden" : "visible" }}
        >
          <i className="fas fa-chevron-down" />
        </ArrowButton>

        <Iframe
          key="pdIframe"
          url="https://beta.prime.date/#chat"
          id="pdFrame"
          width="0"
          height="0"
          display="none"
        />

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
          <PrivateRoute
            isLoggedIn={isLoggedIn}
            exact
            path={process.env.PUBLIC_URL + "/finder"}
            component={FinderPage}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/error"}
            render={() => <NotWorking logout={this.userLogout()} />}
          />
        </Switch>

        {isLoggedIn ? (
          !this.state.loggedIn ? (
            <Redirect to={process.env.PUBLIC_URL + "/error"} />
          ) : (
            <Redirect to={process.env.PUBLIC_URL + "/profile"} />
          )
        ) : (
          <PageWrapper className="text-focus-in">
            <ProfileBackground img="https://lh3.googleusercontent.com/67QkZk4pJIAL7tH2EcXK1iKLG-44PFs4bJn-Pt0xPxCBt8ooQhorqqNYoNojy04MaQBRyKt_DMCV6eA2PbDfPVt0NLBSDbqZABArHcNt0YhhZcUP0SoZrk-PfdTD6GBieizIliMVDNJNeOUk0nb15qIWx2_3rBnVwgtrwrnENq7W_obrcJKTGNCni_gg8mHtKiLhScsWsDJxV00xdKq8hbKkaFpTLHsUG3bwjnbr1X03UeQGa0nZhvcvXKgoPvp0z9ejhHd_M4DoJfht62RiAkXudNpvAvmwGY-USltQQh8M79CMtU7LVYT5eDH8X7gehV9p7374JqwSwmZwxdobWK3xLchhkhMo8m9SdDTZ-3odUC0zeno51RHMWw-5qPdx9fXKDsoa7_9LBR9drpVzz_4oPnGroPUrjx_6Bcp5_E4Nt9u-FtsGuJPyg9NdZjtjh1lKhQW_QZA28XZGGJn53PsX3ZsFzi2lZjZ0J6qhZdhYlcCmw-iicwabr5ZOMIHK1e51Y5N3lea71Wguqccsd9E8EzgBmbSFGAHJT4iBD-M8AHI16lfL8kgc9RzW6mCUBq5tBfD8A_nBK7PNTRdyPAf87kp9txicoBbf2xlZi9RkQVXlf7gTSQXnDozs3aLbgnVcD5Rzg4J4w42l9g0oKhR71c6wuNhOO934A8Aur7Au1AbKHkYvVME4lwQe3Qg7pb5sJLTmj-WzPfazfzG6L3l7=w1270-h715-no" />
            <Logo className="text-focus-in" color="white">
              Sender
            </Logo>
            <InputGroup className="text-focus-in">
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
            <Button className="text-focus-in" onClick={this.authUser()}>
              SIGN IN
            </Button>
            <TextInfoCredits center className="text-focus-in">
              Copyright © 2019. All rights reserved.
            </TextInfoCredits>
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
  currentBonuses: state.pdReducer.currentBonuses,
  addBmFn: state.pdReducer.addBmFn,
  removeBmFn: state.pdReducer.removeBmFn
});

export default connect(mapStateToProps)(
  withFirebaseAuth({ providers, firebaseAppAuth })(PrimeDate)
);
