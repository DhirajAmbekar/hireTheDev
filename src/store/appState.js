const default_data = {
  developers: {},
  jobs: {},
};
export const data = {
  ...default_data,
};
const AppState = (state = data, { type, subType, payload }) => {
  switch (type) {
    case "setAppState":
      switch (subType) {
        case "developers":
          return {
            ...state,
            ...payload,
          };
        case "jobs":
          return {
            ...state,
            ...payload,
          };

        default:
          return state;
      }
    default:
      return state;
  }
};
export default AppState;
