'use client';
import { ScrollableDropdown } from "@/components/Settings/components/Dropdowns";
import { TEventType } from "@/types/Event";
import { useState } from "react";

export function useCurrentValue<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  return [value, setValue] as const;
}

export function EventDropdown<T extends TEventType>({
  data,
  event,
  className,
  setEvent
}: {
  data: readonly T[];
  event: T;
  className?: string;
  setEvent: (...values: any) => void;
}) {
  return (
    <ScrollableDropdown
      btnClassName={className + " !w-full"}
      btnName="Event Type"
      title="Select Type"
      onSubmit={setEvent}
      curr={event}
      data={data}
    />
  );
}
