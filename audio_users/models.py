from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    #username = models.CharField(max_length=100, blank=True, null=True)
    profile_pic = models.URLField(default="https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    #password = models.CharField(max_length=150)
    description = models.TextField()
    fav_song = models.CharField(max_length=50)
    fav_artist = models.CharField(max_length=50)
    fav_genre = models.CharField(max_length=30)
    email = models.EmailField(max_length=200)
    #joined = models.DateTimeField(auto_now_add=True)