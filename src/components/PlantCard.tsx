import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlantCardProps {
  image?: string;
  title: string;
  status: string;
  statusType: "healthy" | "warning" | "danger";
  isEmpty?: boolean;
}

export const PlantCard = ({
  image,
  title,
  status,
  statusType,
  isEmpty,
}: PlantCardProps) => {
  if (isEmpty) {
    return (
      <Card className="p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
          <div className="p-4 bg-muted rounded-lg mb-3">
            <svg
              className="w-8 h-8 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            New scans will appear here
          </p>
        </div>
      </Card>
    );
  }

  const statusColors = {
    healthy: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 dark:bg-gray-900">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className={cn("text-sm font-medium", statusColors[statusType])}>
          {status}
        </p>
      </div>
    </Card>
  );
};
