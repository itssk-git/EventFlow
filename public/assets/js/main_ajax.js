$(function(){
    var origin = window.location.origin;
    var path = window.location.pathname.split('/');
    var uRL  = origin+'/'+path[1]+'/';

     // message methods
    function messageHide(){
        $('.message').animate({ opacity: 0,top: '0px' }, 'slow');
        setTimeout(function(){ $(".message").html(''); }, 1000);
    }
    messageHide();

    function messageShow(data){
        $(".message").html(data);
        $('.message').animate({ opacity: 1,top: '60px' }, 'slow');

        setTimeout(function(){ messageHide() }, 3000);
    }

    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

      // delete data common function
      function destroy_data(name,url){
        var el = name;
        var id= el.attr('data-id');
        var dltUrl = url+id;
        if(confirm('Are you Sure Want to Delete This')){
            $.ajax({
                url: dltUrl,
                type: "DELETE",
                cache: false,
                dataType: 'json',
                success: function (dataResult) {
                    if (dataResult == '1') {
                        Toast.fire({
                            icon: 'success',
                            title: 'Deleted Successfully.'
                        });
                        el.parent().parent('tr').remove();
                        setTimeout(function(){ window.location.reload();}, 1000);
                    }else{
                        Toast.fire({
                            icon: 'danger',
                            title: dataResult
                        });
                    }
                }
            });
        }
    }

    function show_formAjax_error(data){
        if(data.status == 422){
            alert(2);
            $('.error').remove();
            $.each(data.responseJSON.errors, function(i, error) {
                var el = $(document).find('[name="' + i + '"]');
                el.after($('<span class="error">' + error[0] + '</span>'));
            });
        }
    }

    // ========================================
    // script for Admin Logout
    // ========================================
    $('.admin-logout').click(function(){
        var url = $('meta[name="site-url"]').attr('content');
        $.ajax({
            url: url+'/admin/logout',
            type: 'GET',
            cache: false,
            success: function(dataResult){
                if(dataResult == '1'){
                    setTimeout(function(){
                        window.location.href = url+'/admin';
                    });
                    Toast.fire({
                        icon: 'success',
                        title: 'Logged Out Successfully.'
                    });
                }
            }
        }); 
    });

    // ========================================
    // script for General Settings
    // ========================================
    $('#updateGeneralSetting').validate({
        rules:{
            site_name: {required: true},
            site_title: {required: true},
            phone: {required: true},
            email: {required: true},
            address: {required: true},
            tax: { required: true},
        },
        message: {
            site_name: {required: "Please Enter Site Name"},
            site_title: {required: "Please Enter Site Title"},
            phone: {required: "Please Enter Phone Number"},
            email: {required: "Please Enter Email"},
            address: {required: "Please Enter Address"},
            tax: {required: "Please Enter Tax"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    console.log(dataResult);
                    setTimeout(function(){ window.location.href = url;}, 1000);
                    Toast.fire({
                        icon: 'success',
                        title: 'Updated Successfully.'
                    });
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Profile Update
    // ========================================
    $('#updateProfileSetting').validate({
        rules: {
            admin_name: {required: true},
            admin_email: {required: true},
            username: {required: true},
        },
        messages: {
            admin_name: {required: "Please Enter Admin Name"},
            admin_email: {required: "Please Enter Admin Email"},
            username: {required: "Please Enter Admin Username"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    console.log(dataResult);
                    setTimeout(function(){ window.location.href = url;}, 1000);
                    Toast.fire({
                        icon: 'success',
                        title: 'Updated Successfully.'
                    });
                        
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Admin Update Password
    // ========================================
    $('#updateAdminPassword').validate({
        rules: {
            password: { required: true },
            new_pass: { required: true },
            re_pass: { required: true, equalTo: "#new-pass" },
        },
        messages: {
            password: { required: "Old Password is Required" },
            new_pass: { required: "New Password is Required" },
            re_pass: { required: "Please Re-enter Correct New Password" }
        },
        submitHandler: function (form) {
            var url = $('.p-url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function (dataResult) {
                    if (dataResult == '1') {
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated Succesfully.'
                        })
                    }else{
                        $.each(dataResult, function (i, error) {
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error + '</span>'));
                        });
                    }
                },
                error: function (data) {
                    if (data.status == 422) {
                        $.each(data.responseJSON.errors, function (i, error) {
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Add Banner Slider
    // ========================================
    $('#add_banner').validate({
        rules: {
            title: {required: true},
            subtitle: {required: true},
            banner_status: {required: true},
            img: {required: true},
        },
        message: {
            title: {required: "Please Enter Banner Slider"},
            subtitle: {required: "Please Enter Banner Sub Title"},
            banner_status: {required: "Please Enter Banner Status"},
            img: {required: "Please Enter Banner Image"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Added Successfully.'
                        });
                        setTimeout(function(){ window.location = url;}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });


    // ========================================
    // script for Update Banner Slider
    // ========================================
    $('#update_banner').validate({
        rules: {
            title: {required: true},
            subtitle: {required: true},
            status: {required: true},
        },
        messages: {
            title: {required: "Please Enter Banner Title"},
            subtitle: {required: "Please Enter Banner Sub Title"},
            status: {required: "Please Enter Banner Status"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated Successfully.'
                        });
                        setTimeout(function(){ window.location.href = $('.rdt-url').val();}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Delete Banner Slider
    // ========================================
    $(document).on("click", ".delete-banner", function(){
        destroy_data($(this),'banner/')
    });


    // ========================================
    // script for Signup Form
    // ========================================
    $('#signup_form').validate({
        rules: {
            name: {required:true},
            email: {required:true},
            phone: {required:true},
            city: {required:true},
            state: {required:true},
            code: {required:true},
            country: {required:true},
            password: {required:true},
        },
        message: {
            name: {required: "Please Enter Your Name"},
            email: {required: "Please Enter Your Email"},
            phone: {required: "Please Enter Your Phone Number"},
            city: {required: "Please Enter Your City"},
            state: {required: "Please Enter Your State"},
            code: {required: "Please Enter Your Pin Code"},
            country: {required: "Please Enter Your Country"},
            password: {required: "Please Enter Your Password"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var login = $('.url-login').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Signup Successfully.'
                        });
                        setTimeout(function(){ window.location = login;}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });


    // ========================================
    // script for Login Form
    // ========================================
    $('#user_login').validate({
        rules: {
            username: {required:true},
            password: {required:true},
        },
        message: {
            username: {required: "Email Address is required"},
            password: {required: "Password is required"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url+'/user_login',
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Login Successfully.'
                        });
                        setTimeout(function(){ window.location.href=document.referrer;}, 2000);
                    }else{
                        $.each(dataResult, function(i, error) {
                            var el = $(document).find('[name="' + i + '"]').css('border-color','red');
                                Toast.fire({
                                    icon: 'error',
                                    title: error
                            })
                          });
                    }
                }
            });
        }
    });


     // ========================================
    // script for User Logout
    // ========================================
    $('.user-logout').click(function(){
        var url = $('meta[name="site-url"]').attr('content');
        $.ajax({
            url: url+'/logout',
            type: 'GET',
            cache: false,
            success: function(dataResult){
                if(dataResult == '1'){
                    setTimeout(function(){
                        window.location.href = url+'/';
                    }, 500);
                    Toast.fire({
                        icon: 'success',
                        title: 'Logged Out Successfully.'
                    })
                }
            }
        });
    });

    // ========================================
    // script for User Change Password
    // ========================================
    $('#changepassword').validate({
        rules: {
            password: {required: true},
            new_pass: {required: true},
            re_pass: {required: true},
        },
        message: {
            password: {required: "Old Password is required."},
            new_pass: {required: "New Password is required."},
            re_pass: {required: "Please Re-enter Correct New Password."},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function(dataResult){
                    if(dataResult == '1'){
                        setTimeout(function(){
                            window.location.reload();
                        }, 1000);
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated Successfully'
                        })
                    }else{
                        $.each(dataResult, function(i, error){
                            var el = $(document).find('[name="' + i +'"]');
                            el.after($('<span class="error">' + error + '</span>'));
                        });
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });


    // ========================================
    // script for Add Category
    // ========================================
    $('#add_category').validate({
        rules: {
            img: {required: true},
            name: {required: true},
        },
        message: {
            img: {required: "Please Enter Category Image"},
            name: {required: "Please Enter Category Name"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Added Successfully.'
                        });
                        setTimeout(function(){ window.location = url;}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Update Category
    // ========================================
    $('#update_category').validate({
        rules: {
            name: {required: true},
        },
        message: {
            name: {required: "Please Enter Category Name"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated Successfully.'
                        });
                        setTimeout(function(){ window.location.href = $('.rdt-url').val();}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Delete Category
    // ========================================
    $(document).on("click", '.delete-category', function(){
        destroy_data($(this),'category/')
    });

    // ========================================
    // script for Add Event
    // ========================================
    $('#add_event').validate({
        rules: {
            img: {required: true},
            name: {required: true},
            category: {required: true},
            start_time: {required: true},
            end_time: {required: true},
            organization: {required: true},
            max_people: {required: true},
            status: {required: true},
            description: {required: true},
            address: {required: true},
            latitude: {required: true},
            longitude: {required: true},
        },
        message: {
            img: {required: "Please Enter Event Image"},
            name: {required: "Please Enter Event Name"},
            category: {required: "Please Enter Event Category"},
            start_time: {required: "Please Enter Event Start Time"},
            end_time: {required: "Please Enter Event End Time"},
            organization: {required: "Please Enter Event Organization"},
            max_people: {required: "Please Enter Event maximum people"},
            status: {required: "Please Enter Event Status"},
            description: {required: "Please Enter Event Description"},
            address: {required: "Please Enter Event Address"},
            latitude: {required: "Please Enter Event Latitude"},
            longitude: {required: "Please Enter Event Longitude"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Added Successfully.'
                        });
                        setTimeout(function(){ window.location = url;}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Update Event
    // ========================================
    $('#update_event').validate({
        rules: {
            name: {required: true},
            category: {required: true},
            start_time: {required: true},
            end_time: {required: true},
            organization: {required: true},
            max_people: {required: true},
            status: {required: true},
            description: {required: true},
            address: {required: true},
        },
        message: {
            name: {required: "Please Enter Event Name"},
            category: {required: "Please Enter Event Category"},
            start_time: {required: "Please Enter Event Start Time"},
            end_time: {required: "Please Enter Event End Time"},
            organization: {required: "Please Enter Event Organization"},
            max_people: {required: "Please Enter Event maximum people"},
            status: {required: "Please Enter Event Status"},
            description: {required: "Please Enter Event Description"},
            address: {required: "Please Enter Event Address"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        Toast.fire({
                            icon: 'success',
                            title: 'Updated Successfully.'
                        });
                        setTimeout(function(){ window.location.href = $('.rdt-url').val();}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    // ========================================
    // script for Delete Event
    // ========================================
    $(document).on("click", '.delete-event', function(){
        destroy_data($(this),'events/')
    });

    // ========================================
    // script for Contact Form
    // ========================================
    $('#message').validate({
        rules: {
            name: {required: true},
            email: {required: true},
            message: {required: true},
        },
        message: {
            name: {required: "Please Enter Your Name"},
            email: {required: "Please Enter Your Email"},
            message: {required: "Please Enter Your Message"},
        },
        submitHandler: function(form){
            var url = $('.url').val();
            var formdata = new FormData(form);
            $.ajax({
                url: url,
                type: 'POST',
                data: formdata,
                processData: false,
                contentType: false,
                success: function(dataResult){
                    if(dataResult == '1'){
                        messageShow("<div class='alert alert-success'>Message sent successfully.</div>");
                        setTimeout(function(){ window.location.reload();}, 1000);
                    }
                },
                error: function(data){
                    if(data.status == 422){
                        $.each(data.responseJSON.errors, function(i, error){
                            var el = $(document).find('[name="' + i + '"]');
                            el.after($('<span class="error">' + error[0] + '</span>'));
                        });
                    }
                }
            });
        }
    });

    $(document).on("click", ".delete-contact", function() {
        destroy_data($(this),'contact/')
    });

    
    //User Change Status
    var base_url = $('#url').val();
    $(document).on('click','.userBlock',function(){
        var id = $(this).attr('data-id');
        var status = $(this).attr('data-status');
        if(status == '1'){
            status = '0';
        }else{
            status = '1';
        }
        $.ajax({
            url: base_url+'/admin/user/block',
            type: 'POST',
            data: {uId:id,status:status},
            success: function(dataResult){
                location.reload();
            }
        });
    });



});