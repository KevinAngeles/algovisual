import { REMOVE_PROCESS } from './types';

export const removeProcess = idx => ({
  type: REMOVE_PROCESS,
  idx
});
