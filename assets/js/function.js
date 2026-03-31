$(document).on("click","#submit-button:not(#submit-button.disabled)", function(){ 

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
				$("#error-kiyaku").text("");
			}else {
				$(this).addClass("require");
				$("#error-kiyaku").text("規約に同意してください");
			}
		});	
		
		$("body").on("change keyup", "#inc", function(){
			var length = $(this).val().length;
			if( length >= 1 ){
				$(this).removeClass("require");
				$("#error-inc").text("");
			}else {
				$(this).addClass("require");
				$("#error-inc").text("会社名を入力してください");
			}
		});
 
		$("body").on("change keyup", "#name", function(){
			var length = $(this).val().length;
			if( length >= 1 ){
				$(this).removeClass("require");
				$("#error-name").text("");
			}else {
				$(this).addClass("require");
				$("#error-name").text("お名前を入力してください");
			}
		});
 
		$("body").on("change keyup", "#mail", function(){
			var length = $(this).val().length;
			if( length >= 1 ){
				if(!$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
					$(this).addClass("require error");
					$("#error-mail").text("有効なメールアドレスを入力してください");
					$("#mail+div span").text("");
				}else {
					$(this).removeClass("require error");
					$("#error-mail").text("");
					var Confirm =$(this).val();
					$("#mail+div span").text(Confirm);
				}
			}else {
				$(this).addClass("require");
				$(this).removeClass("error");
				$("#error-mail").text("メールアドレスを入力してください");
				$("#mail+div span").text("");
			}
		});

		$("body").on("change keyup", "#textarea", function(){
			var length = $(this).val().length;
			if( length >= 1 ){
				if($(this).val().match(/[<(.*)>.*<\/\1>]/)){
					$(this).addClass("require error");
					$("#error-textarea").text("HTMLコードは入力できません");
					$("#message+div span").text("");
				}else {
					$(this).removeClass("require error");
					$("#error-textarea").text("");
					var Confirm =$(this).val();
					$("#message+div span").text(Confirm);
				}
			}else {
				$(this).removeClass("require error");
				$("#error-textarea").text("");
				$("#message+div span").text("");
			}
		});

		$("body").on("change", "form input,form textarea", function(){
			var length = $(".require").length;
			if( length == 0 ){
				$("#submit-button").removeClass("disabled");
			}else {
				$("#submit-button").addClass("disabled");
			}
		});
	}
VA();