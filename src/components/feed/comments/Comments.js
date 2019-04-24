import React, { useState } from 'react';
import CommentModal from './CommentModal';


const Comments = ({ track }) => {
  const [modalOpen, toggleModal] = useState(false);
  
  return (
    <div className="comments">
        <button onClick={() => toggleModal(!modalOpen)}>
            <i className="commentIcon fas fa-comment" /> <span>Comment</span> 
        </button>
        {modalOpen && <CommentModal toggleModal={toggleModal} modalOpen={modalOpen} track={track} />}
    </div>
  )
}

export default Comments;