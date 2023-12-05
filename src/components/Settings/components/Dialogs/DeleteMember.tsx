import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import Button from "@/components/Button";
import { GenericDialogPanel } from "@/components/Dialog/GenericPanel";
import { useHomepageManager } from "@/hooks";
import { Dialog } from "@headlessui/react";

export const DeleteMember = ({
  ...props
}: {
  _id: string; // id of member
  name: {
    first: string;
    last?: string;
  }; // name of member
  open: boolean;
  onClose: () => void;
}) => {
  const manager = useHomepageManager();

  const handleMemberDelete = async (_id: string) => {
    try {
      await manager({
        type: "party_member",
        mode: "delete",
        payload: {
          member_id: _id
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      className="border w-max p-4 rounded-2xl dark:bg-zinc-700 dark:border-zinc-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      open={props.open}
      onClose={props.onClose}
    >
      <AnimationComponent>
        <Dialog.Backdrop
          onClick={props.onClose}
          className="bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg"
        ></Dialog.Backdrop>
      </AnimationComponent>

      <AnimationComponent>
        <GenericDialogPanel
          title="Confirm Delete"
          description={`Are you sure you want to delete ${
            props.name.first
          }${" " + props.name.last} from your party?`}
        >
          <div className="flex gap-4">
            <Button
              onClick={(e) => handleMemberDelete(props._id)}
              variant="secondary"
            >
              Delete
            </Button>
            <Button onClick={props.onClose} variant="primary">
              Cancel
            </Button>
          </div>
        </GenericDialogPanel>
      </AnimationComponent>
    </Dialog>
  );
};
