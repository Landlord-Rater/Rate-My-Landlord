import React from "react";
import { Link } from "react-router-dom";
import AddProperty from "./AddProperty.jsx";

export default function ModalProperty() {
  return (
    <>
      <button
        type="button"
        className="px-6
        py-2.5

        bg-primary
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg

        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md

        transition
        duration-150
        ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add a Property
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h2
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Add Property
              </h2>

              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body relative p-4">
              <AddProperty />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
