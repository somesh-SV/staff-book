import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const DeleteButton = ({ fun }) => {
  return (
    <Link
      onClick={fun}
      className="bg-red-50 rounded-tl-xl rounded-br-xl rounded-sm p-1.5"
    >
      <TrashIcon className="w-5 h-5 text-red-700" />
    </Link>
  );
};

export default DeleteButton;
