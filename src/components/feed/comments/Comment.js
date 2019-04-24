import React, { useContext } from 'react';
import DeleteComment from './DeleteComment';
import { UserContext } from '../../../App';

const Comment = ({ comment }) => {
    const currentUser = useContext(UserContext);
    const isCurrentUser = currentUser.id === comment.user.id;

    return (
        <div className="comment">
            <div className="comment-profile-info">
                <img className="profile-pic" src={comment.user.profilePic} alt="avatar" />
                <span className="username">{comment.user.username}</span>
            </div> 
            <div className="divider" />
            <div className="comment-text">
                {comment.commentText}
            </div>
            {isCurrentUser && <DeleteComment commentId={comment.id} />}
        </div>
    )
};

export default Comment;