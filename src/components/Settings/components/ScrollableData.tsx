'use client';
import {
  faCaretLeft,
  faCaretRight
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { ReactNode, useId, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function ScrollableData<T>({
  data,
  title,
  current,
  End,
  onClick,
  Component
}: {
  data: readonly T[] | T[];
  title?: string;
  current?: any;
  ref?: React.MutableRefObject<any>;
  onClick?: (value: T) => void;
  End?: () => JSX.Element;
  Component?: React.FC<T>;
}) {
  const [currentPage, setPage] = useState(1);
  const max_page = Math.ceil(data.length / 5);

  const displayData = data.slice(
    5 * (currentPage - 1),
    currentPage * 5
  );

  const id = useId();

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage === 1) return;
    setPage((prev) => prev - 1);
  };

  const Loader = () => {
    return (
      <div className="flex items-center w-full justify-apart px-4 relative">
        {currentPage > 1 && (
          <Backward
            className="dark:text-zinc-300 text-2xl dark:hover:text-zinc-400 transition-all"
            onClick={handlePrev}
          />
        )}
        <span className="w-full"> </span>

        <Forward
          className="dark:text-zinc-300  text-2xl dark:hover:text-zinc-400 transition-all cursor-pointer"
          onClick={handleNext}
        />
      </div>
    );
  };

  const EndMessage = () => {
    return (
      <>
        <p className="text-center">
          <span className="text-sm text-zinc-400">●</span>
        </p>
        {currentPage > 1 && (
          <Backward
            className="dark:text-zinc-300 text-2xl dark:hover:text-zinc-400 transition-all cursor-pointer"
            onClick={handlePrev}
          />
        )}
      </>
    );
  };

  return (
    <div className="overflow-y-auto min-w-fit h-full py-2 relative">
      {title && (
        <h2 className="px-2 font-semibold capitalize">{title}</h2>
      )}
      <InfiniteScroll
        className="!h-full"
        hasMore={currentPage < max_page}
        next={() => setPage((prev) => prev + 1)}
        scrollableTarget={id}
        loader={<Loader />}
        dataLength={data.length}
        endMessage={(End && <End />) || <EndMessage />}
      >
        <ul className="scale-95 relative" id={id}>
          {displayData.map((value, i) => {
            return (
              <li
                key={i}
                onClick={(e) => {
                  onClick && onClick(value);
                }}
              >
                {(Component && <Component key={i} {...value} />) || (
                  <p
                    className={
                      (current === value
                        ? "bg-zinc-600 rounded-2xl"
                        : "") +
                      " dark:text-zinc-300 dark:hover:!text-zinc-400 hover:hover:cursor-pointer  font-semibold  p-2 text-center capitalize"
                    }
                  >
                    {value as ReactNode}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

const Forward = ({ ...props }: Omit<FontAwesomeIconProps, "icon">) => {
  return <FontAwesomeIcon {...props} icon={faCaretRight} />;
};

const Backward = ({ ...props }: Omit<FontAwesomeIconProps, "icon">) => {
  return <FontAwesomeIcon {...props} icon={faCaretLeft} />;
};
