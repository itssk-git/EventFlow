<?php

namespace App\Http\Controllers;

use Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Event;
use App\Models\Users;
use App\Models\Booking;
use App\Models\Category;

class AdminController extends Controller
{
    //
    public function index(Request $request){
        if($request->input()){

            $request->validate([
                'username' => 'required',
                'password' => 'required',
            ]);

            $login = Admin::where(['username'=>$request->username])->pluck('password')->first();

            if(empty($login)){
                return response()->json(['username'=>'Username Does not Exists.']);
            }else{
                if(Hash::check($request->password,$login)){
                    $admin = Admin::first();
                    $request->session()->put('admin','1');
                    $request->session()->put('admin_name',$admin->admin_name);
                    return '1';
                }else{
                    return response()->json(['password'=>'Username and Password does not matched.']);
                }
            }


        }else{
            return view('admin.admin');
        }
    }

    public function dashboard(){
        $events = Event::select(['events.*'])->orderBy('event_id','desc')->limit(5)->get();
        $event = Event::count();
        $category = Category::count();
        $users = Users::count();
        $bookings = Booking::count();
        return view('/admin/dashboard',['events'=>$events,'event'=>$event,'category'=>$category,'users'=>$users,'bookings'=>$bookings]);
    }

    public function logout(Request $request){
        Auth::logout();
        session()->forget('admin');
        session()->forget('admin_name');
        return '1';
    }
}
