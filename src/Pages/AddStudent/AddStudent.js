import React, { useEffect, useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import StudentRows from '../StudentRows/StudentRows';

const AddStudent = () => {
    // State for All student data
    const [allStudents, setAllStudents] = useState([])
    // State for posting student data
    const [student, setStudent] = useState({
        fullName: "",
        roll: "",
        class: "",
        age: "",
        hallName: "",
        status: ""
    });

    // Form Change Function
    const handleChange = ({ currentTarget: input }) => {
        setStudent({ ...student, [input.name]: input.value });
    };

    // Form Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(student);
        fetch(`http://localhost:5000/Student/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('A New Student Has Been Added Successfully!!');
                    // window.location.reload();
                }
            });
    }


    // FETCH All Students FOR TABLE
    useEffect(() => {
        fetch(`http://localhost:5000/Student/`)
            .then(res => res.json())
            .then(data => setAllStudents(data));
    }, [student, allStudents]);

    return (
        <div>
            <Navigation />
            <div className='addstudent-title'>
                <h3>Add Student Here</h3>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className='addstudent-form' onSubmit={handleSubmit}>
                            <label htmlFor="stdnfullname">Full Name</label>
                            <input type="text" onChange={handleChange} name="fullName" id='stdnfullname' placeholder='Full name...' required />

                            <label htmlFor="stndroll">Roll</label>
                            <input type="text" onChange={handleChange} name="roll" id='stndroll' placeholder='Student Roll...' required />

                            <label htmlFor="stndclass">Class</label>
                            <input type="text" onChange={handleChange} name="class" id='stndclass' placeholder='Student Class...' required />

                            <label htmlFor="stndage">Age</label>
                            <input type="text" onChange={handleChange} name="age" id='stndage' placeholder='Student Age...' required />

                            <label htmlFor="stndhall">Hall Name</label>
                            <input type="text" onChange={handleChange} name="hallName" id='stndhall' placeholder='Hall Name...' required />

                            <p className='stdn-stts'>Status:</p>
                            <div className="status d-flex">
                                <input type="radio" id="active" onChange={handleChange} name="status" value="Active" />
                                <label htmlFor="active">Active</label>
                                <input type="radio" id="inactive" onChange={handleChange} name="status" value="Inactive" />
                                <label htmlFor="inactive">Inactive</label>
                            </div>

                            <input type="submit" className='addstudent-btn' value="Add Student" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className='student-table-title'>All Students</h2>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Roll</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Class</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Hall Name</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allStudents.map(singleStudent => <StudentRows
                                    key={singleStudent._id}
                                    singleStudent={singleStudent}></StudentRows>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;