import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import BookTableRow from './BookTableRow';


export default class BookList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            paginator: [],
            currentPage: 1,
            numberPerPage: 15
        };
        this.handleChoosePage = this.handleChoosePage.bind(this);
        this.handleLinkPage = this.handleLinkPage.bind(this);
        this.handleSelectNumber = this.handleSelectNumber.bind(this);
    }

    handleChoosePage(event) {
        const stateTemp = this.state;
        stateTemp.currentPage = Number(event.target.value);
        this.setState(stateTemp);
        this.getListBook();
    }

    handleLinkPage(event) {
        const stateTemp = this.state;
        const page = Number(event.target.getAttribute("data-page"));
        stateTemp.currentPage = page;
        this.setState(stateTemp);
        this.getListBook();
    }

    handleSelectNumber(event) {
        const stateTemp = this.state;
        stateTemp.numberPerPage = Number(event.target.value);
        stateTemp.currentPage = 1;
        this.setState(stateTemp);
        this.getListBook();
    }

    componentDidMount() {
        this.getListBook();
    }

    getListBook() {
        axios.get('http://localhost/api/books', {
            params: {page: this.state.currentPage, numberPerPage: this.state.numberPerPage}
        })
            .then(res => {
                const stateTemp = this.state;
                stateTemp.books = res.data.data;
                stateTemp.paginator = res.data
                this.setState(stateTemp);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    DataTable() {
        return this.state.books.map((book, index) => {
            return <BookTableRow obj={book} key={index} />;
        });
    }

    DataPaging() {
        const paginator = this.state.paginator;
        // Logic for displaying page numbers
        const lastPage = paginator.last_page ? paginator.last_page : 1;
        const currentPage = paginator.current_page ? paginator.current_page : 1;
        const previousPage = Number(currentPage) - 1;
        const nextPage = Number(currentPage) + 1;

        var classLink = "page-item";
        var handleClick = this.handleLinkPage;
        if (currentPage == 1) {
            classLink = "page-item disabled";
            handleClick = "";
        }
        const firstComponent = (<li className={classLink} onClick={handleClick}><a data-page="1" className="page-link fa fa-angle-double-left"></a></li>)
        const previousComponent = (<li className={classLink} onClick={handleClick}><a data-page={previousPage} className="page-link fa fa-angle-left"></a></li>)

        classLink = "page-item";
        var handleClick = this.handleLinkPage;
        if (currentPage == lastPage) {
            classLink = "page-item disabled";
            handleClick = "";
        }
        const lastComponent = (<li className={classLink} onClick={handleClick}><a data-page={lastPage} className="page-link fa fa-angle-double-right"></a></li>)
        const nextComponent = (<li className={classLink} onClick={handleClick}><a data-page={nextPage} className="page-link fa fa-angle-right"></a></li>)

        const inputPageComponent = (<li className="page-item">
            <input type="text" className="form-control text-center" size="1" onChange={this.handleChoosePage} value={currentPage}/>
        </li>);


        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i);
        }

        return [firstComponent, previousComponent, inputPageComponent, nextComponent, lastComponent];
    }

    render() {
        return (<div><div className="container">
            <nav aria-label className="row">
        <select className="form-control col-md-1" onChange={this.handleSelectNumber}>
            <option>15</option>
            <option>30</option>
            <option>50</option>
            </select>
            <ul className="pagination justify-content-end col-md-11 p-0">
            {this.DataPaging()}
            </ul>
            </nav>
            </div>
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
}
