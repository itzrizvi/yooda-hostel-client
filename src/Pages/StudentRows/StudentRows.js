import React, { useState } from 'react';
const StudentRows = ({ singleStudent }) => {
    //
    const [clickes, setClickes] = useState([]);

    // Form Change Function
    const handleChange = (id) => {
        setClickes(clickes + id)
    };
    console.log(clickes);

    return (
        <tr>
            <td style={{ fontWeight: '700' }}>{singleStudent.roll}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.fullName}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.class}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.age}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.hallName}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.status}</td>
            <td style={{ fontWeight: '700' }}>
                <input type="checkbox" onChange={() => handleChange(singleStudent._id)} name="status" id="stsChangeBulk" />
            </td>
        </tr>
    );
};

export default StudentRows;