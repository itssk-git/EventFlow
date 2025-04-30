@extends('admin.layout')
@section('title','View Contact')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
@component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard','contact'=>'admin/contact']])
    @slot('title') Contact Information @endslot
    @slot('add_btn')  @endslot
    @slot('active') View Contact @endslot
@endcomponent
<!-- Main content -->
<section class="content card">
    <div class="container-fluid card-body">
        <div class="card-header bg-primary" style="width:50%;">
            <h4 class="mb-0">Contact Information</h4>
        </div>
        <ul class="message-list" style="border-top:0px;">
        @if($message)
            <li>
                <span class="d-inline-block mr-3"><b>Name: </b></span>
                <p class="mb-0">{{$message->name}}</p>
            </li>
            <li>
                <span class="d-inline-block mr-3"><b>Email: </b></span>
                <p class="mb-0">{{$message->email}}</p>
            </li>
            <li>
                <span class="d-inline-block mr-3"><b>Message: </b></span>
                <p class="mb-0">{{$message->message}}</p>
            </li>
            @endif
        </ul>
    </div><!-- /.container-fluid -->
</section><!-- /.content -->
</div>
@stop