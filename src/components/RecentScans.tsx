import { PlantCard } from "./PlantCard";
import maizeLeaf from "@/assets/maize-leaf.jpeg";
import tomatoPlant from "@/assets/tomato-plant.jpg";
import soybeanCrop from "@/assets/soybean.jpg";

export const RecentScans: React.FC = () => {
  const scans = [
    {
      image: maizeLeaf,
      title: "Maize leaf",
      status: "Rust detected",
      statusType: "danger" as const,
    },
    {
      image: tomatoPlant,
      title: "Tomato plant",
      status: "Healthy",
      statusType: "healthy" as const,
    },
    {
      image: soybeanCrop,
      title: "Soybean crop",
      status: "Nitrogen deficiency",
      statusType: "warning" as const,
    },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">
        Recent disease scans
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground mb-4">
        Review the last crops you scanned and track how issues evolve over time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {scans.map((scan, index) => (
          <PlantCard key={index} {...scan} />
        ))}
        <PlantCard title="" status="" statusType="healthy" isEmpty />
      </div>
    </section>
  );
};
