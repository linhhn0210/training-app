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
import BookList from "./components/books-list.component";
import CreateBook from "./components/create-book.component";

function App() {
    return (<Router>
        <Switch>
        <Route path="/books/create" component={CreateBook} />
        <Route path="/books/edit/:id" component={EditBook} />
        <Route path="/books" component={BookList} />
        </Switch>
    </Router>);
}

export default App;

if (document.getElementById('content')) {
    ReactDOM.render(<App />, document.getElementById('content'));
}

