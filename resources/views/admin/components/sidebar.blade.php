
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      @if(empty($siteInfo->site_logo))
        <span class="brand-text font-weight-light">{{$siteInfo->site_name}}</span>
      @else
        <img class="img-thumbnail" src="{{asset('site/'.$siteInfo->site_logo)}}" >
      @endif
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="info">
          <a href="javascript:void(0)" class="d-block">{{session()->get('admin_name')}}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="{{url('admin/dashboard')}}" class="nav-link {{(Request::path() == 'admin/dashboard')? 'active':''}}">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{url('admin/category')}}" class="nav-link {{(Request::path() == 'admin/category')? 'active':''}}">
              <i class="nav-icon fas fa-glass-cheers"></i>
              <p>
                Category
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{url('admin/events')}}" class="nav-link {{(Request::path() == 'admin/events')? 'active':''}}">
              <i class="nav-icon fas fa-calendar-alt"></i>
              <p>
                Events
              </p>
            </a>
          </li>
          {{-- <li class="nav-item">
            <a href="{{url('admin/banner')}}" class="nav-link {{(Request::path() == 'admin/banner')? 'active':''}}">
              <i class="nav-icon fas fa-images"></i>
              <p>
                Banner
              </p>
            </a>
          </li> --}}
          <li class="nav-item">
            <a href="{{url('admin/booking')}}" class="nav-link {{(Request::path() == 'admin/booking')? 'active':''}}">
              <i class="nav-icon fas fa-calendar-alt"></i>
              <p>
                Bookings
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{url('admin/contact')}}" class="nav-link {{(Request::path() == 'admin/contact')? 'active':''}}">
              <i class="nav-icon fas fa-envelope"></i>
              <p>
                Contact
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="{{url('admin/user')}}" class="nav-link {{(Request::path() == 'admin/user')? 'active':''}}">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Users
              </p>
            </a>
          </li>
          <li class="nav-item has-treeview {{(Request::path() == 'admin/general-settings' || Request::path() == 'admin/profile-settings')? 'menu-open':''}}">
            <a href="javascript:void(0)" class="nav-link">
              <i class="nav-icon fas fa-cog"></i>
              <p>Settings <i class="fas fa-angle-left right"></i></p>
            </a>
            <ul class="nav nav-treeview">
              {{-- <li class="nav-item">
                <a href="{{url('admin/general-settings')}}" class="nav-link {{(Request::path() == 'admin/general-settings')? 'active bg-primary':''}}">
                  <p>General Settings</p>
                </a>
              </li> --}}
              <li class="nav-item">
                <a href="{{url('admin/profile-settings')}}" class="nav-link {{(Request::path() == 'admin/profile-settings')? 'active bg-primary':''}}">
                  <p>Profile Settings</p>
                </a>
              </li>
            </ul> 
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
