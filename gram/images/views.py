from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status
from gram.notifications import views as notification_views
from gram.users import models as user_models
from gram.users import serializers as user_serializers


class Feed(APIView):

    def get(self, request, format=None):

        user = request.user  

        following_users = user.following.all()

        image_list = []

        for following_user in following_users:

            user_images = following_user.images.all()[:1]

            for image in user_images:

                image_list.append(image)
                # 이렇게 각각의 사진들을 불러와서 큰 사진첩에 다시 넣어줘야 섞이게된다. 
                # 그러나 순서대로 되지만 각 user가 넣은 순서대로 된다. 예를들어
                # 니콜1, 니콜2, 린1,린2 이런순서대로 되니 코드를 수정해줘야한다. 
                

        my_images = user.images.all()[:1]

        for image in my_images:

            image_list.append(image)


        # sorted_list = sorted(image_list, key=get_key, reverse=True)
        sorted_list = sorted(image_list, key=lambda image: image.created_at, reverse=True)
        print(sorted_list)

        serializer = serializers.ImageSerializer(sorted_list, many=True)

        return Response(data=serializer.data)

# def get_key(image):
#     return image.created_at


class LikeImage(APIView):

    def get(self, request, image_id, format=None):

        likes = models.Like.objects.filter(image__id = image_id)

        #image__id 이 뜻은 id가 이미지 오브젝트 안에 있다는 의미
        #url 에서 해당 이미지 id의 좋아요를 한사람의 유저를 모두 갖고온다. 
        # print(likes)
        # print(likes.values(''))

        # users = user_models.Users.objects.filter()
        
        # print(likes.values('creator_id'))

        like_creators_ids = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=like_creators_ids)

        # print(users)

        serializer =  user_serializers.ListUserSerializer(users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

        # serializer = serializers.ListLikeSerializer(likes, many=True)

        # return Response(data=serializer.data, status=status.HTTP_200_OK)
        

    def post(self, request, image_id, format=None):

        user = request.user

        # print(image_id)
        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)

        try: 
            preexisting_like = models.Like.objects.get(
                creator = user,
                image = found_image
            )
            # preexisting_like.delete()

            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
                creator = user,
                image = found_image
            )

            notification_views.create_notification(user, found_image.creator, 'like', found_image)

            new_like.save()

            
            return Response(status=status.HTTP_201_CREATED)

class UnLikeImage(APIView):

    def delete(self, request, image_id, format=None):

        user = request.user

        try:
            preexisiting_like = models.Like.objects.get(
                creator=user,
                image=image_id
            )
            preexisiting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:

            return Response(status=status.HTTP_304_NOT_MODIFIED)
       


class CommentOnImage(APIView):

    def post(self, request, image_id, format=None):

        user = request.user

        try:
            found_image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():
          
            serializer.save(creator=user, image=found_image)

            notification_views.create_notification(user, found_image.creator, 'comment', found_image, serializer.data['message'])
            # notification_views.create_notification(user, found_image.creator, 'comment', found_image, request.data['message'])
            # 주석과 같이 작성하여도 무방하지만 위에것이더 good.

            # print(serializer.data.message)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status = status.HTTP_400_BAD_REQUEST)


class Comment(APIView):

    def delete(self, request, comment_id, format=None):

        user = request.user

        try:
            comment = models.Comment.objects.get(id=comment_id, creator=user)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class Search(APIView):
    
    def get(self, request, format=None):

        hashtags = request.query_params.get("hashtags", None)

        if hashtags is not None:

            # hashtags = request.query_params

            hashtags = hashtags.split(",")

            # print(hashtags)
            images = models.Image.objects.filter(tags__name__in= hashtags).distinct()

            serializer = serializers.CountImageSerializer(images, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)




class ModerateComments(APIView):

    def delete(self, request, image_id, comment_id, format=None):

        user = request.user

        # try: 
        #     image = models.Image.objects.get(id=image_id, creator=user)
        # except models.Image.DoesNotExist:
        #     return Response(status=status.HTTP_404_NOT_FOUND)

        try: 
            comment_to_delete = models.Comment.objects.get(
                id=comment_id, image__id=image_id, image__creator=user)
            comment_to_delete.delete()
        except models.Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)


class ImageDetail(APIView):

    def get(self, request, image_id, format=None):

        # user =request.user

        try:
            image = models.Image.objects.get(id=image_id)
        except models.Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ImageSerializer(image)
        # serializer = serializers.ImageSerializer(image, many=True)
        # many=True 를 안하는 이유는 serializer가 many가 아니기 때문인듯 하다. 

        return Response(data=serializer.data, status=status.HTTP_200_OK)