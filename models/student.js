import mongoose from 'mongoose';

// create the schema for the student
const StudentSchema = mongoose.Schema({
    name: String,
    age: Number,
    gender: String
});

// creata a model for the schema
const Student = mongoose.model('students', StudentSchema);

export default Student;



