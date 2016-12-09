document.getElementById('header').innerHTML= '<div class="nav-side-menu">'+
    '<div class="brand"><h6>Welcome, </h6></div>'+
'<div>&nbsp &nbsp<span class="glyphicon glyphicon-user"> </span>&nbsp &nbsp &nbsp &nbsp Tirath Grewal'+
    '<i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>'+
  
        '<div class="menu-list">'+
  
            '<ul id="menu-content" class="menu-content collapse out">'+
                '<li>'+
                  '<a href="/dash">'+
                  '<i class="fa fa-dashboard fa-lg"></i> Dashboard'+
                  '</a>'+
                '</li>'+

                '<li  data-toggle="collapse" data-target="#products" class="collapsed active">'+
                  '<a href="#myModal" data-toggle="modal"><i class="fa fa-gift fa-lg"></i> Create Sensor </a>'+
                '</li>'+
                


                '<li data-toggle="collapse" data-target="#service" class="collapsed">'+
                  '<a href="/active"><i class="fa fa-check fa-lg"></i> Active Sensors </a>'+
                '</li> '+
                 


                '<li data-toggle="collapse" data-target="#new" class="collapsed">'+
                  '<a href="/location"><i class="fa fa-globe fa-lg"></i> Location</a>'+
                '</li>'+
                


                 '<li>'+
                  '<a href="#myModal1" data-toggle="modal">'+
                  '<i class="fa fa-search"></i> Search'+
                  '</a>'+
                  '</li>'+

                   '<li data-toggle="collapse" data-target="#new" class="collapsed">'+
                  '<a href="/analysis"><i class="fa fa-cog fa-lg"></i> Extensive Analysis</a>'+
                '</li>'+

                 '<li data-toggle="collapse" data-target="#new" class="collapsed">'+
                  '<a href="/a_business"><i class="fa fa-money fa-lg"></i> View Businesses</a>'+
                '</li>'+

                 '<li>'+
                  '<a href="/logout">'+
                  '<i class="fa fa-sign-out"></i> Logout'+
                  '</a>'+
                '</li>'+
            '</ul>'+
     '</div>'
     
'</div>'+

'</div>'+
'<div class="modal fade" id="myModal" role="dialog">'+
    '<div class="modal-dialog">'+
    
     
      '<div class="modal-content">'+
        '<div class="modal-header">'+
          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
          '<h4 class="modal-title" style="text-align:center;">Create Sensor</h4>'+
        '</div>'+
'<div class="modal-body">'+
          '<form action="/createSensor" method="post">'+
'<div class="form-group">'+
'<div class="input-group">'+
            '<span class="input-group-addon" id="sensor_name"><b>Sensor Name</b></span><input type="text" name="sensor_name" placeholder="Sensor Name" class="form-control" required> <br />'+
'</div> <br />'+

'<div class="input-group">'+
            '<span class="input-group-addon" id="location"><b>Location</b></span>'+
             '<input type="text" name="location" placeholder="Location" class="form-control" required> <br /></div><br />'+

'<div class="input-group">'+
            '<span class="input-group-addon" id="location"><b>City</b></span>'+
             '<input type="text" name="city" placeholder="City" class="form-control" required> <br /></div><br />'+


'<div class="input-group">'+
            '<span class="input-group-addon" id="active"><b>Active</b></span>'+
             '<select name="active" class="form-control" required>'+
            '<option value="Yes">Yes</option>'+
            '<option value="No">No</option>'+
            '</select> <br /></div><br />'+
'<div class="input-group"'+
            '<span class="input-group-addon" id="type"><b>Sensor Type</b></span>+'
             '<input type="text" name="type" placeholder="Sensor Type" class="form-control" required> <br /> </div><br />'+
            '<input type="submit" value="Create" class="btn btn-info center-block" style="background: #1abc9c; width=80px;">'+
        '</div>'+
        '<div class="modal-footer">'+
          '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
       ' </div>'+
       ' </div>'+
      '</div>'+

      
    '</div>'+
  '</div>'+


 '<div class="modal fade" id="myModal1" role="dialog">'+
    '<div class="modal-dialog">'+
 
      '<div class="modal-content">'+
        '<div class="modal-header">'+
          '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
          '<h4 class="modal-title" style="text-align:center;">Search</h4>'+
        '</div>'+
        '<div class="modal-body">'+
          '<form action="/search" method="post">'+
          '<div class="input-group">'+
            '<span class="input-group-addon" id="search"> <i class="fa fa-search"></i></span>'+
          '<input type="text" name="search" placeholder="Search" class="form-control" required> '+
        '</div>'+
        '<br /> <br />'+
        '<input type="submit" value="Search" class="btn btn-info center-block" style="background: #1abc9c; width=150px;">'+
      '</form>'+
      '</div>'+
      
    '</div>'+
  '</div>'+
  
'</div>';