import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Input, Label, Row, FormGroup } from 'reactstrap';
import axios from 'axios';

class CreateUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            usersMade: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.incrementUsersMade = this.incrementUsersMade.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    incrementUsersMade() {
        this.setState({
            usersMade: this.state.usersMade + 1
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const userProfile = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        axios.post(
            `http://localhost:8080/api/v1/user-profiles/create`,
            userProfile,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                console.log("new user saved");
                this.incrementUsersMade();
            }).catch((e) => {
                console.log(e);
            });

    }

    render() {
        return (
            <Container fluid="lg">
                <Row>
                    <Col xs={12}>
                        <Alert color="success" isOpen={this.state.usersMade > 0}>{this.state.usersMade} users have been created! <Link to="/view-users">View new users.</Link></Alert>
                    </Col>
                    <Col xs={12}>
                        <Form>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="Username" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input type="text" name="firstName" id="firstName" placeholder="First name" onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input type="text" name="lastName" id="lastName" placeholder="Last name" onChange={this.handleInputChange} />
                            </FormGroup>
                            <Button color="dark" onClick={this.handleSubmit}>Create</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CreateUser;