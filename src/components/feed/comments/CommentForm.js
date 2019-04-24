import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import ReactLoading from 'react-loading';

import { SHARED_QUERY } from '../Feed';

const CommentForm = ({ trackId }) => {
  const [commentText, setCommentText] = useState("");
  const commentSubmit = (e, commentTrack) => {
      e.preventDefault();
      commentTrack({variables: {trackId, commentText}});
      setCommentText("");
  }

  /*

  CONTINUE LATER 
  const handleUpdateCache = (cache, { data: commentTrack }) => {
    const data = cache.readQuery({ query: SHARED_QUERY });
  }

  */
  return (
    <Mutation mutation={COMMENT_TRACK_MUTATION} refetchQueries={() => [{ query: SHARED_QUERY }]}>
        {(commentTrack, {loading, error}) => {
            if(loading) return <ReactLoading type="bars" color="#006989" className="loading" />;
            if(error) console.log(error);
            return (
                <div className="comment-form">
                    <i className="comments-icon far fa-comments" />
                    
                    <form onSubmit={e => commentSubmit(e, commentTrack)}>
                        <input type="text" id="commentText" value={commentText} onChange={e => setCommentText(e.target.value)}/>
                        <button type="submit">submit</button>
                    </form>
                </div>
            )
        }}
    </Mutation>
  )
}

const COMMENT_TRACK_MUTATION = gql`
    mutation ($trackId: Int!, $commentText: String!) {
        commentTrack(trackId: $trackId, commentText: $commentText) {
            comment {
                user {id, username}
                track {id, title}
            }
        }
    }
`



export default CommentForm;