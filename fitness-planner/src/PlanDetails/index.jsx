import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import planService from '../services/plan-service';
import userServices from '../services/user-service';
import { userContext } from '../userContext';
import { Button, Modal } from 'react-bootstrap';
import Header from '../Header';
import { Link } from 'react-router-dom';
import { renderData } from './utils';

const PlanDetails = ({ match, isLogged, history, setUserData }) => {
  const [plan, setPlan] = useState('');
  const userValue = useContext(userContext);
  const userId = (userValue && userValue._id) || localStorage.getItem('_id');
  const planId = match.params.id;
  const username =
    (userValue && userValue.username) || localStorage.getItem('username');
  const [added, setAdded] = useState(false);
  const plans =
    (userValue && userValue.plans) || JSON.parse(localStorage.getItem('plans'));
  const [writeComment, setWriteComment] = useState('');
  const [commentsArray, setComments] = useState('');
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    setShow(false);
    planService.deletePlan(plan._id).then(() => {
      history.push('/my-plans');
    });
  };

  const submitCommentHandler = () => {
    planService
      .postComment({ comment: writeComment, user: username }, plan._id)
      .then((r) => {
        planService.getComments(plan._id).then((comments) => {
          setComments(comments);
        });
      });
    document.getElementById('write-comment').value = '';
  };

  let isAuthor = false;
  if (plan) {
    isAuthor = userId === plan.author;
  }

  useEffect(() => {
    planService.load(planId).then((plan) => {
      setPlan(plan);
      setComments(plan.comments);
      userServices.getUsers().then((r) => {
        const user = r.filter((u) => u._id === userId)[0];
        user.plans.forEach((p) => {
          if (p._id === planId) {
            setAdded(true);
            return;
          }
        });
      });
    });
  }, [planId, userId]);

  const handleAddClick = () => {
    userServices.update({ _id: userId, planId, add: true }).then(() => {
      if (userValue) {
        plans.push(plan);
        setUserData({
          ...userValue,
          plans,
        });
      }
      if (localStorage.getItem('plans')) {
        plans.push(plan);
        localStorage.setItem('plans', JSON.stringify(plans));
      }
      history.push('/');
    });
  };

  const handleRemoveClick = () => {
    userServices.update({ _id: userId, planId, add: false, removePlan: true }).then(() => {
      if (userValue) {
        const filteredPlans = plans.filter((p) => p._id !== planId);
        setUserData({
          ...userValue,
          plans: filteredPlans,
        });
      }
      if (localStorage.getItem('plans')) {
        let newPlans = plans.filter((p) => p._id !== planId);
        localStorage.setItem('plans', JSON.stringify(newPlans));
      }
      history.push('/');
    });
  };
  return plan ? (
    <React.Fragment>
      <Header isLogged={isLogged} bgColor="dark" />
      <div className="details">
        <div className="media">
          <img src={plan.imageUrl} alt="" />
        </div>
        <div className="plan-info">
          <h2 className="plan-name">{plan.name}</h2>
          <p className="plan-complexity">
            The plan is recommended for {plan.level} level.
          </p>
          <div className="plan-details">
            <h6>Description</h6>
            <p>{plan.details}</p>
          </div>
        </div>
        <div>
          <div className="plan-wrapper">{renderData(plan)}</div>

          {isAuthor ? (
            <div className="author-panel">
              <Link className="edit-link" to={`/edit/${plan._id}`}>
                Edit
              </Link>

              <Button variant="danger" onClick={handleShow}>
                Delete
              </Button>
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
          ) : added ? (
            <div>
              <Button
                variant="danger"
                className="details-button"
                onClick={handleRemoveClick}
                type="button"
              >
                Remove from Favorites{' '}
              </Button>
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
            </div>
          ) : (
            <div>
              <Button
                variant="primary"
                className="details-button"
                onClick={handleAddClick}
                type="button"
              >
                Add to Favorites{' '}
              </Button>
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
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <div>Loading ...</div>
  );
};

export default PlanDetails;
