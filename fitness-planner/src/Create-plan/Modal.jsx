import React, {useState, Fragment} from 'react'
import {Button, Modal, Container, Image} from 'react-bootstrap';

const Modaling = ({planImage}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return (
      <Fragment>
        <Button variant="primary" onClick={handleShow}>
          Preview Image
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <Container>
                    <Image src={planImage} fluid />
                </Container>
          </Modal.Body>
        </Modal>
      </Fragment>
    );
}

export default Modaling;