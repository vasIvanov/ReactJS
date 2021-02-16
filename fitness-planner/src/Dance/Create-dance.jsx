import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import Header from '../Header';
import { userContext } from '../userContext';
import danceService from '../services/dance-service';
import './create-dance.css'

const CreatePlan = ({ history, showChange, editDance }) => {
  const userValue = useContext(userContext);
  const[danceName, setDanceName] = useState('');
  const[danceImage, setDanceImage] = useState('');
  const [nameError, setNameError] = useState('');
  const [serverError, setServerError] = useState('');
  const [imageUrlError, setImageUrlError] = useState('');
  const [type, setType] = useState('');
  const [danceDetails, setDanceDetails] = useState('');
  const userId =
    (userValue && userValue._id) || localStorage.getItem('_id') || null;

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
    };
    if (editDance) {
      const danceId = editDance._id;
      danceService.update(danceId, data).then((dance) => {

        showChange();
        history.push('/');
      });
    } else {
      danceService.create(data).then((e) => {
        if (e.errMsg) {
          setServerError(e.errMsg);
          window.scrollTo(0, 0);
          return;
        }
        showChange();
        history.push('/');
      });
    }
  }

  return (
    <React.Fragment>
      <Header isLogged={true} bgColor="dark" />
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
          {serverError ? (
            <Alert variant={'danger'}>{serverError}</Alert>
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
            {imageUrlError ? (
              <Alert className="custom-alert" variant={'danger'}>
                {imageUrlError}
              </Alert>
            ) : null}
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

export default CreatePlan;