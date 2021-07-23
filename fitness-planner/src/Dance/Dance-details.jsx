import React, { useState, useEffect, memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDance, postDanceComment } from '../features/danceSlice';
import { toggleFavoriteDance, userToggleFavorite } from '../features/userSlice';


const DanceDetails = ({ match, isLogged, history }) => {
  const danceId = match.params.id;
  const dance = useSelector(state => state.dance.dances.find(dance => dance._id === danceId))
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user._id) || localStorage.getItem('_id');
  const username = useSelector(state => state.user.user.username) || localStorage.getItem('username');
  const [added, setAdded] = useState(false);
  const [writeComment, setWriteComment] = useState('');
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const dances = useSelector(state => state.user.user.dances) || JSON.parse(localStorage.getItem('dances'));

  const submitCommentHandler = () => {
    dispatch(postDanceComment({danceId: dance._id, data: {comment: writeComment, user: username}}))
    document.getElementById('write-comment').value = '';
  };
  
  let isAuthor = false;
  if (dance) {
    isAuthor = userId === dance.author._id;
  }
  
  useEffect(() => {
      dances.forEach((p) => {
        if (p._id === danceId) {
          setAdded(true);
          return;
        }
      });
  }, [danceId, userId, dances]);

  const handleAddClick = () => {
    dispatch(userToggleFavorite({ _id: userId, danceId, add: false, addDance: true }));
    dispatch(toggleFavoriteDance({dance, add: true}));
    history.push('/');
  };

  const handleRemoveClick = () => {
    dispatch(userToggleFavorite({ _id: userId, danceId, add: false, removeDance: true }));
    dispatch(toggleFavoriteDance({dance, add: false}))
    history.push('/');
  };

  const handleDelete = () => {
    setShow(false);
    dispatch(deleteDance(dance._id));
    history.push('/plans');
  };
  
  return(
    <React.Fragment>
      <Header history={history} isLogged={isLogged} bgColor="dark" />
      {dance ? <div className="details">
        <div className="media">
          <img src={dance.imageUrl} alt="" />
        </div>
        <div className="plan-info">
          <h2 className="plan-name">{dance.name}</h2>
          <p className="plan-complexity">
            The dance is {dance.type} type.
          </p>
          <div className="plan-details">
          {dance.danceLocation ? 
          <div dangerouslySetInnerHTML={{__html: dance.danceLocation}}>
          </div> : null}
          <br/>
            <h6>Description</h6>
            <p>{dance.details}</p>
          </div>
        </div>
        <br/>
        <div className="comment-section">
                <h6>Comment Section</h6>
                {dance.comments
                  ? dance.comments.map((c) => (
                      <div key={c._id} className="comment">
                        <h6 className="username">{c.user}</h6>
                        <p>{c.comment}</p>
                      </div>
                    ))
                  : null}
                <textarea
                  onChange={(e) => setWriteComment(e.target.value)}
                  name="write-comment"
                  id="write-comment"
                  cols="5"
                  rows="5"
                />
                <button
                  className="btn btn-primary"
                  onClick={submitCommentHandler}
                >
                  Submit
                </button>
              </div>
              {isAuthor ?(
            <div className="author-panel">
              <Link className="edit-link" to={`/edit-dance/${dance._id}`}>
                Edit
              </Link>

              <Button variant="danger" onClick={handleShow}>
                Delete
              </Button>
              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title className="custom-modal-title">
                    Are you sure you want to delete this plan?
                  </Modal.Title>
                </Modal.Header>
                <Modal.Footer className="custom-modal-footer">
                  <Button variant="primary" onClick={handleDelete}>
                    Yes, Delete!
                  </Button>
                  <Button variant="secondary" onClick={() => setShow(false)}>
                    No
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )  :
              added ? 
               <Button
               variant="danger"
               className="details-button"
               onClick={handleRemoveClick}
               type="button"
             >
               Remove from Favorites{' '}
             </Button>
              : 
              <Button
                variant="primary"
                className="details-button"
                onClick={handleAddClick}
                type="button"
              >
                Add to Favorites{' '}
              </Button>
           
            }
      </div> : null}
    </React.Fragment>
  )
}

export default memo(DanceDetails);