public with sharing class RegisterAndPayController {
	public RegisterAndPayController() {
		
	}

	@AuraEnabled
	public static Contact regCustomer(
		String firstName, 
		String lastName, 
		String email, 
		String ccNumber,
		String expMonth,
		String expYear,
		Decimal amount, 
		String imgData,
		String eventId,
		String ticketId) {

		Contact c = new Contact(
			FirstName = firstName,
			LastName = lastName,
			Email = email
		);
		insert c;


		Attachment attachment = new Attachment(
			Name = 'Photo-' + firstName + '_' + lastName + '.png',
			Body = EncodingUtil.base64Decode(imgData.split('base64,')[1]),
			ParentId = c.Id,
			Description = 'Customer Photo'
		);
		insert attachment;

		bt_events__Attendee__c att = new bt_events__Attendee__c(
			bt_events__Event__c = eventId,
			bt_events__Contact__c = c.Id
		);
		insert att;

		bt_events__Ticket_Purchase__c tp = new bt_events__Ticket_Purchase__c(
			bt_events__Attendee__c = att.Id,
			bt_events__Purchase_Price__c = amount,
			bt_events__Event_Ticket__c = ticketId
		);
		insert tp;
		
		bt_stripe__Payment_Method__c pm = new bt_stripe__Payment_Method__c(
			bt_stripe__Card_Number__c = ccNumber,
			bt_stripe__CVV__c = '123',
			bt_stripe__Card_Expiration_Year__c = expYear,
			bt_stripe__Card_Expiration_Month__c = expMonth,
			bt_stripe__Card_Holder_Name__c = firstName + ' ' + lastName,
			bt_stripe__Billing_Email__c = email,
			bt_stripe__Payment_Gateway__c = 'a0H5000000DW7Gx',
			bt_stripe__Contact__c = c.Id,
			Original_Purchase__c = tp.Id
		);



		insert pm;
		system.debug('+++ ' + pm);

		/*
		bt_stripe__Transaction__c tra = new bt_stripe__Transaction__c(
			bt_stripe__Payment_Method__c = pm.Id,
			bt_stripe__Amount__c = amount
		);

		insert tra;
		*/

		return c;

	}

	
	@AuraEnabled
	public static bt_events__Event__c[] getEventList() {
		bt_events__Event__c[] evList = [SELECT Name
										, (SELECT Name,
											bt_events__Ticket_Price__c
											FROM bt_events__Event_Tickets__r)
										FROM bt_events__Event__c];

		return evList;
	}

}