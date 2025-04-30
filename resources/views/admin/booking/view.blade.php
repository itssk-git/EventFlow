@extends('admin.layout')
@section('title','Booking Information')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
@component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard','Booking'=>'admin/booking']])
    @slot('title') Booking Information @endslot
    @slot('add_btn')  @endslot
    @slot('active') Booking Information @endslot
@endcomponent
<!-- Main content -->
<section class="content card">
    <div class="container-fluid card-body">
        <div class="card-header bg-primary">
            <h4 class="mb-0">Book Information</h4>
        </div>
        <div class="card-body">
            <ul class="message-list" style="width:100%; border-top:0px;">
            @if($message)
                <div class="row">
                    <div class="col-md-6">
                        <li>
                            <span class="d-inline-block mr-3"><b>Full Name: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->user_name}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>Email: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->user_email}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>Phone: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->user_phone}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>City: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->user_city}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>State: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->user_state}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>Pin Code: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->user_pin}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>Country: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->user_country}}</p>
                        </li>
                    </div>
                    <div class="col-md-6">
                        <li>
                            <span class="d-inline-block mr-3"><b>Event: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->event_name}}</p>
                        </li>
                        {{-- <li>
                            <span class="d-inline-block mr-3"><b>Total Ticket: </b></span>
                            <p class="mb-0 d-inline-block">{{$message->ticket_quantity}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>Total Amount: </b></span>
                            @foreach($settings as $setting)
                                <p class="mb-0 d-inline-block">{{$setting->cur_format}}{{$message->total_amount}}</p>
                            @endforeach
                        </li> --}}
                        <li>
                            <span class="d-inline-block mr-3"><b>Booking Date: </b></span>
                            <p class="mb-0 d-inline-block">{{date('d F,Y',strtotime($message->created_at))}}</p>
                        </li>
                        <li>
                            <span class="d-inline-block mr-3"><b>Payment Status: </b></span>
                            <p class="mb-0 d-inline-block">
                                @if($message->payment_status == '1')
                                    <span class="badge badge-success">Paid</span>
                                @else
                                <span class="badge badge-danger">Not Paid</span>
                                @endif
                            </p>
                        </li>
                    </div>
                </div>
                @endif
            </ul>
        </div>
    </div><!-- /.container-fluid -->
</section><!-- /.content -->
</div>
@stop