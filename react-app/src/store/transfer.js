const LOAD = 'transferss/LOAD'
const CREATE = 'transfers/CREATE'
const ERROR = 'transfers/ERROR'
const getTransfers = (list) =>({
    type: LOAD,
    list
})

const postTransfer = (payload) =>({
    type: CREATE,
    payload
})

const errors = (payload) =>({
    type: ERROR,
    payload
})

export const requestTransfers = (id) => async (dispatch) => {
    const response = await fetch(`/api/transfers/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getTransfers(data))
    
}

export const makeTransfers = (sessionId, receiverIdentification, coinAmt, coinId ) => async (dispatch)=> {
    const response = await fetch("/api/transfers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'sender_id': sessionId,
            'receiver_identification': receiverIdentification,
            'coinamt': coinAmt,
            'coin_id': coinId
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return dispatch(errors(data));
    }
    dispatch(postTransfer(data));
}
const initialState = { list : [] }

const transferReducer = (state= initialState, action)=> {
    switch(action.type){
        case LOAD: {
            const transferList = action.list
            const newList = []
            for (const key in transferList){
                newList.unshift(transferList[key])
            }
            return { list: newList, ...transferList}
        }
        case CREATE: {
            state.list.push(action.payload);
            const newTransferId = action.payload.id;
            const object = {}
            object[newTransferId]= action.payload
            return {...state, ...object }
        }
        case ERROR:{
            return {...state, errors: action.payload.errors}
        }    
        default:
            return state;
    }
}

export default transferReducer;