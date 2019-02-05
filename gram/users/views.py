from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status


class ExploreUsers(APIView):

    def get(self, request, fotmat=None):

        last_five = models.User.objects.all().order_by('-date_joined')[:5]

        serializer = serializers.ExploreUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class FollowUsers(APIView):
    
    def post(self, request, user_id, format=None):
            
            user = request.user

            try: 
                user_to_follow = models.User.objects.get(id=user_id)
            except models.User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            user.following.add(user_to_follow)
            user_to_follow.followers.add(user)

            user.save()
            user_to_follow.save()

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


