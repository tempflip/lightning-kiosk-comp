({
	regCustomer : function(cmp, firstName, lastName, email, ccNumber, imgData) {
		var params = {
			firstName : firstName,
			lastName : lastName,
			email : email,
			ccNumber : ccNumber,
			imgData : imgData
		};

		console.log(params);

		var action = cmp.get('c.regCustomer');
		action.setParams(params);

		action.setCallback(this, function(res) {
			console.log('callback');
			if (res.getState() != 'SUCCESS') {
				console.log('error', res.getError());
				return;
			}
			this.registerSuccess(cmp, res.getReturnValue());
		});
		$A.enqueueAction(action);
	},

	registerSuccess: function(cmp, cus) {
		console.log('juuhuuu', cus.Id);
	}

	
})