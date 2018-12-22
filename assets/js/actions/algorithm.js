import { SELECT_ALGORITHM } from './types';

export const selectAlgorithm = algorithm => ({
  type: SELECT_ALGORITHM,
  algorithm
});
