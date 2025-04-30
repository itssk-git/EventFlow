<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Mail;
use App\Models\User;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Event;
use App\Models\Category;
use Razorpay\Api\Api;
use Exception;

class UserController extends Controller
{
    public function signup(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required|unique:users,email',
            'phone'=>'required',
            'city'=>'required',
            'state'=>'required',
            'code'=>'required',
            'country'=>'required',
            'password'=>'required',
        ],
        [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.unique' => 'Email must be unique',
            'phone.required' => 'Phone Number is required',
            'city.required' => 'City is required',
            'state.required' => 'State is required',
            'code.required' => 'Pincode is required',
            'country.required' => 'Country is required',
            'password.required' => 'Password is required'
        ]);
        
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->city = $request->input('city');
        $user->state = $request->input('state');
        $user->pin_code = $request->input('code');
        $user->country = $request->input('country');
        $user->password = Hash::make($request->input('password'));
        $u = $user->save();
        if($u != null){
            return response()->json([
                'message' => 'User registerd successfully.',
                'status' => 1,
            ], 200);
        }else{
            return response()->json([
                'message' => 'Internal server error.',
                'status' => 0,
            ], 500);
        }
    }

    public function myprofile(Request $request){
        $token = $request->User()->currentAccessToken()->token;
        $user_id = DB::table('personal_access_tokens')->where('token',$token)->pluck('tokenable_id')->first();
        
        $request->validate([
            'name'=>'required',
            'phone'=>'required',
            'city'=>'required',
            'state'=>'required',
            'code'=>'required',
            'country'=>'required',
        ],
        [
            'name.required' => 'Name is required',
            'phone.required' => 'Phone Number is required',
            'city.required' => 'City is required',
            'state.required' => 'State is required',
            'code.required' => 'Pincode is required',
            'country.required' => 'Country is required',
        ]);

        $users = User::where(['user_id'=>$user_id])->update([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'pin_code' => $request->input('code'),
            'country' => $request->input('country'),
        ]);

        if($users != null){
            return response()->json([
                'update' => $users,
                'message' => 'Profile Updated successfully.',
                'status' => 1
            ],200);
        }else{
            return response()->json([
                'message' => 'Internal server error.',
                'status' => 0,
            ], 500);
        }

        
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ],
        [
            'email.required' => 'Email is required',
            'email.email' => 'Email must be Email',
            'password.required' => 'Password is required'
        ]);

        $user = User::where(['email'=>$request->email])->first();
        if(empty($user)){
            return response()->json(['email'=>'Email Does not Exists.']);
        }else if($user->status == '0'){
            return response()->json(['email'=>'The Email is Blocked.']);
        }else{
            if(Hash::check($request->password,$user->password)){
                $token = $user->createToken("API TOKEN")->plainTextToken;
                return response()->json([
                    'token' => $token,
                    'user' => $user,
                    'message' => 'Logged In Successfully.',
                    'status' => 1,
                ]);
            }else{
                return response()->json([
                    'status' => 0,
                    'password'=>'Email and Password does not matched.'
                ]);
            }
        }
    }

    public function getUser(Request $request){
        $token = $request->User()->currentAccessToken()->token;
        $user_id = DB::table('personal_access_tokens')->where('token',$token)->pluck('tokenable_id')->first();
        $user = User::where(['users.user_id'=>$user_id])->first();
        return response()->json([
            'data'=>$user
        ]);
    }

    public function logout(Request $request){
        $request->User()->currentAccessToken()->delete();
        return response()->json([
            'success' =>'Logout Successfully.',
            'status' => 1,
        ],200);
    }

    public function changepassword(Request $request){
            $request->validate([
                'password'=>'required',
                'new_pass'=>'required',
                're_pass'=>'required',
            ],
            [
                'password.required' => 'Old Password is required',
                'new_pass.required' => 'New Password is required',
                're_pass.required' => 'Confirm Password is required'
            ]);
            $token = $request->User()->currentAccessToken()->token;
            $user_id = DB::table('personal_access_tokens')->where('token',$token)->pluck('tokenable_id')->first();
            $select = User::where(['users.user_id'=>$user_id])->pluck('password')->first();
            
            if(Hash::check($request->password,$select)){
                $update = User::where(['users.user_id'=>$user_id])->update([
                    'password'=>Hash::make($request->new_pass)
                ]);
                return response()->json([
                    'update' => $update,
                    'message' => 'change password successfully.',
                    'status' => 1
                ]);
            }else{
                return response()->json(['password'=>'Please Enter Correct Old Password']);
            }
    }

    public function my_events(Request $request){
        $token = $request->User()->currentAccessToken()->token;
        $user_email = DB::table('personal_access_tokens')
                    ->select('personal_access_tokens.tokenable_id','personal_access_tokens.token','users.user_id','users.email','users.name')
                   ->leftjoin('users','personal_access_tokens.tokenable_id','=','users.user_id')
                   ->where(['token'=>$token])
                   ->pluck('users.email')->first();
        $my_events = Booking::select(['booking.*','events.event_name','events.event_img','events.event_city'])
                        ->leftjoin('events','booking.event_id','=','events.event_id')
                        ->where(['booking.user_email'=>$user_email])
                        ->latest()
                        ->get();
        return $my_events;
    }

    public function booking_details($id){
        $booking = Event::select(['events.*','category.name as category_name'])
                ->leftjoin('category','events.event_cat','=','category.id')
                ->where(['events.event_id'=>$id])->get();
        return $booking;
    }

    public function event_booking(Request $request, $id)
    {
        $input = $request->all();
    
        // Generate a random payment ID (example format: PAY123456789)
        $input['payment_id'] = 'PAY' . mt_rand(100000000, 999999999);
    
        // Validate required inputs
        if (!isset($input['ticket_quantity']) || !isset($input['ticket_available'])) {
            return response()->json(['error' => 'Invalid booking details'], 400);
        }
    
        // Calculate the remaining available tickets
        $ticket_available = $input['ticket_available'] - $input['ticket_quantity'];
        if ($ticket_available < 0) {
            return response()->json(['error' => 'Not enough tickets available'], 400);
        }
    
        // Update the event's ticket availability in the database
        $eventUpdated = Event::where('event_id', $id)->update([
            'ticket_available' => $ticket_available,
        ]);
    
        // Check if event update was successful
        if (!$eventUpdated) {
            return response()->json(['error' => 'Booking failed - Unable to update event ticket availability.'], 500);
        }
    
        // Create new booking record
        $booking = new Booking();
        $booking->user_name = $request->input('name');
        $booking->user_email = $request->input('email');
        $booking->user_phone = $request->input('phone');
        $booking->user_city = $request->input('city');
        $booking->user_state = $request->input('state');
        $booking->user_pin = $request->input('pin_code');
        $booking->user_country = $request->input('country');
        $booking->event_id = $id;
        $booking->ticket_quantity = $request->input('ticket_quantity');
        $booking->payment_status = '1';
        $booking->total_amount = $request->input('total_price');
        $bookingSaved = $booking->save();
    
        // Check if booking was saved successfully
        if (!$bookingSaved) {
            return response()->json(['error' => 'Booking failed - Unable to save booking details.'], 500);
        }
    
        // Create payment record
        $payment = new Payment();
        $payment->amount = $request->input('total_price');
        $payment->payment_id = $input['payment_id'];
        $payment->payment_done = '1';
        $payment->event_id = $id;
        $payment->save();
    
        // Return success response with booking and payment details
        return response()->json([
            'status' => 1,
            'message' => 'Event booking successful.',
            'booking_id' => $booking->id,
            'payment_id' => $input['payment_id']
        ], 200);
    }
    

    public function view_event($id){
        $view_event = Booking::select(['booking.*','events.event_name'])
                    ->leftjoin('events','booking.event_id','=','events.event_id')
                    ->where(['booking.id'=>$id])
                    ->get();
        return $view_event;
    }

    public function submitForgetPasswordForm(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        $token = Str::random(64);

        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        Mail::send('email.forgetpassword', ['token' => $token], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Reset Password');
        });

        return response()->json([
            'message'=>'We have e-mailed your password reset link!',
            'status'=>'1',
            'reset_token'=>$token
        ]);

    }

    public function resetpasswordUpdate(Request $request){
          $request->validate([
              'password'=> 'required',
              'password_confirmation'=> 'required',
          ]);
          $email = DB::table('password_resets')->where(['token'=>$request->reset_token])->pluck('email')->first();
         
          $data = User::where(['email'=>$email])->update([
              "password" => Hash::make($request->input("password")),
          ]);
          DB::table('password_resets')->where('email',$email)->delete();

        return response()->json([
            'message'=>'Your Password has been reset successfully.',
            'status'=>'1',
        ]);
      }


}
