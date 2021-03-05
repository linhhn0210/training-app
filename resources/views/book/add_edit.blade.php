@extends('layouts.app')

@section('content')
    <div class="container text-justify bo">
        <a href="{{ url('/books') }}" class="font-weight-bold btn btn-info btn-lg mb-5">
            <i class="fa fa-reply"></i>&nbsp;<span>戻る</span>
        </a>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <script src="{{asset('js/component/create-book.component.js')}}" ></script>
            </div>
        </div>
    </div>
@endsection
