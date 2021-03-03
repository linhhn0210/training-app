import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import BooksList from './books-list.component';
import Swal from 'sweetalert2';


export default class CreateBook extends Component {
    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeBookAmount = this.onChangeBookAmount.bind(this);
        this.onChangeBookDescription = this.onChangeBookDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            name: '',
            description: '',
            amount: ''
        }
    }

    onChangeBookName(e) {
        this.setState({name: e.target.value})
    }

    onChangeBookAmount(e) {
        this.setState({amount: e.target.value})
    }

    onChangeBookDescription(e) {
        this.setState({description: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const bookObject = {
            name: this.state.name,
            amount: this.state.amount,
            description: this.state.description
        };
        axios.post('http://localhost/api/books/', bookObject)
            .then(res => console.log(res.data));
        Swal.fire(
            'Good job!',
            'Book Added Successfully',
            'success'
        )

        this.setState({name: '', amount: '', description: ''})
    }

    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
            <Row>
            <Col>
            <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangeBookName}/>
        </Form.Group>

        </Col>

        <Col>
        <Form.Group controlId="Amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" value={this.state.amount} onChange={this.onChangeBookAmount}/>
        </Form.Group>
        </Col>

        </Row>


        <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" type="textarea" value={this.state.description} onChange={this.onChangeBookDescription}/>
        </Form.Group>

        <Button variant="primary" size="lg" block="block" type="submit">
            Add Book
        </Button>
        </Form>
        <br></br>
        <br></br>

        <BooksList> </BooksList>
        </div>);
    }
}
