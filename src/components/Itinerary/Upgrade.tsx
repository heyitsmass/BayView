import { UpgradeProps } from "@/types";
import { ManagedModal, Modal } from "../Modal";
import styles from "./upgrade.module.css";

export const Upgrade = ({ ...props }: UpgradeProps) => {
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

        <ManagedModal
          btn={
            <button className="text-center p-1 rounded-xl bg-rose-800 text-sm">
              {altText} - {currency}
              {totalPrice}
            </button>
          }
        >
          <Modal.Header title="Request Upgrade" />
          <Modal.Body>
            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-center">
                <b>Coming Soon!</b>
              </p>
            </div>
          </Modal.Body>
        </ManagedModal>
      </div>
    </div>
  );
};
