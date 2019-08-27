import { NotWorkingWrapper, BlockText } from "../../ui/pages/NotWorkingPage";
import { Link } from "react-router-dom";
import { Button, ProfileBackground, TextInfoCredits } from "../../ui/atoms";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { SwapSpinner, HeartSpinner } from "react-spinners-kit";
class NotWorking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      info: false
    };

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.logout();
    document.location.reload(true);
  }

  componentWillUnmount() {
    for (let i = 0; i++; i < 9999) {
      window.clearInterval(i);
    }
  }

  componentDidMount() {
    setInterval(() => this.setState({ id: this.props.modelData.id }), 1000);
    setTimeout(() => this.setState({ info: true }), 5000);
  }

  render() {
    return (
      <NotWorkingWrapper>
        <ProfileBackground img="https://lh3.googleusercontent.com/67QkZk4pJIAL7tH2EcXK1iKLG-44PFs4bJn-Pt0xPxCBt8ooQhorqqNYoNojy04MaQBRyKt_DMCV6eA2PbDfPVt0NLBSDbqZABArHcNt0YhhZcUP0SoZrk-PfdTD6GBieizIliMVDNJNeOUk0nb15qIWx2_3rBnVwgtrwrnENq7W_obrcJKTGNCni_gg8mHtKiLhScsWsDJxV00xdKq8hbKkaFpTLHsUG3bwjnbr1X03UeQGa0nZhvcvXKgoPvp0z9ejhHd_M4DoJfht62RiAkXudNpvAvmwGY-USltQQh8M79CMtU7LVYT5eDH8X7gehV9p7374JqwSwmZwxdobWK3xLchhkhMo8m9SdDTZ-3odUC0zeno51RHMWw-5qPdx9fXKDsoa7_9LBR9drpVzz_4oPnGroPUrjx_6Bcp5_E4Nt9u-FtsGuJPyg9NdZjtjh1lKhQW_QZA28XZGGJn53PsX3ZsFzi2lZjZ0J6qhZdhYlcCmw-iicwabr5ZOMIHK1e51Y5N3lea71Wguqccsd9E8EzgBmbSFGAHJT4iBD-M8AHI16lfL8kgc9RzW6mCUBq5tBfD8A_nBK7PNTRdyPAf87kp9txicoBbf2xlZi9RkQVXlf7gTSQXnDozs3aLbgnVcD5Rzg4J4w42l9g0oKhR71c6wuNhOO934A8Aur7Au1AbKHkYvVME4lwQe3Qg7pb5sJLTmj-WzPfazfzG6L3l7=w1270-h715-no" />
        <div className="plane main circle-center">
          <div className="circle indigo-circle " />
          <div className="circle indigo-circle " />
          <div className="circle indigo-circle  " />
          <div className="circle indigo-circle " />
          <div className="circle indigo-circle " />
        </div>
        <BlockText bold size={3}>
          Loading{" "}
          <SwapSpinner
            size={40}
            color="rgba(255,255,255, 0.5)"
            loading={true}
          />
        </BlockText>
        {this.state.info && (
          <React.Fragment>
            <BlockText className="text-focus-in">
              If sender not working:
              <ul>
                <li>Your profile is not registered</li>
                <li>Translator has no profiles</li>
                <li>
                  Chrome shortcut doesn't contain --disable-web-security
                  --user-data-dir="C:\PD"
                </li>
              </ul>
              Try to refresh the page, if you still have problems,{" "}
              <a
                href="https://t.me/bodiavaleur"
                target="_blank"
                rel="noopener noreferrer"
              >
                contact me
              </a>
            </BlockText>
            <Link
              className="text-focus-in"
              to={process.env.PUBLIC_URL + "/login"}
              onClick={this.signOut}
            >
              <Button text textRed>
                sign out
              </Button>
            </Link>
            <TextInfoCredits href="https://t.me/bodiavaleur" target="_blank">
              by Bodyan with
              <HeartSpinner size={20} color="red" loading={true} />
            </TextInfoCredits>
          </React.Fragment>
        )}

        {!!this.state.id && (
          <Redirect to={process.env.PUBLIC_URL + "/profile"} />
        )}
      </NotWorkingWrapper>
    );
  }
}

const mapStateToProps = state => ({
  modelData: state.pdReducer.modelData
});

export default connect(mapStateToProps)(NotWorking);
