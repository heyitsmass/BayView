"use client";
import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import { SettingsDialog } from "@/components/Settings";
import { useHomepage, useOpen } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import Session from "supertokens-web-js/recipe/session";
import style from "./topbar.module.css";

type LinkType = {
  href: string;
  label: string;
  path: string;
};

type PillDimensions = {
  width: number;
  position: number;
};

type LinkRefs = {
  [key: string]: HTMLLIElement | null;
};

function useOutsideAlerter(ref) {}

export default function TopBar() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        href: `/home/itinerary`,
        label: "Itinerary",
        path: "/itinerary"
      },
      { href: `/home/`, label: "Home", path: "/" }
    ],
    []
  );

  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [pillDimensions, setPillDimensions] = useState<PillDimensions>({
    width: 0,
    position: 0
  });
  const linkRefs = useRef<LinkRefs>({});
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Determine the current link based on the pathname
  const currentLink: LinkType = useMemo(() => {
    return links.find((link) => pathname.includes(link.path)) || links[0];
  }, [links, pathname]);

  // useLayoutEffect is used to measure and update the pill's size and position
  // immediately after the DOM updates but before the browser has painted. This
  // helps prevent any visual discrepancies. It runs only once per relevant change,
  // because it depends on `currentLink`, which is memoized and changes less frequently.
  useLayoutEffect(() => {
    const el = linkRefs.current[currentLink.href];
    if (el && el.parentElement) {
      const newWidth = el.offsetWidth;
      const newPosition = el.offsetLeft - el.parentElement.offsetLeft;
      setPillDimensions({ width: newWidth, position: newPosition });
    }
  }, [currentLink]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  const { user } = useHomepage();

  const { first_name, last_name } = user.metadata;

  return (
    <>
      <div className={style.topBar}>
        <div className="flex max-w-[100rem] justify-between items-center m-auto h-full z-0">
          {/* Left Section: Title */}
          <div className="flex items-center">
            <h1 className={style.topbarShadow}>BAYVIEW</h1>
          </div>

          {/* Middle Section: Links */}
          <div className="flex flex-grow justify-center items-center text-base relative">
            <div className="items-start">
              <ul className="flex justify-center items-center gap-10 mt-[1.6rem]">
                {links.toReversed().map((link) => (
                  <li
                    key={link.href}
                    ref={(el) =>
                      el ? (linkRefs.current[link.href] = el) : null
                    }
                  >
                    <Link href={link.href}>
                      <h6 className={style.topbarShadow}>
                        {link.label == currentLink.label ? (
                          <span className="font-bold transition-all">
                            {link.label}
                          </span>
                        ) : (
                          <span className="font-medium">{link.label}</span>
                        )}
                      </h6>
                    </Link>
                  </li>
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

          {/* Right Section: Profile */}
          <div
            className="flex items-center cursor-pointer relative"
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            ref={profileRef}
          >
            <div className={`${style.topbarShadow} text-base text-right mr-3 min-w-full`}>
              {first_name || "Unknown"} {last_name}
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
                  {(first_name || "Unknown").at(0)?.toLocaleUpperCase()}
                </p>
              </div>
              {/* <Image src={null} width="100" height="50" alt="Profile Image" className="w-8 h-8 rounded-full" /> */}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {isProfileDropdownOpen && <ProfileDropdown />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileDropdown() {
  const id = useId();
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
}
