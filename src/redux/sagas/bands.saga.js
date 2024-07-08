import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchBands(){
    try {
        const bandResponse = yield axios('/api/bands')
        yield put({type: 'SET_BANDS', payload: bandResponse.data })
    } catch (err){
        console.log('Error in GET bands saga', err)
    }
}

function* addBand(action){
    try {
        const newBandResponse = yield axios.post('/api/bands', action.payload)
        // console.log(newBandResponse.data[0].id)
        yield put({type: 'SET_NEW_BAND', payload: newBandResponse.data[0].id})
        yield put({type: 'FETCH_BANDS'})
    } catch (err){
        console.log('Error in POST band saga', err)
    }
}

function* fetchDetails(action){
    try {
        const bandDetailsResponse = yield axios(`/api/events/band/${action.payload}`)
        yield put({type: 'SET_BAND_DETAILS', payload: bandDetailsResponse.data})
    } catch (err){
        console.log('Error in GET band details saga', err)
    }
}


function* bandsSaga(){
    yield takeLatest('FETCH_BANDS', fetchBands)
    yield takeLatest('ADD_BAND', addBand)
    yield takeLatest('FETCH_BAND_DETAILS', fetchDetails)
}

export default bandsSaga   