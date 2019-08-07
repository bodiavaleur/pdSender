import React, { Component } from "react";
import { Modal, IconButton, Line } from "../../ui/atoms";
import { connect } from "react-redux";
import {
  TOGGLE_IGNORE_BM,
  TOGGLE_LIKE,
  TOGGLE_FAVORITE,
  USE_REPEAT,
  TOGGLE_AUTO_MPM,
  TOGGLE_SET_OFFLINE
} from "../../redux/actions";
import { Spring } from "react-spring/renderprops";

class ModeSwitches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      online: 0
    };

    this.toggleOnline = this.toggleOnline.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.toggleIgnoreBm = this.toggleIgnoreBm.bind(this);
    this.toggleUseRepeat = this.toggleUseRepeat.bind(this);
    this.toggleAutoMpm = this.toggleAutoMpm.bind(this);
    this.toggleSetOffline = this.toggleSetOffline.bind(this);
  }

  toggleIgnoreBm() {
    return this.props.dispatch({ type: TOGGLE_IGNORE_BM });
  }

  toggleLike() {
    return this.props.dispatch({ type: TOGGLE_LIKE });
  }

  toggleFavorite() {
    return this.props.dispatch({ type: TOGGLE_FAVORITE });
  }

  toggleOnline() {
    return async () => {
      await this.setState({ online: !this.state.online });
      this.props.selectMode(this.props.mode, this.state.online);
    };
  }

  toggleUseRepeat() {
    return this.props.dispatch({ type: USE_REPEAT });
  }

  toggleAutoMpm() {
    return this.props.dispatch({ type: TOGGLE_AUTO_MPM });
  }

  toggleSetOffline() {
    return this.props.dispatch({ type: TOGGLE_SET_OFFLINE });
  }

  render() {
    return (
      <React.Fragment>
        <Modal w="100px" h="135px" switches>
          <Spring
            from={{ trasform: "scale(1)" }}
            to={{ trasform: "scale(1.2)" }}
            reset={this.props.toggleLike}
            reverse
          >
            {props => (
              <React.Fragment>
                <label onChange={this.toggleLike} style={props}>
                  <input type="checkbox" />
                  <IconButton red={this.props.likeUser}>
                    <span class="fas fa-heart" />
                  </IconButton>
                </label>
                <Line horizontal smH />
                <label onChange={this.toggleFavorite}>
                  <input type="checkbox" />
                  <IconButton orange={this.props.favUser}>
                    <span class="fas fa-star" />
                  </IconButton>
                </label>
              </React.Fragment>
            )}
          </Spring>
        </Modal>
        <Modal w="150px" h="135px" switches>
          <label className="form-switch f-sm" onChange={this.toggleOnline()}>
            <span class="fas fa-signal" />
            <input type="checkbox" />
            <i />
          </label>
          <label
            className="form-switch f-sm"
            onChange={this.toggleIgnoreBm}
            style={{ opacity: this.props.mode === "bmAll" ? 0.5 : 1 }}
          >
            <span class="fas fa-user-slash" />
            <input type="checkbox" disabled={this.props.mode === "bmAll"} />
            <i />
          </label>
          <label className="form-switch f-sm" onChange={this.toggleUseRepeat}>
            <span class="fas fa-redo-alt" />
            <input type="checkbox" />
            <i />
          </label>
          <label className="form-switch f-sm" onChange={this.toggleAutoMpm}>
            <span class="fas fa-robot" />
            <input type="checkbox" />
            <i />
          </label>
          <label className="form-switch f-sm" onChange={this.toggleSetOffline}>
            <span class="fas fa-eye-slash" />
            <input type="checkbox" />
            <i />
          </label>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.pdReducer.mode,
  likeUser: state.pdReducer.likeUser,
  favUser: state.pdReducer.favUser,
  autoMpm: state.pdReducer.autoMpm
});

export default connect(mapStateToProps)(ModeSwitches);
