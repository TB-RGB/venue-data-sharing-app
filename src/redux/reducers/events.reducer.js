const eventsReducer =  (
  state = { showReports: [], loading: true },
  action
) => {
  switch (action.type) {
    case "FETCH_SHOW_REPORTS_SUCCESS":
      return { ...state, loading: false, showReports: action.payload };
    default:
      return state;
  }
};



export default eventsReducer;
