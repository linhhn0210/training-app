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
        this.onReset = this.onReset.bind(this);

        // Setting up state
        this.state = {
            id: '',
            code: '',
            name: '',
            author: '',
            amount: '',
            publisher: '',
            publish_year: '',
            description: '',
            image: '',

            loaded: false,
            defaultValue: {}
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
        const id = this.state.id;
        if (id == undefined || id == "") {
            this.storeBook(e);
        } else {
            this.updateBook(e)
        }
    }

    onReset(e) {
        this.setState({
            id: this.state.defaultValue.id ?? '',
            code: this.state.defaultValue.code ?? '',
            name: this.state.defaultValue.name ?? '',
            author: this.state.defaultValue.author ?? '',
            amount: this.state.defaultValue.amount ?? '',
            publisher: this.state.defaultValue.publisher ?? '',
            publish_year: this.state.defaultValue.publish_year ?? '',
            description: this.state.defaultValue.description ?? '',
            image: this.state.defaultValue.image ?? ''
        });
    }

    storeBook(e) {
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
                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                }).then((result) => {
                    this.props.history.push('/books');
                });
            }).catch(error => {
                this.validateForm(error.response.data.errors);
            });
    }

    updateBook(e) {
        e.preventDefault();
        const id = this.state.id;
        const bookObject = {
            id: id,
            code: this.state.code,
            name: this.state.name,
            author: this.state.author,
            amount: this.state.amount,
            publisher: this.state.publisher,
            publish_year: this.state.publish_year,
            description: this.state.description,
            // image: this.state.image
        };
        axios.put('http://localhost/api/books/'+id, bookObject)
            .then(res => {
                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                }).then((result) => {
                    this.props.history.push('/books');
                });
            }).catch(error => {
            this.validateForm(error.response.data.errors);
        });
    }

    validateForm(errors) {
        var messDiv = document.getElementsByClassName("feedback");
        for (var i = 0; i < messDiv.length; i++) {
            messDiv[i].style.display = "none";
        }
        var errorItem = document.getElementsByClassName("form-control");
        for (var i = 0; i < errorItem.length; i++) {
            errorItem[i].classList.remove("is-invalid");
        }
        for(var item in errors) {
            document.getElementById(item).classList.add("is-invalid");
            var strError = errors[item].join();
            var feedbackEl = document.getElementById(item).nextSibling;
            feedbackEl.classList.add('invalid-feedback');
            feedbackEl.style.display = "block";
            feedbackEl.textContent = strError;
        }
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        if (id == undefined || id == "") {
            this.setState({
                loaded: true
            });
            return false;
        }
        axios.get('http://localhost/api/books/' + id, {params: {id: id}})
            .then(res => {
                this.state.defaultValue = {
                    id: res.data.id,
                    code: res.data.code,
                    name: res.data.name,
                    author: res.data.author,
                    amount: res.data.amount,
                    publisher: res.data.publisher,
                    publish_year: res.data.publish_year,
                    description: res.data.description,
                };
                this.setState(this.state.defaultValue);
                this.setState({loaded: true});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (!this.state.loaded) {
            return (<div />);
        }

        const id = this.state.id;
        var title = '新規作成';
        var titleClass = 'bg-success';
        if (id != undefined && id != "") {
            title = '編集';
            titleClass = 'bg-warning';
        }

        return (<div><nav className={"navbar navbar-light justify-content-between row " + titleClass}>
            <a className="navbar-brand font-weight-bold text-white">{title}</a>
            <Link to={"/books"} className="font-weight-bold btn btn-danger text-white"><i className="fa fa-reply" />&nbsp;<span>戻る</span></Link>
        </nav>
        <div className="row justify-content-center mt-2">
            <div className="col-md-12">
            <Form id="form_add" noValidate onSubmit={this.onSubmit} onReset={this.onReset}>
            <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="code" className="font-weight-bold">コード <span className="badge badge-danger">必須</span></label>
            <input type="text" required pattern="[a-zA-Z0-9]+" className="form-control text-uppercase" maxLength="10" id="code" name="code" placeholder="コード" value={this.state.code} onChange={this.onChangeBookCode}/>
            <div className="feedback"></div>
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="name" className="font-weight-bold">名称 <span className="badge badge-danger">必須</span></label>
            <input type="text" required className="form-control" id="name" name="name" maxLength="255" placeholder="名称" value={this.state.name} onChange={this.onChangeBookName}/>
            <div className="feedback"></div>
            </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="author" className="font-weight-bold">筆者</label>
            <input type="text" className="form-control" id="author" name="author" maxLength="255" placeholder="筆者" value={this.state.author} onChange={this.onChangeBookAuthor}/>
            <div className="feedback"></div>
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="amount" className="font-weight-bold">価格 <span className="badge badge-danger">必須</span></label>
            <input type="text" required pattern="[0-9]+" className="form-control" maxLength="11" id="amount" name="amount" placeholder="価格" value={this.state.amount} onChange={this.onChangeBookAmount}/>
            <div className="feedback"></div>
            </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="publisher" className="font-weight-bold">出版社</label>
            <input type="text" className="form-control" id="publisher" name="publisher" maxLength="255" placeholder="出版社" value={this.state.publisher} onChange={this.onChangeBookPublisher}/>
            <div className="feedback"></div>
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="publish_year" className="font-weight-bold">出版年</label>
            <input type="text" pattern="[0-9]*" className="form-control" maxLength="4" id="publish_year" name="publish_year" placeholder="出版年" value={this.state.publish_year} onChange={this.onChangeBookPublishYear}/>
            <div className="feedback"></div>
            </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-12">
            <label htmlFor="description" className="font-weight-bold">説明</label>
            <textarea rows={5} className="form-control" id="description" name="description" placeholder="説明" value={this.state.description} onChange={this.onChangeBookDescription}/>
            <div className="feedback"></div>
            </div>
            </div>
            <div className="form-row">
            <label htmlFor="image" className="font-weight-bold">画像</label>
            <div className="custom-file col-md-12">
                <input type="file" id="image" name="image" className="custom-file-input"  onChange={this.onChangeBookImage} />
        <div className="feedback"></div>
            <label className="custom-file-label text-secondary" htmlFor="image">ファイル選択...</label>
            </div>
            </div>
            <div className="form-group text-center">
            <div className="center mt-5 mb-5">
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
