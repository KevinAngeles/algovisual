import { expect } from 'chai';
import { REMOVE_ALL_PROCESSES, ADD_PROCESS, REMOVE_PROCESS, RESET_FORM_INPUTS, TOGGLE_MODAL, TOGGLE_NAVBAR, UPDATE_INPUT_PROCESSNAME, UPDATE_INPUT_ARRIVETIME, UPDATE_INPUT_BURNTIME } from '../../assets/js/actions/types';
import reducer from '../../assets/js/reducers/ui';

/* constants used in multiple unit tests */
const STRING_WHITESPACE_ONLY = '   ';
const STRING_EMPTY = '';
const ARRAY_EMPTY = [];
const ERROR_INPUT_NAME_WHITESPACE_MSG = 'Name must have at least one non-Whitespace character.';
const ERROR_INPUT_NAME_EMPTY_MSG = 'Name cannot be empty.';
const ERROR_INPUT_ARRIVETIME_EMPTY_MSG = 'Arrive time cannot be empty.';
const ERROR_INPUT_BURNTIME_EMPTY_MSG = 'Burn time cannot be empty.';
const ALGORITHM_VALID_ID = 'sjf';
const VALID_INPUT_BURNTIME = '3';
const VALID_INPUT_ARRIVETIME = '5';
const VALID_INPUT_NAME = 'Process1';

const ERROR_INPUT_NAME_WHITESPACE = {
  status: true,
  msg: ERROR_INPUT_NAME_WHITESPACE_MSG
};

const ERROR_INPUT_NAME_EMPTY = {
  status: true,
  msg: ERROR_INPUT_NAME_EMPTY_MSG
};

const ERROR_INPUT_ARRIVETIME_EMPTY = {
  status: true,
  msg: ERROR_INPUT_ARRIVETIME_EMPTY_MSG
};

const ERROR_INPUT_BURNTIME_EMPTY = {
  status: true,
  msg: ERROR_INPUT_BURNTIME_EMPTY_MSG
};

const ERROR_INPUT_NAME_OFF = {
  status: false,
  msg: STRING_EMPTY
};

const ERROR_INPUT_ARRIVETIME_OFF = {
  status: false,
  msg: STRING_EMPTY
};

const ERROR_INPUT_BURNTIME_OFF = {
  status: false,
  msg: STRING_EMPTY
};

const ALL_ERRORS_OFF = {
  inputNameInvalid: JSON.parse(JSON.stringify(ERROR_INPUT_NAME_OFF)),
  inputArriveTimeInvalid: JSON.parse(JSON.stringify(ERROR_INPUT_ARRIVETIME_OFF)),
  inputBurnTimeInvalid: JSON.parse(JSON.stringify(ERROR_INPUT_BURNTIME_OFF)),
};

const ALL_ERRORS_ON = {
  inputNameInvalid: JSON.parse(JSON.stringify(ERROR_INPUT_NAME_WHITESPACE)),
  inputArriveTimeInvalid: JSON.parse(JSON.stringify(ERROR_INPUT_ARRIVETIME_EMPTY)),
  inputBurnTimeInvalid: JSON.parse(JSON.stringify(ERROR_INPUT_BURNTIME_EMPTY)),
};

const initialState = {
  arriveTime: '0',
  burnTime: '1',
  lastUniqueId: 2,
  name: 'C',
  errors: JSON.parse(JSON.stringify(ALL_ERRORS_OFF)),
  graph: {
    margin: {
      top: 60,
      right: 30,
      bottom: 60,
      left: 30
    },
    width: 570,
    height: 240,
    barPadding: 0.05,
    barOuterPad: 0.2
  },
  tableInput: [
    {
      arriveTime: 2,
      burnTime: 2,
      name: 'A',
      uniqueId: 1,
    },
    {
      arriveTime: 1,
      burnTime: 2,
      name: 'B',
      uniqueId: 2,
    }
  ],
  tableOutput: [
    {
      arriveTime: 1,
      burnTime: 2,
      name: 'B',
      turnaroundTime: 2,
      uniqueId: 2,
      waitingTime: 0
    },
    {
      arriveTime: 2,
      burnTime: 2,
      name: 'A',
      turnaroundTime: 3,
      uniqueId: 1,
      waitingTime: 1
    },
  ],
  modal: false,
  navBar: {
    isOpen: false,
  }
};

const invalidNameEmptyState = {
  ...initialState,
  arriveTime: '1',
  burnTime: '2',
  name: STRING_EMPTY,
};

const invalidArriveTimeEmptyState = {
  ...initialState,
  arriveTime: STRING_EMPTY,
  burnTime: '2',
  name: 'A',
};

const invalidBurnTimeEmptyState = {
  ...initialState,
  arriveTime: '1',
  burnTime: STRING_EMPTY,
  name: 'A',
};

const invalidWhiteSpaceNameState = {
  ...initialState,
  arriveTime: '1',
  burnTime: '3',
  lastUniqueId: 1,
  name: STRING_WHITESPACE_ONLY,
};

describe('UI Reducer', () => {
  describe('DEFAULT', () => {
    it('should return the initial state', () => {
      const action = {};
      const expectedState = initialState;
      expect(reducer(initialState, action)).to.deep.equal(expectedState);
    });
  });
  describe(REMOVE_ALL_PROCESSES, () => {
    const action = {
      type: REMOVE_ALL_PROCESSES
    };
    const nextState = reducer(initialState, action);
    it('should reset lastUniqueId to 0', () => {
      expect(nextState.lastUniqueId).to.equal(0);
    });
    it('should remove all the content from tableInput', () => {
      expect(nextState.tableInput).to.deep.equal(ARRAY_EMPTY);
    });
    it('should remove all the content from tableOutput', () => {
      expect(nextState.tableOutput).to.deep.equal(ARRAY_EMPTY);
    });
  });
  describe(ADD_PROCESS, () => {
    const action = {
      type: ADD_PROCESS,
      algorithmId: ALGORITHM_VALID_ID
    };
    it('should add process to tableInput when form inputs are valid', () => {
      let expectedTableInput = [
        {
          arriveTime: 2,
          burnTime: 2,
          name: 'A',
          uniqueId: 1,
        },
        {
          arriveTime: 1,
          burnTime: 2,
          name: 'B',
          uniqueId: 2,
        },
        {
          arriveTime: 0,
          burnTime: 1,
          name: 'C',
          uniqueId: 3,
        }
      ];
      const nextState = reducer(initialState, action);
      expect(nextState.tableInput).to.deep.equal(expectedTableInput);
    });
    it('should recalculate tableOutput when form inputs are valid', () => {
      let expectedTableOutput = [
        {
          arriveTime: 0,
          burnTime: 1,
          name: 'C',
          turnaroundTime: 1,
          uniqueId: 3,
          waitingTime: 0
        },
        {
          arriveTime: 1,
          burnTime: 2,
          name: 'B',
          turnaroundTime: 2,
          uniqueId: 2,
          waitingTime: 0
        },
        {
          arriveTime: 2,
          burnTime: 2,
          name: 'A',
          turnaroundTime: 3,
          uniqueId: 1,
          waitingTime: 1
        },
      ];
      const nextState = reducer(initialState, action);
      expect(nextState.tableOutput).to.deep.equal(expectedTableOutput);
    });
    it('should increase the value of lastUniqueId by 1 when form inputs are valid', () => {
      const expectedLastUniqueId = 3;
      const nextState = reducer(initialState, action);
      expect(nextState.lastUniqueId).to.equal(expectedLastUniqueId);
    });
    it('should activate inputNameInvalid error when input "name" is empty', () => {
      const nextState = reducer(invalidNameEmptyState, action);
      expect(nextState.errors.inputNameInvalid.status).to.equal(true);
    });
    it('should update inputNameInvalid error message when input "name" is empty', () => {
      const nextState = reducer(invalidNameEmptyState, action);
      expect(nextState.errors.inputNameInvalid.msg).to.equal(ERROR_INPUT_NAME_EMPTY_MSG);
    });
    it('should activate inputNameInvalid error status when input "name" has only Whitespace characters', () => {
      const nextState = reducer(invalidWhiteSpaceNameState, action);
      expect(nextState.errors.inputNameInvalid.status).to.equal(true);
    });
    it('should update inputNameInvalid error message when input "name" has only Whitespace characters', () => {
      const nextState = reducer(invalidWhiteSpaceNameState, action);
      expect(nextState.errors.inputNameInvalid.msg).to.equal(ERROR_INPUT_NAME_WHITESPACE_MSG);
    });
    it('should activate inputArriveTimeInvalid error status when input "arriveTime" is empty', () => {
      const nextState = reducer(invalidArriveTimeEmptyState, action);
      expect(nextState.errors.inputArriveTimeInvalid.status).to.equal(true);
    });
    it('should update inputArriveTimeInvalid error message when input "arriveTime" is empty', () => {
      const nextState = reducer(invalidArriveTimeEmptyState, action);
      expect(nextState.errors.inputArriveTimeInvalid.msg).to.equal(ERROR_INPUT_ARRIVETIME_EMPTY_MSG);
    });
    it('should activate inputBurnTimeInvalid error status when input "burnTime" is empty', () => {
      const nextState = reducer(invalidBurnTimeEmptyState, action);
      expect(nextState.errors.inputBurnTimeInvalid.status).to.equal(true);
    });
    it('should update inputBurnTimeInvalid error message when input "burnTime" is empty', () => {
      const nextState = reducer(invalidBurnTimeEmptyState, action);
      expect(nextState.errors.inputBurnTimeInvalid.msg).to.equal(ERROR_INPUT_BURNTIME_EMPTY_MSG);
    });
  });
  describe(REMOVE_PROCESS, () => {
    it('should remove process from tableInput when uniqueId exists', () => {
      const action = {
        type: REMOVE_PROCESS,
        uniqueId: 2,
        algorithmId: ALGORITHM_VALID_ID
      };
      const nextState = reducer(initialState, action);
      const expectedTableInput = [{
        arriveTime: 2,
        burnTime: 2,
        name: 'A',
        uniqueId: 1,
      }];
      expect(nextState.tableInput).to.deep.equal(expectedTableInput);
    });
    it('should not remove any process from tableInput when uniqueId does not exist', () => {
      const action = {
        type: REMOVE_PROCESS,
        uniqueId: -1,
        algorithmId: ALGORITHM_VALID_ID
      };
      const nextState = reducer(initialState, action);
      const expectedTableInput = initialState.tableInput;
      expect(nextState.tableInput).to.deep.equal(expectedTableInput);
    });
    it('should remove process from tableOutput when uniqueId exists', () => {
      const action = {
        type: REMOVE_PROCESS,
        uniqueId: 1,
        algorithmId: ALGORITHM_VALID_ID
      };
      const nextState = reducer(initialState, action);
      const expectedTableOutput = [{
        arriveTime: 1,
        burnTime: 2,
        name: 'B',
        turnaroundTime: 2,
        uniqueId: 2,
        waitingTime: 0
      }];
      expect(nextState.tableOutput).to.deep.equal(expectedTableOutput);
    });
    it('should not remove any process from tableOutput when uniqueId does not exist', () => {
      const action = {
        type: REMOVE_PROCESS,
        uniqueId: -1,
        algorithmId: ALGORITHM_VALID_ID
      };
      const nextState = reducer(initialState, action);
      const expectedTableOutput = initialState.tableOutput;
      expect(nextState.tableOutput).to.deep.equal(expectedTableOutput);
    });
  });
  describe(TOGGLE_MODAL, () => {
    const action = {
      type: TOGGLE_MODAL
    };
    it('should turn modal On when it is Off', () => {
      const modalOffState = { ...initialState, modal: false };
      const nextState = reducer(modalOffState, action);
      expect(nextState.modal).to.equal(true);
    });
    it('should turn modal Off when it is On', () => {
      const modalOnState = { ...initialState, modal: true };
      const nextState = reducer(modalOnState, action);
      expect(nextState.modal).to.equal(false);
    });
  });
  describe(TOGGLE_NAVBAR, () => {
    const action = {
      type: TOGGLE_NAVBAR
    };
    it('should Open navBar when it is closed', () => {
      const navBarClosedState = { ...initialState, navBar: { isOpen: false } };
      const nextState = reducer(navBarClosedState, action);
      const expectedNavBar = { isOpen: true };
      expect(nextState.navBar).to.deep.equal(expectedNavBar);
    });
    it('should Close navBar when it is opened', () => {
      const navBarOpenedState = { ...initialState, navBar: { isOpen: true } };
      const nextState = reducer(navBarOpenedState, action);
      const expectedNavBar = { isOpen: false };
      expect(nextState.navBar).to.deep.equal(expectedNavBar);
    });
  });
  describe('UPDATE_INPUT_PROCESSNAME', () => {
    it('should update form input name when user type a character', () => {
      // Create a state with a random name
      const normalState = { ...initialState, name: 'Proces' };
      // Append a character to name
      const updatedInputName = 'Process';
      // Fill input name with a value of longer length than the original state.
      const action = {
        type: UPDATE_INPUT_PROCESSNAME,
        value: updatedInputName
      };
      const nextState = reducer(normalState, action);
      expect(nextState.name).to.equal(updatedInputName);
    });
    it('should update form input name when user removes a character', () => {
      // Create a state with a random name
      const normalState = { ...initialState, name: 'Processs' };
      // Remove one character from name
      const updatedInputName = 'Process';
      // Fill input name with a value of lower length than the original state.
      const action = {
        type: UPDATE_INPUT_PROCESSNAME,
        value: updatedInputName
      };
      const nextState = reducer(normalState, action);
      expect(nextState.name).to.equal(updatedInputName);
    });
    it('should update input name when the updated name has only Non-Whitespace character(s)', () => {
      // Create a state with inputNameInvalid error activated and fill input name with non-Whitespace characters
      let nameWithErrorState = { ...invalidWhiteSpaceNameState };
      nameWithErrorState.errors.inputNameInvalid = ERROR_INPUT_NAME_WHITESPACE;
      const action = {
        type: UPDATE_INPUT_PROCESSNAME,
        value: STRING_WHITESPACE_ONLY
      };
      const nextState = reducer(nameWithErrorState, action);
      expect(nextState.name).to.equal(STRING_WHITESPACE_ONLY);
    });
    it('should not modify input name error when the updated name has only Non-Whitespace character(s)', () => {
      // Create a state with inputNameInvalid error activated and fill input name with non-Whitespace characters
      let nameWithErrorState = { ...invalidWhiteSpaceNameState };
      nameWithErrorState.errors.inputNameInvalid = ERROR_INPUT_NAME_WHITESPACE;
      const action = {
        type: UPDATE_INPUT_PROCESSNAME,
        value: STRING_WHITESPACE_ONLY
      };
      const nextState = reducer(nameWithErrorState, action);
      expect(nextState.errors.inputNameInvalid).to.equal(ERROR_INPUT_NAME_WHITESPACE);
    });
    it('should update input name even if the updated name is empty', () => {
      // Create a state with inputNameInvalid error activated and an empty input name
      let nameWithErrorState = { ...invalidNameEmptyState };
      nameWithErrorState.errors.inputNameInvalid = ERROR_INPUT_NAME_EMPTY;
      const action = {
        type: UPDATE_INPUT_PROCESSNAME,
        value: STRING_EMPTY
      };
      const nextState = reducer(nameWithErrorState, action);
      expect(nextState.name).to.equal(STRING_EMPTY);
    });
    it('should not modify input name error when the updated name is empty', () => {
      // Create a state with inputNameInvalid error activated and an empty input name
      let nameWithErrorState = { ...invalidNameEmptyState };
      nameWithErrorState.errors.inputNameInvalid = ERROR_INPUT_NAME_EMPTY;
      const action = {
        type: UPDATE_INPUT_PROCESSNAME,
        value: STRING_EMPTY
      };
      const nextState = reducer(nameWithErrorState, action);
      expect(nextState.errors.inputNameInvalid).to.deep.equal(ERROR_INPUT_NAME_EMPTY);
    });
  });
  describe(UPDATE_INPUT_ARRIVETIME, () => {
    // Create a state with inputArriveTimeInvalid error activated
    let initialStateErrors = invalidArriveTimeEmptyState.errors;
    let arriveTimeWithErrorState = { ...invalidArriveTimeEmptyState, errors: JSON.parse(JSON.stringify(initialStateErrors)) };
    arriveTimeWithErrorState.errors.inputArriveTimeInvalid = ERROR_INPUT_ARRIVETIME_EMPTY;
    it('should update input arriveTime when the updated arriveTime is valid', () => {
      // Update input arriveTime with a valid string
      const action = {
        type: UPDATE_INPUT_ARRIVETIME,
        value: VALID_INPUT_ARRIVETIME
      };
      const nextState = reducer(arriveTimeWithErrorState, action);
      expect(nextState.arriveTime).to.equal(VALID_INPUT_ARRIVETIME);
    });
    it('should clear inputArriveTimeInvalid error when the updated arriveTime is valid', () => {
      // Update input arriveTime with a valid string
      const action = {
        type: UPDATE_INPUT_ARRIVETIME,
        value: VALID_INPUT_ARRIVETIME
      };
      const nextState = reducer(arriveTimeWithErrorState, action);
      expect(nextState.errors.inputArriveTimeInvalid).to.deep.equal(ERROR_INPUT_ARRIVETIME_OFF);
    });
    it('should update input arriveTime when the updated arriveTime is empty', () => {
      // Update input arriveTime with an empty string
      const action = {
        type: UPDATE_INPUT_ARRIVETIME,
        value: STRING_EMPTY
      };
      const nextState = reducer(arriveTimeWithErrorState, action);
      expect(nextState.arriveTime).to.equal(STRING_EMPTY);
    });
    it('should not modify inputArriveTimeInvalid error when the updated arriveTime is empty', () => {
      // Update input arriveTime with an empty string
      const action = {
        type: UPDATE_INPUT_ARRIVETIME,
        value: STRING_EMPTY
      };
      const nextState = reducer(arriveTimeWithErrorState, action);
      expect(nextState.errors.inputArriveTimeInvalid).to.deep.equal(ERROR_INPUT_ARRIVETIME_EMPTY);
    });
  });
  describe(UPDATE_INPUT_BURNTIME, () => {
    // Create a state with inputBurnTimeInvalid error activated
    let initialStateErrors = invalidBurnTimeEmptyState.errors;
    let burnTimeWithErrorState = { ...invalidBurnTimeEmptyState, errors: JSON.parse(JSON.stringify(initialStateErrors)) };
    burnTimeWithErrorState.errors.inputBurnTimeInvalid = ERROR_INPUT_BURNTIME_EMPTY;
    it('should update input burnTime when the updated burnTime is valid', () => {
      // Update input burnTime with a valid string
      const action = {
        type: UPDATE_INPUT_BURNTIME,
        value: VALID_INPUT_BURNTIME
      };
      const nextState = reducer(burnTimeWithErrorState, action);
      expect(nextState.burnTime).to.equal(VALID_INPUT_BURNTIME);
    });
    it('should clear inputBurnTimeInvalid error when the updated burnTime is valid', () => {
      // Update input burnTime with a valid string
      const action = {
        type: UPDATE_INPUT_BURNTIME,
        value: VALID_INPUT_BURNTIME
      };
      const nextState = reducer(burnTimeWithErrorState, action);
      expect(nextState.errors.inputBurnTimeInvalid).to.deep.equal(ERROR_INPUT_BURNTIME_OFF);
    });
    it('should update input burnTime when the updated burnTime is empty', () => {
      // Update input burnTime with an empty string
      const action = {
        type: UPDATE_INPUT_BURNTIME,
        value: STRING_EMPTY
      };
      const nextState = reducer(burnTimeWithErrorState, action);
      expect(nextState.burnTime).to.equal(STRING_EMPTY);
    });
    it('should not modify inputBurnTimeInvalid error when the updated burnTime is empty', () => {
      // Update input burnTime with an empty string
      const action = {
        type: UPDATE_INPUT_BURNTIME,
        value: STRING_EMPTY
      };
      const nextState = reducer(burnTimeWithErrorState, action);
      expect(nextState.errors.inputBurnTimeInvalid).to.deep.equal(ERROR_INPUT_BURNTIME_EMPTY);
    });
  });
  describe(RESET_FORM_INPUTS, () => {
    // let tmpWow = JSON.parse(JSON.stringify(ALL_ERRORS_OFF));
    let allErrorsOnState = { ...initialState, errors: ALL_ERRORS_ON, name: VALID_INPUT_NAME, arriveTime: VALID_INPUT_ARRIVETIME, burnTime: VALID_INPUT_BURNTIME };

    const action = {
      type: RESET_FORM_INPUTS,
    };
    const nextState = reducer(allErrorsOnState, action);
    it('should clear input name', () => {
      expect(nextState.name).to.equal(STRING_EMPTY);
    });
    it('should clear input arriveTime', () => {
      expect(nextState.arriveTime).to.equal(STRING_EMPTY);
    });
    it('should clear input burnTime', () => {
      expect(nextState.burnTime).to.equal(STRING_EMPTY);
    });
    it('should clear any error', () => {
      expect(nextState.errors).to.deep.equal(ALL_ERRORS_OFF);
    });
  });
});
