
import styles from "./upgrade.module.css";
import { UpgradeProps } from "@/types";

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

        <button className="text-center p-1 rounded-xl bg-rose-800 text-sm">
          {altText} - {currency}
          {totalPrice}
        </button>
      </div>
    </div>
  );
};
