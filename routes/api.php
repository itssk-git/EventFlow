<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\homeController;
use App\Http\Controllers\Api\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login',[UserController::class,"login"]); //login page
Route::post('/signup',[UserController::class,"signup"]); //signup page
Route::get('/banner_list',[homeController::class,'bannerList']); //home page design banner
Route::get('/event_list',[homeController::class,'eventList']);  //home page all events
Route::post('/event_lists',[homeController::class,'eventList']);  //home page all events
Route::get('/upcoming_lists',[homeController::class,'upcomingeventList']);  //home page all Upcoming events
Route::get('/allupcoming_lists',[homeController::class,'allupcomingeventList']);  //All Upcoming events
Route::get('/category_list',[homeController::class,'categoryList']); //All event category list
Route::get('/settings',[homeController::class,'settings']);
Route::get('/event_details/{id}',[homeController::class,'event_details']); //single event details page
Route::get('/events/{id}',[homeController::class,'events']); //event category show all events
// Route::get('/all_events',[homeController::class,'all_events']); //all events page
Route::post('/contact',[homeController::class,'contactStore']); //contact page form store
Route::get('/booking/{id}',[UserController::class,'booking_details']);
Route::post('/booking/{id}',[UserController::class,'event_booking']);
Route::get('/all_events',[homeController::class,'search_event']);  
Route::get('/all_category',[homeController::class,'allcategory']);  
Route::post('/forgotpassword',[UserController::class,'submitForgetPasswordForm']);  
Route::post('/resetpassword',[UserController::class,'resetpasswordUpdate']);  


Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user',[UserController::class,'getUser']); //get user by token
    Route::get('/my_events',[UserController::class,'my_events']);  //All user events by user token
    Route::post('/logout',[UserController::class,'logout']);  //user logout by token
    Route::post('/changepassword',[UserController::class,'changepassword']);  //user password change by token
    Route::get('/view_event/{id}',[UserController::class,'view_event']); //booking table view event detail
    Route::post('/myprofile',[UserController::class,'myprofile']); //booking table view event detail
});



/*=========================*/
// 1.Remaining booking page api
// 2.Remaining insert all pages api
// 3.Remaining payment gateway api
/*=========================*/