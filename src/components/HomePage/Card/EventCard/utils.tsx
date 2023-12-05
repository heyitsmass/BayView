import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";
import { TEventType } from "@/types/Event";

export function EventDropdown<T extends TEventType>({
  data,
  event,
  setEvent
}: {
  data: readonly T[];
  event: T;
  setEvent: (...values: any) => void;
}) {
  return (
    <>
      <ScrollableDropdown
        btnName="Event Type"
        title="Select Type"
        onSubmit={setEvent}
        peek={event}
        data={data}
      />
    </>
  );
}
