import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const FoodRow = ({ singleFood }) => {

    // Bootstrap Modal Open Close State
    const [show, setShow] = useState(false);
    // Bootstrap Modal Open Close Function
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

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
        const url = `https://shielded-scrubland-37581.herokuapp.com/FoodItem/${singleFood._id}`;
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
                    setShow(false);
                }
            })
    }

    // Delete Food Function
    const handleDelete = id => {
        const proceed = window.confirm('Are You sure you want to delete this Food Item??');
        if (proceed) {
            fetch(`https://shielded-scrubland-37581.herokuapp.com/FoodItem/${id}`, {
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {singleFood.foodItem}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='foodName-edit' onSubmit={editFoodSubmit}>
                        <input type="text" onChange={(e) => setEditFoodName(e.target.value)} placeholder='Update Food Name...' required />
                        <input type="text" onChange={(e) => setEditFoodPrice(e.target.value)} placeholder='Update Food Price...' required />
                        <input type="submit" className='food-update-btn' value="Update" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <td style={{ fontWeight: '700' }}>{singleFood.foodItem} </td>
            <td style={{ fontWeight: '700' }}>{singleFood.costPrice}TK </td>
            <td>
                <Button className='fooditem-edit-modal' onClick={() => handleShow()}>Edit</Button>
                <Button className='fooditem-delete-modal' onClick={() => handleDelete(singleFood._id)}>Delete</Button>
            </td>
        </tr>
    );
};

export default FoodRow;