({
	doInit : function(cmp, event, helper) {
		cmp.set('v.count', 0);
	},

	plusOne : function(cmp, event, helper) {
		helper.plusOne(cmp);

		console.log(cmp, event, helper);
	}
})