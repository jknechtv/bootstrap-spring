import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Container, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';

const MainNav = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar className="navbar-top navbar-dark bg-dark mb-5" expand="md" id="navbar-main">
            <Container fluid>
                <Link to="/" className="navbar-brand">uSpace</Link>

                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/">Home</Link>
                        </NavItem>

                        <NavItem>
                            <Link className="nav-link" to="/view-users">View Users</Link>
                        </NavItem>

                        <NavItem>
                            <Link className="nav-link" to="create-user">Create User</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNav;