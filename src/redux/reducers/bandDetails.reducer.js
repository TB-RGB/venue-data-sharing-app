const bandDetailsReducer = (state=[], action)=>{
    switch(action.type){
        case 'SET_BAND_DETAILS':
            return action.payload
        default: 
            return state
    }
}

export default bandDetailsReducer