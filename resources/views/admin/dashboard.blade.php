@extends('admin.layout')
@section('title','Dashboard')
@section('content')
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content mb-4">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{$event}}</h3>

                <p>Total Events</p>
              </div>
              <div class="icon">
                <i class="nav-icon fas fa-calendar-alt"></i>
              </div>
              <a href="{{url('admin/events')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{$category}}</h3>

                <p>Total Category</p>
              </div>
              <div class="icon">
                <i class="nav-icon fas fa-glass-cheers"></i>
              </div>
              <a href="{{url('admin/category')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{$users}}</h3>

                <p>Total Users</p>
              </div>
              <div class="icon">
                <i class="nav-icon fas fa-users"></i>
              </div>
              <a href="{{url('admin/user')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{$bookings}}</h3>

                <p>Total Bookings</p>
              </div>
              <div class="icon">
                <i class="nav-icon fas fa-calendar-alt"></i>
              </div>
              <a href="{{url('admin/booking')}}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <!-- ./col -->
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
    <section class="latest-records">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="latest-events-record">
              <h4 class="bg-dark py-2 px-3 m-0" style="border-radius: 10px 10px 0 0;">Latest Events</h4>
              <table class="table table-bordered">
                <thead>
                  <th>S No.</th>
                  <th>Event Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </thead>
                <tbody>
                  @php $id = 0; @endphp
                  @if($events->isNotEmpty())
                  @foreach($events as $item)
                    @php $id++; @endphp
                    @if($item->status == 1)
                      <tr>
                        <td>{{$id}}</td>
                        <td>{{$item->event_name}}</td>
                        <td>{{date('j F,Y',strtotime($item->start_time))}}</td>
                        <td>{{date('j F,Y',strtotime($item->end_time))}}</td>
                      </tr>
                    @endif
                  @endforeach
                  @else
                    <tr>
                      <td colspan="4" align="center">No Record Found</td>
                    </tr>
                  @endif
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-6">
            <div class="latest-events-record">
              <h4 class="bg-dark py-2 px-3 m-0" style="border-radius: 10px 10px 0 0;">Expired Events</h4>
              <table class="table table-bordered">
                <thead>
                  <th>S No.</th>
                  <th>Event Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </thead>
                <tbody>
                  @php $id = 0; @endphp
                  @if($events->isNotEmpty())
                  @foreach($events as $item)
                    @php $id++; @endphp
                    @if($item->end_time < date("Y/m/d h:i"))
                      <tr>
                        <td>{{$id}}</td>
                        <td>{{$item->event_name}}</td>
                        <td>{{date('j F,Y',strtotime($item->start_time))}}</td>
                        <td>{{date('j F,Y',strtotime($item->end_time))}}</td>
                        <td>
                        @if($item->end_time < date("Y/m/d h:i"))
                          <span class="badge badge-danger">Expire</span>
                        @endif
                        </td>
                      </tr>
                    @endif
                  @endforeach
                  @else
                    <tr>
                      <td colspan="5" align="center">No Record Found</td>
                    </tr>
                  @endif
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
@stop