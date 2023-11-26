import { Modal, ModalProps, useOpen } from "../Modal";
import styles from "./upgrade.module.css";
import { UpgradeProps } from "@/types";

export const Upgrade = ({ ...props }: UpgradeProps) => {
  const { isOpen, open, close } = useOpen();
  const {
    name,
    priceRange,
    currency,
    pricePerUpgrade,
    partySize,
    altText,
    subtitle,
    picture_url,
  } = props;

  const totalPrice = partySize * pricePerUpgrade;

  return (
    <div className={styles.upgrade_card}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${picture_url})`,
        }}
      />
      <div className="text-white p-2 flex flex-col justify-center h-max min-w-max">
        <div className="flex flex-col items-center">
          <h1>
            <b>{name}</b>
          </h1>
          <p>{priceRange}</p>
          <p>
            {currency}
            {pricePerUpgrade} / seat
          </p>
          <small>{subtitle}</small>
        </div>

        <button
          className="text-center p-1 rounded-xl bg-rose-800 text-sm"
          onClick={open}
        >
          {altText} - {currency}
          {totalPrice}
        </button>
      </div>
      <UpgradeModal isOpen={isOpen} close={close}>
        {"Coming Soon"}
      </UpgradeModal>
    </div>
  );
};

const UpgradeModal = ({ isOpen, close, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <Modal.Header title="Request Upgrade" />
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button onClick={close}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};
