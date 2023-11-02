"use client"
import React, { ReactNode, useState, HTMLProps } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import styles from "./setLocationModal.module.css";
export default function SetLocationModal({open, onClose}) {
    if (!open) return null
    return (
      <div className="block fixed w-full h-full bg-black/30">
        <div
          className={
            "block bg-white fixed max-w-xl -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 border-zinc-200 rounded-xl pl-3 py-4 pr-12"
          }
        >
          <div className="inline">
            <h1 className="text-2xl font-bold inline mr-10">
              {" "}
              Select Location{" "}
            </h1>
            <FontAwesomeIcon className = "absolute ml-5"icon={faClose} onClick={onClose} />
          </div>
          <div className="block">
            <label className="block">
              <input
                className="mt-5"
                type="radio"
                value="Disneyland"
                name="Location"
              />{" "}
              Disneyland
            </label>
            <label>
              <input type="radio" value="WaltDisneyWorld" name="Location" />{" "}
              Walt Disney World
            </label>
            <Button className="mt-5" />
          </div>
        </div>
      </div>
    );
}