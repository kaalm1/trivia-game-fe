import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';
import {SocialIcon} from 'react-native-elements'

const FB_APP_ID = '183317342251398';

export default class App extends React.Component {
  state = {
    result: null,
  };

  render() {
    return (
      // <View style={styles.container}>
      //   <Button title="Open FB Auth" onPress={this._handlePressAsync} />
      //   {this.state.result ? (
      //     <Text>{JSON.stringify(this.state.result)}</Text>
      //   ) : null}
      //   </View>

        <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
          onPress={this._handlePressAsync}
        />
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
