import { FunctionComponent, ReactNode } from "react";
import { Dialog } from "@reach/dialog";

import "@reach/dialog/styles.css";

interface Props {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
  children: ReactNode;
}

const Modal: FunctionComponent<Props> = ({
  children,
  showDialog,
  setShowDialog,
}) => {
  return (
    <Dialog
      aria-label="dialog"
      style={{ color: "red" }}
      isOpen={showDialog}
      onDismiss={() => setShowDialog(false)}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
