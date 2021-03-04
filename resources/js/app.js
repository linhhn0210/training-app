import React from "react";
import ReactDOM from 'react-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import EditBook from "./components/edit-book.component";
import BooksList from "./components/books-list.component";
import CreateBook from "./components/create-book.component";

function App() {
    return (<Router>
        <div className="App">
        <header className="App-header">
        <Navbar>
        <Container>

        <Navbar.Brand>
    </Navbar.Brand>

    <Nav className="justify-content-end">
        <Nav>
        <Link to={"/books/create"} className="font-weight-bold btn btn-primary">
        <span className="fa fa-plus-circle">
        </span> 作成
    </Link>
    </Nav>
    </Nav>

    </Container>
    </Navbar>
    </header>

    <Container>
    <Row>
    <Col md={12}>
        <div className="wrapper">
        <Switch>
        <Route exact path='/' component={CreateBook} />
    <Route path="/books/create" component={CreateBook} />
    <Route path="/books/edit/:id" component={EditBook} />
    <Route path="/books" component={BooksList} />
    </Switch>
    </div>
    </Col>
    </Row>
    </Container>
    </div>
    </Router>);
}

export default App;

if (document.getElementById('content')) {
    ReactDOM.render(<App />, document.getElementById('content'));
}
