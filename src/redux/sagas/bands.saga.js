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


function* bandsSaga(){
    yield takeLatest('FETCH_BANDS', fetchBands)
}

export default bandsSaga   