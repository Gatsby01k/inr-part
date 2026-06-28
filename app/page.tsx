import ApplicationForm from "@/components/ApplicationForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NetworkSection from "@/components/NetworkSection";
import PartnerScore from "@/components/PartnerScore";
import PortalPreview from "@/components/PortalPreview";
import TierCards from "@/components/TierCards";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-slate-100">
      <Header />
      <Hero />
      <NetworkSection />
      <HowItWorks />
      <TierCards />
      <PortalPreview />
      <PartnerScore />
      <ApplicationForm />
      <FAQ />
      <Footer />
    </main>
  );
}
