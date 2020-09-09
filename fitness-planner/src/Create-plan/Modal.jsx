import React, {useState, Fragment} from 'react'
import {Button, Modal, Container, Image} from 'react-bootstrap';

const Modaling = ({planImage}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <Fragment>
        <Button variant="primary" onClick={handleShow}>
          Check Image
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <Container className='media'>
                    <Image className='previewimage' src={planImage} fluid />
                </Container>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
}

export default Modaling;