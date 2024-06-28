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

function* updateShowReport(action){
    try {
        yield axios.put('/api/events', action.payload)
        yield put({type: 'FETCH_SHOW_REPORTS', payload: action.payload.venue_id})
    } catch (err){
        console.log('Error in PUT events saga', err)
    }
}

function* fetchShowDetails(action){
    try {
        const detailsResponse = yield axios(`/api/events/event/${action.payload}`)
        yield put({type: 'SET_DETAILS', payload: detailsResponse.data[0]})
    } catch (err){
        console.log('Error in GET details saga', err)
    }
}

function* dropShow(action){
    try {
        yield axios.delete(`/api/events/${action.payload.eventId}`)
        yield put({type: 'FETCH_SHOW_REPORTS', payload: action.payload.venue_id})
    } catch (err){
        console.log('Error in DELETE event saga', err)
    }
}



function* eventsSaga(){
    yield takeLatest('FETCH_SHOW_REPORTS', fetchEvents)
    yield takeLatest('SEND_NEW_REPORT', sendNewReport)
    yield takeLatest('UPDATE_SHOW_REPORT', updateShowReport)
    yield takeLatest('FETCH_SHOW_DETAILS', fetchShowDetails)
    yield takeLatest('DROP_SHOW', dropShow)
}

export default eventsSaga