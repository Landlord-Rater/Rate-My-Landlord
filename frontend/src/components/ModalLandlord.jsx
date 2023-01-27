import React from "react";
import { Link } from "react-router-dom";
import AddLandlord from "./AddLandlord.jsx";

export default function ModalLandlord() {
  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#landlord-model"
        className="
        px-6
        py-2.5
        m-1
        bg-primary
        hover:bg-secondary hover:shadow-lg
        hover:text-primary
        focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0
        focus:text-primary
        active:bg-blue-800 active:shadow-lg
        text-white
        font-bold
        text-l
        leading-tight
        rounded
        shadow-md
        transition
        duration-150
        ease-in-out" >
      Add New Landlord
      </button>

      <div
        className="modal
        fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="landlord-model"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true" >
        <div className="modal-dialog
        relative w-auto pointer-events-none" >
          <div className="modal-content
          border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current" >
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h2
                className="text-xl font-bold leading-normal text-primary"
                id="ModalLabel-AddLandlord" >
              Add New Landlord
              </h2>

              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline">
              </button>
            </div>

            <div className="modal-body relative p-4">

              <AddLandlord />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
