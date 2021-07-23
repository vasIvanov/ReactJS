import React, { useState, useEffect } from 'react';
import './index.css';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { renderData } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlan, postPlanComment } from '../../features/planSlice';
import { toggleFavoritePlan, userToggleFavorite } from '../../features/userSlice';

const PlanDetails = ({ match, isLogged, history }) => {
  const user = useSelector(state => state.user.user)
  const userId = user._id
  const planId = match.params.id;
  const plan = useSelector(state => state.plan.plans.find(plan => plan._id === planId))
  const [added, setAdded] = useState(false);
  const plans = useSelector(state => state.user.user.plans) || JSON.parse(localStorage.getItem('plans'));
  const [writeComment, setWriteComment] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);

  const handleDelete = () => {
    setShow(false);
    dispatch(deletePlan(plan._id))
    history.push('/plans');
  };

  const submitCommentHandler = () => {
    dispatch(postPlanComment({planId: plan._id, data: { comment: writeComment, user: user.username }}))
    document.getElementById('write-comment').value = '';
  };

  let isAuthor = false;
  if (plan) {
    isAuthor = userId === plan.author._id;
  }

  useEffect(() => {
    plans.forEach((p) => {
      if (p._id === planId) {
        setAdded(true);
        return;
      }
    });
}, [planId, userId, plans]);

  const handleAddClick = () => {
    dispatch(userToggleFavorite({ _id: userId, planId, add: true, addDance: false }));
    dispatch(toggleFavoritePlan({plan, add: true}))
    history.push('/');
  };

  const handleRemoveClick = () => {
    dispatch(userToggleFavorite({ _id: userId, planId, add: false, removePlan: true }));
    dispatch(toggleFavoritePlan({plan, add: false}))
    history.push('/');
  };
  return plan ? (
    <React.Fragment>
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
                {plan.comments
                  ? plan.comments.map((c) => (
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
                {plan.comments
                  ? plan.comments.map((c) => (
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
                {plan.comments
                  ? plan.comments.map((c) => (
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
