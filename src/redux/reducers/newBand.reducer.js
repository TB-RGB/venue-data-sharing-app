const newBandReducer = (state={}, action)=>{
    switch(action.type){
        case 'SET_NEW_BAND':
            return action.payload
        case 'UNSET_NEW_BAND':
            return {}
        default:
            return state
    }
}

export default newBandReducer