import { Col, Container, Jumbotron, Row } from "reactstrap";
import { Link } from 'react-router-dom';

const Home = (props) => {
    return(
        <Container fluid="lg">
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>Hello React, Spring, + AWS</h1>
                        <p>A simple app where you can create a user, upload an image, then view it next to that user.</p>
                        <hr className="my-2" />
                        <p className="lead">
                            <Link className="btn btn-dark" to="/create-user">Create User</Link>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;