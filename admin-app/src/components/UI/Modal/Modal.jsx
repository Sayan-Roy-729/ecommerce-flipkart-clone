import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import Spinner from '../spinner/spinner';

const MyModal = (props) => {
  const spinnerButton = (
    <button class="btn btn-primary" type="button" disabled>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.spinner ? (
          spinnerButton
        ) : (
          <Button variant="primary" onClick={props.onClick}>
            Save Changes
          </Button>
        )}
        {props.infoFooter ? props.infoFooter : null}
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
