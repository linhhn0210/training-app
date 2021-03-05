<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1,500) as $index) {
            DB::table('books')->insert([
                'code' => $faker->postcode,
                'name' => $faker->name,
                'description' => $faker->text,
                'amount' => $faker->numberBetween(),
                'author' => $faker->name,
                'publisher' => $faker->streetName,
                'publish_year' => $faker->date($format = 'Y', $max = '2020',$min = '1900')
            ]);
        }
    }
}
