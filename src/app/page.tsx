"use client";

import NavbarWrapper from "@/components/navbar-wrapper";
import { HeroSectionWithBeamsAndGrid } from "@/components/homepage/new-hero";
import { FeatureShowcaseCard } from "@/components/homepage/feature-showcase-card";
import FeaturesGrid from "@/components/features-grid";
import Footer from "@/components/homepage/footer";

export default function Home() {

  return (
    <>
      <NavbarWrapper />
      <div className="site-container py-12">
        <HeroSectionWithBeamsAndGrid />
        <FeatureShowcaseCard />
        <FeaturesGrid />
      </div>
      <Footer />
    </>
  );
}
