import * as actions from '../constants/index'

const initialState = {
    oneParking:{
        oneParking:[],
        success:false,
        error:null,
        loading:true
    }, 
}


export function getOneParkingReducer(state = initialState, action){
    switch(action.type){

        case actions.FETCH_ONE_PARKING:
            return {
                ...state,
                oneParking:{
                    oneParking:action.payload,
                    loading:false,
                    success:true,
                    error:null
                }
            }
        case actions.FETCH_ONE_PARKING_FAIL:
            return {
                ...state,
                oneParking:{
                    loading:false,
                    success:false,
                    error:action.payload
                }
            }
        default:
            return state 
    }
}
