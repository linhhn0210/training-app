import React, { Component } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Swal from "sweetalert2";


export default class BookList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            books: [],
            paginator: [],
            currentPage: 1,
            numberPerPage: 15,
            conditions: {}
        };
        this.handleChoosePage = this.handleChoosePage.bind(this);
        this.handleLinkPage = this.handleLinkPage.bind(this);
        this.handleSelectNumber = this.handleSelectNumber.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    handleSearch(event) {
        var stateTemp = this.state;
        const conditions = {
            code: document.getElementById("code").value,
            name: document.getElementById("name").value,
            publisher: document.getElementById("publisher").value,
            author: document.getElementById("author").value,
        };
        stateTemp.currentPage = 1;
        stateTemp.conditions = conditions;
        this.setState(stateTemp);
        this.getListBook();
    }

    handleChoosePage(event) {
        var stateTemp = this.state;
        const lastPage = stateTemp.paginator.last_page;
        const choosePage = Number(event.target.value);

        if (choosePage > lastPage) {
            return false;
        }
        stateTemp.currentPage = choosePage;
        this.setState(stateTemp);
        this.getListBook();
    }

    handleLinkPage(event) {
        var stateTemp = this.state;
        const page = Number(event.target.getAttribute("data-page"));
        stateTemp.currentPage = page;
        this.setState(stateTemp);
        this.getListBook();
    }

    handleSelectNumber(event) {
        var stateTemp = this.state;
        stateTemp.numberPerPage = Number(event.target.value);
        stateTemp.currentPage = 1;
        this.setState(stateTemp);
        this.getListBook();
    }

    componentDidMount() {
        this.getListBook();
    }

    getListBook() {
        const params = this.state.conditions;
        params.page = this.state.currentPage;
        params.numberPerPage = this.state.numberPerPage;

        axios.get('http://localhost/api/books', {
            params: params
        })
            .then(res => {
                var stateTemp = this.state;
                stateTemp.books = res.data.data;
                stateTemp.paginator = res.data;
                stateTemp.loaded = true;
                this.setState(stateTemp);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteBook(id) {
        Swal.fire({
            title: '削除しますか。',
            icon: 'question',
            iconColor: '#bd2130',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'キャンセル'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost/api/books/' + id)
                    .then(res => {
                        Swal.fire({
                            title: res.data.message,
                            icon: 'success',
                        }).then((result) => {
                            if (this.state.paginator.data.length == 1) {
                                var stateTemp = this.state;
                                stateTemp.currentPage = this.state.currentPage - 1;
                                this.setState(stateTemp);
                            }
                            this.getListBook();
                        });
                    }).catch((error) => {
                    console.log(error)
                })
            }
        })
    }

    DataTable() {
        return this.state.books.map((book, index) => {
            return (
                <tr>
                <td>{book.code}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td className="text-center">
                <Link to={"/books/edit/" + book.id} className="font-weight-bold btn btn-warning text-white ml-1 mr-1">
                <i className="fa fa-edit"></i>
                </Link>
                <button className="font-weight-bold btn btn-danger ml-1 mr-1" onClick={() => this.deleteBook(book.id)}>
                <i className="fa fa-trash"></i>
                </button>
                </td>
                </tr>
            );
        });
    }

    DataPaging() {
        const paginator = this.state.paginator;
        // Logic for displaying page numbers
        const lastPage = paginator.last_page ? paginator.last_page : 1;
        const currentPage = paginator.current_page ? paginator.current_page : 1;
        const previousPage = Number(currentPage) - 1;
        const nextPage = Number(currentPage) + 1;

        const infoComponent = (<div className="form-control border-0">{paginator.from} ~ {paginator.to} / {paginator.total} 件</div>);

        var classLink = "page-item";
        var handleClick = this.handleLinkPage;
        if (currentPage == 1) {
            classLink = "page-item disabled";
            handleClick = "";
        }
        const firstComponent = (<li className={classLink} onClick={handleClick}><a href="javascript:void(0)" data-page="1" className="page-link">先頭</a></li>)
        const previousComponent = (<li className={classLink} onClick={handleClick}><a href="javascript:void(0)" data-page={previousPage} className="page-link">前へ</a></li>)

        classLink = "page-item";
        var handleClick = this.handleLinkPage;
        if (currentPage == lastPage) {
            classLink = "page-item disabled";
            handleClick = "";
        }
        const lastComponent = (<li className={classLink} onClick={handleClick}><a href="javascript:void(0)" data-page={lastPage} className="page-link rounded-0">最終</a></li>)
        const nextComponent = (<li className={classLink} onClick={handleClick}><a href="javascript:void(0)" data-page={nextPage} className="page-link">次へ</a></li>)

        const inputPageComponent = (<li className="page-item pl-1 pr-2">
            <input type="text" className="form-control text-center" size="1" onChange={this.handleChoosePage} value={currentPage}/>
            <div className="form-control border-0">/ {paginator.last_page}</div>
        </li>);


        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i);
        }

        const componentPaging = [infoComponent, firstComponent, previousComponent, inputPageComponent, nextComponent, lastComponent];

        return (<div className="container">
            <nav aria-label className="row">
            <select className="form-control col-md-1" onChange={this.handleSelectNumber}>
            <option>15</option>
            <option>30</option>
            <option>50</option>
            </select>
            <ul className="pagination justify-content-end col-md-11 p-0 form-inline">
            {componentPaging}
            </ul>
            </nav>
            </div>);
    }

    renderListBook() {
        return (<div>{this.DataPaging()}
            <div className="table-responsive">
            <table className="table table-hover table-bordered">
            <colgroup>
            <col style={{width: '15%'}} />
        <col style={{width: '30%'}} />
        <col style={{width: '20%'}} />
        <col style={{width: '23%'}} />
        <col style={{width: '12%'}} />
        </colgroup>
        <thead className="bg-primary text-white">
            <tr className="text-center">
            <th>コード</th>
            <th>名称</th>
            <th>筆者</th>
            <th>出版社</th>
            <th>操作</th>
            </tr>
            </thead>
            <tbody>
            {this.DataTable()}
            </tbody>
            </table>
            </div></div>);
    }

    render() {
        if (!this.state.loaded) {
            return (<div />);
        }

        return (<div>
            <Link to={"/books/create"} className="font-weight-bold btn btn-success btn-lg mb-5">
            <i className="fa fa-plus-circle" />&nbsp;<span>作成</span>
        </Link>
        <div className="row justify-content-center">
            <div className="col-md-12">
            <form id="form_search" encType="multipart/form-data">
            <div className="form-group row">
            <label htmlFor="code" className="col-md-1 col-form-label font-weight-bold">コード</label>
            <div className="col-md-5">
            <input type="text" className="form-control text-uppercase" maxLength="10" id="code" placeholder="コード" />
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
            <button type="button" onClick={this.handleSearch} className="font-weight-bold btn btn-primary m-3 col-md-2">検索</button>
            <button type="reset" className="font-weight-bold btn btn-primary m-3 col-md-2">クリア</button>
            </div>
            </div>
            </form>
            </div>
            </div>
            {this.renderListBook()}
            </div>);
    }
}
