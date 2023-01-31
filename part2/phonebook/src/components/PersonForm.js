import React from 'react'

export default function PersonForm({ onSubmit, newPersonName, newPersonNumber, onNameChange, onNumberChange }) {
    return (

        <form onSubmit={onSubmit}>
            <div>
                name: <input value={newPersonName} onChange={onNameChange} />
            </div>

            <div>
                number: <input value={newPersonNumber} onChange={onNumberChange} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>

    )
}
