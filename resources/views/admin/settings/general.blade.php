@extends('admin.layout')
@section('title','General Settings')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    @component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard']])
        @slot('title') General Settings @endslot
        @slot('add_btn') @endslot
        @slot('active') General Settings @endslot
    @endcomponent
    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <!-- form start -->
            <form class="form-horizontal" id="updateGeneralSetting" method="POST">
            {{ csrf_field() }}
                @foreach($data as $item)
                <div class="row">
                    <!-- left column -->
                    <div class="col-md-12">
                        <!-- jquery validation -->
                    <input type="hidden" class="url" value="{{url('admin/general-settings')}}" >
                    <!-- jquery validation -->
                        <div class="card card-primary">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <span class="d-block bg-primary p-2 mb-3" style="border-radius:5px;">General Information</span>
                                        <div class="form-group">
                                            <label>Site Logo</label>
                                            <input type="hidden" class="custom-file-input" name="old_logo" value="{{$item->site_logo}}" />
                                            <input type="file"  class="form-control" name="logo" onChange="readURL(this);">
                                            @if(empty($item->site_logo))
                                                <img class="img-thumbnail" id="image" src="{{asset('site/default.jpg')}}" width="150px" >
                                            @else
                                                <img class="img-thumbnail" id="image" src="{{asset('site/'.$item->site_logo)}}" width="150px" >
                                            @endif
                                        </div>
                                        <div class="form-group">
                                            <label>Site Name</label>
                                            <input type="text" class="form-control" name="site_name" value="{{$item->site_name}}"  placeholder="Enter Name">
                                        </div>
                                        <div class="form-group">
                                            <label>Site Title</label>
                                            <input type="text" class="form-control" name="site_title" value="{{$item->site_title}}"  placeholder="Enter Name">
                                        </div>
                                        <div class="form-group">
                                            <label>Theme Color</label>
                                            <input type="color" class="form-control" name="theme_color" value="{{$item->theme_color}}">
                                        </div>
                                        <div class="form-group">
                                            <label>Footer Description</label>
                                            <textarea name="footer_desc" id="" class="form-control" cols="30" rows="4">{{$item->footer_desc}}</textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Tax On Ticket (%)</label>
                                            <input type="number" class="form-control" name="tax" value="{{$item->tax}}"  placeholder="Enter Tax">
                                        </div>
                                        <div class="form-group">
                                            <label>Currency Format</label>
                                            <input type="text" class="form-control" name="cur_format" value="{{$item->cur_format}}"  placeholder="Enter Currency Format">
                                        </div>
                                        <div class="form-group">
                                            <label>Copyright Text</label>
                                            <input type="text" class="form-control" name="copyright" value="{{$item->copyright_text}}"  placeholder="Footer Copyright Text">
                                        </div>
                                        <span class="d-block bg-primary p-2 mb-3" style="border-radius:5px;">Contact Details</span>
                                        <div class="form-group">
                                            <label>Phone</label>
                                            <input type="number" class="form-control" name="phone" value="{{$item->phone}}">
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="email" class="form-control" name="email" value="{{$item->email}}">
                                        </div>
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea name="address" id="" class="form-control" cols="30" rows="2">{{$item->address}}</textarea>
                                        </div>
                                        <span class="d-block bg-primary p-2 mb-3" style="border-radius:5px;">Social Links</span>
                                        <div class="form-group">
                                            <label>Instagram</label>
                                            <input type="url" class="form-control" name="instagram" placeholder="Enter Instagram Url" value="{{$item->instagram}}">
                                        </div>
                                        <div class="form-group">
                                            <label>Twitter</label>
                                            <input type="url" class="form-control" name="twitter" placeholder="Enter Twitter Url" value="{{$item->twitter}}">
                                        </div>
                                        <div class="form-group">
                                            <label>Facebook</label>
                                            <input type="url" class="form-control" name="facebook" placeholder="Enter Facebook Url" value="{{$item->facebook}}">
                                        </div>
                                        <input type="submit" class="btn btn-primary update-general-settings" value="Update"/>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
                @endforeach
            </form> <!-- /.form start -->
        </div><!-- /.container-fluid -->
    </section><!-- /.content -->
</div>
<!-- /.content-wrapper -->
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