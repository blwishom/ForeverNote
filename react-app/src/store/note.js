const GET_NOTES = "notes/GET_NOTES";
const GET_ONENOTE = "notes/GETONE_NOTE";
const CREATE_NOTE = "notes/CREATE_NOTE";

const getNotesAction = (notes) => ({
    type: GET_NOTES,
    payload: notes
});

const getOneNoteAction = (note) => ({
    type: GET_ONENOTE,
    payload: note
});

const createNoteAction = (note) => ({
    type: CREATE_NOTE,
    payload: note
})

export const getNotesThunk = () => async (dispatch) => {
    const res = await fetch("/api/notes/");

    if (res.ok) {
        let notes = await res.json();
        dispatch(getNotesAction(notes));
    }
    return res;
}

export const getOneNoteThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/notes/${id}`);

    if (res.ok) {
        const note = await res.json();
        dispatch(getNotesAction(note));
    } else {
        return "No note has been retrieved"
    }
    return res;
}

export const createNoteThunk = (note) => async (dispatch) => {
    const res = await fetch("/api/notes/", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {"Content-Type": "application/json"}
    });
}

export const addNoteThunk = (note) => async (dispatch) => {
    const res = await fetch("/api/notes/", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {"Content-Type": "application/json"}
    })
}

const initialState = {};
export default function notesReducer(state = initialState, action) {
    const newState = {...state};
    switch (action.type) {
        case GET_NOTES:
            return {notes: action.payload};
        case GET_ONENOTE:
            return {
                notes: action.payload,
            }
        case CREATE_NOTE:
            return {
                newState,
                notes: action.payload,
            };
            default:
                return state;
        }
    }
