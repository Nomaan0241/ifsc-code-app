import React from 'react'
import { Helmet } from 'react-helmet'

function HeaderTags({ title, description }) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
        </>
    )
}

export default HeaderTags
