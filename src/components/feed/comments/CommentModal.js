import React from 'react'
import CommentForm from './CommentForm';
import Comment from './Comment';

const CommentModal = ({ modalOpen, toggleModal, track }) => {
  return (
    <div className="comment-modal-background" onClick={(e) => {
        e.target.className === "comment-modal-background" ? toggleModal(!modalOpen) : toggleModal(modalOpen);
    }}>
      <div className="comment-modal">
        {track.track.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
        ))}
        <CommentForm  trackId={track.track.id}/>
      </div>
    </div>
  )
}

export default CommentModal;