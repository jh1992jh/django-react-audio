import graphene
from graphene_django import DjangoObjectType

from .models import Track, Like, Shared, Comment
from audio_users.schema import UserType

class TrackType(DjangoObjectType):
    class Meta:
        model = Track
    
class LikeType(DjangoObjectType):
    class Meta:
        model = Like

class SharedType(DjangoObjectType):
    class Meta:
        model = Shared

class CommentType(DjangoObjectType):
    class Meta:
        model = Comment
    
    
class Query(graphene.ObjectType):
    # To get all of our tracks as a list
    tracks = graphene.List(TrackType)
    likes = graphene.List(LikeType)
    shared = graphene.List(SharedType)
    comment = graphene.List(CommentType)


    def resolve_tracks(self, info):
        return Track.objects.all()

    def resolve_likes(self, info):
        return Like.objects.all()
    
    def resolve_shared(self, info):
        return Shared.objects.all()
    
    def resolve_comment(self, info):
        return Comment.objects.all()

class CreateTrack(graphene.Mutation):
    track = graphene.Field(TrackType)
    
    class Arguments:
        title = graphene.String(required=True)
        albumTitle = graphene.String(required=True)
        artistTitle = graphene.String(required=True)
        description = graphene.String(required=True)
        genre = graphene.String(required=True)
        audioSrc = graphene.String(required=True)
        albumCoverSrc = graphene.String(required=True)
        trackTimeMins = graphene.Int()
        trackTimeSecs = graphene.Int()

        trackNumber = graphene.Int()
    
    def mutate(self, info, title, albumTitle, artistTitle, description, genre, audioSrc, albumCoverSrc, trackTimeMins, trackTimeSecs, trackNumber):
        user = info.context.user

        if user.is_anonymous: 
            raise Exception('Log in to add a track')

        track = Track(title=title, posted_by=user, albumTitle=albumTitle, artistTitle=artistTitle, description=description, genre=genre, audioSrc=audioSrc, albumCoverSrc=albumCoverSrc, trackTimeMins=trackTimeMins, trackTimeSecs=trackTimeSecs, trackNumber=trackNumber)
        track.save()
        return CreateTrack(track=track)

class DeleteTrack(graphene.Mutation):
    track_id = graphene.Int()

    class Arguments:
        track_id = graphene.Int(required=True)
    
    def mutate(self,info, track_id):
        user = info.context.user
        # Think as findBy in mongoDB
        track = Track.objects.get(id=track_id)

       # if track.posted_by != user:
       #  raise Exception('Not permitted to delete this track')
        
        track.delete()

        return DeleteTrack(track_id=track_id)

class CreateLike(graphene.Mutation):
    user = graphene.Field(UserType)
    track = graphene.Field(TrackType)

    class Arguments:
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id):
        user = info.context.user 
        
        if user.is_anonymous:
            raise Exception('Login to like tracks')
        
        track = Track.objects.get(id=track_id)

        if not track:
            raise Exception('No track found with that id')
        
        Like.objects.create(
            user=user,
            track=track
        )

        return CreateLike(user=user, track=track)

class ShareTrack(graphene.Mutation):
    user = graphene.Field(UserType)
    track = graphene.Field(TrackType)

    class Arguments:
        track_id = graphene.Int(required=True)
    
    def mutate(self, info, track_id):
        user = info.context.user

        if user.is_anonymous:
            raise Exception('Login to share a track')
        
        track = Track.objects.get(id=track_id)

        if not Track:
            raise Exception('No track found with that id')
        
        Shared.objects.create(
            user=user,
            track=track
        )

        return ShareTrack(user=user, track=track)


class CommentTrack(graphene.Mutation):
    comment = graphene.Field(CommentType)
   
    

    class Arguments:
        track_id = graphene.Int(required=True)
        commentText = graphene.String(required=True)
    
    def mutate(self, info, track_id, commentText):
        user = info.context.user

        if user.is_anonymous:
            raise Exception('Login to add a comment')
        
        track = Track.objects.get(id=track_id)
        if not Track:
            raise Exception('No track found with that id')
        
        comment = Comment.objects.create(
            user=user,
            track=track,
            commentText=commentText
        )

        return CommentTrack(comment)

class DeleteComment(graphene.Mutation):
    comment_id = graphene.Int()

    class Arguments:
        comment_id = graphene.Int(required=True)

    def mutate(self, info, comment_id):
        user = info.context.user
        comment = Comment.objects.get(id=comment_id)

        if comment.user != user:
            raise Exception('Not permitteed to do that')
        
        comment.delete()

        return DeleteComment(comment_id=comment_id)

class UnshareTrack(graphene.Mutation):
    sharedTrack_id = graphene.Int()

    class Arguments: 
        sharedTrack_id = graphene.Int(required=True)
    
    def mutate(self, info, sharedTrack_id):
        user = info.context.user
        sharedTrack = Shared.objects.get(id=sharedTrack_id)

        if sharedTrack.user != user:
            raise Exception('Not permitted to do that')
        
        sharedTrack.delete()

        return UnshareTrack(sharedTrack_id=sharedTrack_id)
    

class Mutation(graphene.ObjectType):
    create_track = CreateTrack.Field()
    delete_track = DeleteTrack.Field()
    create_like = CreateLike.Field()
    share_track = ShareTrack.Field()
    comment_track = CommentTrack.Field()
    delete_comment = DeleteComment.Field()
    unshare_track = UnshareTrack.Field()