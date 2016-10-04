({
	doInit: function(cmp, event, helper) {
		helper.getEventList(cmp);
	},

	onRegButtonPress : function(cmp, event, helper) {
		var firstName = cmp.find('firstName').get('v.value');
		var lastName = cmp.find('lastName').get('v.value');
		var email = cmp.find('email').get('v.value');
		var ccNumber = cmp.find('ccNumber').get('v.value');
		var expMonth = cmp.find('expMonth').get('v.value');
		var expYear = cmp.find('expYear').get('v.value');
		var amount = cmp.get('v.ticketPrice');
		var eventId = cmp.find('eventSelector').get('v.value');
		var ticketId = cmp.find('ticketSelector').get('v.value');

		var imgData = cmp.find('imgData').getElement().value;
		
		helper.regCustomer(cmp, firstName, lastName, email, ccNumber, expMonth, expYear, amount, imgData, eventId, ticketId);
	},

	onEventChange : function(cmp, event, helper) {
		var evId = cmp.find('eventSelector').get('v.value');
		helper.getTicketsForEv(cmp, evId);
	},

	onTicketChange : function(cmp, event, helper) {
		var ticketId = cmp.find('ticketSelector').get('v.value');
		helper.showCam(cmp);
		helper.setPrice(cmp, ticketId);
	},

	showCCForm : function(cmp, event, helper) {
		helper.showCCForm(cmp);	
	},

	nextCustomer : function(cmp, event, helper) {
		helper.showEventsForm(cmp);
	}


})