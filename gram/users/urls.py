from django.urls import path
from . import views


app_name = "users"
urlpatterns = [
    path("explore/", view=views.ExploreUsers.as_view(), name="explore_users"),
    path("<int:user_id>/follow/", view=views.FollowUsers.as_view(), name="follow_users"),
    path("<int:user_id>/unfollow/", view=views.UnFollowUsers.as_view(), name="follow_users"),
    path("<str:username>/profile/", view=views.UserProfile.as_view(), name="user_profile")
]
