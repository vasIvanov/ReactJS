import React, { useState, useEffect, useContext } from 'react';
import danceService from '../services/dance-service';
import userServices from '../services/user-service';
import { userContext } from '../userContext';
import { Button, Modal } from 'react-bootstrap';
import Header from '../Header';
import { Link } from 'react-router-dom';

const DanceDetails = ({ match, isLogged, history, setUserData }) => {
  const [dance, setDance] = useState('');
  const userValue = useContext(userContext);
  const userId = (userValue && userValue._id) || localStorage.getItem('_id');
  const danceId = match.params.id;
  const username =
    (userValue && userValue.username) || localStorage.getItem('username');
  const [added, setAdded] = useState(false);
  const [writeComment, setWriteComment] = useState('');
  const [commentsArray, setComments] = useState('');
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const dances =
  (userValue && userValue.dances) || JSON.parse(localStorage.getItem('dances'));
  console.log(added);
  const submitCommentHandler = () => {
    danceService
      .postComment({ comment: writeComment, user: username }, dance._id)
      .then((r) => {
        danceService.getComments(dance._id).then((comments) => {
          setComments(comments);
        });
      });
    document.getElementById('write-comment').value = '';
  };
  
  let isAuthor = false;
  if (dance) {
    isAuthor = userId === dance.author;
  }
  console.log(dance);
  useEffect(() => {
    danceService.getOne(danceId).then((plan) => {
      setDance(plan);
      setComments(plan.comments);
      userValue.dances.forEach((p) => {
        console.log(p._id, danceId);
        if (p._id === danceId) {
          setAdded(true);
          return;
        }
      });
    });
  }, [danceId, userId]);

  const handleAddClick = () => {
    userServices.update({ _id: userId, danceId, add: false, addDance: true }).then(() => {
      if (userValue) {
        dances.push(dance);
        setUserData({
          ...userValue,
          dances,
        });
      }
      if (localStorage.getItem('dances')) {
        dances.push(dance);
        localStorage.setItem('dances', JSON.stringify(dance));
      }
      history.push('/');
    });
  };

  const handleRemoveClick = () => {
    userServices.update({ _id: userId, danceId, add: false, removeDance: true }).then(() => {
      if (userValue) {
        const filteredDances = dances.filter((p) => p._id !== danceId);
        setUserData({
          ...userValue,
          dances: filteredDances,
        });
      }
      if (localStorage.getItem('dances')) {
        let newPlans = dances.filter((p) => p._id !== danceId);
        localStorage.setItem('dances', JSON.stringify(newPlans));
      }
      history.push('/');
    });
  };

  const handleDelete = () => {
    setShow(false);
    danceService.deleteDance(dance._id).then(() => {
      history.push('/my-plans');
    });
  };
  
  return(
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
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
                {commentsArray
                  ? commentsArray.map((c) => (
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

export default DanceDetails