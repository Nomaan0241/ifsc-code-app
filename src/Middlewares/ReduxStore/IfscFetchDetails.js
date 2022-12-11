import { createSlice } from '@reduxjs/toolkit'

const ifscFetchDetails = createSlice({
    name: 'ifscFetchDetails',
    initialState: {
        bank: ['Punjab National Bank', 'Axis Bank', 'State Bank of India', 'ICICI Bank', 'Canara Bank'],
        state: ['Punjab', 'Delhi', 'Haryana'],
        district: ['Firozpur', 'Chandigarh', 'Moga'],
        branch: ['Firozpur City', 'Firozpur Cantt', 'Zira',],
        ifsc: {}
    },
    reducers: {
        setIfscFetchedDetails(state, actions) {
            state[actions.payload.key] = actions.payload.value;
        }
    }
});

export function fetchIFSCDetails(fetchFor, fetchLink) {
    return async function fetchingIFSCDetails(dispatch, getState) {
        try {
            const res = await fetch(fetchLink);
            const data = await res.json();
            console.log(data);
            dispatch(setIfscFetchedDetails({ key: fetchFor, value: data }));
        } catch (error) {
            console.log(error);
        }
    }
}

export const { setIfscFetchedDetails } = ifscFetchDetails.actions;
export default ifscFetchDetails.reducer;