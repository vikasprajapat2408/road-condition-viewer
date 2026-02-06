import { RoadSection } from "@/data/roadData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Route, Calendar, Ruler, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadSectionDetailProps {
  section: RoadSection;
  onClose: () => void;
}

const RoadSectionDetail = ({ section, onClose }: RoadSectionDetailProps) => {
  const statusConfig = {
    good: { label: "Good Condition", className: "badge-good", color: "bg-road-good" },
    moderate: { label: "Moderate Wear", className: "badge-moderate", color: "bg-road-moderate" },
    poor: { label: "Poor Condition", className: "badge-poor", color: "bg-road-poor" },
    critical: { label: "Critical", className: "badge-poor", color: "bg-road-critical" },
  };

  const config = statusConfig[section.status];

  const getProgressColor = (percent: number) => {
    if (percent >= 70) return "bg-road-good";
    if (percent >= 50) return "bg-road-moderate";
    if (percent >= 30) return "bg-road-poor";
    return "bg-road-critical";
  };

  return (
    <Card className="shadow-card-lg border-0 animate-slide-up overflow-hidden">
      <CardHeader className="pb-3 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2 mb-2">
          <Route className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Road Section</CardTitle>
        </div>
        <Badge className={`${config.className} w-fit`}>{config.label}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Section Name */}
        <div>
          <h3 className="text-xl font-semibold">{section.name}</h3>
        </div>

        {/* Condition Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Road Condition</span>
            <span className="text-2xl font-bold">{section.conditionPercent}%</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full transition-all duration-500 ${getProgressColor(section.conditionPercent)}`}
              style={{ width: `${section.conditionPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {section.conditionPercent >= 70 && "Road is in good usable condition"}
            {section.conditionPercent >= 50 && section.conditionPercent < 70 && "Some wear detected, maintenance recommended"}
            {section.conditionPercent >= 30 && section.conditionPercent < 50 && "Significant wear, requires attention"}
            {section.conditionPercent < 30 && "Critical condition, immediate repair needed"}
          </p>
        </div>

        {/* Length */}
        <div className="flex items-start gap-3">
          <Ruler className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Section Length</p>
            <p className="text-sm text-muted-foreground">{section.length}</p>
          </div>
        </div>

        {/* Last Inspection */}
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Last Inspection</p>
            <p className="text-sm text-muted-foreground">
              {new Date(section.lastInspection).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{section.conditionPercent}%</p>
            <p className="text-xs text-muted-foreground">Usable</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{100 - section.conditionPercent}%</p>
            <p className="text-xs text-muted-foreground">Degraded</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadSectionDetail;
