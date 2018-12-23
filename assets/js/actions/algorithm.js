import { UPDATE_SELECTED_ALGORITHM } from './types';

export const updateSelectedAlgorithm = algorithm => ({
  type: UPDATE_SELECTED_ALGORITHM,
  algorithm
});
