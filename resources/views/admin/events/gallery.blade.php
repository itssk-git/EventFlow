@extends('admin.layout')
@section('title','Gallery')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
@component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard','Events'=>'admin/events']])
    @slot('title') Gallery @endslot
    @slot('add_btn')  @endslot
    @slot('active') Gallery @endslot
@endcomponent
<!-- Main content -->
<section class="content card">
    <div class="container-fluid card-body">
    <div class='content'>
              <!-- Dropzone -->
             <form  id="dropzoneForm" action="{{route('uploadFile')}}" class='dropzone mb-3' enctype="multipart/form-data" >
                 @csrf
                 <input type="hidden" name="event_id" value="{{$event_id}}" >
             </form> 
             <div align="center">
                <button type="button" class="btn btn-info" id="submit-all">Upload</button>
             </div>
    </div>
     
    </div><!-- /.container-fluid -->
    <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Uploaded Image</h3>
        </div>
        <div class="panel-body" id="uploaded_image">
            <div class="row">
            <input type="hidden" name="event_id" value="{{$event_id}}" >
            @php
            $images = array_filter(explode(',',$event[0]));
            @endphp
            @for($i=0; $i < count($images); $i++)
                <div class="col-md-2" style="margin-bottom:16px;" align="center">
                    <img src={{asset('public/event/' .$images[$i])}}
                    class="img-thumbnail" width="175" height="175" style="height:175px;" /> 
                    @if($i != 0)
                        <button type="button" class="btn btn-link remove_image" id="{{$images[$i]}}">Remove</button>
                    @endif
                </div>
            @endfor
            </div>
        </div>
    </div>
</section><!-- /.content -->
</div>
@stop

@section('pageJsScripts')
<script src="{{asset('public/assets/js/dropzone.js')}}"></script>
<script type="text/javascript">
    Dropzone.options.dropzoneForm = {
        autoProcessQueue : false,
        acceptedFiles: ".png,.jpg,.jpeg",

        init:function(){
            var submitButton = document.querySelector("#submit-all");
            myDropzone = this;

            submitButton.addEventListener('click', function(){
                myDropzone.processQueue();
            });

            this.on("complete", function(){
                if(this.getQueuedFiles().length == 0 && this.getUploadingFiles().length == 0){
                    var _this = this;
                    window.location.reload();
                }
                
            });

        }

    };

    $(document).on("click", '.remove_image', function(){
        var name = $(this).attr('id');
        var id = $('input[name=event_id]').val();
        $.ajax({
            url: "{{route('delete')}}",
            data: {name: name,id:id},
            success: function(data){
                window.location.reload();
            }
        })
    });


</script>
@stop