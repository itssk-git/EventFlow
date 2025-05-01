<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use Yajra\DataTables\DataTables;


class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        if($request->ajax()){
            $data = Booking::select(['booking.*','events.event_name'])->leftjoin('events','booking.event_id','=','events.event_id')
                    ->orderBy('event_id','desc')->get();
                ->addIndexColumn()
                ->editColumn('status', function($row){
                    if($row->payment_status == '1'){
                        $status = '<span class="badge badge-success">Completed</span>';
                    }else{
                        $status = '<span class="badge badge-danger">Not Completed</span>';
                    }
                    return $status;
                })
                ->addColumn('action', function($row){
                    $btn = '<a href="booking/'.$row->event_id.'/view" class="btn btn-success btn-sm">View</a>';
                    return $btn;
                })
                ->rawColumns(['status','action'])
                ->make(true);
        }
        return view('admin.booking.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function Bookingview($id){
        $message = Booking::select(['booking.*','events.event_name'])->leftjoin('events','booking.event_id','=','events.event_id')->where(['booking.id'=>$id])->first();
        $settings = DB::table('general_settings')->get();
        return view('admin.booking.view',['message'=>$message,'settings'=>$settings]);
    }
}
