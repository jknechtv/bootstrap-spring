import React from 'react';

import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import UserProile from '../Components/UserProfile';

const fetchUserProfiles = () => {
    return axios.get("http://localhost:8080/api/v1/user-profiles").then(res => {
        return res.data;
    });
}

class ViewUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userProfiles: null
        }
    }

    async componentDidMount() {
        const userProfiles = await fetchUserProfiles();
        this.setState({
            userProfiles: userProfiles
        })
    }

    render() {
        return (
            <Container fluid>

                <main className="container-lg">
                    <Row>
                        <Col xs="12">
                            <h1>Hello React + Spring</h1>
                        </Col>
                        {!this.state.userProfiles ? null : this.state.userProfiles.map((userProfile, i) => {
                            return (
                                <Col xs={12} lg={6} key={`user-${userProfile.userProfileID}`}>
                                    <UserProile userProfileID={userProfile.userProfileID} username={userProfile.username} firstName={userProfile.firstName} lastName={userProfile.lastName} />
                                </Col>

                            );
                        })}
                    </Row>
                </main>

            </Container>
        );
    }

}

export default ViewUsers;