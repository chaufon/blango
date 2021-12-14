import logging
from django.shortcuts import render, redirect
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers, vary_on_cookie

from blog.models import Post
from blog.forms import CommentForm

logger = logging.getLogger(__name__)


def index(request):
  posts = Post.objects.all().order_by('published_at').select_related('author').only(
    'title','content', 'summary', 'author', 'published_at', 'slug'
  )
  #posts = Post.objects.filter(published_at__lte=timezone.now()).select_related("author")
  logger.debug('Got %d posts', len(posts))
  #print(f'posts: {posts}')
  return render(request, 'blog/index.html', {'posts': posts})


def post_detail(request, slug):
  post = get_object_or_404(Post, slug=slug)
  
  if request.user.is_active:
    if request.method == "POST":
      comment_form = CommentForm(request.POST)
      
      if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.content_object = post
        comment.creator = request.user
        comment.save()
        logger.info('Created comment on Post %d for user %s', post.pk, request.user)
        return redirect(request.path_info)
    else:
      comment_form = CommentForm()
  else:
    comment_form = None

  
  return render(request, 'blog/post-detail.html', {'post': post, 'comment_form': comment_form})


def get_ip(request):
  from django.http import HttpResponse
  return HttpResponse(request.META['REMOTE_ADDR'])


def post_table(request):
  return render(request, 'blog/post-table.html')