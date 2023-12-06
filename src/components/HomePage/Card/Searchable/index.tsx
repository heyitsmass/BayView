import Button from "@/components/Button";
import { PrebuiltDialog } from "@/components/Dialog";
import Card, { CardProps } from "@/components/HomePage/Card";
import { SearchResult } from "@/components/Itinerary/EventList";

import React, {
  PropsWithChildren,
  Suspense,
  SyntheticEvent,
  useEffect,
  useState
} from "react";

import IconMap from "@/components/Itinerary/Icons";
import { Loading } from "@/components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHomepageManager } from "@/hooks";
import { THomepageManager } from "@/context";
import { DisplayableEvent } from "../../EventFinder";
import { AnimatePresence } from "framer-motion";
import { BlurOpacityAnimation } from "@/components/Animations/AnimatePresenceComponent";
import { TEventQuery } from "@/types/Event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPenToSquare
} from "@fortawesome/free-solid-svg-icons";

type SearchableCardProps = PropsWithChildren<
  CardProps & {
    btnTxt: string;
    handleSearch: (
      formData: FormData
    ) => Promise<DisplayableEvent[] | null>;
  }
>;

export const SearchableCard = ({
  title,
  subtitle,
  children,
  btnTxt,
  disabled,
  handleSearch
}: SearchableCardProps) => {
  const [data, setData] = useState(null as DisplayableEvent[] | null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setIsSubmitted(true);
    throw new Promise((resolve) =>
      setTimeout(() => {
        resolve(handleSearch(formData));
      }, 1000)
    ).then((data) => setData(data as DisplayableEvent[]));
  };

  const handleReset = () => {
    setData(null);
    setIsSubmitted(false);
  };

  const [activeTitle, setTitle] = useState(title);
  const [activeSubtitle, setSubtitle] = useState(subtitle);

  const isPending = isSubmitted && !data;

  useEffect(() => {
    if (isPending) {
      setTitle("Fetching Results...");
      setSubtitle("This should only take a moment.");
    } else {
      setTitle(title);
      setSubtitle(subtitle);
    }
  }, [isPending, setTitle, title, subtitle]);

  return (
    <Card
      title={activeTitle}
      subtitle={activeSubtitle}
      contentPending={isPending}
    >
      <BlurOpacityAnimation transitionOn={isPending}>
        {!isSubmitted && (
          <form action={handleSubmit}>
            <FormFields>
              {children}
              <Button
                variant="secondary"
                className="mt-4"
                type="submit"
                disabled={disabled}
              >
                {btnTxt}
              </Button>
            </FormFields>
          </form>
        )}

        {isSubmitted && (
          <>
            {!isPending && <EditSelection />}
            <SearchResults data={data} handleReset={handleReset} />
          </>
        )}
      </BlurOpacityAnimation>
    </Card>
  );
};

const EditSelection = () => {
  const selectedOption = "";

  const partySize = 0;

  const prettyPrintDate = (dateString) => {
    const d = new Date(dateString);
    return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
      .getDate()
      .toString()
      .padStart(2, "0")}/${d.getFullYear().toString().slice(-2)}`;
  };

  const dateTo: Date = new Date();
  const dateFrom: Date = new Date();

  const extra = "";

  const handleEdit = () => {};

  return (
    <div className="w-full flex justify-end mb-4 z-10">
      <div className="w-min flex p-4 rounded-2xl border-2 dark:border-zinc-700  bg-zinc-700 self-end">
        <div className="w-4/6 justify-between text-sm px-2">
          <h6>Party Size: {partySize}</h6>
          <div className="flex-row">
            <div className="flex text-zinc-400">
              <h6 className="text-sm">{selectedOption}</h6>
            </div>
            <div className="flex text-zinc-400">
              <h6 className="text-sm">{extra}</h6>
            </div>
            <div className="flex text-zinc-400 min-w-max">
              <h6 className="text-sm">{prettyPrintDate(dateFrom)}</h6>
              {dateTo && (
                <>
                  <FontAwesomeIcon
                    className="w-3 px-0.5 mt-1"
                    size="sm"
                    icon={faArrowRight}
                  />
                  <h6 className="text-sm"> {prettyPrintDate(dateTo)}</h6>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-3/6 flex align-top justify-center">
          <Button
            className="h-min"
            onClick={(e) => {
              e.preventDefault();
              handleEdit();
            }}
            variant="primary"
            icon={faPenToSquare}
            style={{ fontFamily: "var(--font-barlow-semi-condensed)" }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

const FormFields = ({ children }: PropsWithChildren<{}>) => {
  return <>{children}</>;
};

const SearchResults = ({
  params,
  data,
  handleReset
}: {
  params?: TEventQuery;
  data?: DisplayableEvent[] | null;
  handleReset: () => void;
}) => {
  let manager: THomepageManager;
  try {
    manager = useHomepageManager();
  } catch (err) {
    throw new Error(
      "useHomepageManager() must be called within a HomepageProvider"
    );
  }

  const [currentPage, setPage] = useState(1);

  const [currEvent, setCurrEvent] = useState(
    null as DisplayableEvent | null
  );

  const displayedOffers = data?.slice(0, currentPage * 10);

  if (!data) return null;

  const onReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setCurrEvent(null);
    handleReset();
  };

  const onAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!currEvent) return;

    try {
      await manager({
        type: "event",
        mode: "add",
        payload: currEvent
      });
      setCurrEvent(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AnimatePresence>
      {displayedOffers && (
        <>
          <div id="scrollArea" className="max-h-[300px] overflow-y-auto">
            <InfiniteScroll
              hasMore={displayedOffers.length < data!.length}
              next={() => setPage((prev) => prev + 1)}
              loader={<Loading />}
              dataLength={data.length}
              endMessage={<EndMessage />}
              scrollableTarget="scrollArea"
              key="1"
            >
              {displayedOffers.map((event, i) => (
                <SearchResult
                  key={i}
                  isOpen={currEvent === event}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrEvent(event);
                  }}
                  offer={event.offer}
                  icon={IconMap[event.__t]}
                />
              ))}
            </InfiniteScroll>
          </div>
          {currEvent && (
            <PrebuiltDialog
              open={currEvent !== null}
              onClose={() => setCurrEvent(null)}
              title={currEvent.name}
              key="1"
            >
              <div className="flex flex-col text-center">
                <pre>
                  <code>
                    {JSON.stringify(currEvent.displayData, null, 2)}
                  </code>
                </pre>
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={onAdd}
                >
                  Add to Itinerary
                </Button>
              </div>
            </PrebuiltDialog>
          )}
        </>
      )}
      <Button variant="secondary" className="!mt-4" onClick={onReset}>
        Reset
      </Button>
    </AnimatePresence>
  );
};

const ResultsDisplay = React.lazy(async () => {
  return {
    default: SearchResults
  };
});

const EndMessage = () => {
  return (
    <>
      <p className="text-center text-zinc-400">
        End of List <span className="text-2xl pl-2">🛫</span>
      </p>
      <p className="text-center mb-2">
        <span className="text-lg text-zinc-400">●</span>
      </p>
    </>
  );
};
