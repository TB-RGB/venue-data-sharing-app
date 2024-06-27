import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchVenue(action) {
  try {
    const venueResponse = yield axios.get(`/api/venue/${action.payload}`);
    yield put({ type: "SET_VENUE", payload: venueResponse.data[0] });
  } catch (err) {
    console.log("Error in GET venue saga", err);
  }
}

function* sendVenue(action) {
  try {
    yield axios.post("/api/venue", action.payload);
    yield put({ type: "FETCH_VENUE", payload: action.payload.id });
  } catch (err) {
    console.log("Error in POST venue saga", err);
  }
}

function* updateName(action) {
  try {
    yield axios.put("/api/venue/name", action.payload);
    yield put({ type: "FETCH_VENUE", payload: action.payload.id });
  } catch (err) {
    console.log("Error in PUT venue saga", err);
  }
}

function* updateCapacity(action) {
  try {
    yield axios.put("/api/venue/capacity", action.payload);
    yield put({ type: "FETCH_VENUE", payload: action.payload.id });
  } catch (err) {
    console.log("Error in PUT venue saga", err);
  }
}

function* updateWebsite(action) {
  try {
    yield axios.put("/api/venue/website", action.payload);
    yield put({ type: "FETCH_VENUE", payload: action.payload.id });
  } catch (err) {
    console.log("Error in PUT venue saga", err);
  }
}

function* updateInstagram(action) {
  try {
    yield axios.put("/api/venue/instagram", action.payload);
    yield put({ type: "FETCH_VENUE", payload: action.payload.id });
  } catch (err) {
    console.log("Error in PUT venue saga", err);
  }
}

function* venueSaga() {
  yield takeLatest("FETCH_VENUE", fetchVenue);
  yield takeLatest("SEND_VENUE", sendVenue);
  yield takeLatest("UPDATE_NAME", updateName);
  yield takeLatest("UPDATE_CAPACITY", updateCapacity);
  yield takeLatest("UPDATE_WEBSITE", updateWebsite);
  yield takeLatest("UPDATE_INSTAGRAM", updateInstagram);
}

export default venueSaga;
