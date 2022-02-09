import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Navigation from '../Shared/Navigation/Navigation';

const AddStudent = () => {

    // Selected Student ID for Update
    const [selectedStudent, setSelectedStudent] = useState("");
    // Updating Student 
    const [updatedStudent, setUpdatedStudent] = useState({
        fullName: "",
        roll: "",
        class: "",
        age: "",
        hallName: "",
        status: ""
    })

    // Bootstrap Modal Open Close State
    const [show, setShow] = useState(false);
    // Bootstrap Modal Open Close Function
    const handleClose = () => setShow(false);
    const handleShow = (student) => {
        setSelectedStudent(student);
        setShow(true)
    };

    // Getting Updated Data
    const studentUpdateChange = ({ currentTarget: input }) => {
        setUpdatedStudent({ ...updatedStudent, [input.name]: input.value });
    }

    // Submit Updated Data Function
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        console.log(updatedStudent);

        const url = `http://localhost:5000/Student/${selectedStudent._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStudent)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated Student Data');
                    window.location.reload();
                }
            })
    }

    // Student ID State
    const [studentId, setStudentId] = useState([]);

    // Status Change State
    const [isStatus, setIsStatus] = useState("");


    // State for All student data
    const [allStudents, setAllStudents] = useState([]);

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
                    window.location.reload();
                }
            });
    }


    // FETCH All Students FOR TABLE
    useEffect(() => {
        fetch(`http://localhost:5000/Student/`)
            .then(res => res.json())
            .then(data => setAllStudents(data));
    }, [student]);

    // Getting Selected Student ID from Check Box
    const handleStudentId = (id) => {
        setStudentId([...studentId, id]);
    }

    // Updating Status by Bulk Action
    const handleStatusSubmit = (e) => {
        e.preventDefault();
        const statusBulkUpdate = {
            studentId,
            isStatus
        }

        const url = `http://localhost:5000/Student/`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusBulkUpdate)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated');
                    setStudentId(null);
                    window.location.reload();
                }
            })

    }

    // Delete Student Function
    const handleDeleteStudent = id => {
        const proceed = window.confirm('You Sure you want to delete this student data??');
        if (proceed) {
            fetch(`http://localhost:5000/Student/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('A Student Data Deleted Successfully!!');
                        // Reloading window for not updating after calling it though
                        window.location.reload();
                    }
                });
        }
    }

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
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Data of {selectedStudent.fullName} </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className='studentDataUpdate-form' onSubmit={handleUpdateSubmit}>
                                    <label htmlFor="upstdnfullname">Full Name</label>
                                    <input type="text" name="fullName" onChange={studentUpdateChange} id='upstdnfullname' placeholder='Full name...' required />

                                    <label htmlFor="upstndroll">Roll</label>
                                    <input type="text" name="roll" id='upstndroll' onChange={studentUpdateChange} placeholder='Student Roll...' required />

                                    <label htmlFor="upstndclass">Class</label>
                                    <input type="text" name="class" id='upstndclass' onChange={studentUpdateChange} placeholder='Student Class...' required />

                                    <label htmlFor="upstndage">Age</label>
                                    <input type="text" name="age" id='upstndage' onChange={studentUpdateChange} placeholder='Student Age...' required />

                                    <label htmlFor="upstndhall">Hall Name</label>
                                    <input type="text" name="hallName" id='upstndhall' onChange={studentUpdateChange} placeholder='Hall Name...' required />

                                    <p className='stdn-stts'>Status:</p>
                                    <div className="status d-flex">
                                        <input type="radio" id="upactive" name="status" onChange={studentUpdateChange} value="Active" />
                                        <label htmlFor="upactive">Active</label>
                                        <input type="radio" id="upinactive" name="status" onChange={studentUpdateChange} value="Inactive" />
                                        <label htmlFor="upinactive">Inactive</label>
                                    </div>

                                    <input type="submit" className='addstudent-btn' value="Update Student" />
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Roll</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Class</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Hall Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">
                                        <form className='statusChangeButton-form' onSubmit={handleStatusSubmit}>
                                            <button type='submit' onClick={() => setIsStatus("Active")} className='statusChange-btn'>Set Active</button>
                                            <button type='submit' onClick={() => setIsStatus("Inactive")} className='statusChange-btn'>Set Inactive</button>
                                        </form>

                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {allStudents.map(singleStudent => <tr key={singleStudent._id}>
                                    <td style={{ fontWeight: '700' }}>{singleStudent.roll}</td>
                                    <td style={{ fontWeight: '700' }}>{singleStudent.fullName}</td>
                                    <td style={{ fontWeight: '700' }}>{singleStudent.class}</td>
                                    <td style={{ fontWeight: '700' }}>{singleStudent.age}</td>
                                    <td style={{ fontWeight: '700' }}>{singleStudent.hallName}</td>
                                    <td style={{ fontWeight: '700' }}>{singleStudent.status}</td>
                                    <td style={{ fontWeight: '700' }}>
                                        <Button className='studentdatadelete-btn' onClick={() => handleShow(singleStudent)}>
                                            Edit
                                        </Button>
                                        <Button className='studentdatadelete-btn' onClick={() => handleDeleteStudent(singleStudent._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                    <td style={{ fontWeight: '700' }}>
                                        <input
                                            onClick={() => handleStudentId(singleStudent?._id)}
                                            type="checkbox"
                                            name="status"
                                            id="stsChangeBulk" />
                                    </td>

                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;