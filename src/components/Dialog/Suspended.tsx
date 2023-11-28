import { Suspense } from "react";
import { CustomDialogProps, PrebuiltDialog } from ".";
import { Loading } from "../Loading";

export const SuspendedDialog = ({
  ...props
}: CustomDialogProps<{ fb?: JSX.Element }>) => {
  return (
    <Suspense fallback={props.fb || <Loading />}>
      <PrebuiltDialog {...props}>{props.children}</PrebuiltDialog>
    </Suspense>
  );
};
