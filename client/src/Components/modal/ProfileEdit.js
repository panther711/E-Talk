import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {IoMdPerson} from "react-icons/io";
import { BsPencil} from "react-icons/bs"
import { Button } from "../../Styles/Button";

const ProfileEdit = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-md rounded-2xl py-2">
        <div className="flex w-full justify-between items-center">
          <div className="flex justify-between items-center">
            <IoMdPerson className="mb-4 mr-4" />
            <span>Profile Edit</span>
          </div>
          <div className="cursor-pointer" onClick={openModal}>
            <BsPencil className="mb-4" />
          </div>
        </div>
      </div>
      <Transition className="box" appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="dialog-box relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="dialog-wrapper fixed inset-0 overflow-y-auto">
            <div className="dialog-container flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-panel w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Profile Edit
                  </Dialog.Title>
                  <form action="">

                    <div>
                      <input type="text" placeholder="Full Name" />
                    </div>


                    <div>
                      <textarea name="" id="" cols="30" rows="5" className="border-solid border-2 " placeholder="About"></textarea>
                    </div>

                    <Button
              className="button bg-green-600 hover:bg-green-500 active:bg-green-700 text-white radius-round h-11 px-8 py-2 w-full">
              Save
            </Button>

                  </form>

                  <div></div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="close-btn inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-cyan-500 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileEdit;
