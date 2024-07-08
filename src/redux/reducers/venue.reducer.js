const venueReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_VENUE":
      return action.payload;
    case "UNSET_VENUE":
      return {};
    default:
      return state;
  }
};

export default venueReducer;
