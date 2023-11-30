import Button from "@/components/Button";
import {
  useCurrentEvent,
  useCurrentEventDispatch,
  useHomepageManager
} from "@/hooks";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Component = ({ next }: { next?: (...args: any) => void }) => {
  const currEvent = useCurrentEvent();
  const manager = useHomepageManager();
  const setEvent = useCurrentEventDispatch();

  const handleDelete = async () => {
    /* perform work */

    try {
      await manager({
        type: "event",
        mode: "delete",
        payload: currEvent! //this component only shows when there is a current event
      });
      setEvent(0);
      next && next();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="text-sm mb-8">
          <b>This action cannot be undone.</b>
        </div>
        <Button variant="secondary" onClick={handleDelete} icon={faTrash}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default {
  title: "Delete",
  description: "Are you sure you want to delete this event?",
  Component
} as const;
