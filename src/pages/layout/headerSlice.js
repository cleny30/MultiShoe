import { createSlice } from '@reduxjs/toolkit';
import { doRequest } from '../../utils/common';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        headers: [],
        loading: false,
    },
    reducers: {
        setHeaders(state, action) {
            state.headers = action.payload;
            state.loading = false;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setHeaders, setLoading } = headerSlice.actions;

export const fetchHeader = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await doRequest(
            'get',
            `api/Header`
        );
        const favorites = response.data.result;
        dispatch(setHeaders(favorites));
    } catch (error) {
        console.error('Error fetching favorites:', error);
        dispatch(setLoading(false));
    }
};

export default headerSlice.reducer;
