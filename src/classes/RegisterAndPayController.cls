public with sharing class RegisterAndPayController {
	public RegisterAndPayController() {
		
	}

	@AuraEnabled
	public static Contact regCustomer(
		String firstName, 
		String lastName, 
		String email, 
		String ccNumber, 
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
}