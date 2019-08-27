import React, { Component } from "react";
import { Modal, IconButton, Line } from "../../ui/atoms";
import { connect } from "react-redux";
import {
  TOGGLE_IGNORE_BM,
  TOGGLE_LIKE,
  TOGGLE_FAVORITE,
  USE_REPEAT,
  TOGGLE_AUTO_MPM,
  TOGGLE_SET_OFFLINE,
  USE_ONLINE
} from "../../redux/actions";
import { Spring } from "react-spring/renderprops";
import TooltipPref from "../atoms/TooltipPref";

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
      this.props.dispatch({ type: USE_ONLINE });
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
                    <span className="fas fa-heart" />
                  </IconButton>
                </label>
                <Line horizontal smH />
                <label onChange={this.toggleFavorite}>
                  <input type="checkbox" />
                  <IconButton orange={this.props.favUser}>
                    <span className="fas fa-star" />
                  </IconButton>
                </label>
              </React.Fragment>
            )}
          </Spring>
        </Modal>
        <Modal w="150px" h="135px" switches>
          <label
            id="switchOnline"
            className="form-switch f-sm"
            onChange={this.toggleOnline()}
          >
            <span className="fas fa-signal" />
            <input type="checkbox" checked={this.props.useOnline} />
            <i />
          </label>
          <label
            id="switchIgnore"
            className="form-switch f-sm"
            onChange={this.toggleIgnoreBm}
            style={{ opacity: this.props.mode === "bmAll" ? 0.5 : 1 }}
          >
            <span className="fas fa-user-slash" />
            <input
              type="checkbox"
              disabled={this.props.mode === "bmAll"}
              checked={this.props.ignoreBm}
            />
            <i />
          </label>
          <label
            id="switchRepeat"
            className="form-switch f-sm"
            onChange={this.toggleUseRepeat}
            style={{ opacity: this.props.mode === "listing" ? 0.5 : 1 }}
          >
            <span className="fas fa-redo-alt" />
            <input type="checkbox" checked={this.props.useRepeat} />
            <i />
          </label>
          <label
            id="switchOffline"
            className="form-switch f-sm"
            onChange={this.toggleSetOffline}
          >
            <span className="fas fa-eye-slash" />
            <input type="checkbox" checked={this.props.setOffline} />
            <i />
          </label>
          <label
            id="autoMpm"
            className="form-switch f-sm"
            onChange={this.toggleAutoMpm}
          >
            <span className="fas fa-robot" />
            <input type="checkbox" checked={this.props.autoMpm} />
            <i />
          </label>
        </Modal>

        <TooltipPref
          target="switchOnline"
          container="switchOnline"
          place="bottom"
          label="Online"
        />
        <TooltipPref
          target="switchIgnore"
          container="switchIgnore"
          place="bottom"
          label="Ignore BM"
        />
        <TooltipPref
          target="switchRepeat"
          container="switchRepeat"
          place="bottom"
          label="Repeat"
        />
        <TooltipPref
          target="switchOffline"
          container="switchOffline"
          place="bottom"
          label="Make user offline"
        />
        <TooltipPref
          target="autoMpm"
          container="autoMpm"
          place="bottom"
          label="Set speed manually"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.pdReducer.mode,
  likeUser: state.pdReducer.likeUser,
  favUser: state.pdReducer.favUser,
  autoMpm: state.pdReducer.autoMpm,
  setOffline: state.pdReducer.setOffline,
  useRepeat: state.pdReducer.useRepeat,
  ignoreBm: state.pdReducer.ignoreBm,
  useOnline: state.pdReducer.useOnline
});

export default connect(mapStateToProps)(ModeSwitches);
