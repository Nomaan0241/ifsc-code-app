import React from 'react'

function TitleHeader({ title = 'title', title2 = 'us' }) {
    return (
        <>
            <h1 className='sectionHeaderTitle'>{title} <span>{title2}</span></h1>
        </>
    )
}

export default TitleHeader