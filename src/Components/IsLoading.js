import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Layouts/Loader'

function IsLoading() {
    const loading = useSelector((state) => state.toggleState.isLoading);
    return (
        <>
            {loading && <Loader />}
        </>
    )
}

export default IsLoading
