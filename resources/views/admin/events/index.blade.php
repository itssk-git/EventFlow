@extends('admin.layout')
@section('title','Events')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    @component('admin.components.content-header',['breadcrumb'=>['Dashboard'=>'admin/dashboard']])
        @slot('title') Events @endslot
        @slot('add_btn') <a href="{{url('admin/events/create')}}" class="align-top btn btn-sm btn-primary">Add New</a> @endslot
        @slot('active') Events @endslot
    @endcomponent
    <!-- /.content-header -->

    <!-- show data table -->
    @component('admin.components.data-table',['thead'=>
        ['S No.','Image','Name','Ticket Quantity','Category','Organization','Status','Action']
    ])
        @slot('table_id') event_list @endslot
    @endcomponent

</div>
@stop

@section('pageJsScripts')
<!-- DataTables -->
<script src="{{asset('assets/js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{asset('assets/js/dataTables.responsive.min.js')}}"></script>
<script src="{{asset('assets/js/responsive.bootstrap4.min.js')}}"></script>
<script type="text/javascript">
    var table = $("#event_list").DataTable({
        processing: true,
        serverSide: true,
        ajax: "events",
        columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex'},
            {data: 'image', name: 'image'},
            {data: 'event_name', name: 'name'},
            {data: 'ticket_available', name: 'ticket_available'},
            {data: 'cat_name', name: 'category'},
            {data: 'event_organization', name: 'organization'},
            {data: 'status', name: 'status'},
            {
                data: 'action',
                name: 'action',
                orderable: true,
                searchable: true
            }
        ]
    });
</script>
@stop