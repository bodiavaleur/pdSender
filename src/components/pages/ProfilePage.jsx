import React, { Component } from "react";
import {
  Modal,
  ProfileBackground,
  ProfileAvatar,
  ProfileText
} from "../../ui/atoms";
import { connect } from "react-redux";
import { Spring } from "react-spring/renderprops";

class ProfilePage extends Component {
  render() {
    const data = this.props.modelData;
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 0.7 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground img={data.avatar_original} style={props} />

              <Modal profile w="400px" h="400px" bg="white" style={props}>
                <ProfileAvatar
                  w="225px"
                  h="225px"
                  src={data.avatar_original}
                  modal
                />
                <ProfileText title>
                  {data.name}, {data.age}
                </ProfileText>
                <ProfileText about>
                  {data.occupation} from {data.city}, {data.country}
                </ProfileText>
              </Modal>
            </React.Fragment>
          )}
        </Spring>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modelData: state.pdReducer.modelData
});

export default connect(mapStateToProps)(ProfilePage);
