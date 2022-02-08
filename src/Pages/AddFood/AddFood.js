import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FoodRow from '../FoodRow/FoodRow';
import Navigation from '../Shared/Navigation/Navigation';

const AddFood = () => {
    // State for posting food data
    const [food, setFood] = useState({
        foodItem: "",
        costPrice: "",
    });

    // State for getting all foods
    const [allFoods, setAllFoods] = useState([]);

    // Form Change Function
    const handleChange = ({ currentTarget: input }) => {
        setFood({ ...food, [input.name]: input.value });
    };

    // Form Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/FoodItem/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('A New Food Item Has Been Added Successfully!!');
                    // window.location.reload();
                }
            });
    }

    // FETCH FOOD ITEM FOR TABLE
    useEffect(() => {
        fetch(`http://localhost:5000/FoodItem/`)
            .then(res => res.json())
            .then(data => setAllFoods(data));
    }, [food, allFoods]);

    return (
        <>
            <Navigation />
            <div className='addfood-title'>
                <h3>Add Food Here</h3>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className='addfood-form' onSubmit={handleSubmit}>
                            <label htmlFor="addfoodin">Food Name</label>
                            <input type="text" name="foodItem" onChange={handleChange} id='addfoodin' placeholder='Food name...' required />
                            <label htmlFor="addfoodprice">Food Price</label>
                            <input type="text" name="costPrice" onChange={handleChange} id='addfoodprice' placeholder='Food price...' required />
                            <input type="submit" className='addfood-btn' value="Add Food" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className='food-table-title'>Available Foods</h2>
                    </div>
                    <div className="col-md-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Food Item</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFoods.map(singleFood => <FoodRow
                                    key={singleFood._id}
                                    singleFood={singleFood}></FoodRow>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddFood;