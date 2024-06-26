import React from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const EditButton = ({ path, fun }) => {
  return (
    <Link
      to={path}
      onClick={fun}
      className="bg-indigo-50 rounded-tl-xl rounded-br-xl rounded-sm p-1.5"
    >
      <PencilSquareIcon className="w-5 h-5 text-indigo-600" />
    </Link>
  );
};

export default EditButton;
