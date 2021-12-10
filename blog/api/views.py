from rest_framework import generics
from rest_framework.authentication import SessionAuthentication

from blog.api.serializers import PostSerializer, UserSerializer
from blog.api.permissions import AuthorModifyOrReadOnly, IsAdminUserForObject
from blog.models import Post
from blango_auth.models import User


class PostList(generics.ListCreateAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  #authentication_classes = [SessionAuthentication]
  
  
  
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  permission_classes = [AuthorModifyOrReadOnly | IsAdminUserForObject]


class UserDetail(generics.RetrieveAPIView):
  lookup_field = 'email'
  queryset = User.objects.all()
  serializer_class = UserSerializer