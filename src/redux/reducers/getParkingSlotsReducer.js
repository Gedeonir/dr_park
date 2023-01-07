import * as actions from '../constants/index'

const initialState = {  
    parkingSlots:{
        success:false,
        error:null,
        loading:true,
        parkingSlots:[]
    },
 
}


export function getParkingSlotsReducer(state = initialState, action){
    switch(action.type){

        case actions.FETCH_ONE_PARKING_SLOTS:
            return {
                ...state,
                parkingSlots:{
                    success:true,
                    error:null,
                    loading:false,
                    parkingSlots:action.payload
                },
            }
        case actions.FETCH_ONE_PARKING_SLOTS_FAIL:
            return{
                ...state,
                parkingSlots:{
                    success:false,
                    error:action.payload,
                    loading:false,
                },
            }
        default:
            return state 
    }
}
