<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Category;
use Yajra\DataTables\DataTables;

class EventController extends Controller
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
            $data = Event::select(['events.*','category.name as cat_name'])->leftjoin('category','events.event_cat','=','category.id')
                    ->orderBy('event_id','Desc')->get();
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->editColumn('image', function($row){
                        $data = explode(',',$row->event_img);
                        if($data != ''){
                            $img = '<img src="'.asset("event/".$data[0]).'" width="100px" height="70px" style="object-fit:cover;">';
                        }else{
                            $img = '<img src="'.asset("event/").'" width="100px">';
                        }
                        return $img;
                    })
                    ->editColumn('status', function($row){
                        if($row->status == '1'){
                            $status = '<span class="badge badge-success">Active</span>';
                        }else{
                            $status = '<span class="badge badge-danger">Inactive</span>';
                        }
                        return $status;
                    })
                    ->addColumn('action', function($row){
                        $btn = '<a href="events/'.$row->event_id.'/edit" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></a> 
                                <a href="javascript:void(0)" class="delete-event btn btn-danger btn-sm" data-id="'.$row->event_id.'"><i class="fas fa-trash-alt"></i></a>
                                
                                ';
                        return $btn;
                    })
                    ->rawColumns(['image','status','action'])
                    ->make(true);
        }
        return view('admin.events.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $category = Category::select(['category.*'])->get();
        return view('admin.events.create',['category'=>$category]);
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
        $request->validate([
            'img'=>'required',
            'name'=>'required',
            'category'=>'required',
            'start_time'=>'required',
            'end_time'=>'required',
            'organization'=>'required',
            'ticket_quantity'=>'required',
            'status'=>'required',
            'phone'=>'required',
            'email'=>'required',
            'audience'=>'required',
            'description'=>'required',
            'address'=>'required',
            'city'=>'required',
            'state'=>'required',
            'country'=>'required',
        ]);

        if($request->img){
            $image = $request->img->getClientOriginalName();
            $request->img->move(public_path('event'), $image);
        }

        $event = new Event();
        if($request->img){
            $event->event_img = $image;
        }
        $event->event_name = $request->input('name');
        $event->event_cat = $request->input('category');
        $event->start_time = $request->input('start_time');
        $event->end_time = $request->input('end_time');
        $event->event_organization = $request->input('organization');
        $event->ticket_price = $request->input('ticket_price');
        $event->ticket_available = $request->input('ticket_quantity');
        $event->status = $request->input('status');
        $event->phone = $request->input('phone');
        $event->email = $request->input('email');
        $event->instagram = $request->input('instagram');
        $event->twitter = $request->input('twitter');
        $event->facebook = $request->input('facebook');
        $event->audience= implode(",",$request->input('audience'));
        $event->description = $request->input('description');
        $event->event_address = $request->input('address');
        $event->event_city = $request->input('city');
        $event->event_state = $request->input('state');
        $event->event_country = $request->input('country');
        $event->event_latitude = $request->input('latitude');
        $event->event_longitude = $request->input('longitude');
        $ev = $event->save();
        return $ev;
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
        $event = Event::where(['event_id'=>$id])->first();
        $category = Category::all();
        return view('admin.events.edit',['event'=>$event,'category'=>$category]);
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
        $request->validate([
            'name'=>'required',
            'category'=>'required',
            'start_time'=>'required',
            'end_time'=>'required',
            'organization'=>'required',
            'ticket_quantity'=>'required',
            'status'=>'required',
            'phone'=>'required',
            'email'=>'required',
            'audience'=>'required',
            'description'=>'required',
            'address'=>'required',
            'city'=>'required',
            'state'=>'required',
            'country'=>'required',
        ]);

        //update Event Image
        if($request->img != ''){
            $path = public_path().'event';
            //code for remove old file
            if($request->old_img != '' && $request->old_img != null){
                $file_old = $path.$request->old_img;
                if(file_exists($file_old)){
                    unlink($file_old);
                }
            }

            //upload new file
            $file = $request->img;
            $image = $request->img->getClientOriginalName();
            $file->move($path, $image);
        }else{
            $image = $request->old_img;
        }

        $event = Event::where(['event_id'=>$id])->update([
            'event_img'=>$image,
            'event_name'=>$request->input('name'),
            'event_cat'=>$request->input('category'),
            'start_time'=>$request->input('start_time'),
            'end_time'=>$request->input('end_time'),
            'event_organization'=>$request->input('organization'),
            'ticket_price'=>$request->input('ticket_price'),
            'ticket_available'=>$request->input('ticket_quantity'),
            'status'=>$request->input('status'),
            'phone'=>$request->input('phone'),
            'email'=>$request->input('email'),
            'instagram'=>$request->input('instagram'),
            'twitter'=>$request->input('twitter'),
            'facebook'=>$request->input('facebook'),
            'audience'=>implode(",",$request->input('audience')),
            'description'=>$request->input('description'),
            'event_address'=>$request->input('address'),
            'event_city'=>$request->input('city'),
            'event_state'=>$request->input('state'),
            'event_country'=>$request->input('country'),
            'event_latitude'=>$request->input('latitude'),
            'event_longitude'=>$request->input('longitude'),
        ]);
        return $event;
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
        $destroy = Event::where(['event_id'=>$id])->delete();
        return $destroy;
    }

    public function gallery(Request $request,$id){   
        $data['event_id'] = $id;
        $data['event'] = Event::where(['event_id'=>$id])->pluck('event_img');
        $event = Event::where(['event_id'=>$id])->first();
          return view('admin.events.gallery',$data);
    }
  
    public function uploadFile(Request $request){
          $request->validate([
              'file'=>'image|mimes:jpeg,png,jpg|max:2048',
          ]);
  
          $images = '';
  
          if($request->file){
              $image = $request->file('file');
              $imageName = time() . '.' . $image->extension();
              $image->move(public_path('event'),$imageName);
              $images .= $imageName;
          }
  
          $event = Event::where(['event_id'=>$request->event_id])->first();
         // return $event;
          $event_images = $event->event_img.','.$images;
          $update_event = Event::where(['event_id'=>$request->event_id])->update([
                'event_img'=>$event_images
          ]);
          return $update_event;
    }

    public function delete(Request $request){
  
          $filename = $request->get('id');
          $uploaded_image = Event::where('event_id', $filename)->pluck('event_img');
  
          $name = $request->get('name');
          $new_name = str_replace(','.$name,'',$uploaded_image[0]);
          
          $photos_path = public_path('event');
          $file_path = $photos_path . '/' . $name;
   
          if (file_exists($file_path)) {
              unlink($file_path);
          }
   
          $update = Event::where('event_id', $filename)->update([
              'event_img'=>$new_name,
          ]);
   
          return $update;
          
    }

    
}
