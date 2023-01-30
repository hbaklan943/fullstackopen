const Course = ({ course }) => {
    const sumOfExercises = course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)

    return (
        <li >
            {course.name}
            <ul>
                {course.parts.map((part) => <li key={part.id}> {part.name} {part.exercises} </li>)}
            </ul>
            <h3>Total of {sumOfExercises} exercises</h3>

        </li >
    )
}

export default Course