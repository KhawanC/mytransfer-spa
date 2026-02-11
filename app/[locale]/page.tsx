import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ConversionCapabilities } from "@/components/landing/ConversionCapabilities";
import { PremiumBenefits } from "@/components/landing/PremiumBenefits";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <ConversionCapabilities />
        <PremiumBenefits />
      </main>
      <Footer />
    </div>
  );
}
