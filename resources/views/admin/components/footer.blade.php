<!-- /.content-wrapper -->
<footer class="main-footer">
  {{$siteInfo->copyright_text}}
</footer>
<input type="text" hidden id="url" value="{{url('/')}}">
<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
  <!-- Control sidebar content goes here -->
</aside>
<!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<!-- jQuery -->
<script src="{{asset('assets/js/jquery.min.js')}}"></script>

<!-- Bootstrap 4 -->
<script src="{{asset('assets/js/bootstrap.bundle.min.js')}}"></script>

<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script src="{{asset('assets/js/adminlte.min.js')}}"></script>
<script src="{{asset('assets/js/sweetalert2.min.js')}}"></script>
<script src="{{asset('assets/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('assets/js/additional-methods.min.js')}}"></script>
<script src="{{asset('assets/js/jquery.datetimepicker.full.min.js')}}"></script>
<script src="{{asset('assets/js/main_ajax.js')}}"></script>
<script>
  jQuery('#datetimepicker').datetimepicker();
  jQuery('#datetimepicker1').datetimepicker();
</script>
@yield('pageJsScripts')
</body>
</html>
