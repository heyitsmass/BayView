import Button from "@/components/Button";
import { useCurrentEvent, useHomepageManager } from "@/hooks";

const Component = ({ next }: { next?: (...args: any) => void }) => {
  const manager = useHomepageManager();
  const currEvent = useCurrentEvent();

  const handleRefresh = async (e) => {
    e.preventDefault();
    try {
      await manager({
        type: "event",
        mode: "refresh",
        payload: currEvent,
      });
      next && next();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Button
          variant="secondary"
          className="mt-4"
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>
    </>
  );
};

export default {
  title: "Refresh",
  description: "Check for updates to your event!",
  Component,
} as const;
