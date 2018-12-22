import { REMOVE_ALL_PROCESSES, ADD_PROCESS, REMOVE_PROCESS, TOGGLE_MODAL, TOGGLE_NAVBAR, UPDATE_INPUT_PROCESSNAME, UPDATE_INPUT_ARRIVETIME, UPDATE_INPUT_BURNTIME } from '../actions/types';
// Helper Function
import Algorithm from '../utils/algorithm';
import Helper from '../utils/helper';

const totalWidth = 600;
const totalHeight = 300;
const graphMargin =  {
  top: 60,
  right: 30,
  bottom: 60,
  left: 30
};
const barPadding = 0.05;
const barOuterPad = 0.2;

const graphWidth = (totalWidth - graphMargin.right);
const graphHeight = (totalHeight - graphMargin.top);

const initialState = {
  arriveTime: '',
  burnTime: '',
  lastUniqueId: 0,
  name: '',
  errors: {
    inputNameInvalid: false,
    inputArriveTimeInvalid: false,
    inputBurnTimeInvalid: false,
  },
  graph: {
    margin: graphMargin,
    width: graphWidth,
    height: graphHeight,
    barPadding: barPadding,
    barOuterPad: barOuterPad
  },
  tableInput: [],
  tableOutput: [],
  modal: false,
  navBar: {
    isOpen: false,
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INPUT_PROCESSNAME: {
      const nameVal = action.value;
      // Update input name
      let newState = { ...state, name: nameVal };
      // If name was empty before, and now there is at least one non-blank character
      // clear any previous name error
      if (state.name.length === 0 && nameVal.length > 0) {
        let inputNameError = { inputNameInvalid: false };
        let updatedErrors = Object.assign({},state.errors,inputNameError);
        newState['errors'] = updatedErrors;
      }
      return newState;
    }
    case UPDATE_INPUT_ARRIVETIME: {
      const arriveVal = action.value;
      const filteredInput = Helper.filterNonNumericCharacters(arriveVal);
      let newState = { ...state, arriveTime: filteredInput };
      // If arriveTime was empty before, and now there is at least one character
      // clear any previous arriveTime error
      if (state.arriveTime.length === 0 && filteredInput.length > 0) {
        let inputArriveTimeError = { inputArriveTimeInvalid: false };
        let updatedErrors = { ...state.errors, ...inputArriveTimeError };
        newState['errors'] = updatedErrors;
      }
      return newState;
    }
    case UPDATE_INPUT_BURNTIME: {
      const burnVal = action.value;
      const filteredInput = Helper.filterNonNumericCharacters(burnVal);
      let newState = { ...state, burnTime: filteredInput };
      // If burnTime was empty before, and now there is at least one character
      // clear any previous burnTime error
      if (state.burnTime.length === 0 && filteredInput.length > 0) {
        let inputBurnTimeError = { inputBurnTimeInvalid: false };
        let updatedErrors = { ...state.errors, ...inputBurnTimeError };
        newState['errors'] = updatedErrors;
      }
      return newState;
    }
    case REMOVE_ALL_PROCESSES: {
      return { ...state, tableInput: [], tableOutput: [] };
    }
    case REMOVE_PROCESS: {
      let updatedTableInput = [ ...state.tableInput ];
      updatedTableInput.splice(action.idx,1);
      const updatedTableOutput = Algorithm.getSJFOrderedElements(updatedTableInput);
      return { ...state, tableInput: updatedTableInput, tableOutput: updatedTableOutput };
    }
    case ADD_PROCESS: {
      let arriveTime = state.arriveTime;
      let burnTime = state.burnTime;
      let name = state.name;
      let errorExists = false;
      let errors = { ...state.errors };

      if (name.trim().length === 0) {
        errorExists = true;
        errors.inputNameInvalid = true;
      }
      if (arriveTime.trim().length === 0) {
        errorExists = true;
        errors.inputArriveTimeInvalid = true;
      }
      if (burnTime.trim().length === 0) {
        errorExists = true;
        errors.inputBurnTimeInvalid = true;
      }

      let newState = { ...state };

      if (errorExists) {
        newState.errors = errors;
      }
      else {
        let uniqueId = state.lastUniqueId + 1;
        newState.lastUniqueId = uniqueId;
        let newProcess = { arriveTime:parseInt(arriveTime), burnTime:parseInt(burnTime), name, uniqueId };
        let updatedTableInput = [ ...state.tableInput, newProcess ];
        newState.tableInput = updatedTableInput;
        let updatedTableOutput = Algorithm.getSJFOrderedElements(updatedTableInput);
        newState.tableOutput = updatedTableOutput;
      }
      return newState;
    }
    case TOGGLE_MODAL: {
      return { ...state, modal: !state.modal };
    }
    case TOGGLE_NAVBAR: {
      let updatedNavBar = { ...state.navBar, isOpen: !state.navBar.isOpen };
      return { ...state, navBar: updatedNavBar };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
