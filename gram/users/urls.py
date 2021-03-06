from django.urls import path
from . import views


app_name = "users"
urlpatterns = [
    path("explore/", view=views.ExploreUsers.as_view(), name="explore_users"),
    path("<int:user_id>/follow/", view=views.FollowUsers.as_view(), name="follow_users"),
    path("<int:user_id>/unfollow/", view=views.UnFollowUsers.as_view(), name="follow_users"),
    path("search/", view=views.Search.as_view(), name="search"),
    path("<str:username>/followers/", view=views.UserFollowers.as_view(), name="user_followers"),
    path("<str:username>/following/", view=views.UserFollowing.as_view(), name="user_following"),
    path("<str:username>/", view=views.UserProfile.as_view(), name="user_profile"),
    path("<str:username>/password/", view=views.ChangePassword.as_view(), name="change"),
    path('login/facebook/', view= views.FacebookLogin.as_view(), name='fb_login'),


]
