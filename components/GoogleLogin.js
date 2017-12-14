import React from "react";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Expo from "expo";
import { Google } from "expo";
import {SocialIcon} from 'react-native-elements'

import { saveEmail } from '../actions/user'


class GoogleLogin extends React.Component {
  async logIn() {
    const result = await Expo.Google.logInAsync({
      androidClientId: '720759826765-tvopadhmuh6vv7utc9f9n5io1be3g177.apps.googleusercontent.com',
      iosClientId: '720759826765-25nmr4d1nqt2295s14tsmaetltbaraov.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === "success") {
      this.props.saveEmail({name: result.user.name, email: result.user.email})
    }
  }

  render() {
    return (

      <SocialIcon
        button
        light
        type='instagram'
        title='Sign In With Google'
        onPress={()=>this.logIn()}
        />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveEmail,
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(GoogleLogin);
