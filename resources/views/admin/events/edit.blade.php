@extends('admin.layout')
@section('title','Edit event')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
@component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard','Event'=>'admin/events']])
    @slot('title') Edit Event @endslot
    @slot('add_btn')  @endslot
    @slot('active') Edit Event @endslot
@endcomponent
<!-- Main content -->
<section class="content card">
    <div class="container-fluid card-body">
        <!-- form start -->
        <form class="form-horizontal" id="update_event"  method="POST" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT') }}
            @if($event)
            <div class="row">
                <!-- left column -->
                <div class="col-md-12">
                   <input type="hidden" class="url" value="{{url('admin/events/'.$event->event_id)}}" >
                   <input type="hidden" class="rdt-url" value="{{url('admin/events')}}" >
                    <!-- jquery validation -->
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Event Details</h3>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="form-group row">
                                <label class="col-md-2">Image</label>
                                
                                <div class="col-md-7">
                                    <!-- Hidden input to ensure the old image path is always submitted -->
                                    <input type="hidden" name="old_img" value="{{$event->event_img}}" />
                                </div>
                            
                                <div class="col-md-3 text-right">
                                    @php $data = explode(',', $event->event_img); @endphp
                                    @if(!empty($data[0]))
                                        <!-- Display the first image in the list if it exists -->
                                        <img id="image" src="{{ asset('event/' . $data[0]) }}" alt="Event Image" width="100px">
                                    @else
                                        <!-- Display a placeholder if no image exists -->
                                        <img id="image" src="{{ asset('event/default.jpg') }}" alt="No Image Available" width="100px">
                                    @endif
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control" name="name" placeholder="Name" value="{{$event->event_name}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Category</label>
                                        <select class="form-control" name="category" id="">
                                            @if(!empty($category))
                                                @foreach($category as $item)
                                                    @if($event->event_cat == $item->id)
                                                        <option value="{{$item->id}}" selected>{{$item->name}}</option>
                                                    @else
                                                        @if($item->status == '1')
                                                            <option value="{{$item->id}}">{{$item->name}}</option>
                                                        @endif
                                                    @endif
                                                @endforeach
                                            @endif
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Start Time</label>
                                        <input type="text" class="form-control" name="start_time" id="datetimepicker" placeholder="Choose Start Time" value="{{$event->start_time}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">End Time</label>
                                        <input type="text" class="form-control" name="end_time" id="datetimepicker1" placeholder="Choose End Time" value="{{$event->end_time}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Organization</label>
                                        <input type="text" class="form-control" name="organization" placeholder="Organization" value="{{$event->event_organization}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Ticket Price</label>
                                        <input type="number" class="form-control" name="ticket_price" placeholder="Ticket Price" value="{{$event->ticket_price}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Ticket Quantity</label>
                                        <input type="number" class="form-control" name="ticket_quantity" placeholder="Ticket Quantity" value="{{$event->ticket_available}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Status (Show/Hide on website)</label>
                                        <select class="form-control" name="status" id="">
                                            <option value="1" {{$event->status == "1" ? "selected":""}}>Show</option>
                                            <option value="0" {{$event->status == "0" ? "selected":""}}>Hide</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Phone Number</label>
                                        <input type="number" class="form-control" name="phone" placeholder="Phone Number" value="{{$event->phone}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Email</label>
                                        <input type="email" class="form-control" name="email" placeholder="Email Address" value="{{$event->email}}">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Instagram</label>
                                        <input type="url" class="form-control" name="instagram" placeholder="Enter Instagram Url" value="{{$event->instagram}}">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Twitter</label>
                                        <input type="url" class="form-control" name="twitter" placeholder="Enter Twitter Url" value="{{$event->twitter}}">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Facebook</label>
                                        <input type="url" class="form-control" name="facebook" placeholder="Enter Facebook Url" value="{{$event->facebook}}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                @php $data = array_filter(explode(',',$event->audience)); @endphp
                                <label for="">Audience: </label><br>
                                    <input type="checkbox" id="audience1" name="audience[]" value="children" @php if(in_array('children',$data)) echo "checked";  @endphp>
                                <label for="audience1" class="mr-2">Children</label>
                                    <input type="checkbox" id="audience2" name="audience[]" value="youth" @php if(in_array('youth',$data)) echo "checked";  @endphp>
                                <label for="audience2" class="mr-2"> Youth</label>
                                    <input type="checkbox" id="audience3" name="audience[]" value="family" @php if(in_array('family',$data)) echo "checked";  @endphp>
                                <label for="audience3" class="mr-2"> Family</label>
                                    <input type="checkbox" id="audience4" name="audience[]" value="adult" @php if(in_array('adult',$data)) echo "checked";  @endphp>
                                <label for="audience4" class="mr-2"> Adult</label>
                                    <input type="checkbox" id="audience5" name="audience[]" value="group" @php if(in_array('group',$data)) echo "checked";  @endphp>
                                <label for="audience5"> Group</label>
                            </div>
                            <div class="form-group">
                                <label for="">Description</label>
                                <textarea class="form-control" name="description" id="" cols="30" rows="5">{{$event->description}}</textarea>
                            </div>
                            <span class="bg-primary d-block p-2 mb-2" style="border-radius:5px 5px 0 0;">Location Detail</span>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Event Address</label>
                                        <input type="text" class="form-control" name="address" placeholder="Event Address" value="{{$event->event_address}}"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">City</label>
                                        <input type="text" class="form-control" name="city" placeholder="City" value="{{$event->event_city}}"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">State</label>
                                        <input type="text" class="form-control" name="state" placeholder="State" value="{{$event->event_state}}"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Country</label>
                                        <input type="text" class="form-control" name="country" placeholder="Country" value="{{$event->event_country}}"> 
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Latitude</label>
                                        <input type="text" class="form-control" name="latitude" placeholder="Latitude" value="{{$event->event_latitude}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">Longitude</label>
                                        <input type="text" class="form-control" name="longitude" placeholder="Longitude" value="{{$event->event_longitude}}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
            </div>
            @endif
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