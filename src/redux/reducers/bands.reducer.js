const bandsReducer = (state = {}, action)=>{
    switch(action.type){
        case 'SET_BANDS':
            return action.payload
        default:
            return state
    }
}

export default bandsReducer