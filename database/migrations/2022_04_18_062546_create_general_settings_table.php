<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateGeneralSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('general_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_logo')->nullable();
            $table->string('site_name');
            $table->string('site_title');
            $table->string('footer_desc');
            $table->string('theme_color');
            $table->string('phone');
            $table->string('email');
            $table->string('address');
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('facebook')->nullable();
            $table->string('tax');
            $table->string('cur_format');
            $table->string('copyright_text');
            $table->timestamps();
        });

        DB::table('general_settings')->insert([
            'site_logo'=>'logo.png',
            'site_name'=>'Event Booking',
            'site_title'=>'Event Booking',
            'footer_desc'=>'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
            'theme_color'=>'#0069D9',
            'phone'=>'9632587412',
            'email'=>'admin@gmail.com',
            'address'=>'New York, US',
            'instagram'=>'https://www.instagram.com',
            'twitter'=>'https://www.twitter.com',
            'facebook'=>'https://www.facebook.com',
            'tax'=>'18',
            'cur_format'=>'$',
            'copyright_text'=>'Copyright © 2023',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('general_settings');
    }
}
