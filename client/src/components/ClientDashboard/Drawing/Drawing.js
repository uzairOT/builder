import React, { useState } from 'react'
import FileBox from '../FileBox/FileBox'

function Drawing() {


    return (
        <div style={{ width: "100%", marginBottom: "1rem" }}>
            <FileBox titleHeading={"Drawing"} buttonName={"Add Drawing"} modalHeading={"Drawing Files"} />
        </div>
    )
}

export default Drawing
