<?php

namespace App\Http\Controllers;

use Session;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Banner;
use App\Models\Users;
use App\Models\Event;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Booking;
use App\Models\Payment;
use Razorpay\Api\Api;
use Exception;

class homeController extends Controller
{
    //
    public function all_data(Request $request){
        $banner = Banner::select(['banner.*'])->get();
        $events = Event::select(['events.*','category.name as category_name'])->leftjoin('category','events.event_cat','=','category.id')->orderBy('event_id','desc')->limit(6)->get();
        ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $categories = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                    ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')
                    ->orderBy('id','desc')->limit(8)->get();
        $settings = DB::table('general_settings')->get();
        return view('/index',['banner'=>$banner,'events'=>$events,'category'=>$category,'settings'=>$settings,'categories'=>$categories]);
    }

    public function signup(){
        if(session()->has('user_name')){
            return redirect('/');
        }else{
            $banner = Banner::select(['banner.*'])->get();
            $events = Event::select(['events.*'])->get();
            $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
            $settings = DB::table('general_settings')->get();
            return view('/signup',['banner'=>$banner,'events'=>$events,'category'=>$category,'settings'=>$settings]);
        }
    }

    public function signup_form(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required|unique:users,email',
            'phone'=>'required',
            'city'=>'required',
            'state'=>'required',
            'code'=>'required',
            'country'=>'required',
            'password'=>'required',
        ]);

        $user = new Users();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->city = $request->input('city');
        $user->state = $request->input('state');
        $user->pin_code = $request->input('code');
        $user->country = $request->input('country');
        $user->password = Hash::make($request->input('password'));
        $u = $user->save();
        return $u;
    }

    public function login(){
        if(Session::has('user_name')){
            return redirect('/');
        }else{
            $banner = Banner::select(['banner.*'])->get();
            $events = Event::select(['events.*'])->get();
            $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
            $settings = DB::table('general_settings')->get();
            return view('/user_login',['banner'=>$banner,'events'=>$events,'category'=>$category,'settings'=>$settings]);
        }   
    }

    public function login_form(Request $request){
        if($request->input()){

            $request->validate([
                'username'=>'required',
                'password'=>'required',
            ]);

            $login = Users::where(['email'=>$request->username])->first();

            if(empty($login)){
                return response()->json(['username'=>'Username Does not Exists.']);
            }else if($login->status == '0') {
                return response()->json(['username'=>'The Email / Username is Blocked.']);
            }else{
                if(Hash::check($request->password,$login->password)){
                    $request->session()->put('user','1');
                    $request->session()->put('user_name',$login->name);
                    $request->session()->put('user_id',$login->user_id);
                    return '1';
                }else{
                    return response()->json(['password'=>'Username and Password does not matched.']);
                }
            }
        }else{
            return view('/user_login');
        }
    }

    public function logout(Request $request){
        session()->forget('user');
        session()->forget('user_name');
        session()->forget('user_id');
        return '1';
    }

    public function changepassword(){
        if(session()->has('user_name')){
            $banner = Banner::select(['banner.*'])->get();
            $events = Event::select(['events.*'])->get();
            $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
            $settings = DB::table('general_settings')->get();
            return view('/changepassword',['banner'=>$banner,'events'=>$events,'category'=>$category,'settings'=>$settings]);
        }else{
            return redirect('/user_login');
        }
    }

    public function change_password(Request $request){
        if($request->input()){
            $request->validate([
                'password'=>'required',
                'new_pass'=>'required',
                're_pass'=>'required',
            ]);

            $select = Users::select(['users.*'])->pluck('password');

            if(Hash::check($request->password,$select[0])){
                $update = Users::select(['users.*'])->update([
                    'password'=>Hash::make($request->new_pass)
                ]);
                return '1';
            }else{
                return response()->json(['password'=>'Please Enter Correct Old Password']);
            }
        }
    }
    
    public function all_events(Request $request){
        Paginator::useBootstrap();
        $event = Event::select(['events.*'])->get();
        $events = Event::select(['events.*','category.name as category_name'])->leftjoin('category','events.event_cat','=','category.id')->orderBy('event_id','desc')->paginate(9);
        $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
        ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $settings = DB::table('general_settings')->get();
        return view('/all_events',['events'=>$events,'category'=>$category,'settings'=>$settings,'event'=>$event]);
    }

    public function events(Request $request,$id){
        Paginator::useBootstrap();
        $event = Event::select(['events.*','category.name as category_name'])->leftjoin('category','events.event_cat','=','category.id')->where(['events.event_cat'=>$id])->first();
        $events = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_cat'=>$id])->orderBy('event_id','desc')->paginate(9);
        $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $settings = DB::table('general_settings')->get();
        return view('/events',['event'=>$event,'category'=>$category,'settings'=>$settings,'events'=>$events]);
    }

    public function event_details(Request $request){
        $event = Event::select(['events.*'])->get();
        $events = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_id'=>$request->id])->get();
        $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $map = Event::select(['events.*'])
               ->where(['events.event_id'=>$request->id])
               ->get();
        $settings = DB::table('general_settings')->get();
        return view('/event_details',['event'=>$event,'category'=>$category,'settings'=>$settings,'events'=>$events,'map'=>$map]);
    }   

    public function contact(){
        $events = Event::select(['events.*'])->get();
        $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $settings = DB::table('general_settings')->get();
        return view('/contact',['events'=>$events,'category'=>$category,'settings'=>$settings]);
    }

    public function contact_form(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'message'=>'required'
        ]);

        $message = new Contact();
        $message->name = $request->input('name');
        $message->email = $request->input('email');
        $message->message = $request->input('message');
        $message->save();
        return '1';
    }

    public function booking(Request $request,$id){
        $event = Event::select(['events.*'])->get();
        $events = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_id'=>$request->id])->get();
        $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $settings = DB::table('general_settings')->get();
        $users = Users::select(['users.*'])->where(['user_id'=>session()->get('user_id')])->get();
        return view('/booking',['event'=>$event,'category'=>$category,'settings'=>$settings,'events'=>$events,'users'=>$users]);
    }

    public function booking_form(Request $request,$id){
        $input = $request->all();
     
         $api = new Api("rzp_test_D8WV5QiBJGQLgg","eHpFBhJJvKNOjWsd87Ek3dhl"); 
   
         $payment = $api->payment->fetch($input['razorpay_payment_id']);
 
         if(count($input)  && !empty($input['razorpay_payment_id'])) {
             try {
                 $response = $api->payment->fetch($input['razorpay_payment_id'])->capture(array('amount'=>$payment['amount'])); 
             } catch (Exception $e) {
                  return  $e->getMessage();
                //  Session::put('error',$e->getMessage());
                //  return redirect()->back();
             }
         }

         $request->validate([
            'name'=>'required',
            'email'=>'required',
            'phone'=>'required',
            'city'=>'required',
            'state'=>'required',
            'pin_code'=>'required',
            'country'=>'required',
         ]);
         $ticket_available = $request->input('ticket_available') - $request->input('ticket_quantity');
         $event = Event::where(['event_id'=>$id])->update([
             'ticket_available'=>$ticket_available
         ]);

         

         $booking = new Booking();
         $booking->user_name = $request->input('name');
         $booking->user_email = $request->input('email');
         $booking->user_phone = $request->input('phone');
         $booking->user_city = $request->input('city');
         $booking->user_state = $request->input('state');
         $booking->user_pin = $request->input('pin_code');
         $booking->user_country = $request->input('country');
         $booking->event_id = $request->input('event_id');
         $booking->ticket_quantity = $request->input('ticket_quantity');
         $booking->payment_status = '1';
         $booking->total_amount = $request->input('total_price');
         $booking->save();

         $user = new Payment();
         $user->amount = $payment['amount'];
         $user->payment_id = $input['razorpay_payment_id'];
         $user->payment_done = '1';
         $user->event_id = $booking->id;
         $user->save();

         return redirect('/success/'.$booking->id);
    }

    public function success(Request $request,$id){
        $event = Event::select(['events.*'])->get();
        $events = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_id'=>$request->id])->get();
        $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $settings = DB::table('general_settings')->get();
        $booking_event = Booking::select(['booking.*','events.event_name'])
                        ->leftjoin('events','booking.event_id','=','events.event_id')
                        ->where(['booking.id'=>$id])->get();
        return view('/success',['event'=>$event,'category'=>$category,'settings'=>$settings,'events'=>$events,'booking_event'=>$booking_event]);
    }

    public function my_events(Request $request){
        if(session()->has('user_name')){
        $event = Event::select(['events.*'])->get();
        $events = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_id'=>$request->id])->get();
        $category = Category::select(['category.*',DB::raw('count(events.event_cat) as count')])
                ->leftJoin('events','events.event_cat','=','category.id')->groupBy('category.id')->get();
        $settings = DB::table('general_settings')->get();
        $my_events = Booking::select(['booking.*','events.event_name'])
                        ->leftjoin('events','booking.event_id','=','events.event_id')
                        ->where(['booking.user_name'=>session()->get('user_name')])
                        ->orderBy('booking.id','DESC')
                        ->get();
        return view('/my_events',['event'=>$event,'category'=>$category,'settings'=>$settings,'events'=>$events,'my_events'=>$my_events]);
        }else{
            return redirect('/user_login');
        }
    }


}
