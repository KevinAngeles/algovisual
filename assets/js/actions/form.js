import { ADD_PROCESS, REMOVE_ALL_PROCESSES, RESET_FORM_INPUTS, TOGGLE_MODAL, TOGGLE_NAVBAR, UPDATE_INPUT_PROCESSNAME, UPDATE_INPUT_ARRIVETIME, UPDATE_INPUT_BURNTIME } from './types';

export const addProcess = algorithmId => ({
  type: ADD_PROCESS,
  algorithmId
});

export const removeAllProcesses = () => ({
  type: REMOVE_ALL_PROCESSES
});

export const resetFormInputs = () => ({
  type: RESET_FORM_INPUTS
});

export const toggleModal = () => ({
  type: TOGGLE_MODAL
});

export const toggleNavBar = () => ({
  type: TOGGLE_NAVBAR
});

export const updateInputProcessName = value => ({
  type: UPDATE_INPUT_PROCESSNAME,
  value
});

export const updateInputArriveTime = value => ({
  type: UPDATE_INPUT_ARRIVETIME,
  value
});

export const updateInputBurnTime = value => ({
  type: UPDATE_INPUT_BURNTIME,
  value
});
