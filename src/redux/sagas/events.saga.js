import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchEvents(action){
    try{
        const eventResponse = yield axios(`/api/events/${action.payload}`)
        yield put({type: 'FETCH_SHOW_REPORTS_SUCCESS', payload: eventResponse.data})
    } catch (err){
       console.log('Error in GET events saga', err)
    }
}

function* sendNewReport(action){
    try {
        yield axios.post('/api/events', action.payload)
        yield put({type: 'FETCH_SHOW_REPORTS', payload: action.payload.venue_id})
    } catch (err){
        console.log('Error in POST events saga', err)
    }
}



function* eventsSaga(){
    yield takeLatest('FETCH_SHOW_REPORTS', fetchEvents)
    yield takeLatest('SEND_NEW_REPORT', sendNewReport)
}

export default eventsSaga