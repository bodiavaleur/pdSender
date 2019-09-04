import React, { Component } from "react";
import {
  Modal,
  ProfileBackground,
  ProfileAvatar,
  ProfileText,
  ModalOverlay
} from "../../ui/atoms";
import { connect } from "react-redux";
import { Spring } from "react-spring/renderprops";
import { fetchFemaleData } from "../../api";
import { ProfilePageWrapper, BlockText } from "../../ui/pages";
import { Link } from "react-router-dom";
class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedIdx: null,
      showError: false
    };
  }

  selectFemale(idx) {
    return () => {
      this.setState({ selectedIdx: idx });
      this.props.isRegFn(idx);
    };
  }

  componentWillMount() {
    fetchFemaleData(data => this.setState({ data: data }));
  }

  componentDidMount() {
    setTimeout(() => this.setState({ showError: true }), 3000);
  }

  render() {
    const data = this.state.data;
    return (
      <ProfilePageWrapper profile>
        <Spring from={{ opacity: 0 }} to={{ opacity: 0.7 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                className="kenburns-top"
                img="https://lh3.googleusercontent.com/67QkZk4pJIAL7tH2EcXK1iKLG-44PFs4bJn-Pt0xPxCBt8ooQhorqqNYoNojy04MaQBRyKt_DMCV6eA2PbDfPVt0NLBSDbqZABArHcNt0YhhZcUP0SoZrk-PfdTD6GBieizIliMVDNJNeOUk0nb15qIWx2_3rBnVwgtrwrnENq7W_obrcJKTGNCni_gg8mHtKiLhScsWsDJxV00xdKq8hbKkaFpTLHsUG3bwjnbr1X03UeQGa0nZhvcvXKgoPvp0z9ejhHd_M4DoJfht62RiAkXudNpvAvmwGY-USltQQh8M79CMtU7LVYT5eDH8X7gehV9p7374JqwSwmZwxdobWK3xLchhkhMo8m9SdDTZ-3odUC0zeno51RHMWw-5qPdx9fXKDsoa7_9LBR9drpVzz_4oPnGroPUrjx_6Bcp5_E4Nt9u-FtsGuJPyg9NdZjtjh1lKhQW_QZA28XZGGJn53PsX3ZsFzi2lZjZ0J6qhZdhYlcCmw-iicwabr5ZOMIHK1e51Y5N3lea71Wguqccsd9E8EzgBmbSFGAHJT4iBD-M8AHI16lfL8kgc9RzW6mCUBq5tBfD8A_nBK7PNTRdyPAf87kp9txicoBbf2xlZi9RkQVXlf7gTSQXnDozs3aLbgnVcD5Rzg4J4w42l9g0oKhR71c6wuNhOO934A8Aur7Au1AbKHkYvVME4lwQe3Qg7pb5sJLTmj-WzPfazfzG6L3l7=w1270-h715-no"
                style={props}
              />
              {data.length
                ? data.map((profile, idx) => (
                    <Link to={process.env.PUBLIC_URL + "/sender"}>
                      <Modal
                        profile="true"
                        w="400px"
                        h="400px"
                        style={props}
                        className="text-focus-in"
                        selected={this.state.selectedIdx === idx}
                      >
                        <ModalOverlay onClick={this.selectFemale(idx)}>
                          <ProfileAvatar
                            w="225px"
                            h="225px"
                            src={profile.avatar_original}
                            modal
                          />
                          <ProfileText title="true">
                            {profile.name}, {profile.age}
                          </ProfileText>
                          <ProfileText about="true">
                            {profile.occupation} from {profile.city},{" "}
                            {profile.country}
                          </ProfileText>
                        </ModalOverlay>
                      </Modal>
                    </Link>
                  ))
                : this.state.showError && (
                    <BlockText className="text-focus-in" size="5">
                      No profiles
                    </BlockText>
                  )}
            </React.Fragment>
          )}
        </Spring>
      </ProfilePageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  modelData: state.pdReducer.modelData,
  isRegFn: state.pdReducer.isRegFn
});

export default connect(mapStateToProps)(ProfilePage);
