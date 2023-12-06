'use client';
import { Loading } from "@/components/Loading";
import { GoogleMap } from "@/components/Maps";
import { useCurrentEvent, useGeocoder } from "@/hooks";

const Component = () => {
  const event = useCurrentEvent();

  const geocode = useGeocoder(event!.location);

  if(!geocode) return <Loading />; 

  console.log(geocode);
  
  return (
    <div className="h-[400px] w-[800px] z-0 relative">
      <GoogleMap origin={geocode}/>
    </div>
  );
};

export default {
  title: "Map",
  description: "See where you're going!",
  Component
} as const;
