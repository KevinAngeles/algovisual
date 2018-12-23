import { REMOVE_PROCESS } from './types';

export const removeProcess = (idx, algorithmId) => ({
  type: REMOVE_PROCESS,
  idx,
  algorithmId
});
