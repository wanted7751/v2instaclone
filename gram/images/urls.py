# from django.conf.urls import url
from django.urls import path
from . import views


app_name = "images"
urlpatterns = [
    path("all/", view=views.ListAllImage.as_view(), name="all_images"),
    #매칭을 한단어로 하고 싶다면 ~redirect로 하면 된다. 
    path("comments/", view=views.ListAllComments.as_view(), name="all_comments"),
    path("likes/", view=views.ListAllLikes.as_view(), name="all_likes"),
]

