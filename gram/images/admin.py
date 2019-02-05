from django.contrib import admin
from . import models


# Register your models here.


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    
    def get_queryset(self, request):
        return super(ImageAdmin, self).get_queryset(request).prefetch_related('tags')

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())


    list_display_links=(
        'location',
        
    )

    search_fields = (
        'location',
        'caption'
    )

    list_filter=(
        'location',
    )
    
    list_display=(
        'file',
        'location',
        'caption',
        'creator',
        'created_at',
        'updated_at',
        'tag_list'
    )

     

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    
    list_display=(
        'creator',
        'image',
        'created_at',
        'updated_at'
    )

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    
    list_display=(
        'message',
        'creator',
        'image',
        'created_at',
        'updated_at'
    )


