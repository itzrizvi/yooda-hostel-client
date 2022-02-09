import React, { useEffect, useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';

const DistributeFood = () => {
    // Distributed Food
    const [distributed, setDsitributed] = useState([]);
    // Search By Roll 
    const [searchRoll, setSerachRoll] = useState('');
    // Get Student Data
    const [student, setStudent] = useState(null);
    // Get Food Items
    const [foodItems, setFoodItems] = useState([]);
    // Set Food Distribution data
    const [foodDistribute, setFoodDistribute] = useState({
        shift: '',
        date: '',
        foodItem: '',
        serveStatus: ''
    })

    // Getting All Distributed Data
    useEffect(() => {
        fetch(`http://localhost:5000/Distribution/`)
            .then(res => res.json())
            .then(data => {
                data.map(singleData => setDsitributed(singleData))
            })
    }, []);

    // Distribution Form Change Function
    const handleChange = ({ currentTarget: input }) => {
        setFoodDistribute({ ...foodDistribute, [input.name]: input.value, studentName: student[0].fullName, studentClass: student[0].class, studentRoll: student[0].roll });
    };

    // Distribute Submit Function
    const distributeSubmit = (e) => {
        e.preventDefault();
        console.log(foodDistribute);
        if (distributed.date === foodDistribute.date && distributed.shift === foodDistribute.shift) {
            alert('Already Served');
        } else {
            fetch(`http://localhost:5000/Distribution/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodDistribute)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        alert('A Student Food Has Been Served!!');
                        window.location.reload();
                    }
                });
        }

    }

    // Serach by Roll Function
    const handleSearch = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/Student/${searchRoll}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setStudent(data))

    }

    // FETCH FOOD ITEM FOR TABLE
    useEffect(() => {
        fetch(`http://localhost:5000/FoodItem/`)
            .then(res => res.json())
            .then(data => setFoodItems(data));
    }, []);



    return (
        <div>
            <Navigation />
            <div className="conatiner">
                <div className="col-md-12">
                    <div className="serchstudent py-2">
                        <h3>Search Student By Roll For Distribution Form</h3>
                        <form className='serach-form' onSubmit={handleSearch}>
                            <input type="search" onChange={(e) => setSerachRoll(e.target.value)} name="searchRoll" id="search" />
                            <input type="submit" className='search-btn' value="Search" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="conatiner">
                {student && <div className="col-md-12">
                    <div className="serchstudent py-5">
                        <h3>Select and Distribute Student Food</h3>
                        <form className='distribute-form py-4' onSubmit={distributeSubmit}>
                            <h4 className='student-name'>Student Name: <input type="text" name='studentName' defaultValue={student[0].fullName} /></h4>

                            <p className='student-class'>Class: <input type="text" name='studentClass' defaultValue={student[0].class} /></p>

                            <p className='student-class'>Roll: <input type="text" name='studentRoll' defaultValue={student[0].roll} /></p>

                            <p className='student-shift'>Select Shift:</p>
                            <select name="shift" id="shift" onChange={handleChange} className='shift-select' required>
                                <option>Select One</option>
                                <option value="Morning">Morning</option>
                                <option value="Day">Day</option>
                                <option value="Night">Night</option>
                            </select>

                            <p className='pick-date'>Pick Up a Date</p>
                            <input type="date" onChange={handleChange} name="date" id="date" required />

                            <p className="food-items">Available Food Items</p>
                            <select name="foodItem" onChange={handleChange} id="foods" required>
                                <option>Select One</option>
                                {foodItems.map(food => <option key={food._id} value={food.foodItem}>{food.foodItem}</option>)}
                            </select>

                            <label htmlFor="servedfood" className='serve-food'>Mark as Server</label>
                            <input type="radio" onChange={handleChange} name="serveStatus" id="servedfood" value="Served" required />

                            <input type="submit" className='servefood-btn' value="Serve Food" />
                        </form>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default DistributeFood;