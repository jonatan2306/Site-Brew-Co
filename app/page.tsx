import Hero from "@/components/home/Hero";
import FeaturedItems from "@/components/home/FeaturedItems";
import EventsSection from "@/components/home/EventsSection";
import ReservationSection from "@/components/home/ReservationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedItems />
      <EventsSection />
      <ReservationSection />
    </>
  );
}
