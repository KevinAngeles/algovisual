import { expect } from 'chai';
import { REMOVE_ALL_PROCESSES, ADD_PROCESS } from '../../assets/js/actions/types';
import reducer from '../../assets/js/reducers/ui';

const initialState = {
  arriveTime: '0',
  burnTime: '1',
  lastUniqueId: 2,
  name: 'C',
  errors: {
    inputNameInvalid: {
      status: false,
      msg: ''
    },
    inputArriveTimeInvalid: {
      status: false,
      msg: ''
    },
    inputBurnTimeInvalid: {
      status: false,
      msg: ''
    },
  },
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
  name: '',
};

const invalidArriveTimeEmptyState = {
  ...initialState,
  arriveTime: '',
  burnTime: '2',
  name: 'A',
};

const invalidBurnTimeEmptyState = {
  ...initialState,
  arriveTime: '1',
  burnTime: '',
  name: 'A',
};

const invalidWhiteSpaceNameState = {
  ...initialState,
  arriveTime: '1',
  burnTime: '3',
  lastUniqueId: 1,
  name: '   ',
};

describe('UI Reducer', () => {
  describe('DEFAULT', () => {
    it('should return the initial state', () => {
      const action = {};
      const expectedState = initialState;
      expect(reducer(initialState, action)).to.deep.equal(expectedState);
    });
  });
  describe('REMOVE_ALL_PROCESSES', () => {
    it('should reset lastUniqueId to 0', () => {
      const action = {
        type: REMOVE_ALL_PROCESSES
      };
      const nextState = reducer(initialState, action);
      expect(nextState.lastUniqueId).to.deep.equal(0);
    });
    it('should remove all the content from tableInput', () => {
      const action = {
        type: REMOVE_ALL_PROCESSES
      };
      const nextState = reducer(initialState, action);
      expect(nextState.tableInput).to.deep.equal([]);
    });
    it('should remove all the content from tableOutput', () => {
      const action = {
        type: REMOVE_ALL_PROCESSES
      };
      const nextState = reducer(initialState, action);
      expect(nextState.tableOutput).to.deep.equal([]);
    });
  });
  describe('ADD_PROCESS', () => {
    it('should add process to tableInput when form inputs are valid', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };

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
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };

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
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const expectedLastUniqueId = 3;
      const nextState = reducer(initialState, action);

      expect(nextState.lastUniqueId).to.deep.equal(expectedLastUniqueId);
    });
    it('should activate inputNameInvalid error status when input "name" is empty', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };

      const nextState = reducer(invalidNameEmptyState, action);
      expect(nextState.errors.inputNameInvalid.status).to.deep.equal(true);
    });
    it('should update inputNameInvalid error message when input "name" is empty', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const nextState = reducer(invalidNameEmptyState, action);
      expect(nextState.errors.inputNameInvalid.msg).to.deep.equal('Name cannot be empty.');
    });
    it('should activate inputNameInvalid error status when input "name" has only Whitespace characters', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const nextState = reducer(invalidWhiteSpaceNameState, action);
      expect(nextState.errors.inputNameInvalid.status).to.deep.equal(true);
    });
    it('should update inputNameInvalid error message when input "name" has only Whitespace characters', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const nextState = reducer(invalidWhiteSpaceNameState, action);
      expect(nextState.errors.inputNameInvalid.msg).to.deep.equal('Name must have at least one non-Whitespace character.');
    });
    it('should activate inputArriveTimeInvalid error status when input "arriveTime" is empty', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const nextState = reducer(invalidArriveTimeEmptyState, action);
      expect(nextState.errors.inputArriveTimeInvalid.status).to.deep.equal(true);
    });
    it('should update inputArriveTimeInvalid error message when input "arriveTime" is empty', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const nextState = reducer(invalidArriveTimeEmptyState, action);
      expect(nextState.errors.inputArriveTimeInvalid.msg).to.deep.equal('Arrive time cannot be empty.');
    });
    it('should activate inputBurnTimeInvalid error status when input "burnTime" is empty', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const nextState = reducer(invalidBurnTimeEmptyState, action);
      expect(nextState.errors.inputBurnTimeInvalid.status).to.deep.equal(true);
    });
    it('should update inputBurnTimeInvalid error message when input "burnTime" is empty', () => {
      const action = {
        type: ADD_PROCESS,
        algorithmId: 'sjf'
      };
      const nextState = reducer(invalidBurnTimeEmptyState, action);
      expect(nextState.errors.inputBurnTimeInvalid.msg).to.deep.equal('Burn time cannot be empty.');
    });
  });
});
