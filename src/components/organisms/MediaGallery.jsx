import React, { Component } from "react";
import { Modal, GalleryImage, Shade } from "../../ui/atoms";
import { SELECT_ATTACHMENT } from "../../redux/actions";
import { getMediaGallery } from "../../api";
import { connect } from "react-redux";

class MediaGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gallery: []
    };

    this.selectImage = this.selectImage.bind(this);
  }

  selectImage(img) {
    return this.props.dispatch({ type: SELECT_ATTACHMENT, payload: img });
  }

  componentDidMount() {
    getMediaGallery(this.props.idFemale, data =>
      this.setState({ gallery: data.images })
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal gallery w="700px" h="800px" bg="#efefef">
          {this.state.gallery.map(element => (
            <GalleryImage
              selected={!!this.props.attachments.includes(element)}
              img={element.url_thumbnail}
              onClick={() => this.selectImage(element)}
            />
          ))}
        </Modal>

        <Shade onClick={this.props.toggleGallery} full />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  attachments: state.pdReducer.attachments
});

export default connect(mapStateToProps)(MediaGallery);
