$(document).ajaxSuccess(function(event, xhr, settings) {
	try{
		// Status 206 (Partial Content) indicates that the partial HTML string
		// are returned as the ajax result, we need avoid to parseJSON against
		// the HTML string.
		if(xhr.status != 206){
			var result = $.parseJSON(xhr.responseText);
			if(result && result.hasOwnProperty('code') &&
					result.hasOwnProperty('message') &&
					result.hasOwnProperty('data')){
				if(result.code === 'VALIDATION_ERROR'){
					if(result && result.formId){
						var errors = {};
						/*if((obj.generalError || []).length !=0){
							$('#' + obj.formId).find('.general-error').show().text(
									(obj.generalError || []).join(','));
						}*/
						if(result.fieldErrors){
							$('#' + result.formId).find('input,textarea,select,div[data-error-prop="true"],.file-upload')
							.each(function(){
								var prop = $(this).attr('data-error-field') || $(this).attr('name');
								if(prop && result.fieldErrors.hasOwnProperty(prop)){
									errors[prop] = result.fieldErrors[prop];
								}
							});
							$('#' + result.formId).validate().showErrors(errors);
							//fix bug of nicescroll
							$(window).trigger("resize");
						}
					}
				}else if(result.code === 'REDIRECT'){
					util.redirect(result.data);
				}
			}
		}
	}catch(Error){
		alert('error');
	}
});