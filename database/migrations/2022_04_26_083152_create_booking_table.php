<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->id();
            $table->string('user_name');
            $table->string('user_email');
            $table->string('user_phone');
            $table->string('user_city');
            $table->string('user_state');
            $table->string('user_pin');
            $table->string('user_country');
            $table->string('event_start_date')->nullable();
            $table->string('event_end_date')->nullable();
            $table->string('ticket_quantity');
            $table->string('event_id');
            $table->string('payment_status')->default(false);
            $table->string('total_amount');
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
        Schema::dropIfExists('booking');
    }
}
