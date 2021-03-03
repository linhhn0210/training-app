import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditBook extends Component {

    constructor(props) {
        super(props)

        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeBookAmount = this.onChangeBookAmount.bind(this);
        this.onChangeBookDescription = this.onChangeBookDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            name: '',
            amount: '',
            description: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost/api/books/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    amount: res.data.amount,
                    description: res.data.description
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeBookName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeBookAmount(e) {
        this.setState({ amount: e.target.value })
    }

    onChangeBookDescription(e) {
        this.setState({ description: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const bookObject = {
            name: this.state.name,
            amount: this.state.amount,
            description: this.state.description
        };

        axios.put('http://localhost/api/books/' + this.props.match.params.id, bookObject)
            .then((res) => {
                console.log(res.data)
                console.log('Book successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Book List
        this.props.history.push('/books-list')
    }


    render() {
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangeBookName} />
        </Form.Group>

        <Form.Group controlId="Amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" value={this.state.amount} onChange={this.onChangeBookAmount} />
        </Form.Group>

        <Form.Group controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" value={this.state.description} onChange={this.onChangeBookDescription} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
            Update Book
        </Button>
        </Form>
        </div>);
    }
}
