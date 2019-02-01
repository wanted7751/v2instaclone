from rest_framework import serializers
from . import models

# 현재 여기선 1-29 노션 에서 언급하다시피 meta를 함으로써 참고로 만든것이며
# 파이썬의 obejct를 json 화 시키는 단계 이다. 여기선 serializer만 하며 
# views 에서 직접 json 화 시킨다. 여기서는 meta 참고만 하는 방식 작성

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = '__all__'
        #이미지 테이블의 전체 필드를 가져온다는 의미 
        #일부만 가져올 수도 있다. 
        #fields=['file','created_at'] 이런식으로. 
        #class PotatoSerializer(serializers.Serializer)
        #라고 적어도 된다. 

class CommentSerializer(serializers.ModelSerializer):

    image = ImageSerializer()

    class Meta:
        model=models.Comment
        fields='__all__'


class LikeSerializer(serializers.ModelSerializer):

    
    image = ImageSerializer()


    class Meta:
        model=models.Like
        fields='__all__'