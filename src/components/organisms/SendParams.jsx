import React, { Component } from "react";
import { Modal, Shade, Input } from "../../ui/atoms";
import { ParamLabelBlock, ParamLabel, ParamsWrap } from "../../ui/molecules";
import { Spring } from "react-spring/renderprops";
import { connect } from "react-redux";
class SendParams extends Component {
  constructor(props) {
    super(props);

    this.selectOpt = this.selectOpt.bind(this);
  }

  selectOpt(idx, name, label) {
    return (
      <ParamLabelBlock>
        <ParamLabel>{label}</ParamLabel>
        <select
          name={name}
          onChange={this.props.setParam}
          style={{ width: "125px" }}
          value={this.props.searchFilters[name]}
        >
          {this.props.dataDictionary[idx].dictionary.map(data => (
            <option key={data.id} value={data.id}>
              {data.text}
            </option>
          ))}
        </select>
      </ParamLabelBlock>
    );
  }

  render() {
    console.log("this.props.searchFilters", this.props.searchFilters);
    console.log("this.props.dataDictionary", this.props.dataDictionary);
    return (
      <React.Fragment>
        <Spring from={{ right: "-400px" }} to={{ right: "-15px" }}>
          {props => (
            <Modal params style={props}>
              <ParamsWrap>
                <ParamLabelBlock age>
                  <ParamLabel>Age</ParamLabel>
                  <div>
                    <Input
                      age
                      placeholder="from"
                      onChange={this.props.setParam}
                      name="ageFrom"
                    />
                    -
                    <Input
                      age
                      placeholder="to"
                      onChange={this.props.setParam}
                      name="ageTo"
                    />
                  </div>
                </ParamLabelBlock>
                {this.selectOpt(0, "countries", "Country")}
                {this.selectOpt(8, "lastOnline", "Last Online")}
                {this.selectOpt(3, "education", "Education")}
                {this.selectOpt(2, "marital_status", "Status")}
                {this.selectOpt(7, "countChildren", "Children")}
                {this.selectOpt(1, "body_type", "Body")}
                {this.selectOpt(4, "religion", "Religion")}
                {this.selectOpt(6, "drinking", "Drinking")}
                {this.selectOpt(5, "smoking", "Smoking")}

                <label
                  className="form-switch"
                  onChange={this.props.setParamSwitch}
                >
                  <span className="fas fa-camera grey f-md" />
                  <input type="checkbox" name="withPhoto" />
                  <i />
                </label>

                <label
                  className="form-switch"
                  onChange={this.props.setParamSwitch}
                >
                  <span className="fas fa-child grey f-md" />
                  <input type="checkbox" name="moreChildren" />
                  <i />
                </label>
              </ParamsWrap>
            </Modal>
          )}
        </Spring>
        <Shade full onClick={this.props.toggleSendParams} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  searchFilters: state.pdReducer.searchFilters
});

export default connect(mapStateToProps)(SendParams);
