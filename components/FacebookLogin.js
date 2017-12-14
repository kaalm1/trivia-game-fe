import React from "react";
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Expo from "expo";
import { Facebook, AuthSession } from "expo";
import {View} from 'react-native'
import {SocialIcon} from 'react-native-elements'
import { saveEmail } from '../actions/user'
import Config from '../config'

const FB_APP_ID = "183317342251398"
// https://github.com/expo/examples/tree/master/with-facebook-auth
// import { MonoText } from "../components/StyledText";

class FBLogin extends React.Component {
  state = {
    userInfo: null
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();

    // You need to add this url to your authorized redirect urls on your Facebook app
    console.log({ redirectUrl });

    // NOTICE: Please do not actually request the token on the client (see:
    // response_type=token in the authUrl), it is not secure. Request a code
    // instead, and use this flow:
    // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
    // The code here is simplified for the sake of demonstration. If you are
    // just prototyping then you don't need to concern yourself with this and
    // can copy this example, but be aware that this is not safe in production.

    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    if (result.type !== 'success') {
      alert('Uh oh, something went wrong');
      return;
    }

    let accessToken = result.params.access_token;
    let userInfoResponse = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)`
    );
    const userInfo = await userInfoResponse.json();
    this.setState({ userInfo });
  };


  async logIn() {
    const {
      type,
      token }  = await Expo.Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
      permissions: ["public_profile", "email"]
    });

    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
      const res = await response.json()
      this.props.saveEmail({name: res.name, email: res.email})
    }
  }

  render() {
    return (


          // <View style={styles.helpContainer}>
          //   <TouchableOpacity onPress={() => this.logIn()} style={styles.helpLink}>
          //     <Text style={styles.helpLinkText}>
          //       Login with Facebook
          //     </Text>
          //   </TouchableOpacity>
          // </View>

          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
            onPress={()=>this.logIn()}
          />

          // {/* <SocialIcon
          //   title='WebBrowser Facebook'
          //   button
          //   type='facebook'
          //   onPress={()=>this._handlePressAsync()}
          // /> */}



    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveEmail,
  }, dispatch);
};

export default connect(null,mapDispatchToProps)(FBLogin);
