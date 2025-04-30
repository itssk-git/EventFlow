@extends('admin.layout')
@section('title','Edit Banner Slider')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
@component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard','Banner Slider'=>'admin/banner']])
    @slot('title') Edit Banner Slider @endslot
    @slot('add_btn')  @endslot
    @slot('active') Edit Banner Slider @endslot
@endcomponent
<!-- Main content -->
<section class="content card">
    <div class="container-fluid card-body">
        <!-- form start -->
        <form class="form-horizontal" id="update_banner"  method="POST" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT') }}
            @if($banner)
            <div class="row">
                <!-- left column -->
                <div class="col-md-12">
                   <input type="hidden" class="url" value="{{url('admin/banner/'.$banner->id)}}" >
                   <input type="hidden" class="rdt-url" value="{{url('admin/banner')}}" >
                    <!-- jquery validation -->
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Banner Slider Details</h3>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="form-group">
                                <label>Title</label>
                                <input type="text" class="form-control" name="title" placeholder="Title" value="{{$banner->title}}">
                            </div>
                            <div class="form-group">
                                <label>Sub Title</label>
                                <textarea class="form-control" name="subtitle" placeholder="Sub Title" id="" cols="30" rows="5">{{$banner->subtitle}}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Status </label>
                                <select class="form-control" name="banner_status"  style="width: 100%;">
                                    <option value="published" {{ ($banner->status == "published" ? "selected":"") }}>Published</option>
                                    <option value="pending" {{ ($banner->status == "pending" ? "selected":"") }}>Pending</option>
                                </select>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-2">Image</label>
                                <div class="custom-file col-md-7">
                                    <input type="hidden" class="custom-file-input" name="old_img" value="{{$banner->banner_img}}" />
                                    <input type="file" class="custom-file-input" name="img" onChange="readURL(this);">
                                    <label class="custom-file-label">Choose file</label>
                                </div>
                                <div class="col-md-3 text-right">
                                    @if($banner->banner_img != '')
                                    <img id="image" src="{{asset('banner/'.$banner->banner_img)}}" alt="" width="100px">
                                    @else
                                    <img id="image" src="{{asset('banner/')}}" alt="" width="100px">
                                    @endif
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
                    <button type="submit" class="btn btn-primary">Update</button>
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