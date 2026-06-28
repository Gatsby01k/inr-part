import ApplicationForm from "@/components/ApplicationForm";
import BeforeAfter from "@/components/BeforeAfter";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PartnerScore from "@/components/PartnerScore";
import PortalPreview from "@/components/PortalPreview";
import Requirements from "@/components/Requirements";
import ReserveSection from "@/components/ReserveSection";
import TierCards from "@/components/TierCards";
import WhatYouGet from "@/components/WhatYouGet";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-ink">
      <Header />
      <Hero />
      <WhatYouGet />
      <HowItWorks />
      <ReserveSection />
      <PortalPreview />
      <PartnerScore />
      <TierCards />
      <BeforeAfter />
      <Requirements />
      <ApplicationForm />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
