import React from 'react'
import { Alert } from 'react-bootstrap'

function ErrorMessage({variant, key, children}) {
    return (
        <div>
            <Alert variant={variant} key= {key}>
                {children}
            </Alert>
        </div>
    )
}

export default ErrorMessage
