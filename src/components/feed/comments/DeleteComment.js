import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { SHARED_QUERY } from '../Feed';

const DeleteComment = ({ commentId }) => (
    <Mutation mutation={DELETE_COMMENT_MUTATION} variables={{commentId}} refetchQueries={() => [{ query: SHARED_QUERY }]}>
        {(deleteComment, {loading, error}) => {
            if(loading) console.log('Deleting the comment...');
            if(error) console.log(error)

            return (
                <div className="delete-comment" onClick={() => deleteComment(commentId)}>
                    <i className="far fa-trash-alt"></i>
                    <span>Delete</span>
                </div>
            )
        }}
    </Mutation> 
)

const DELETE_COMMENT_MUTATION = gql`
    mutation ($commentId: Int!) {
        deleteComment(commentId: $commentId) {
            commentId
        }
    }
`

export default DeleteComment;