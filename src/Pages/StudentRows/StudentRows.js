import React from 'react';

const StudentRows = ({ singleStudent }) => {
    return (
        <tr>
            <td style={{ fontWeight: '700' }}>{singleStudent.roll}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.fullName}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.class}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.age}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.hallName}</td>
            <td style={{ fontWeight: '700' }}>{singleStudent.status}</td>
        </tr>
    );
};

export default StudentRows;