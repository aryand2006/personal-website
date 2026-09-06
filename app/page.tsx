import Hero from "@/components/Hero";
import HomeGateways from "@/components/HomeGateways";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />
        <HomeGateways />
      </div>
    </>
  );
}
