'use client';
import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import Button from "@/components/Button";
import { GenericDialogPanel } from "@/components/Dialog/GenericPanel";
import UserInput from "@/components/Input";
import { usePopupDispatch } from "@/context/popup";
import { useOpen } from "@/hooks";
import { faGlobe, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";

const handleUpdate = async (url: string) => {};

export const ProfilePicture = ({
  avatar,
  height,
  width,
  className
}: {
  height?: string;
  width?: string;
  avatar: string;
  className?: string;
}) => {
  /** party member addition has to be reduced. */
  const [isOpen, open, close] = useOpen();
  const setPopup = usePopupDispatch();

  const handleProfileURLChange = async (url: string) => {
    const regex = new RegExp(
      "^(https?:\\/\\/)?" +
        // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (regex.test(url)) {
      handleUpdate(url);
    } else {
      setPopup({
        message: "Invalid URL",
        variant: "error"
      });
    }
  };

  return (
    <>
      <div className="w-1/3">
        <div
          className={`!h-${height ? `[${height}]` : "24"} !w-${
            width ? `[${width}]` : "24"
          } rounded-full relative`}
          style={{
            backgroundImage: `url(${avatar})`,
            backgroundSize: "fill"
          }}
        >
          <FontAwesomeIcon
            icon={faPencil}
            className="absolute right-0 text-zinc-900 dark:text-zinc-100 border rounded-xl bg-red-600 border-red-500 shadow-xl p-2 hover:cursor-pointer hover:bg-red-500 dark:hover:text-zinc-300 transition-all"
            onClick={open}
          />{" "}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={close}
            className="border w-max p-4 rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          >
            <AnimationComponent>
              <Dialog.Backdrop
                onClick={(e) => close()}
                className="bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg"
              ></Dialog.Backdrop>
            </AnimationComponent>
            <AnimationComponent>
              <GenericDialogPanel
                title="Update your profile picture!"
                description="Must be a url to an image. (prevents abuse)"
              >
                <UserInput
                  name="profile_url"
                  label="Image Url (flicker, imgur, etc...)"
                  className="!w-[600px]"
                  defaultValue={avatar}
                  icon={{
                    icon: faGlobe
                  }}
                ></UserInput>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={(e) => {
                    handleProfileURLChange(e.currentTarget.value);
                  }}
                  className="w-3/4 mt-4"
                >
                  Update
                </Button>
              </GenericDialogPanel>
            </AnimationComponent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
