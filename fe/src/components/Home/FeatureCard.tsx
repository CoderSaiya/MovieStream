import { FeatureCardProps } from "@/types";
import React from "react";

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0
}) => (
  <div
    data-aos="fade-up"
    data-aos-delay={delay}
    data-aos-duration="1000"
    className="flex flex-col items-center justify-between h-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
    <div className="flex flex-col items-center space-y-4">
      <div className="rounded-full bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-center text-lg font-medium">{title}</h3>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);