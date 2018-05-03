<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<div class="main-content-inner">
    <div class="breadcrumbs ace-save-state" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="ace-icon fa fa-home home-icon"></i>
                <a href="#">Home</a>
            </li>

            <li>
                <a href="#">Tables</a>
            </li>
            <li class="active">jqGrid plugin</li>
        </ul><!-- /.breadcrumb -->

        <div class="nav-search" id="nav-search">
            <form class="form-search">
								<span class="input-icon">
									<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
									<i class="ace-icon fa fa-search nav-search-icon"></i>
								</span>
            </form>
        </div><!-- /.nav-search -->
    </div>


    <div class="page-content">
        <div class="ace-settings-container" id="ace-settings-container">
            <div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
                <i class="ace-icon fa fa-cog bigger-130"></i>
            </div>

        </div><!-- /.ace-settings-container -->

        <div class="page-header">
            <h1>
                jqGrid
                <small>
                    <i class="ace-icon fa fa-angle-double-right"></i>
                    Dynamic tables and grids using jqGrid plugin
                </small>
            </h1>
        </div><!-- /.page-header -->

        <div class="row">

            <div class="col-xs-12">
                <h3 class="header smaller lighter blue">jQuery dataTables</h3>

                <div class="clearfix">
                    <div class="pull-right tableTools-container"></div>
                </div>
                <div class="table-header">
                    Results for "Latest Registered Domains"
                </div>

                <!-- div.table-responsive -->

                <!-- div.dataTables_borderWrap -->
                <div>
                    <table id="dynamic-table" class="table table-striped table-bordered table-hover">
                        <thead>
                            <th>Domain</th>
                            <th>Price</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                app.com
                            </td>
                            <td>$45</td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div><!-- /.row -->
    </div><!-- /.page-content -->
</div>
<script type="text/javascript">
    jQuery(function($) {
        //initiate dataTables plugin
        var myTable =
                $('#dynamic-table')
                //.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
                        .DataTable({
                            bAutoWidth: false,
                            "aoColumns": [
                                {"bSortable": false},
                                null, null, null, null, null,
                                {"bSortable": false}
                            ],
                            "aaSorting": [],


                            //"bProcessing": true,
                            //"bServerSide": true,
                            //"sAjaxSource": "http://127.0.0.1/table.php"	,

                            //,
                            //"sScrollY": "200px",
                            //"bPaginate": false,

                            //"sScrollX": "100%",
                            //"sScrollXInner": "120%",
                            //"bScrollCollapse": true,
                            //Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
                            //you may want to wrap the table inside a "div.dataTables_borderWrap" element

                            //"iDisplayLength": 50


                            select: {
                                style: 'multi'
                            }
                        });
        myTable.on( 'select', function ( e, dt, type, index ) {
            if ( type === 'row' ) {
                $( myTable.row( index ).node() ).find('input:checkbox').prop('checked', true);
            }
        } );
        myTable.on( 'deselect', function ( e, dt, type, index ) {
            if ( type === 'row' ) {
                $( myTable.row( index ).node() ).find('input:checkbox').prop('checked', false);
            }
        } );
        //table checkboxes
        $('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);

        //select/deselect all rows according to table header checkbox
        $('#dynamic-table > thead > tr > th input[type=checkbox], #dynamic-table_wrapper input[type=checkbox]').eq(0).on('click', function(){
            var th_checked = this.checked;//checkbox inside "TH" table header

            $('#dynamic-table').find('tbody > tr').each(function(){
                var row = this;
                if(th_checked) myTable.row(row).select();
                else  myTable.row(row).deselect();
            });
        });

        //select/deselect a row when the checkbox is checked/unchecked
        $('#dynamic-table').on('click', 'td input[type=checkbox]' , function(){
            var row = $(this).closest('tr').get(0);
            if(this.checked) myTable.row(row).deselect();
            else myTable.row(row).select();
        });
        $(document).on('click', '#dynamic-table .dropdown-toggle', function(e) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
        });
    })
</script>
