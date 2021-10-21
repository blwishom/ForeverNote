const GET_NOTES = "notes/LOAD";

const getNotesAction = (notes) => ({
    type: GET_NOTES,
    payload: notes,
});

export const getNotesThunk = () => async (dispatch) => {
    const res = await fetch("/api/notes/");

    if (res.ok) {
        let notes = await res.json();
        dispatch(getNotesAction(notes));
    }
    return res;
}

const initialState = {};
export default function notesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NOTES:
            return action.payload;
        default:
            return state;
    }
}
