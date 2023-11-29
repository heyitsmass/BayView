import { Upgrades as UpgradesProps } from "@/types";
import { Upgrade } from "./Upgrade";

export const Upgrades = ({ options }: { options?: UpgradesProps }) => {
  if (options) {
    return (
      <>
        <h2 className="text-lg truncate ellipsis">
          <b>{options.title} </b>- {options.currentUpgrade} (
          {options.currency}
          {options.currentPrice})
        </h2>
        <div className="w-full flex overflow-x-auto h-min whitespace-nowrap gap-4 py-2">
          {options.upgrades.map((upgrade, i) => (
            <Upgrade key={i} {...upgrade} {...options} />
          ))}
        </div>
      </>
    );
  }
  return (
    <div
      className="flex w-full h-full items-center justify-center italic p-4"
      style={{ opacity: 0.8 }}
    >
      <p>No Upgrades available</p>
    </div>
  );
};
