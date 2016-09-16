({
	regCustomer : function(cmp, firstName, lastName, email, ccNumber, expMonth, expYear, amount, imgData) {
		var params = {
			firstName : firstName,
			lastName : lastName,
			email : email,
			ccNumber : ccNumber,
			expMonth : expMonth,
			expYear : expYear,
			amount : amount,
			imgData : imgData
		};

		console.log(params);

		var action = cmp.get('c.regCustomer');
		action.setParams(params);

		action.setCallback(this, function(res) {
			if (res.getState() != 'SUCCESS') {
				console.log('error', res.getError());
				return;
			}
			this.registerSuccess(cmp, res.getReturnValue());
		});
		$A.enqueueAction(action);
	},

	getEventList : function(cmp) {
		var action = cmp.get('c.getEventList');
		action.setCallback(this, function(res) {
			if (res.getState() != 'SUCCESS') {
				console.log('error', res.getError()[0].message );
				return;
			}

			this.setEventsAndTickets(cmp, res.getReturnValue());			
		});

		$A.enqueueAction(action);
	},

	registerSuccess: function(cmp, cus) {
		console.log('juuhuuu', cus.Id);
		this.showSuccess(cmp);
	},

	setEventsAndTickets: function(cmp, eventList) {
		cmp.set('v.eventList', eventList);
	},

	getTicketsForEv: function(cmp, evId) {
		var evList = cmp.get('v.eventList');
		evList.forEach(function(e) {
			if (e.Id == evId) {
				cmp.set('v.ticketList', e.bt_events__Event_Tickets__r);
			}
		});

	},

	setPrice: function(cmp, ticketId) {
		var that = this;
		cmp.get('v.ticketList').forEach(function(e) {
			console.log(e.Id, e.Id);
			if (e.Id == ticketId) {
				cmp.set('v.ticketPrice', e.bt_events__Ticket_Price__c);
				that.hideAll(cmp);
			}
		});

	},

	hideAll: function(cmp) {
		$A.util.addClass(cmp.find('eventForm'), 'hide');
		$A.util.addClass(cmp.find('ccForm'), 'hide');		
		$A.util.addClass(cmp.find('successForm'), 'hide');
	},

	showCam: function(cmp) {
		console.log('### showCam');
	},

	showCCForm: function(cmp) {
		this.hideAll(cmp);
		$A.util.removeClass(cmp.find('ccForm'), 'hide');
	},

	showSuccess: function(cmp) {
		this.hideAll(cmp);
		$A.util.removeClass(cmp.find('successForm'), 'hide');		
	},

	showEventsForm: function(cmp) {
		this.hideAll(cmp);
		$A.util.removeClass(cmp.find('eventForm'), 'hide');		
	}

})