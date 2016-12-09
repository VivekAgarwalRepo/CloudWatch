document.getElementById('header').innerHTML= '<div class="nav-side-menu">'+
    '<div class="brand"><h6>Welcome, </h6></div>'+
'<div>&nbsp &nbsp<span class="glyphicon glyphicon-user"> </span>&nbsp &nbsp &nbsp &nbsp Cloudwatch Utility Bar'+
    '<i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>'+
  
        '<div class="menu-list">'+
  
            '<ul id="menu-content" class="menu-content collapse out">'+
                '<li>'+
                  '<a href="/business_home">'+
                  '<i class="fa fa-dashboard fa-lg"></i> Dashboard'+
                  '</a>'+
                '</li>'+

                '<li data-toggle="collapse" data-target="#service" class="collapsed">'+
                  '<a href="/business_active"><i class="fa fa-check fa-lg"></i> Active Sensors </a>'+
                '</li> '+


                '<li data-toggle="collapse" data-target="#new" class="collapsed">'+
                  '<a href="/business_location"><i class="fa fa-globe fa-lg"></i> Location</a>'+
                '</li>'+
                


                 '<li>'+
                  '<a href="#myModal1" data-toggle="modal">'+
                  '<i class="fa fa-search"></i> Search'+
                  '</a>'+
                  '</li>'+


                '<li data-toggle="collapse" data-target="#service" class="collapsed">'+
                  '<a href="/business_bill"><i class="fa fa-money fa-lg"></i> View Latest Bill </a>'+
                '</li> '+


                 '<li>'+
                  '<a href="/business_logout">'+
                  '<i class="fa fa-sign-out"></i> Logout'+
                  '</a>'+
                '</li>'+
            '</ul>'+
     '</div>'
     
'</div>'+

'</div>';