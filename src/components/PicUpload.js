/** @jsx jsx */

import React, { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import Loading from '../components/Loading';

const picUploadStyle = css`
  position: relative;
  display: inline-block;
  background: #9b9b9b;

  input {
    display: none;
  }

  .imagehover {
    position: absolute;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;

    &:hover {
      opacity: 0.7;
    }

    i {
      font-size: 40px;
      opacity: 0.7;
      cursor: pointer;
      color: #3b3b3b;
    }

    img {
      background: white;
    }
  }

  .profile-pic {
    object-fit: cover;
  }
`;

const loadingStyle = css`
  align-items: center;
  display: flex;
  justify-content: center;
`;

class PicUpload extends Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
    this.state = { pic: props.original_pic, loading: false };
  }

  onChange = async e => {
    const { path, name, uploadFile, updateURL } = this.props;

    this.setState({ loading: true });

    try {
      const { uploadTaskSnapshot } = await uploadFile(
        path,
        e.target.files[0],
        null,
        { name: name + '.jpg' },
      );
      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
      updateURL({ profile_pic: downloadURL });
      this.setState({ loading: false, pic: downloadURL });
    } catch (error) {
      console.log(error.message);
      alert('Invalid image file or image file too large (max 5MB limit).');
      this.setState({ loading: false });
    }
  };

  renderProfilePic() {
    const { size } = this.props;
    const { pic } = this.state;
    if (pic) {
      return (
        <img
          alt="profile pic"
          className="profile-pic"
          src={pic}
          style={{ height: size, width: size }}
        />
      );
    }
    return null;
  }

  render() {
    const { size } = this.props;
    if (this.state.loading) {
      return (
        <div css={loadingStyle} style={{ height: size, width: size }}>
          <Loading type="spin" size={size / 2} />
        </div>
      );
    }

    return (
      <div
        className="PicUpload"
        css={picUploadStyle}
        style={{ height: size, width: size }}
      >
        <label>
          <input
            accept="image/*"
            ref={this.file}
            type="file"
            onChange={this.onChange}
          />

          {this.renderProfilePic()}

          <div
            className="imagehover"
            style={{
              height: size,
              opacity: this.state.pic ? null : 0.9,
              width: size,
            }}
          >
            <img
              alt="upload"
              src={require('assets/picupload.png')}
              style={{ height: size, width: size }}
            />
          </div>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (_state, props) => {
  return {
    uploadFile: props.firebase.uploadFile,
  };
};

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(mapStateToProps),
)(PicUpload);
