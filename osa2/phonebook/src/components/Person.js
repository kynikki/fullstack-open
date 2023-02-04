import React from "react"

const Person = (props, remove) => {      
    
    return (
        <li>
            {props.name} {props.number}
            <button onClick={props.remove}>delete</button>                                    
        </li>
    )
}
export default Person