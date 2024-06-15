interface AddOccasionModalProps {
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  tagData: { name: string }; // Assuming tagData has a 'name' property
  isEditMode: boolean;
}

const AddOccasionModal: React.FC<AddOccasionModalProps> = ({ onClose, onChange, onSubmit, tagData, isEditMode }) => {
  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box bg-base-200">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={onSubmit}>
          <h1 className="text-xl font-semibold">{isEditMode ? "Edit" : "Add"} Occasion</h1>
          <div className="divider"></div>
          <div className="flex justify-evenly">
            <input
              type="text"
              name="name"
              value={tagData.name}
              onChange={onChange}
              placeholder="Enter Occasion Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex justify-center items-center">
            <button type="submit" className="btn btn-primary m-2">
              {isEditMode ? "Save Changes" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddOccasionModal;
