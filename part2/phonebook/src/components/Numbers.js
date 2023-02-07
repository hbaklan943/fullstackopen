import React from 'react'

export default function Numbers({ searchInput, persons, deleteNumber }) {
    return (
        <div>
            {
                searchInput !== ''
                    ? persons
                        .filter((person) => person.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
                        .map((person) =>
                            <li key={person.name}>
                                {person.name} {person.number}
                                <button onClick={() => deleteNumber(person.id)}> delete</button>
                            </li>)
                    : persons.map((person) =>
                        <li key={person.name}>
                            {person.name} {person.number}
                            <button onClick={() => deleteNumber(person.id)}> delete</button>
                        </li>)
            }
        </div >
    )
}
