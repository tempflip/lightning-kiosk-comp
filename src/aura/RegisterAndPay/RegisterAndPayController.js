({
	onRegButtonPress : function(cmp, event, helper) {
		console.log('hallll');
		var firstName = cmp.find('firstName').get('v.value');
		var lastName = cmp.find('lastName').get('v.value');
		var email = cmp.find('email').get('v.value');
		var ccNumber = cmp.find('ccNumber').get('v.value');

		var imgData = cmp.find('imgData').getElement().value;
		
		helper.regCustomer(cmp, firstName, lastName, email, ccNumber, imgData);
	}


})