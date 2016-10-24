require('UILabel')
defineClass('BMPYihuDoctorCell', {
    awakeFromNib: function () {
    	self.super().awakeFromNib();
    	var subviews = self.contentView().subviews();
    	console.log(subviews);
    	for (var i = 0; i < subviews.count(); i++)
		{
			var subview = subviews.objectAtIndex(i);
			if (subview.isKindOfClass(UILabel.class())) {
				subview.setText("该医生在其他医院有号源，点击立即预约");
			};
		}
    },
});
