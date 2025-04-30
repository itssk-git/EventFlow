@extends('admin.layout')
@section('title','Edit Category')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
@component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard','Category'=>'admin/category']])
    @slot('title') Edit Category @endslot
    @slot('add_btn')  @endslot
    @slot('active') Edit Category @endslot
@endcomponent
<!-- Main content -->
<section class="content card">
    <div class="container-fluid card-body">
        <!-- form start -->
        <form class="form-horizontal" id="update_category"  method="POST" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT') }}
            @if($category)
            <div class="row">
                <!-- left column -->
                <div class="col-md-12">
                   <input type="hidden" class="url" value="{{url('admin/category/'.$category->id)}}" >
                   <input type="hidden" class="rdt-url" value="{{url('admin/category')}}" >
                    <!-- jquery validation -->
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Category Details</h3>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div class="form-group row">
                                <label class="col-md-2">Image</label>
                                
                                <!-- Hidden input to ensure the old image path is always submitted -->
                                <input type="hidden" name="old_img" value="{{$category->cat_img}}" />
                                
                                <div class="col-md-3 text-right">
                                    @if($category->cat_img != '')
                                        <!-- Display the image if it exists -->
                                        <img id="image" src="{{ asset('category/' . $category->cat_img) }}" alt="Category Image" width="100px">
                                    @else
                                        <!-- Display a placeholder if no image exists -->
                                        <img id="image" src="{{ asset('category/default.png') }}" alt="No Image Available" width="100px">
                                    @endif
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" name="name" placeholder="Name" value="{{$category->name}}">
                            </div>
                            <div class="form-group">
                                <!-- Hidden input to ensure the status is always submitted as 1 -->
                                <input type="hidden" name="cat_status" value="1">
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