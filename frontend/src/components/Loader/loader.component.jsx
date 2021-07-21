import React from 'react'
import { Spinner } from 'react-bootstrap'
function Loader() {
    return (
        <div>
            <Spinner animation='grow' role='status' style={{
                height: "100px", width:"100px", margin: "auto", display: "block"
                }}>
                    <span className="sr-only">Please Wait</span>
            </Spinner>
        </div>
    )
}

export default Loader
