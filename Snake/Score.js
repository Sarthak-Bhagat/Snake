$.ajax({
   url : 'sql.php',
   type : 'GET',
   success : function(data){
      var obj = jQuery.parseJSON(data);
      var i;
      var y;
      for (i = 0; i < obj.length; i++) {
      	var text = 'N'+(i+1); 
      	document.getElementById(text).innerText =(obj[i][1]);
         var text1 = 'S'+(i+1); 
         document.getElementById(text1).innerText =(obj[i][0]);
      }
}});
