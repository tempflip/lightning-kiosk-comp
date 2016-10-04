trigger PaymentMethod on bt_stripe__Payment_Method__c (after update) {
	new PaymentMethod_GenerateCharge().execute(trigger.new);
}