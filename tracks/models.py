from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Track(models.Model):
    title = models.CharField(max_length=50)
    albumTitle = models.CharField(max_length=50)
    artistTitle = models.CharField(max_length=50)
    description = models.TextField()
    genre = models.CharField(max_length=30)
    audioSrc = models.URLField()
    albumCoverSrc = models.URLField()
    trackTimeMins = models.IntegerField(default=0)
    trackTimeSecs = models.IntegerField(default=0)
    trackNumber = models.IntegerField(default=1)
    # allows to connect different models, use this for comments
    # first arg to, second arg null
    posted_by = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)

class Like(models.Model):
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)
    track = models.ForeignKey('tracks.Track', related_name='likes', on_delete=models.CASCADE)

class Shared(models.Model):
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)
    track = models.ForeignKey('tracks.Track', related_name="shared", on_delete=models.CASCADE)
    

class Comment(models.Model):
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)
    track = models.ForeignKey('tracks.Track', related_name="comments", on_delete=models.CASCADE)
    commentText = models.TextField()
