import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchEvents(action){
    try{
        const eventResponse = yield axios(`/api/events/${action.payload}`)
        yield put({type: 'FETCH_SHOW_REPORTS_SUCCESS', payload: eventResponse.data})
    } catch (err){
       console.log('Error in fetch events saga', err)
    }
}



function* eventsSaga(){
    yield takeLatest('FETCH_SHOW_REPORTS', fetchEvents)
}

export default eventsSaga