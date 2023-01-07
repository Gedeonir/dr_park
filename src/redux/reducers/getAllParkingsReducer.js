import * as actions from '../constants/index'

const initialState = {
    getParkings:{
        parkings: [],
        success:false,
        error:null,
        loading:true
    },
}


export function getAllParkingsReducer(state = initialState, action){
    switch(action.type){

        case actions.FETCH_ALL_PARKINGS_SUCCESS:
            return {
                ...state,
                getParkings:{
                    parkings:action.payload,
                    success:true,
                    error:null,
                    loading:false
                }
            }
        case actions.FETCH_ALL_PARKINGS_FAIL:
            return{
                ...state,
                getParkings:{
                    success:false,
                    error:action.payload,
                    loading:false
                }

            }
        
        default:
            return state 
    }
}
