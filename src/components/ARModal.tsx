import React from "react";

export default function ARModal({ arUrl }) {
    
    return(
        <>
        <div>
            <h2>Realtà Aumentata</h2>
            <button>X</button>
            <a href={arUrl}>QR IMAGE</a>
            <p>P TEXT</p>
        </div>
        </>
    )
}