import { Button } from "../../components";

interface ConfirmationModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onDelete,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal__children">
        <h2>Sigur doriti sa stergeti acest user?</h2>

        <div className="modal__btns">
          <Button dimension="full" type="danger" onClick={onCancel}>
            Cancel
          </Button>
          <Button dimension="full" type="primary" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
