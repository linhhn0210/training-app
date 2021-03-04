@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <form>
                    <div class="form-group row">
                        <label for="code" class="col-md-1 col-form-label font-weight-bold">コード</label>
                        <div class="col-md-5">
                            <input type="text" class="form-control" id="code" placeholder="コード">
                        </div>
                        <label for="name" class="col-sm-1 col-form-label font-weight-bold">名称</label>
                        <div class="col-md-5">
                            <input type="text" class="form-control" id="name" placeholder="名称">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="publisher" class="col-md-1 col-form-label font-weight-bold">出版社</label>
                        <div class="col-md-5">
                            <input type="text" class="form-control" id="publisher" placeholder="出版社">
                        </div>
                        <label for="author" class="col-sm-1 col-form-label font-weight-bold">筆者</label>
                        <div class="col-md-5">
                            <input type="text" class="form-control" id="author" placeholder="筆者">
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <div class="center">
                            <button type="submit" class="font-weight-bold btn btn-primary m-3 col-md-2">検索</button>
                            <button type="reset" class="font-weight-bold btn btn-primary m-3 col-md-2">クリア</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-12" id="content">
                <script src="{{asset('js/app.js')}}" ></script>
            </div>
        </div>
    </div>
@endsection
