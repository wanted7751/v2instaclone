from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status
from gram.notifications import views as notification_views
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView



class ExploreUsers(APIView):

    def get(self, request, fotmat=None):

        last_five = models.User.objects.all().order_by('-date_joined')[:5]

        serializer = serializers.ListUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FollowUsers(APIView):
    
    def post(self, request, user_id, format=None):
            
            user = request.user

            # follow notification


            try: 
                user_to_follow = models.User.objects.get(id=user_id)
            except models.User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            user.following.add(user_to_follow)
            user_to_follow.followers.add(user)

            user.save()
            user_to_follow.save()

            notification_views.create_notification(user, user_to_follow, 'follow')

            return Response(status=status.HTTP_200_OK)

class UnFollowUsers(APIView):
    
    def post(self, request, user_id, format=None):
            
            user = request.user

            try: 
                user_to_follow = models.User.objects.get(id=user_id)
            except models.User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            user.following.remove(user_to_follow)
            user_to_follow.followers.remove(user)

            user.save()
            user_to_follow.save()

            return Response(status=status.HTTP_200_OK)


class UserProfile(APIView):

    def get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None

    def get(self, request, username, format=None):

        found_user = self.get_user(username)

        if found_user is None:

            return Response(status = status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):

        user = request.user

        found_user = self.get_user(username)

        if found_user is None:

            return Response(status = status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username:

            return Response(status = status.HTTP_401_UNAUTHORIZED)
        
        else:

            serializer = serializers.UserProfileSerializer(found_user, data=request.data, partial=True)

            if serializer.is_valid():
                #사용자가 보낸 정보가 있다면 is_valid 로 체크한다. 
                serializer.save()

                return Response(data=serializer.data, status=status.HTTP_200_OK)

            else:

                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

        
        

class UserFollowers(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
            
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_user.followers.all()
        # 일단 유저를 찾고 그 유저의 팔로워들을 불러온다. 

        serializer = serializers.ListUserSerializer(user_followers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserFollowing(APIView):
    
    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
            
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.following.all()
        # 일단 유저를 찾고 그 유저의 팔로워들을 불러온다. 

        serializer = serializers.ListUserSerializer(user_following, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)



class Search(APIView):
    
    def get(self, request, format=None):

        username = request.query_params.get("username", None)

        

        # print(type(username))

        if username is not None:

            users = models.User.objects.filter(username__istartswith=username)

            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
        
        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)



class ChangePassword(APIView):

    def put(self, request, username, format=None):

        user = request.user

        if user.username == username:

            current_password = request.data.get('current_password', None)
            #dictionary구문
            #현재 비번이 request.data를 통해 들어오는지 체크. 


            if current_password is not None:

                password_match = user.check_password(current_password)
                #들어온다면 들어온 비번과 현재 비번이 같은지 체크

                if password_match:
                    #만약 트루를 리턴하면

                    new_password = request.data.get("new_password", None)
                        #뉴패스워드를 갖고
                    if new_password is not None:

                        user.set_password(new_password)
                        #뉴패스워드를 유저의 새로운 비번으로 변경해준다. 
                        user.save()
                        #저장.
                        return Response(status=status.HTTP_200_OK)

                    else:
                        
                        return Response(status=status.HTTP_400_BAD_REQUEST)

                else:
                    
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            
            else:
                
                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:

            return Response(status=status.HTTP_401_UNAUTHORIZED)



class FacebookLogin(SocialLoginView):
    
    adapter_class = FacebookOAuth2Adapter