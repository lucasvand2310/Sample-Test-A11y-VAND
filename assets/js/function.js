$(document).on("click","#send:not(#send.disabled)", function(){ 

		var company = $("#inc").val();
		var name = $("#name").val();
		var mail = $("#mail").val();
		var message = $("#textarea").val();
//VA();



$.ajax({
   type: "POST",
   url: "contact/sendmail.php",
   data: {company:company,name:name,mail:mail,message:message},
   success: function(msg){
    $("html").addClass("msg");
   },
   complete: function(){
	   setTimeout(function(){
		$("html").removeClass("msg");
	$("body,html").stop().animate({scrollTop:0},300);
	$("html").addClass("complete");
		},2000);
	
	setTimeout(function(){
		
	$("html").removeClass("complete");
		},8000);
		
   }

 });
 

	

	});	
	
	function VA() {
		
		$(document).on("click","#kiyaku", function(){
	if($(this).is(":checked") ){
$(this).removeClass("require");		
	}else {
		$(this).addClass("require");		
	}

	
	});	
		
			$("body").on("change keyup", "#inc", function(){
	var length = $(this).val().length;
	
	if( length >=1 ){
		
	  $(this).removeClass("require");
	

		
	}else {
		$(this).addClass("require");
		
	}
	
	
 });
 
 
 
	 $("body").on("change keyup", "#name", function(){
	var length = $(this).val().length;
	if( length >=1 ){
		
		
	$(this).removeClass("require");
		
	}else {
		$(this).addClass("require");
	}
	
	
 });
 
 
		
	$("body").on("change", "#mail", function(){
	var length = $(this).val().length;
	if( length >=1 ){
		
		if(!$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
			$(this).next().next(".error").remove();
  $(this).next().after("<div class='error'>不正なメールアドレスです</div>");
  $(this).addClass("require error");
		$("#mail+div span").text("");
  }else {
	  $(this).removeClass("require error");
		var Confirm =$(this).val();
		$("#mail+div span").text(Confirm);
		$(this).next().next(".error").remove();
  }
  
		
	}else {
		$(this).addClass("require");
		$(this).removeClass("error");
		$("#mail+div span").text("");
		$(this).next().next(".error").remove();
	}
	

 });
 
 
 
 
 
 $("body").on("change keyup", "#textarea", function(){
	var length = $(this).val().length;
	if( length >=1 ){
		
		if($(this).val().match(/[<(.*)>.*<\/\1>]/)){
			$(this).next().next(".error").remove();
  $(this).next().after("<div class='error'>HTMLコードは入力できません</div>");
  $(this).addClass("require error");
		$("#message+div span").text("");
  }else {
	  $(this).removeClass("require error");
		var Confirm =$(this).val();
		$("#message+div span").text(Confirm);
		$(this).next().next(".error").remove();
  }
  
		
	}else {
		$(this).addClass("require");
		$(this).removeClass("error");
		$("#message+div span").text("");
		$(this).next().next(".error").remove();
	}
	
	
 });
 
 
 
 
 $("body").on("change", "form input,form textarea", function(){
		
	var length = $(".require").length;
	if( length == 0 ){
		$("#send").removeClass("disabled");
	}else {
		$("#send").addClass("disabled");
	}
	
	
 });
	}
VA();