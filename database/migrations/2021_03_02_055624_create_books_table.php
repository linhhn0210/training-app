<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 10)->nullable();
            $table->string('name', 255)->nullable();
            $table->text('description')->nullable();
            $table->integer('amount')->nullable();
            $table->string('author', 255)->nullable();
            $table->string('publisher', 255)->nullable();
            $table->string('publish_year', 4)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
