import React from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {

    return (
        <header className='head-main'>
            <div className="nav-menu-area">
                <Container>
                    <div className="menu-inner">
                        <Row>
                            <Navbar variant="light" collapseOnSelect expand="md">
                                <Navbar.Brand as={Link} to="/">
                                    <div className="logo">
                                        <h2><span>Yooda</span> Hostel</h2>
                                    </div>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                                <Navbar.Collapse className='justify-content-end nav-menu'>
                                    <Nav.Link as={NavLink} to="/addfood">Add Food</Nav.Link>
                                    <Nav.Link as={NavLink} to="/editdeletefood">Edit/Delete Food</Nav.Link>
                                    <Nav.Link as={NavLink} to="/addstudent">Add Student</Nav.Link>
                                    <Nav.Link as={NavLink} to="/editdeletestudent">Edit/Delete Student</Nav.Link>
                                    <Nav.Link as={NavLink} to="/distributefood">Distribute Food</Nav.Link>
                                </Navbar.Collapse>
                            </Navbar>
                        </Row>
                    </div>
                </Container>
            </div>
        </header>
    );
};

export default Navigation;