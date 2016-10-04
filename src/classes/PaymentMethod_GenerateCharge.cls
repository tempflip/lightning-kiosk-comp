public with sharing class PaymentMethod_GenerateCharge {
	public PaymentMethod_GenerateCharge() {
		
	}

	public void execute(bt_stripe__Payment_Method__c[] pmList) {
		bt_stripe__Transaction__c[] toInsert = new bt_stripe__Transaction__c[]{};
		bt_stripe__Payment_Method__c[] pmTpUpdate = new bt_stripe__Payment_Method__c[]{};

		for (bt_stripe__Payment_Method__c pm : pmList) {
			system.debug('### aha ' + pm);
			if ( !(pm.bt_stripe__Card_Id__c != null && trigger.oldMap.get(pm.Id).get('bt_stripe__Card_Id__c') == null && pm.Original_Purchase__c != null)) continue;
			system.debug('### viiii!');
			bt_events__Ticket_Purchase__c tp = [SELECT bt_events__Purchase_Price__c
												FROM bt_events__Ticket_Purchase__c
												WHERE Id = :pm.Original_Purchase__c];

			toInsert.add(new bt_stripe__Transaction__c(
				bt_stripe__Payment_Method__c = pm.Id,
				bt_stripe__Amount__c = tp.bt_events__Purchase_Price__c,
				Ticket_Purchase__c = tp.Id
			));
			//pmTpUpdate.add(new bt_stripe__Payment_Method__c(Id = pm.Id, Original_Purchase__c = null));
		}

		insert toInsert;
		//update pmTpUpdate;
	}


}