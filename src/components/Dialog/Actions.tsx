import { useCurrentEvent } from "@/hooks";
import { ContainedDialog, CustomDialogProps } from ".";
import { ActionMethods } from "../Itinerary/Actions";
import dialogs from "../Itinerary/Dialogs";

type ActionDialogProps<T extends ActionMethods> = Omit<
  CustomDialogProps<{
    btn: JSX.Element;
    type: T;
  }>,
  "title" | "description"
>;

export function ActionsDialog<T extends ActionMethods>({
  type,
  ...props
}: ActionDialogProps<T>) {
  const currEvent = useCurrentEvent();

  if (!currEvent) throw new Error("No current event");

  return <ContainedDialog {...props} {...dialogs[type]} />;
}
