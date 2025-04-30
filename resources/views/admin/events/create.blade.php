
@extends('admin.layout')
@section('title','Add New event')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
@component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard','Event'=>'admin/events']])
    @slot('title') Add Event @endslot
    @slot('add_btn')  @endslot
    @slot('active') Add Event @endslot
@endcomponent
<!-- Main content -->
<section class="content card">
    <div class="container-fluid card-body">
        <!-- form start -->
        <form class="form-horizontal" id="add_event"  method="POST" enctype="multipart/form-data">
            @csrf
            <div class="row">
                <!-- left column -->
                <div class="col-md-12">
                   <input type="hidden" class="url" value="{{url('admin/events')}}" >
                    <!-- jquery validation -->
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Event Details</h3>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            @if(count($category) == 0)
                                <div class="alert alert-danger">First Add Category.</div>
                            @endif
                            <div class="form-group row">
                                <label class="col-md-2">Image </label>
                                <div class="custom-file col-md-7">
                                    <input type="file" class="custom-file-input" name="img" onChange="readURL(this);">
                                    <label class="custom-file-label">Choose file</label>
                                </div>
                                <div class="col-md-3 text-right">
                                    <img id="image" src="{{asset('event/default.jpg')}}" alt=""  width="100px">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control" name="name" placeholder="Name">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Category</label>
                                        <select class="form-control" name="category" id="">
                                            <option value="" selected>Select Category</option>
                                            @if(!empty($category))
                                                @foreach($category as $cat)
                                                    <option value="{{$cat->id}}">{{$cat->name}}</option>
                                                @endforeach
                                            @endif
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Start Time</label>
                                        <input type="text" class="form-control" name="start_time" id="datetimepicker" placeholder="Choose Start Time">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">End Time</label>
                                        <input type="text" class="form-control" name="end_time" id="datetimepicker1" placeholder="Choose End Time">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Organization</label>
                                        <input type="text" class="form-control" name="organization" placeholder="Organization">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Ticket Price</label>
                                        <input type="number" class="form-control" name="ticket_price" placeholder="Ticket Price">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Ticket Quantity</label>
                                        <input type="number" class="form-control" name="ticket_quantity" placeholder="Ticket Quantity">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Status (Show/Hide on website)</label>
                                        <select class="form-control" name="status" id="">
                                            <option value="1" selected>Show</option>
                                            <option value="0">Hide</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Phone Number</label>
                                        <input type="number" class="form-control" name="phone" placeholder="Phone Number">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="email" class="form-control" name="email" placeholder="Email Address">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Instagram Link</label>
                                        <input type="url" class="form-control" name="instagram" placeholder="Enter Instagram Url">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Twitter/X Link</label>
                                        <input type="url" class="form-control" name="twitter" placeholder="Enter Twitter/X Url">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Facebook Link</label>
                                        <input type="url" class="form-control" name="facebook" placeholder="Enter Facebook Url">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="">Audience: </label><br>
                                    <input type="checkbox" id="audience1" name="audience[]" value="children">
                                <label for="audience1" class="mr-2">Children</label>
                                    <input type="checkbox" id="audience2" name="audience[]" value="youth">
                                <label for="audience2" class="mr-2"> Youth</label>
                                    <input type="checkbox" id="audience3" name="audience[]" value="family">
                                <label for="audience3" class="mr-2"> Family</label>
                                    <input type="checkbox" id="audience4" name="audience[]" value="adult">
                                <label for="audience4" class="mr-2"> Adult</label>
                                    <input type="checkbox" id="audience5" name="audience[]" value="group">
                                <label for="audience5"> Group</label>
                            </div>
                            <div class="form-group">
                                <label for="">Description</label>
                                <textarea class="form-control" name="description" id="" cols="30" rows="5"></textarea>
                            </div>
                            <span class="bg-primary d-block p-2 mb-2" style="border-radius:5px 5px 0 0;">Location Detail</span>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Event Address</label>
                                        <input type="text" class="form-control" name="address" placeholder="Event Address"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">City</label>
                                        <input type="text" class="form-control" name="city" placeholder="City"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">State</label>
                                        <input type="text" class="form-control" name="state" placeholder="State"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Country</label>
                                        <input type="text" class="form-control" name="country" placeholder="Country"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Latitude</label>
                                        <input type="text" class="form-control" name="latitude" placeholder="Latitude">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Longitude</label>
                                        <input type="text" class="form-control" name="longitude" placeholder="Longitude">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form> <!-- /.form start -->
    </div><!-- /.container-fluid -->
</section><!-- /.content -->
</div>
<script type="text/javascript">
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#image').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }
</script>

@stop