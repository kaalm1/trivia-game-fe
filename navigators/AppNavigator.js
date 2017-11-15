import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from '../containers/HomeScreen'
import Difficulty from '../containers/DifficultyScreen'
import Categories from '../containers/CategoryScreen'
import Game from '../containers/GameScreen'
import GameEnd from '../containers/GameEndScreen'
import Review from '../containers/ReviewScreen'

export const AppNavigator = StackNavigator({
  Home: {screen: Home},
  Difficulty: {screen: Difficulty},
  Categories: {screen: Categories},
  Game: {screen: Game},
  GameEnd: {screen: GameEnd},
  Review: {screen: Review}
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

// AppWithNavigationState.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   nav: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
