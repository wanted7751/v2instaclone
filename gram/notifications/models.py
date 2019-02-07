from django.db import models
from gram.users import models as user_models
from gram.images import models as image_models


class Notification(image_models.TimeStampedModel):

    TYPE_CHOICES = (
        ('like', "Like"),
        ('comment', "Comment"),
        ('follow', "Follow")


        #첫번째는 어드민 패널
        #두번째는 데이터베이스를 위해서 쓰는 것 
    )

    creator = models.ForeignKey(user_models.User,  on_delete=models.CASCADE, null=True, related_name='creator')
    to = models.ForeignKey(user_models.User,  on_delete=models.CASCADE, null=True, related_name='to')
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    #그냥 type 할경우 python method?  이기 때문에 custom 해줘야한다. notification_type 이런식으로
    image = models.ForeignKey(image_models.Image,  on_delete=models.CASCADE, related_name='images', null=True, blank=True)
    comment = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
    

    def __str__(self):
        return "From: {} - To: {}".format(self.creator, self.to)




