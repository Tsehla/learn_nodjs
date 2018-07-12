//adding http module to our node app
var http = require("http");
//there are many way to create server
var server = http.createServer(); //turning imported module to a function
var url = require("url");//adding url module// we will use it to route and retrive values

//creating top part of html, not necessary but it makes it easier since we will re use it anyway
//we will use reverse ticks to allow us to create multi line strings (` and ` ) at the end

var my_html_navi = `
<html>
<head>
<title>Node js in 10 minutes </title>

<!-- lets add our page style here -->
<style>
#home{
  width: 20%;
  height : 30px;
  display : inline-block;
}
#contact{
  width : 20%;
  height : 30px;
  display : inline-block;
}


</style>


</head>
<body><!-- we will keep the body open and will close it on the footer part -->

<!-- navigation -->

<button id ="home" onclick="home_page()">Home</button>

<button id ="contact" onclick="contact_page()">Contact</button>
<!-- java script to  open our links  -->

<script>
function home_page(){//home page

  window.location.href="http://127.0.0.1:2000/";//open a new window with that url

}

function contact_page(){//contact page

window.open("http://localhost:2000/contactPage", "_self"); 

//adding "_self" cause the new window to open inside old one tab

}




</script>

<!-- end of navigation content -->

<br /> <br /> <!-- breaks for styling -->
`;
//create footer
var my_footer = ` <br /> <br /><!-- breaks for styling -->

<div id = "footer" style ="width :100%; height 30px; background-color:black; color:white">My footer</div>

<!-- here im gonna close <html> and <body> tags -->

</body>
</html>
`;

//prepare a server to recieve request and respond

server.on("request", function(request, respond){
    
//==========================================================================
//                                 URL PARSER
//==========================================================================
var my_url_path = url.parse(request.url).pathname;

var my_url_value = url.parse(request.url).query;
//path name is what follows after port a name or (/);
//query is what follows a pathname, anything after pathname and (?) ie. localhost:2000/home?2

//create router function based on the path name given in url actually mor like if else statements
    

//=========================================================================
//                                  ROUTERS
//=========================================================================
    
    

if(my_url_path == "/" || my_url_path == ""){// home page router

   //do something
  return my_home_function(request, respond);
   //call a home function and pass request and response server objects
}

else if(my_url_path == "/contactPage"){//contact page router
return my_contact_function(request, respond);

}
    
else if(my_url_path == "/form"){//filled form router
    
    form_data(request, respond);
}

});


//======================================================================
//                                  ROUTES FUNCTIONS
//======================================================================

//here you define functions used to route request

function my_home_function(request, respond){
  //send back a reply to a user and contents
  respond.writeHead(200);//html sucess code send back
  respond.write(my_html_navi +
              'THIS IS HOME PAGE'+
              my_footer );

  //the my_html_navi and my_footer are global objects since i have not defined them inside any function 

  //end you response to the browser
  respond.end();
  //you can also send data back with respond.end() like how you do with response.write();
  
}

//add contact page function

function my_contact_function (request, respond){

  //define form like how you did navigation and footer

  var my_form = `
  <input type = "text" id="name_filed" Placeholder="your name here">
  <!-- forms are self closing no need for end tag -->
  <input type ="email" id="email_field" placeholder="you email here">
  <input type ="number" id="age_field" placeholder ="you age here">
   <!--send form data button -->
  <button onclick = "form_url_make()">Send</button>
   
 <!-- script to create url with form values and send to nodjs server -->
<script> 

function form_url_make(){
//alert();

//get the formname with the id and assign its content to the variable
 var name = document.getElementById("name_filed");
 var email = document.getElementById("email_field");
 var age = document.getElementById("age_field");

//create a new url by adding values separated by "&" character
//all adding ? after pathname to show that a query start after
//remeber the order you adding the values you will need it when retrieving on the server

window.open("http://localhost:2000/form?"+name.value+"&"+email.value+"&"+age.value);

//you can use form http post methods//
//to secure data you may need to encode this "encodeURI"



}
</script>
  

  `;

    respond.writeHead(200);
    respond.write(my_html_navi +
              my_form +//lets add our form here
              my_footer
    );
    respond.end();

  //we will need to add links in our navigation button to point to our pages 
  //for now we will test out server and add link manually in the browser
  //then come back and implement links
}

//form data get and show function

function form_data(request, respond){
    
    var my_url_query = url.parse(request.url).query;
    console.log(my_url_query);
    //lets remove "&" character and show results back to the user, if the was a db, this is where we'd pass the data to db
    
   // my_url_query.replace(/%20\g/, " ");//you may need this if the user send a sentence, all spaces will be replaced with "%20", so you may want to convert that back to space then split the string
    
    
var my_query_to_array = my_url_query.split("&");//we separated our data back to its original form and stored it in an array

//write data back to user from the array// rememeber the order of data from the user form
    
respond.writeHead(200);
respond.write(
        "<p>"+
        "Your name is : "+my_query_to_array[0]+
        "<br />"+
        "You email is : "+my_query_to_array[1]+
        "<br /> Your age is : "+my_query_to_array[2]+
        "</p>"
    //this is how youd store data to the database, retrive from array assign a variable to it and send the variable to the database

);
respond.end();

    

    
    
    
    
}



server.listen(2000, function(){
    console.log("=======================================");
    console.log("Server running on http://localhost:2000");
    console.log("=======================================")});