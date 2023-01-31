import React from 'react'

export default function Numbers({ searchInput, persons }) {
    return (
        <div>
            {
                searchInput !== ''
                    ? persons
                        .filter((person) => person.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
                        .map((person) => <li key={person.name}>{person.name} {person.number}</li>)
                    : persons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)
            }
        </div>
    )
}
