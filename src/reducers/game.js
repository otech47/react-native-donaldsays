import * as types from '../constants/actionTypes';

const initialState = {
    electoralVotes: 0,
    daysToElection: 30,
    didWin: false
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case types.GAME_OVER:
            return {
                ...state,
                didWin: action.didWin
            }
        case types.ADD_VOTE:
            return {
                ...state,
                electoralVotes: state.electoralVotes + 1
            }
        case types.RESET_GAME:
            return {
                ...state,
                didWin: false,
                electoralVotes: 0,
                daysToElection: 30
            }
        case types.SUBTRACT_DAY:
            return {
                ...state,
                daysToElection: state.daysToElection - 1
            }
        default:
            return state;
    }
}