<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\homeController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware'=>'installed'], function(){
    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/login', function () {
        return view('welcome');
    });

    Route::get('/signup', function () {
        return view('welcome');
    });

    Route::get('/all_events', function () {
        return view('welcome');
    });

 

    Route::get('/contact', function () {
        return view('welcome');
    });

    Route::get('/eventdetails/{event_id}', function () {
        return view('welcome');
    });

    Route::get('/events/{id}', function () {
        return view('welcome');
    });

    Route::get('/my_profile', function () {
        return view('welcome');
    });

    Route::get('/my_events', function () {
        return view('welcome');
    });

    Route::get('/changepassword', function () {
        return view('welcome');
    });

    Route::get('/success', function () {
        return view('welcome');
    });

    Route::get('/view_event/{id}', function () {
        return view('welcome');
    });

    Route::get('/booking/{id}', function () {
        return view('welcome');
    });

    Route::get('/all_category', function () {
        return view('welcome');
    });

    Route::get('/forgotpassword', function () {
        return view('welcome');
    });

    Route::get('/resetpassword', function () {
        return view('welcome');
    });


   
    // Route::view('/{app?}','app');
    // Route::get('/',[homeController::class,'all_data']);
    // Route::get('/signup',[homeController::class,'signup']);
    // Route::post('/signup',[homeController::class,'signup_form']);
    // Route::get('/user_login',[homeController::class,'login']);
    // Route::post('/user_login',[homeController::class,'login_form']);
    // Route::get('/logout',[homeController::class,'logout']);
    // Route::get('/changepassword',[homeController::class,'changepassword']);
    // Route::post('/changepassword',[homeController::class,'change_password']);
    // Route::get('/all_events',[homeController::class,'all_events']);
    // Route::get('/events/{id}',[homeController::class,'events']);
    // Route::get('/contact',[homeController::class,'contact']);
    // Route::post('/contact',[homeController::class,'contact_form']);
    // Route::get('/event_details/{id}',[homeController::class,'event_details']);
    // Route::get('/booking/{id}',[homeController::class,'booking']);
    // Route::post('/booking/{id}',[homeController::class,'booking_form']);
    // Route::get('/success/{id}',[homeController::class,'success']);
    // Route::get('/my_events',[homeController::class,'my_events']);

    Route::post('/admin',[AdminController::class,'index']);
    Route::group(['middleware'=>'protectedPage'],function(){
        Route::get('/admin',[AdminController::class,'index']);
        Route::get('admin/dashboard',[AdminController::class,'dashboard']);
        Route::get('admin/logout',[AdminController::class,'logout']);
        Route::get('admin/general-settings',[SettingsController::class,'general_settings']);
        Route::post('admin/general-settings',[SettingsController::class,'general_settings']);
        Route::get('admin/profile-settings',[SettingsController::class,'profile_settings']);
        Route::post('admin/profile-settings',[SettingsController::class,'profile_settings']);
        Route::post('admin/profile-settings/change-password',[SettingsController::class,'change_password']);
        Route::resource('admin/banner',BannerController::class);
        Route::resource('admin/category',CategoryController::class);
        Route::resource('admin/events',EventController::class);
        Route::get('admin/events/{id}/gallery',[EventController::class,'gallery']);
        Route::post('/uploadFile',[EventController::class,'uploadFile'])->name('uploadFile');
        Route::get('/delete',[EventController::class,'delete'])->name('delete');
        Route::resource('admin/contact',ContactController::class);
        Route::get('admin/contact/{id}/view',[ContactController::class,'Contactview']);
        Route::resource('admin/user',UserController::class);
        Route::post('admin/user/block',[UserController::class,'changeStatus']);
        Route::resource('admin/booking',BookingController::class);
        Route::get('admin/booking/{id}/view',[BookingController::class,'Bookingview']);
    });
});

?>