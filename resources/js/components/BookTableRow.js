import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class BookTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook() {
        axios.delete('http://localhost/api/books/' + this.props.obj.id)
            .then((res) => {
                console.log('Book removed deleted!')
            }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.code}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.author}</td>
                <td>{this.props.obj.publisher}</td>
                <td className="text-center">
                    <a href={"/edit-book/" + this.props.obj.id} className="font-weight-bold btn btn-warning text-white ml-1 mr-1">
                    <i className="fa fa-edit"></i>
                    </a>
                    <button className="font-weight-bold btn btn-danger ml-1 mr-1" onClick={this.deleteBook}>
                    <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        );
    }
}
