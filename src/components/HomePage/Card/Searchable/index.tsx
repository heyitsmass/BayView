import Button from "@/components/Button";
import { PrebuiltDialog } from "@/components/Dialog";
import Card, { CardProps } from "@/components/HomePage/Card";
import { SearchResult } from "@/components/Itinerary/EventList";
import { DisplayableEvent } from "@/lib/random/handler";
import {
  PropsWithChildren,
  Suspense,
  SyntheticEvent,
  useState
} from "react";

import IconMap from "@/components/Itinerary/Icons";
import { Loading } from "@/components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHomepageManager } from "@/hooks";
import { THomepageManager } from "@/context";

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
  handleSearch
}: SearchableCardProps) => {
  const [data, setData] = useState(null as DisplayableEvent[] | null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const set = await handleSearch(formData);

    setData(set);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setData(null);
    setIsSubmitted(false);
  };

  return (
    <Card title={title} subtitle={subtitle}>
      {!isSubmitted && (
        <form action={handleSubmit}>
          <FormFields>
            {children}
            <Button variant="secondary" className="mt-4" type="submit">
              {btnTxt}
            </Button>
          </FormFields>
        </form>
      )}
      {isSubmitted && (
        <SearchResults data={data} handleReset={handleReset} />
      )}
    </Card>
  );
};

const FormFields = ({ children }: PropsWithChildren<{}>) => {
  return <>{children}</>;
};

const SearchResults = ({
  data: data,
  handleReset
}: {
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

  const displayedOffers = data?.slice(0, currentPage * 10);

  const [currEvent, setCurrEvent] = useState(
    null as DisplayableEvent | null
  );

  if (!data) {
    return null;
  }

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
    <Suspense fallback={<div>Loading...</div>}>
      {displayedOffers && (
        <>
          <div id="scrollArea" className="max-h-[300px] overflow-y-auto">
            <InfiniteScroll
              hasMore={displayedOffers.length < displayedOffers!.length}
              next={() => setPage((prev) => prev + 1)}
              loader={<Loading />}
              dataLength={displayedOffers.length}
              endMessage={<EndMessage />}
              scrollableTarget="scrollArea"
            >
              {displayedOffers!.map((event, i) => (
                <SearchResult
                  isOpen={currEvent === event}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrEvent(event);
                  }}
                  offer={event.offer}
                  icon={IconMap[event.__t]}
                  key={i}
                />
              ))}
            </InfiniteScroll>
          </div>
          {currEvent && (
            <PrebuiltDialog
              open={currEvent !== null}
              onClose={() => setCurrEvent(null)}
              title={currEvent.name}
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
    </Suspense>
  );
};

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
