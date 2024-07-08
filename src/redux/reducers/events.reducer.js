const eventsReducer =  (
  state = { showReports: [], loading: true },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_REPORTS":
      return { ...state, loading: false, showReports: action.payload };
    default:
      return state;
  }
};



export default eventsReducer;
