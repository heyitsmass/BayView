"use client";
import { Animator } from "@/components/Animator";
import Banner from "@/components/Banner";
import { Footer } from "@/components/HomePage/Footer";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Fragment, ReactNode, useState } from "react";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  //return <>{children}</>;

  const [open, setOpen] = useState(false);

  const delayOpen = (delay: number = 300) =>
    setTimeout(() => {
      setOpen(true);
    }, delay);

  delayOpen();

  const onLinkChange = () => {
    setOpen(!open);
    delayOpen();
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="w-full flex flex-col z-1 h-screen">
      <div className="absolute top-0 left-0 right-0 z-[999] p-4 mb-4 h-20 bg-zinc-800 flex justify-center">
        <div className="flex items-center max-w-[100rem]  w-full">
          <h1
            className="text-2xl font-bold"
            style={{
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.25)"
            }}
          >
            <a href="/home" onClick={handleClose}>
              BAYVIEW
            </a>
          </h1>
        </div>
      </div>
      <div className="relative z-1 p-4 w-full flex items-center justify-center">
        <Banner className="translate-y-20" />
        <Animator>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-75 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-30 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-75 opacity-0"
            as={Fragment}
          >
            <motion.div
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5
              }}
              className={
                styles.layout +
                " border m-20 rounded-2xl bg-zinc-800 border-zinc-700 shadow-2xl p-4"
              }
            >
              {children}
            </motion.div>
          </Transition>
        </Animator>
      </div>
      <Footer onClick={onLinkChange} />
    </div>
  );
}
