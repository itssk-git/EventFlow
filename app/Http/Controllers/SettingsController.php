<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller
{
    //
    public function general_settings(Request $request){
        if($request->input()){
            $request->validate([
                'site_logo'=>'image|mimes:jpg,jpeg,png,svg',
                'site_name'=>'required',
                'site_title'=>'required',
                'footer_desc'=>'required',
                'theme_color'=>'required',
                'phone'=>'required',
                'email'=>'required',
                'address'=>'required',
                'tax'=>'required',
                'cur_format'=>'required',
            ]);

            if($request->logo != ''){
                $path = public_path().'/site/';

                //code for remove old file
                if($request->old_logo != '' && $request->old_logo != null){
                    $file_old = $path.$request->old_logo;
                    if(file_exists($old_file)){
                        unlink($old_file);
                    }
                }

                //upload new file
                $file = $request->logo;
                $filename = $request->logo->getClientOriginalName();
                $file->move($path, $filename);
            }else{
                $filename = $request->old_logo;
            }

            $update = DB::table('general_settings')->update([
                'site_logo'=>$filename,
                'site_name'=>$request->site_name,
                'site_title'=>$request->site_title,
                'footer_desc'=>$request->footer_desc,
                'theme_color'=>$request->theme_color,
                'phone'=>$request->phone,
                'email'=>$request->email,
                'address'=>$request->address,
                'instagram'=>$request->instagram,
                'twitter'=>$request->twitter,
                'facebook'=>$request->facebook,
                'tax'=>$request->tax,
                'cur_format'=>$request->cur_format,
                'copyright_text'=>$request->copyright,
            ]);
            return $update;
        }else{
            $settings = DB::table('general_settings')->get();
            return view('admin.settings.general',['data'=>$settings]);
        }
    }


    public function profile_settings(Request $request){
        if($request->input()){
            $request->validate([
                'admin_name'=>'required',
                'admin_email'=>'required',
                'username'=>'required',
            ]);

            $update = DB::table('admin')->update([
                'admin_name'=>$request->admin_name,
                'admin_email'=>$request->admin_email,
                'username'=>$request->username,
            ]);
            return $update;
        }else{
            $settings = DB::table('admin')->get();
            return view('admin.settings.profile',['data'=>$settings]);
        }
    }

    public function change_password(Request $request){
        if($request->input()){
            $request->validate([
                'password'=>'required',
                'new_pass'=>'required',
                're_pass'=>'required',
            ]);

            $select = DB::table('admin')->pluck('password');

            if(Hash::check($request->password,$select[0])){
                $update = DB::table('admin')->update([
                    'password'=>Hash::make($request->new_pass),
                ]);
                return '1';
            }else{
                return response()->json(['password'=>'Please Enter Correct Old Password']);
            }
        }
    }


}
