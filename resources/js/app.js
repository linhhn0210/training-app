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
//
// const urlParams = new URLSearchParams(window.location.search);
// const code = urlParams.get('code');
// axios.post('https://training.auth.ap-northeast-1.amazoncognito.com/oauth2/token', {
//         grant_type: 'authorization_code', client_id: '73jp3ve5nho4spjad74tululql',
//         code: code, redirect_uri: ''
//     }, {
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded'
//         }}
// )
//     .then((res) => {
//         console.log(res.data)
//     })
//     .catch((error) => {
//         console.error(error)
//     })
