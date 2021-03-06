import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Swal from 'sweetalert2';


export default class CreateBook extends Component {
    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeBookCode = this.onChangeBookCode.bind(this);
        this.onChangeBookName = this.onChangeBookName.bind(this);
        this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
        this.onChangeBookAmount = this.onChangeBookAmount.bind(this);
        this.onChangeBookPublisher = this.onChangeBookPublisher.bind(this);
        this.onChangeBookPublishYear = this.onChangeBookPublishYear.bind(this);
        this.onChangeBookDescription = this.onChangeBookDescription.bind(this);
        this.onChangeBookImage = this.onChangeBookImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            code: '',
            name: '',
            author: '',
            amount: '',
            publisher: '',
            publish_year: '',
            description: '',
            image: ''
        }
    }

    onChangeBookCode(e) {
        this.setState({code: e.target.value})
    }

    onChangeBookName(e) {
        this.setState({name: e.target.value})
    }

    onChangeBookAuthor(e) {
        this.setState({author: e.target.value})
    }

    onChangeBookAmount(e) {
        this.setState({amount: e.target.value})
    }

    onChangeBookPublisher(e) {
        this.setState({publisher: e.target.value})
    }

    onChangeBookPublishYear(e) {
        this.setState({publish_year: e.target.value})
    }

    onChangeBookDescription(e) {
        this.setState({description: e.target.value})
    }

    onChangeBookImage(e) {
        this.setState({image: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const bookObject = {
            code: this.state.code,
            name: this.state.name,
            author: this.state.author,
            amount: this.state.amount,
            publisher: this.state.publisher,
            publish_year: this.state.publish_year,
            description: this.state.description,
            image: this.state.image
        };
        axios.post('http://localhost/api/books', bookObject)
            .then(res => {
                this.setState({
                    code: '',
                    name: '',
                    author: '',
                    amount: '',
                    publisher: '',
                    publish_year: '',
                    description: '',
                    image: ''
                });
                Swal.fire({
                    title: '登録しました。',
                    icon: 'success',
                }).then((result) => {
                    this.props.history.push('/books');
                });
            }).catch(error => {
                this.validateForm(e);
                console.log(error.response)
            });
    }

    validateForm(event) {
        // console.log(1111);
        // var form = document.querySelector('#form_add')
        //
        // if (!form.checkValidity()) {
        //     event.preventDefault()
        //     // event.stopPropagation()
        // }
        //
        // form.classList.add('was-validated')
    }

    render() {
        return (<div><nav className="navbar navbar-light bg-success justify-content-between row">
            <a className="navbar-brand font-weight-bold text-white">新規作成</a>
            <Link to={"/books"} className="font-weight-bold btn btn-danger text-white"><i className="fa fa-reply" />&nbsp;<span>戻る</span></Link>
        </nav>
        <div className="row justify-content-center mt-2">
            <div className="col-md-12">
            <Form id="form_add" noValidate onSubmit={this.onSubmit}>
            <div className="form-group row">
            <label htmlFor="code" className="col-md-1 col-form-label font-weight-bold">コード</label>
            <div className="col-md-5 pl-0 pr-0">
            <input type="text" required pattern="[a-zA-Z0-9]+" className="form-control text-uppercase" maxlength="10" id="code" name="code" placeholder="コード" value={this.state.code} onChange={this.onChangeBookCode}/>
            </div>
            <label htmlFor="name" className="col-sm-1 col-form-label font-weight-bold">名称</label>
            <div className="col-md-5 pl-0 pr-0">
            <input type="text" required className="form-control" id="name" name="name" placeholder="名称" value={this.state.name} onChange={this.onChangeBookName}/>
            </div>
            </div>
            <div className="form-group row">
            <label htmlFor="author" className="col-sm-1 col-form-label font-weight-bold">筆者</label>
            <div className="col-md-5 pl-0 pr-0">
            <input type="text" className="form-control" id="author" name="author" placeholder="筆者" value={this.state.author} onChange={this.onChangeBookAuthor}/>
            </div>
            <label htmlFor="amount" className="col-md-1 col-form-label font-weight-bold">価格</label>
            <div className="col-md-5 pl-0 pr-0">
            <input type="text" required pattern="[0-9]+" className="form-control" maxlength="11" id="amount" name="amount" placeholder="価格" value={this.state.amount} onChange={this.onChangeBookAmount}/>
            </div>
            </div>
            <div className="form-group row">
            <label htmlFor="publisher" className="col-md-1 col-form-label font-weight-bold">出版社</label>
            <div className="col-md-5 pl-0 pr-0">
            <input type="text" className="form-control" id="publisher" name="publisher" placeholder="出版社" value={this.state.publisher} onChange={this.onChangeBookPublisher}/>
            </div>
            <label htmlFor="publish_year" className="col-sm-1 col-form-label font-weight-bold">出版年</label>
            <div className="col-md-5 pl-0 pr-0">
            <input type="text" pattern="[0-9]*" className="form-control" maxlength="4" id="publish_year" name="publish_year" placeholder="出版年" value={this.state.publish_year} onChange={this.onChangeBookPublishYear}/>
            </div>
            </div>
            <div className="form-group row">
            <label htmlFor="description" className="col-md-1 col-form-label font-weight-bold">説明</label>
            <div className="col-md-11 pl-0 pr-0">
            <textarea rows={5} className="form-control" id="description" name="description" placeholder="説明" value={this.state.description} onChange={this.onChangeBookDescription}/>
        </div>
        </div>
        <div className="form-group row">
            <label htmlFor="image" className="col-md-1 col-form-label font-weight-bold">画像</label>
            <div className="custom-file col-md-11">
                <input type="file" id="image" name="image" className="custom-file-input"  onChange={this.onChangeBookImage} />
            <label className="custom-file-label" htmlFor="image">Choose file...</label>
            </div>
            </div>
            <div className="form-group text-center">
            <div className="center">
            <button type="submit" className="font-weight-bold btn btn-primary m-3 col-md-2">登録</button>
            <button type="reset" className="font-weight-bold btn btn-primary m-3 col-md-2">クリア</button>
            </div>
            </div>
            </Form>
            </div>
            </div>
            </div>);
    }
}
