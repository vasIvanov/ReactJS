import React, { useState, useEffect, memo } from 'react';
import { Form, Alert } from 'react-bootstrap';
import Header from '../Header';
import danceService from '../services/dance-service';
import validate from './schema'
import './create-dance.css'
import { useDispatch, useSelector } from 'react-redux';
import { createDance } from '../features/danceSlice';


const CreatePlan = ({ history, showChange, editDance }) => {
  const dispatch = useDispatch()
  const[danceName, setDanceName] = useState('');
  const[danceImage, setDanceImage] = useState('');
  const [nameError, setNameError] = useState('');
  const [type, setType] = useState('');
  const [danceDetails, setDanceDetails] = useState('');
  const [danceLocation, setDanceLocation] = useState('');
  const error = useSelector(state => state.dance.error);
  const [detailsError, setDetailsError] = useState('')
  const userId = useSelector(state => state.user.user._id) || localStorage.getItem('_id') || null;

  useEffect(() => {
    if (editDance) {
      setDanceName(editDance.name);
      setDanceImage(editDance.imageUrl);
      setType(editDance.type);
      setDanceDetails(editDance.details);
    }
  }, [editDance]);



  const handleSubmit = () => {
    const data = {
      name: danceName,
      type,
      details: danceDetails,
      author: userId,
      imageUrl: danceImage,
      danceLocation
    };

    validate(danceName, danceDetails).then(() => {
      if (editDance) {
        const danceId = editDance._id;
        danceService.update(danceId, data).then((dance) => {
          showChange();
          history.push('/');
        });
      } else {
        try {
          dispatch(createDance(data));
        } catch (err) {
          console.log(err);
          window.scrollTo(0, 0);
          return;
        }
          
        history.push('/plans')
        // history.push('/');
        // danceService.create(data).then((e) => {
        //   if (e.errMsg) {
        //     setServerError(e.errMsg);
        //     window.scrollTo(0, 0);
        //     return;
        //   }
        //   showChange();
        //   history.push('/');
        // });
      }
    }).catch((err) => {
      err.inner.forEach((error) => {
        if (error.path === 'danceName') {
          setNameError(error.message);
        } else if (error.path === 'danceDetails') {
          setDetailsError(error.message);
        }
      });
      window.scrollTo(0, 0);
    });
    

  }

  return (
    <React.Fragment>
      <Header history={history} isLogged={true} bgColor="dark" />
      <div className="dance-wrapper">
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Dance name</Form.Label>
          <Form.Control
            defaultValue={danceName}
            onChange={(e) => setDanceName(e.target.value)}
            type="text"
          />
          {nameError ? <Alert variant={'danger'}>{nameError}</Alert> : null}
          {error ? (
            <Alert variant={'danger'}>{error}</Alert>
          ) : null}
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>
              Dance Image Url (the image must be a landscape not portrait
              otherwise it may not be displayed properly)
            </Form.Label>
            <Form.Control
              defaultValue={danceImage}
              autoComplete="off"
              className="custom-input"
              onChange={(e) => setDanceImage(e.target.value)}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect3">
            <Form.Label>Dance type</Form.Label>
            <Form.Control
              value={type}
              onChange={(e) => setType(e.target.value)}
              as="select"
            >
              <option>Select ...</option>
              <option>Hip-hop</option>
              <option>Folklore</option>
              <option>Modern</option>
              <option>Ballet</option>
              <option>Dance Exercise</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea6">
            <Form.Label>Dance details</Form.Label>
            <Form.Control
              defaultValue={danceDetails}
              onChange={(e) => setDanceDetails(e.target.value)}
              as="textarea"
              rows="3"
            />
          </Form.Group>
          {detailsError ? <Alert variant={'danger'}>{detailsError}</Alert> : null}
          <Form.Group controlId="exampleForm.ControlInput7">
          <Form.Label>Dance event location map link</Form.Label>
          <Form.Control
            defaultValue={danceLocation}
            onChange={(e) => setDanceLocation(e.target.value)}
            type="text"
          />
        </Form.Group>
      </Form>
      {editDance ? (
          <button
            className="create-button"
            type="button"
            onClick={handleSubmit}
          >
            Edit
          </button>
        ) : (
          <button
            className="create-button"
            type="button"
            onClick={handleSubmit}
          >
            Create
          </button>
        ) }
      </div>

    </React.Fragment>
  )
}

export default memo(CreatePlan);