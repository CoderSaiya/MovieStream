import { Heart, MonitorPlay, Search } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { JSX } from "react";
import { FeatureItem } from "@/types";

export function Features(): JSX.Element {
  const features: FeatureItem[] = [
    {
      icon: Search,
      title: "Search",
      description: "Over 10,000 movies and TV shows to choose from",
    },
    {
      icon: MonitorPlay,
      title: "Stream",
      description: "Watch on any device with HD quality",
    },
    {
      icon: Heart,
      title: "Enjoy",
      description: "Save your favorites and watch later",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10 mb-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
