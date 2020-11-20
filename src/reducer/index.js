// import moduleName from 'module';

const numberInitialState = {};
export const number = (state = numberInitialState, action) => {
  switch (action.type) {
    case "INCRENTMENT":
      return { state: state + 1 };
    case "INCREASE":
      return { state: state - 1 };
    default:
      return state;
  }
};
