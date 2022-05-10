import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Back = () => {
    let navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }
    return (
        <button onClick={goBack}>Back</button>
    )
}
