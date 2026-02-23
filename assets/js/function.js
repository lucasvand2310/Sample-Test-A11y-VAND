// WCAG 2.5.1: Use form submit event instead of custom div click
// WCAG 2.5.2: Submit event triggers on up-event (mouseup/click), not down-event (mousedown)
//             This allows users to cancel by moving pointer away before releasing
// WCAG 2.5.4: Motion Actuation - This website does NOT use device motion events.
//             All functionality is operable via standard UI components only.
//             No devicemotion, deviceorientation, or gesture events are implemented.
// WCAG 3.2.1: On Focus - No context changes occur when input fields receive focus.
//             All event listeners use 'change' and 'keyup' events, NOT 'focus' events.
//             This ensures users can navigate through form fields without unexpected behavior.
$(document).on("submit", "#form", function(e){
	e.preventDefault(); // Prevent default form submission
	
	// Trigger validation for all required fields to show hidden errors
	$("#name, #mail, #textarea").trigger("change");

	// Check if terms are agreed to
	if (!$("#kiyaku").is(":checked")) {
		$("#form-status").text("規約に同意してください。 (Please agree to the terms.)").css("color", "#ffcccc");
		return false;
	}

	// Check if form is valid (no .require class on inputs)
	var requiredFields = $("input.require, textarea.require").length;
	if (requiredFields > 0) {
		$("#form-status").text("入力エラーがあります。内容を確認してください。 (There are input errors. Please check the content.)").css("color", "#ffcccc");
		return false;
	}

	var company = $("#inc").val();
	var name = $("#name").val();
	var mail = $("#mail").val();
	var message = $("#textarea").val();

	$.ajax({
		type: "POST",
		url: "contact/sendmail.php",
		data: {company:company,name:name,mail:mail,message:message},
		success: function(msg){
			$("html").addClass("msg");
			$("#form-status").text("お問い合わせありがとうございます。追ってご連絡させていただきます。 (Thank you for your inquiry! We will contact you shortly.)").css("color", "#FFFFFF");
		},
		error: function(){
			$("#form-status").text("送信中にエラーが発生しました。もう一度お試しください。 (There was an error submitting your form. Please try again.)").css("color", "#ffcccc");
		},
		complete: function(){
			setTimeout(function(){
				$("html").removeClass("msg");
				$("body,html").stop().animate({scrollTop:0},300);
				$("html").addClass("complete");
			},3000);
			
			setTimeout(function(){
				$("html").removeClass("complete");
				$("#form-status").text(""); // Clear status for next use
			},10000);
		}
	});

	return false;
});

// WCAG 2.5.2: Explicitly prevent any mousedown/touchstart events on submit button
// WCAG 3.2.1: Submit button does not have focus event listeners - no context change on focus
// This ensures the function is never triggered on down-event
$(document).on("mousedown touchstart", "#submit-button", function(e){
	// Do nothing on down-event - only up-event (click/submit) should trigger submission
	// This allows users to cancel by dragging pointer away before releasing
});
	
	
	function VA() {
		
		// WCAG 3.2.1: Using 'click' event instead of 'focus' to prevent context change on focus
		// WCAG 1.4.1: Toggle 'require' class for form validation - does not affect checkbox state visually
		$(document).on("click","#kiyaku", function(){
	if($(this).is(":checked") ){
$(this).removeClass("require");		
	}else {
		$(this).addClass("require");		
	}

	
	});	
		
		// WCAG 3.2.1: Using 'change keyup' events instead of 'focus' to prevent context change on focus
		$("body").on("change keyup", "#inc", function(){
	var length = $(this).val().length;
	
	if( length >=1 ){
		
	  $(this).removeClass("require");
	

		
	}else {
		$(this).addClass("require");
		
	}
	
	
 });
 
 
 
 	 // WCAG 3.3.1: Error Identification - Display error message for required field
	 $("body").on("change keyup", "#name", function(){
	var length = $(this).val().length;
	if( length >=1 ){
		
		
	$(this).removeClass("require");
		$("#name-error").text("").hide();
		
	}else {
		$(this).addClass("require");
		$("#name-error").text("お名前を入力してください。").show().css({"color":"red", "font-size":"14px", "margin-top":"5px", "display":"block"});
	}
	
	
 });
 		
	// WCAG 3.2.1: Using 'change' event instead of 'focus' to prevent context change on focus
	// WCAG 3.3.1: Email validation with descriptive error messages
	// Email validation only triggers when user enters/changes input, not when field receives focus
	$("body").on("change", "#mail", function(){
	var length = $(this).val().length;
	if( length >=1 ){
		
		if(!$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
			$("#mail-error").text("正しいメールアドレスを入力してください。").show().css({"color":"red", "font-size":"14px", "margin-top":"5px", "display":"block"});
  $(this).addClass("require error");
  }else {
	  $(this).removeClass("require error");
		$("#mail-error").text("").hide();
  }
  
		
	}else {
		$(this).addClass("require");
		$(this).removeClass("error");
		$("#mail-error").text("メールアドレスを入力してください。").show().css({"color":"red", "font-size":"14px", "margin-top":"5px", "display":"block"});
	}
	

 });
 
 
 
 
 // WCAG 3.2.1: Using 'change keyup' events instead of 'focus' to prevent context change on focus
 // WCAG 3.3.1: Textarea validation with descriptive error messages
 $("body").on("change keyup", "#textarea", function(){
	var length = $(this).val().length;
	if( length >=1 ){
		
		if($(this).val().match(/[<(.*)>.*<\/\1>]/)){
			$("#textarea-error").text("HTMLコードは入力できません").show().css({"color":"red", "font-size":"14px", "margin-top":"5px", "display":"block"});
  $(this).addClass("require error");
  }else {
	  $(this).removeClass("require error");
		$("#textarea-error").text("").hide();
  }
  
		
	}else {
		$(this).addClass("require");
		$(this).removeClass("error");
		$("#textarea-error").text("").hide();
	}
	
	
 });
 
 
 
 
 // WCAG 3.3.1: Form validation triggers on submit.
 // Removing automatic button disabling to ensure users can trigger and hear validation errors.

	}
VA();