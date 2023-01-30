import Course from "./Course"

const Courses = ({ courses }) => {
    return (
        <div>
            <h1>
                <ul>
                    {courses.map((course) => {
                        return <Course key={course.id} course={course} />
                    })}
                </ul>
            </h1>
        </div >
    )
};

export default Courses;
