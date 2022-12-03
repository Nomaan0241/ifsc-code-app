import { createSlice } from '@reduxjs/toolkit'

const ifscFetchDetails = createSlice({
    name: 'ifscFetchDetails',
    initialState: {
        bank: [
            { bankvalue: 'punjab-national-bank', bankname: 'Punjab National Bank' },
            { bankvalue: 'axis-bank', bankname: 'Axis Bank' },
            { bankvalue: 'state-bank-of-india', bankname: 'State Bank of India' },
        ],
        state: [
            {statevalue:'punjab', statename: 'Punjab'},
            {statevalue:'delhi', statename: 'Delhi'},
            {statevalue:'haryana', statename: 'Haryana'}
        ],
        district: [
            {districtvalue:'firozpur', districtname: 'Firozpur'},
            {districtvalue:'chandigarh', districtname: 'Chandigarh'},
            {districtvalue:'moga', districtname: 'Moga'}
        ],
        branch: [
            {branchvalue:'firozpur-city', branchname: 'Firozpur City'},
            {branchvalue:'firozpur-cantt', branchname: 'Firozpur Cantt'},
            {branchvalue:'zira', branchname: 'Zira'},
        ],
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
            dispatch(setIfscFetchedDetails({key:fetchFor, value: data}));
        } catch (error) {
            console.log(error);
        }
    }
}

export const { setIfscFetchedDetails } = ifscFetchDetails.actions;
export default ifscFetchDetails.reducer;