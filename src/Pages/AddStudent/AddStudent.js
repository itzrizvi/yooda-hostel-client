import React from 'react';
import Navigation from '../Shared/Navigation/Navigation';

const AddStudent = () => {
    return (
        <div>
            <Navigation />
            <div className='addstudent-title'>
                <h3>Add Student Here</h3>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className='addstudent-form' >
                            <label htmlFor="stdnfullname">Full Name</label>
                            <input type="text" name="fullName" id='stdnfullname' placeholder='Full name...' required />

                            <label htmlFor="stndroll">Roll</label>
                            <input type="text" name="roll" id='stndroll' placeholder='Student Roll...' required />

                            <label htmlFor="stndclass">Class</label>
                            <input type="text" name="class" id='stndclass' placeholder='Student Class...' required />

                            <label htmlFor="stndage">Age</label>
                            <input type="text" name="age" id='stndage' placeholder='Student Age...' required />

                            <label htmlFor="stndhall">Hall Name</label>
                            <input type="text" name="hallName" id='stndhall' placeholder='Hall Name...' required />

                            <p className='stdn-stts'>Status:</p>
                            <div className="status d-flex">
                                <input type="radio" id="active" name="status" value="Active" />
                                <label htmlFor="active">Active</label>
                                <input type="radio" id="inactive" name="status" value="Inactive" />
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

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;