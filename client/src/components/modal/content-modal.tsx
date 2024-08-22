import { Modal, Button } from "react-bootstrap";
import ContentAttachment from "../content-attachment";

type ContentModalProps = {
  content: any;
  isOpen: boolean;
  onClose: () => void;
};

export function ContentModal({ content, isOpen, onClose }: ContentModalProps) {
  return (
    <Modal
      size="lg"
      show={isOpen}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="!capitalize" id="contained-modal-title-vcenter">
          {content?.type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContentAttachment content={content} />
        <h1 className="mt-4">{content?.title}</h1>
        <p>{content?.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
