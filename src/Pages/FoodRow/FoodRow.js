import { useState } from 'react';

const FoodRow = ({ singleFood }) => {
    // state For update input
    const [isEdit, setIsEdit] = useState(false);
    // Set Edited Food Name
    const [editFoodName, setEditFoodName] = useState('');
    // Set Edited Food Price
    const [editFoodPrice, setEditFoodPrice] = useState('');


    // Edit Food Name Submit
    const editFoodSubmit = (e) => {
        e.preventDefault();
        const updatedFoodData = {
            editFoodName,
            editFoodPrice
        }
        const url = `http://localhost:5000/FoodItem/${singleFood._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFoodData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated Food Data');
                    setIsEdit(false)
                }
            })
    }

    // Delete Food Function
    const handleDelete = id => {
        const proceed = window.confirm('Are You sure you want to delete this Food Item??');
        if (proceed) {
            fetch(`http://localhost:5000/FoodItem/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('A Food Item Deleted Successfully!!');
                        // Reloading window for not updating restOrders after calling it though
                        // window.location.reload();
                    }
                });
        }
    }

    return (
        <tr>
            {isEdit && <td>
                <form className='foodName-edit' onSubmit={editFoodSubmit}>
                    <input type="text" onChange={(e) => setEditFoodName(e.target.value)} placeholder='Update Food Name...' required />
                    <input type="text" onChange={(e) => setEditFoodPrice(e.target.value)} placeholder='Update Food Price...' required />
                    <input type="submit" value="Update" />
                </form>
            </td>}
            <td style={{ fontWeight: '700' }}>{singleFood.foodItem} <button onClick={() => setIsEdit(true)} className='fooditem-edit'>Edit</button></td>
            <td style={{ fontWeight: '700' }}>{singleFood.costPrice}TK  <button className='fooditem-edit' onClick={() => setIsEdit(true)}>Edit</button></td>
            <td><button className='fooditem-delete' onClick={() => handleDelete(singleFood._id)}>Delete</button></td>
        </tr>
    );
};

export default FoodRow;