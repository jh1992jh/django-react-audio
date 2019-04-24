import graphene
import tracks.schema
import audio_users.schema
import graphql_jwt

# tracks.schema.Query, the query at the tracks model
class Query(audio_users.schema.Query, tracks.schema.Query, graphene.ObjectType):
    pass

class Mutation(audio_users.schema.Mutation, tracks.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
