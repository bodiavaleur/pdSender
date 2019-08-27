import React, { Component } from "react";
import {
  Modal,
  Input,
  Shade,
  ProfileAvatar,
  ProfileText
} from "../../ui/atoms";
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from "react-redux";
import { SET_BLACKLIST, DEL_BLACKLIST } from "../../redux/actions";
import { PrefItem, PrefGroup } from "../../ui/organisms";
import { Spring } from "react-spring/renderprops";
import { getMale } from "../../api";

class Blacklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputId: 0,
      blacklist: []
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.addToBlacklist = this.addToBlacklist.bind(this);
    this.removeFromBlacklist = this.removeFromBlacklist.bind(this);
  }

  onChangeInput(evt) {
    const { value } = evt.target;
    return this.setState({ inputId: value });
  }

  addToBlacklist(id) {
    return async () => {
      id = parseInt(id);
      await this.props.dispatch({
        type: SET_BLACKLIST,
        payload: [...this.props.blacklist, id]
      });
      this.getBlacklistProfile([id]);
      this.props.addBmFn(id);
    };
  }

  removeFromBlacklist(id) {
    return async () => {
      await this.props.dispatch({ type: DEL_BLACKLIST, payload: id });
      this.setState({
        blacklist: this.state.blacklist.filter(x => x.id !== id)
      });
      this.props.removeBmFn(id);
    };
  }

  getBlacklistProfile(data) {
    data.map(male =>
      getMale(male, data =>
        this.setState({ blacklist: [...this.state.blacklist, data] })
      )
    );
  }

  componentDidMount() {
    console.log("this.props.blacklist", this.props.blacklist);
    this.getBlacklistProfile(this.props.blacklist);
  }

  render() {
    console.log("this.state :", this.state.blacklist);
    return (
      <React.Fragment>
        <Spring from={{ right: "-500px" }} to={{ right: "0" }}>
          {props => (
            <Modal blacklist w="400px" h="700px" bg="#efefef" style={props}>
              <PrefGroup blacklist>
                <Input
                  placeholder="Enter male ID"
                  onChange={this.onChangeInput}
                />
                <PrefItem onClick={this.addToBlacklist(this.state.inputId)}>
                  <i className="fas fa-plus" />
                </PrefItem>
              </PrefGroup>
              <ListGroup className="mx-auto h-50 w-75 text-center overflow-y">
                {this.state.blacklist.map(male => (
                  <ListGroupItem onClick={this.removeFromBlacklist(male.id)}>
                    <ProfileAvatar
                      w="50px"
                      h="50px"
                      src={male.personal.avatar_large}
                    />
                    <ProfileText name>{male.name}</ProfileText>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Modal>
          )}
        </Spring>

        <Shade full onClick={this.props.toggleBlacklist} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  blacklist: state.pdReducer.blacklist,
  showBlacklist: state.uiReducer.showBlacklist,
  addBmFn: state.pdReducer.addBmFn,
  removeBmFn: state.pdReducer.removeBmFn
});

export default connect(mapStateToProps)(Blacklist);
