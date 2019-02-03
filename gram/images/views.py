from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers
from rest_framework import status

 

class Feed(APIView):

    def get(self, request, format=None):

        user = request.user  

        following_users = user.following.all()

        image_list = []

        for following_user in following_users:

            user_images = following_user.images.all()

            for image in user_images:

                image_list.append(image)
                # 이렇게 각각의 사진들을 불러와서 큰 사진첩에 다시 넣어줘야 섞이게된다. 
                # 그러나 순서대로 되지만 각 user가 넣은 순서대로 된다. 예를들어
                # 니콜1, 니콜2, 린1,린2 이런순서대로 되니 코드를 수정해줘야한다. 
                

        # sorted_list = sorted(image_list, key=get_key, reverse=True)
        sorted_list = sorted(image_list, key=lambda image: image.created_at, reverse=True)
        print(sorted_list)

        serializer = serializers.ImageSerializer(sorted_list, many=True)

        return Response(data=serializer.data)

# def get_key(image):
#     return image.created_at


class LikeImage(APIView):

    def get(self, request, image_id, format=None):

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
            preexisting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.Like.DoesNotExist:

            new_like = models.Like.objects.create(
                creator = user,
                image = found_image
            )

            new_like.save()
            
            return Response(status=status.HTTP_201_CREATED)
