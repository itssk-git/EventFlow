<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Banner;
use App\Models\Event;
use App\Models\Category;
use App\Models\Booking;
use App\Models\Contact;
use Carbon\Carbon;

class homeController extends Controller
{
    //
    public function bannerList(){
        $banner = Banner::all();
        return $banner;
    }

    public function eventList(){
        $event = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->orderBy('event_id','desc')->limit(6)->get();
        return $event;
    }

    public function upcomingeventList(){
        $date = date('Y/m/d H:i');
        $event = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where('start_time','>=',$date)
                ->orderBy('start_time','asc')->limit(6)->get();
        return $event;
    }

    public function allupcomingeventList(){
        $date = date('Y/m/d H:i');
        $event = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where('start_time','>=',$date)
                ->orderBy('start_time','desc')->get();
        return $event;
    }

    public function categoryList(){
        $category = Category::select(['category.*'])->limit(6)->get();
        return $category;
    }

    public function allcategory(){
        $category = Category::all();
        return $category;
    }

    public function settings(){
        $setting = DB::table('general_settings')->get();
        return $setting;
    }

    public function event_details($id){
        $events = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_id'=>$id])->get();
        return $events;
    }

    public function events($id){
        $events = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_cat'=>$id])->orderBy('event_id','desc')->get();
        return $events;
    }

    public function all_events(){
        $event = Event::select(['events.*'])->get();
        return $event;
    }

    public function contactStore(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'message'=>'required'
        ],
        [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'message.required' => 'Message is required'
        ]);

        $message = new Contact();
        $message->name = $request->input('name');
        $message->email = $request->input('email');
        $message->message = $request->input('message');
        $result = $message->save();

        if($result != null){
            return response()->json([
                'status' => $result
            ], 200);
        }else{
            return response()->json([
                'status' => '0'
            ], 500);
        }
    }

    public function search_event(Request $request){
        $where = '';
        if($request->keyword && $request->keyword != ''){
            if($where != ''){ $where .= ' AND '; }
            $where .= 'events.event_name like "'.$request->keyword.'%"';
        }

        if($request->city && $request->city != ''){
            if($where != ''){ $where .= ' AND '; }
            $where .= 'events.event_city like "'.$request->city.'%"';
        }

        if($request->start_date && $request->start_date != ''){
            if($where != ''){ $where .= ' AND '; }
            $where .= '(events.start_time>= "'.date('Y/d/m H:i',strtotime($request->start_date)).'"';
        }

        if($request->end_date && $request->end_date != ''){
            if($where != ''){ $where .= ' OR '; }
            $where .= 'events.start_time<= "'. date('Y/d/m H:i',strtotime($request->end_date)).'")';
        }

        if($request->category && $request->category != ''){
            if($where != ''){ $where .= ' AND '; }
            $where .= 'events.event_cat IN ('.rtrim($request->category,',').')';
        }

    //    return json_encode(['kl'=>$where]);
        if($where != ''){
            $event = Event::select(['events.*','category.name as category_name'])
                    ->leftjoin('category','events.event_cat','=','category.id')
                    ->whereRaw($where)->get();
        }else{
            $event = Event::select(['events.*','category.name as category_name'])
                    ->leftjoin('category','events.event_cat','=','category.id')
                    ->orderBy('event_id','desc')->get();
        }

        return $event;
    }

    
}
