
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Store form information
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  // Store registered students
  const [students, setStudents] = useState([]);

  // Store the search input
  const [search, setSearch] = useState("");

  // Store the message
  const [message, setMessage] = useState("");

  // Display welcome message when the app loads
  useEffect(() => {
    setMessage("Welcome to the Student Registration System!");
  }, []);

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    if (
      fullName.trim() === "" ||
      age === "" ||
      course === ""
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      fullName: fullName.trim(),
      age: Number(age),
      course: course,
    };

    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ]);

    setMessage(
      fullName.trim() + " registered successfully!"
    );

    // Clear the form after registration
    setFullName("");
    setAge("");
    setCourse("");
  }

  // Search students by full name
  const filteredStudents = students.filter((student) =>
    student.fullName
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Student Registration System</h1>
        <p>Enter your information to register.</p>
      </header>

      {message && (
        <div className="message" role="status">
          {message}
        </div>
      )}

      <section className="card">
        <h2>Register Student</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>

          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
            required
          />

          <label htmlFor="age">Age</label>

          <input
            id="age"
            type="number"
            placeholder="Enter your age"
            min="1"
            max="120"
            value={age}
            onChange={(event) =>
              setAge(event.target.value)
            }
            required
          />

          <label htmlFor="course">Course</label>

          <select
            id="course"
            value={course}
            onChange={(event) =>
              setCourse(event.target.value)
            }
            required
          >
            <option value="">Select your course</option>
            <option value="Software Development">
              Software Development
            </option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Computer Science">
              Computer Science
            </option>
            <option value="Networking">
              Networking
            </option>
            <option value="Business Management">
              Business Management
            </option>
          </select>

          <button type="submit">
            Register Student
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Registered Students</h2>

        <label htmlFor="search">Search by Name</label>

        <input
          id="search"
          type="text"
          placeholder="Search student name..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        {filteredStudents.length === 0 ? (
          <p>
            {students.length === 0
              ? "No students registered yet."
              : "No students found."}
          </p>
        ) : (
          <div className="student-list">
            {filteredStudents.map((student) => (
              <div className="student" key={student.id}>
                <h3>{student.fullName}</h3>
                <p>Age: {student.age}</p>
                <p>Course: {student.course}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
