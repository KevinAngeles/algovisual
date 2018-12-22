import { combineReducers } from 'redux';
import ui from './ui';
import algorithm from './algorithm';

export default combineReducers({
  algorithm,
  ui,
});
