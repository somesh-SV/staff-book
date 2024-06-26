import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isClose, selecteOpenState } from "../../Redux/Reducer/dialog.reducer";

const CustomDialog = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const open = useSelector(selecteOpenState);

  const cancel = () => {
    dispatch(isClose(false));
  };

  return (
    <Dialog size="xs" open={open}>
      <DialogBody>
        <span className="inline-flex  gap-2 pt-2">
          {<ExclamationCircleIcon className="w-7 h-7 text-red-500" />}
          Deleting this will erase it permanently. Confirm deletion?
        </span>
      </DialogBody>
      <DialogFooter className="p-3 pt-0">
        <Button
          onClick={cancel}
          variant="text"
          size="sm"
          color="red"
          className="mr-1"
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} size="sm" variant="gradient" color="green">
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CustomDialog;
