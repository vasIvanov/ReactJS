import React from 'react';
import { Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastNofity = (props) => {
    return (
        <Toast>
  <Toast.Header>
    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
    <strong className="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
  </Toast.Header>
    <Toast.Body>{props.message}</Toast.Body>
</Toast>
    )
}

export default ToastNofity;