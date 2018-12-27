import { REMOVE_PROCESS } from './types';

export const removeProcess = (uniqueId, algorithmId) => ({
  type: REMOVE_PROCESS,
  uniqueId,
  algorithmId
});
