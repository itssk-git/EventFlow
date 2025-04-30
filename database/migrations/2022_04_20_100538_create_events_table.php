<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id('event_id');
            $table->string('event_img');
            $table->string('event_name');
            $table->string('event_cat');
            $table->string('start_time');
            $table->string('end_time');
            $table->string('event_organization');
            $table->string('ticket_price')->nullable();
            $table->string('ticket_available');
            $table->string('status');
            $table->string('phone');
            $table->string('email');
            $table->string('instagram')->nullable();
            $table->string('twitter')->nullable();
            $table->string('facebook')->nullable();
            $table->string('audience');
            $table->text('description');
            $table->string('event_address');
            $table->string('event_city');
            $table->string('event_state');
            $table->string('event_country');
            $table->string('event_latitude')->nullable();
            $table->string('event_longitude')->nullable();
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
        Schema::dropIfExists('events');
    }
}
