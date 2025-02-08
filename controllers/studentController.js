import Student from "../models/student.js";

// get all students
export function getStudents(req, res) {
    Student.find().then((studentList) => {
        res.json({ list: studentList })
    }).catch(() => {
        res.json({ message: "Error finding students" })
    })
}


export function createStudent(req, res) {
    const student = new Student(req.body)



    student.save().then(() => {
        res.json({ message: "Student created" })
    }).catch(() => {
        res.json({ message: "Error creating student" })
    })
}

export function deleteStudent(req, res) {
    Student.deleteOne({ name: req.body.name }).then(
        () => {
            res.json({ message: "Student deleted" })
        })
}
