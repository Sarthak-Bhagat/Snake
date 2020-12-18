function reload(){
	document.getElementById('form').submit();
	var n = document.getElementById('uname').value
	var score = document.getElementById('score').innerText
    var name = n.substring(0, 7);
	if(isBlank(n)){
		name  = 'Anon'
	}
	$.ajax({
        url: 'storescore.php',
        type: "POST",
        data: ({Name: name,Score:score}),
        success: function(data){
        	console.log(data);
        	alert(data);
        }
    })
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}