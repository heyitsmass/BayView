"use client";
import React, { ReactNode, useState, HTMLProps } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import { SyntheticEvent } from "react";

type LocationModalProps = { 
  open: boolean
  onClose: (e?:SyntheticEvent) => void 
} 

export default function SetLocationModal({open, onClose}:LocationModalProps) {
  return <>
    {open && <div className="block fixed w-full h-full bg-black/30">
      <div
        className={
          "block bg-white fixed max-w-xl -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 border-zinc-200 rounded-xl pl-4 py-4 pr-20 shadow-red-600 z-0"
        }
      >
        <div className="inline">
          <h1 className="text-2xl font-bold inline mr-10"> Select Location </h1>
          <FontAwesomeIcon
            className="absolute ml-10 mt-2"
            icon={faClose}
            onClick={onClose}
          />
        </div>
        <div className="block mt-7">
          <label className="block">
            <input type="radio" value="Disneyland" name="Location" /> Disneyland
          </label>
          <label className="block mt-3">
            <input type="radio" value="WaltDisneyWorld" name="Location" /> Walt
            Disney World
          </label>
          <Button type="submit" className="mt-8">
            {" "}
            Confirm{" "}
          </Button>
        </div>
      </div>
    </div>
    }
  </>
}
