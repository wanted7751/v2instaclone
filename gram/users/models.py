from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class User(AbstractUser):

    """"User Model"""

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('not-specified','Not specified')
    )

    # First Name and Last Name do not cover name patterns
    # around the globe.
    profile_image=models.ImageField(null=True, blank=True)
    name = CharField(_("Name of User"), blank=True, max_length=255)
    website = models.URLField(null=True)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=140, null=True)
    gender = models.CharField(max_length=140, choices=GENDER_CHOICES, null=True)
    followers = models.ManyToManyField("self", blank=True, symmetrical=False, related_name ='followers_user_name')
    following = models.ManyToManyField("self", blank=True, symmetrical=False, related_name ='following_user_name')

    # def get_absolute_url(self):
    #     return reverse("users:detail", kwargs={"username": self.username})

    @property
    def post_count(self):
        return self.images.all().count()

    @property
    def followers_count(self):
        # return self.followers_user_name.all().count()
        return self.followers.all().count()

    @property
    def following_count(self):
        # return self.following_user_name.all().count()
        return self.following.all().count()
