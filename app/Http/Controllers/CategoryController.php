<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Yajra\DataTables\DataTables;

class CategoryController extends Controller
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
            $data = Category::latest()->orderBy('id','Desc')->get();
            return Datatables::of($data)
                    ->addIndexColumn()
                    ->editColumn('image', function($row){
                        if($row->cat_img != ''){
                            $img = '<img src="'.asset("category/".$row->cat_img).'" width="100px" height="70px" style="object-fit:cover;">';
                        }else{
                            $img = '<img src="'.asset("category/").'" width="100px">';
                        }
                        return $img;
                    })
                    ->editColumn('status', function($row){
                        if($row->status == '1'){
                            $status = '<span class="badge badge-success">Published</span>';
                        }else{
                            $status = '<span class="badge badge-danger">Pending</span>';
                        }
                        return $status;
                    })
                    ->addColumn('action', function($row){
                        $btn = '<a href="category/'.$row->id.'/edit" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></a> <a href="javascript:void(0)" class="delete-category btn btn-danger btn-sm" data-id="'.$row->id.'"><i class="fas fa-trash-alt"></i></a>';
                        return $btn;
                    })
                    ->rawColumns(['image','status','action'])
                    ->make(true);
        }
        return view('admin.category.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('admin.category.create');
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
            'name'=>'required|unique:category,name',
        ]);

        if($request->img){
            $image = $request->img->getClientOriginalName();
            $request->img->move(public_path('category'), $image);
        }

        $category = new Category();
        if($request->img){
            $category->cat_img = $image;
        }
        $category->name = $request->input('name');
        $category->status = '1';
        $cat = $category->save();
        return $cat;
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
        $category = Category::where(['id'=>$id])->first();
        return view('admin.category.edit',['category'=>$category]);
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
            'name'=>'required|unique:category,name',
        ]);

        //update category image
        if($request->img != ''){
            $path = public_path().'category';
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

        $category = Category::where(['id'=>$id])->update([
            'cat_img'=>$image,
            'name'=>$request->input('name'),
            'status'=>$request->input('cat_status'),
        ]);
        return $category;
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
        $destroy = Category::where(['id'=>$id])->delete();
        return $destroy;
    }

    public function category_list(){
        $category = Category::select(['category.*'])->get();
        return $category;
    }
}
