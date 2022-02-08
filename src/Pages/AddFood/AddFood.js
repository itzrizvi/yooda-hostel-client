import React from 'react';
import Navigation from '../Shared/Navigation/Navigation';

const AddFood = () => {
    return (
        <>
            <Navigation />
            <div className='addfood-title'>
                <h3>Add Food Here</h3>
            </div>
            <div className="container">
                <div className="col-md-12">
                    <form className='addfood-form'>

                    </form>
                </div>
            </div>
        </>
    );
};

export default AddFood;