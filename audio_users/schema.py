from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class Query(graphene.ObjectType):
    user = graphene.Field(UserType, id=graphene.Int(required=True))
    me = graphene.Field(UserType)
    
    def resolve_user(self, info, id):
        return get_user_model().objects.get(id=id)
    
    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged in')
        
        return user

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
    
    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email
        )

        user.set_password(password)
        user.save()
        return CreateUser(user=user)

class EditProfile(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        userId =graphene.Int(required=True)
        profile_pic = graphene.String()
        description = graphene.String()
        fav_song = graphene.String()
        fav_artist = graphene.String()
        fav_genre = graphene.String()

    
    def mutate(self, info, userId, profile_pic, description, fav_song, fav_artist, fav_genre):
        user = info.context.user
        user2 = get_user_model().objects.get(id=userId)

        if user != user2:
            raise Exception('You can\'t edit another users profile.')
        
        user.profile_pic = profile_pic
        user.description = description
        user.fav_song = fav_song
        user.fav_artist = fav_artist
        user.fav_genre = fav_genre 

        user.save()

        return(EditProfile(user=user))

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    edit_profile = EditProfile.Field()