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
		String amount, 
		String imgData) {

		Contact c = new Contact(
			FirstName = firstName,
			LastName = lastName,
			Email = email
		);
		insert c;


		Attachment att = new Attachment(
			Name = 'Photo-' + firstName + '_' + lastName + '.png',
			Body = EncodingUtil.base64Decode(imgData.split('base64,')[1]),
			ParentId = c.Id,
			Description = 'Customer Photo'
		);
		insert att;

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