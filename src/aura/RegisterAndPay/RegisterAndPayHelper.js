({
	regCustomer : function(cmp, firstName, lastName, email, ccNumber, expMonth, expYear, amount, imgData, eventId, ticketId) {
		var params = {
			firstName : firstName,
			lastName : lastName,
			email : email,
			ccNumber : ccNumber,
			expMonth : expMonth,
			expYear : expYear,
			amount : amount,
			imgData : imgData,
			eventId : eventId,
			ticketId : ticketId
		};

		console.log(params);

		var action = cmp.get('c.regCustomer');
		action.setParams(params);

		action.setCallback(this, function(res) {
			if (res.getState() != 'SUCCESS') {
				console.log('error', res.getError()[0].message);
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

	chargePM: function(cmp, pmId) {
		var action = cmp.get('c.chargePM');
		action.setParams({pmId : pmId});
		action.setCallback(this, function(res) {
			console.log('muuuu');
			if (res.getState() != 'SUCCESS') {
				console.log('error in chargepm', res.getError()[0].message );
				return;
			}

			console.log('charge is done');
		});
		$A.enqueueAction(action);
		console.log('chargePm is fired');
	},

	registerSuccess: function(cmp, pmId) {

		var that = this;
		console.log('pm id: ', pmId);
		setTimeout($A.getCallback(function() {
					console.log('timeout fired!');
					if (cmp.isValid()) {
						console.log('timeouted fired');
						that.chargePM(cmp, pmId);
					}
				}), 4000);
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
		this.wipeAll(cmp);
		this.hideAll(cmp);
		$A.util.removeClass(cmp.find('successForm'), 'hide');		
	},

	wipeAll : function(cmp) {
		var toWipe = ['firstName', 'lastName', 'email', 'ccNumber', 'expMonth', 'expYear', 'eventSelector', 'ticketSelector'];
		toWipe.forEach(function(e) {
			cmp.find(e).set('v.value', null);
		});
	},

	showEventsForm: function(cmp) {
		this.hideAll(cmp);
		$A.util.removeClass(cmp.find('eventForm'), 'hide');		
	}

})