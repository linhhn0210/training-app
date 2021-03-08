<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        return view('book.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function fetch(Request $request)
    {
        $sortField = $request->get('sortField');
        $sortType = $request->get('sortType');
        $numberPerPage = $request->get('numberPerPage');
        $page = $request->get('page');
        $conditions = [
            'code' => $request->get('code'),
            'name' => $request->get('name'),
            'publisher' => $request->get('publisher'),
            'author' => $request->get('author'),
        ];

        $where = [];
        foreach ($conditions as $field => $value) {
            if (trim((string)$value) !== "") {
                $where[] = [$field, 'like', '%'.$value.'%'];
            }
        }

        if (!empty($where)) {
            $books = Book::where($where)->orderBy($sortField, $sortType)->paginate($numberPerPage,['*'], 'page', $page);
        } else {
            $books = Book::orderBy($sortField, $sortType)->paginate($numberPerPage,['*'], 'page', $page);
        }

        return response()->json($books);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('book.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request = $this->validateData($request);
        $book = Book::create($request->all());
        return response()->json(['message'=> '登録しました。',
            'book' => $book]);
    }

    private function validateData($request)
    {
        $id = $request->get('id');
        $request->validate([
            'code' => ['required', 'unique:books,code,'.$id, 'alpha_num'],
            'name' => ['required'],
            'amount' => ['required', 'numeric'],
            'publish_year' => ['nullable','numeric']
        ],[
            'code.required' => 'コードを入力してください。',
            'code.unique' => 'コードが登録されました。',
            'code.alpha_num' => 'コードは半角英数字を使用してください。',
            'name.required' => '名称を入力してください。',
            'amount.required' => '価格を入力してください。',
            'amount.numeric' => '価格は半角数字を使用してください。',
            'publish_year.numeric' => '出版年は半角数字を使用してください。'
        ]);

        return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->get('id');
        $books = Book::where('id', $id)->first();
        return response()->json($books);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        return view('book.edit');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $request = $this->validateData($request);
        $book = Book::where('id', '=', $request->get('id'))->update($request->all());
        return response()->json(['message'=> '登録しました。',
            'book' => $book]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json([
            'message' => '削除しました。'
        ]);
    }
}
