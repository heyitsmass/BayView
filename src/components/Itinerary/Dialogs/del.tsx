import Button from "@/components/Button";
import {
  useCurrentEvent,
  useCurrentEventDispatch,
  useHomepageManager,
} from "@/hooks";

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
        payload: currEvent,
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
        <div className="text-sm">This action cannot be undone.</div>
        <Button variant="secondary" className="mt-4" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default {
  title: "Delete",
  description: "Are you sure you want to delete this event?",
  Component,
} as const;
