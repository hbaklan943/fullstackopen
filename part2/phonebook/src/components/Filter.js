import React from 'react'

export default function Filter({ value, onChange }) {
    return (
        <div>
            <input value={value} onChange={onChange} />
        </div>
    )
}



