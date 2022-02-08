import React from 'react';
import { useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';

const AddFood = () => {
    // State for getting food data
    const [food, setFood] = useState({
        foodItem: "",
        costPrice: "",
    });

    // Form Change Function
    const handleChange = ({ currentTarget: input }) => {
        setFood({ ...food, [input.name]: input.value });
    };

    // Form Submit Function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(food);
    }

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
                            <input type="text" name="foodItem" value={food.foodItem} onChange={handleChange} id='addfoodin' placeholder='Food name...' required />
                            <label htmlFor="addfoodprice">Food Price</label>
                            <input type="text" name="costPrice" value={food.costPrice} onChange={handleChange} id='addfoodprice' placeholder='Food price...' required />
                            <input type="submit" className='addfood-btn' value="Add Food" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Food Table</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddFood;