"use client";
import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import { SettingsDialog } from "@/components/Settings";
import { useHomepage, useOpen } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useLayoutEffect, useRef, useState } from "react";

import { useDropdownRef } from "@/components/Settings/hooks/useDropdownRef";
import Session from "supertokens-web-js/recipe/session";
import style from "./topbar.module.css";
type PillDimensions = {
  width: number;
  position: number;
};

const links = {
  "/home": {
    label: "Home",
    path: "/"
  },
  "/home/itinerary": {
    label: "Itinerary",
    path: "/itinerary"
  }
} as const;

type Links = keyof typeof links;

type LinkType<T extends Links = Links> = {
  href?: T;
  label: string;
  path: string;
};

type LinkRefs = {
  [P in Links]: HTMLAnchorElement | null;
};

const hrefs = Object.keys(links);
const values = Object.values(links);

const TopBar = React.memo(Bar);

export default TopBar;
function Bar() {
  const { user } = useHomepage();

  const { first_name, last_name } = user.metadata || {
    first_name: "Unknown",
    last_name: ""
  };

  return (
    <>
      <div className={style.topBar}>
        <div className="flex max-w-[100rem] justify-between items-center m-auto h-full z-0">
          {/* Left Section: Title */}
          <div className="flex items-center">
            <h1 className={style.topbarShadow}>BAYVIEW</h1>
          </div>

          {/* Middle Section: Links */}
          <TopBarLinks />

          {/* Right Section: Profile */}
          <ProfileRight first_name={first_name} last_name={last_name} />
        </div>
      </div>
    </>
  );
}

const LinkComponent = () => {
  const pathname = usePathname() as keyof typeof links;
  const linkRefs = useRef<LinkRefs>({} as LinkRefs);

  const [pillDimensions, setPillDimensions] = useState<PillDimensions>({
    width: 0,
    position: 0
  });

  useLayoutEffect(() => {
    const el = linkRefs.current[pathname];
    if (el && el.parentElement) {
      const width = el.offsetWidth;
      const position = el.offsetLeft - el.parentElement.offsetLeft;
      setPillDimensions({ width, position });
    }
  }, [pathname]);

  return (
    <div className="flex flex-grow justify-center items-center text-base relative">
      <div className="items-start">
        <ul className="flex justify-center items-center gap-10 mt-[1.6rem]">
          {values.map((link, i) => (
            <TopBarLink
              key={i}
              label={link.label}
              linkRefs={linkRefs}
              index={i}
            />
          ))}
        </ul>

        {/* Pill indicator below the links */}
        <motion.div
          className="relative h-1 mt-[1.4rem] rounded bg-red-500"
          initial={{
            left: pillDimensions.position,
            width: pillDimensions.width,
            opacity: 0
          }}
          animate={{
            left: pillDimensions.position,
            width: pillDimensions.width,
            opacity: 1,
            boxShadow: "0 0 4px 2px rgba(239, 68, 68, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </div>
    </div>
  );
};

const TopBarLinks = React.memo(LinkComponent);

const BarLink = ({ label, linkRefs, index }) => {
  const pathname = usePathname();

  return (
    <Link
      key={index}
      href={hrefs[index]}
      ref={(el) => (el ? (linkRefs.current[hrefs[index]] = el) : null)}
    >
      <h6 className={style.topbarShadow}>
        <span
          className={
            label === links[pathname].label
              ? "font-bold transition-all"
              : "font-medium"
          }
        >
          {label}
        </span>
      </h6>
    </Link>
  );
};

const TopBarLink = React.memo(BarLink);

const Right = ({ ...props }: { first_name: string; last_name: string }) => {
  const [isOpen, open, close] = useOpen();
  const profileRef = useDropdownRef<HTMLDivElement>(close);
  const toggleDropdown = () => (isOpen ? close() : open());

  const { first_name, last_name } = props;
  return (
    <div
      className="flex items-center cursor-pointer relative"
      onClick={toggleDropdown}
      ref={profileRef}
    >
      <div
        className={`${style.topbarShadow} text-base text-right mr-3 min-w-full`}
      >
        {first_name} {last_name}
      </div>
      <div className="flex-shrink-0">
        <div
          data-testid="profile-icon"
          className="flex rounded-full w-9 h-9 bg-red-500 text-center justify-center items-center"
        >
          <p
            data-testid="profile-initials"
            className={`${style.topbarShadow} w-100 font-bold text-white`}
          >
            {first_name[0].toLocaleUpperCase()}
          </p>
        </div>
      </div>
      <AnimatePresence>{isOpen && <ProfileDropdown />}</AnimatePresence>
    </div>
  );
};

const ProfileRight = React.memo(Right);

const Dropdown = () => {
  const [isOpen, open, close] = useOpen();

  return (
    <>
      <AnimationComponent>
        <div
          data-testid="logout-button"
          className="absolute top-full overflow-hidden right-0 mt-6 w-56 p-2 rounded-xl shadow-lg bg-white border dark:bg-zinc-700 dark:border-zinc-600"
        >
          <ul className={style.dropdownList}>
            <li>
              <p onClick={open}>Settings</p>
            </li>
            <li>
              <p
                onClick={async () => {
                  await Session.signOut();
                  window.location.href = "/auth";
                }}
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      </AnimationComponent>
      {isOpen && <SettingsDialog isOpen={isOpen} close={close} />}
    </>
  );
};

const ProfileDropdown = React.memo(Dropdown);
