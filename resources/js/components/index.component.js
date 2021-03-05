import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BooksList from './books-list.component';


export default class BooksIndex extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<div>
            <a href={"/books/create"} className="font-weight-bold btn btn-success btn-lg mb-5">
            <i className="fa fa-plus-circle" />&nbsp;<span>作成</span>
        </a>
        <div className="row justify-content-center">
            <div className="col-md-12">
            <form>
            <div className="form-group row">
            <label htmlFor="code" className="col-md-1 col-form-label font-weight-bold">コード</label>
            <div className="col-md-5">
            <input type="text" className="form-control" id="code" placeholder="コード" />
            </div>
            <label htmlFor="name" className="col-sm-1 col-form-label font-weight-bold">名称</label>
            <div className="col-md-5">
            <input type="text" className="form-control" id="name" placeholder="名称" />
            </div>
            </div>
            <div className="form-group row">
            <label htmlFor="publisher" className="col-md-1 col-form-label font-weight-bold">出版社</label>
            <div className="col-md-5">
            <input type="text" className="form-control" id="publisher" placeholder="出版社" />
            </div>
            <label htmlFor="author" className="col-sm-1 col-form-label font-weight-bold">筆者</label>
            <div className="col-md-5">
            <input type="text" className="form-control" id="author" placeholder="筆者" />
            </div>
            </div>
            <div className="form-group text-center">
            <div className="center">
            <button type="submit" className="font-weight-bold btn btn-primary m-3 col-md-2">検索</button>
            <button type="reset" className="font-weight-bold btn btn-primary m-3 col-md-2">クリア</button>
            </div>
            </div>
            </form>
            </div>
            </div>
            <BooksList/>
            </div>);
    }
}
