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
    });
  }, [danceId, userId]);
  return(
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
      {dance ? <div>
        <div className="media">
          <img src={dance.imageUrl} alt="" />
        </div>
        <div className="plan-info">
          <h2 className="plan-name">{dance.name}</h2>
          <p className="plan-complexity">
            The dance is {dance.type} type.
          </p>
          <div className="plan-details">
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
      </div> : null}
    </React.Fragment>
  )
}

export default DanceDetails