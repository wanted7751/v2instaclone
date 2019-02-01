from rest_framework.views import APIView
from rest_framework.response import Response
from . import models, serializers

 

class ListAllImage(APIView):

    def get(self, request, format=None):
        #request 는 클라이언트에게 오브젝트를 요청하는 것 이다. 
        #format 은 json, xml 이 될 수 있는대 디폴트로 none으로 지정하였다. 
        #none처럼 지정되지 않았으면 json 포멧으로 응답한다. 
        
        all_images = models.Image.objects.all()
        #현재는 파이썬 오브젝트라서 브라우저가 이해를 하지 못한다. 
        #장고의 Image테이블을 갖고온다. 

        serializer = serializers.ImageSerializer(all_images, many=True)
        #많은 이미지를 ImageSerializer 하니 many=True를 함으로써 많은 사진을 시리얼 한다는걸 명시
        #serializer한 ImageSerializer를 갖고온다. 

        return Response(data=serializer.data)
        #위에서 브라우저는 request 하고 우리는 return 으로 response를 한다. 
        #보다시피 http response이고 멋진 method를 갖고있다. 


class ListAllComments(APIView):

    def get(self, request, format=None):

        all_comments = models.Comment.objects.all()
        
        serializer = serializers.CommentSerializer(all_comments, many=True)

        return Response(data=serializer.data)


class ListAllLikes(APIView):

    def get(self, request, format=None):

        all_likes = models.Like.objects.all()

        serializer = serializers.LikeSerializer(all_likes, many=True)

        return Response(data=serializer.data)

