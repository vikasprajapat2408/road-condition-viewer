import type { DefectivePoint } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DefectivePointDetailProps {
  point: DefectivePoint;
  onClose: () => void;
}

const DefectivePointDetail = ({ point, onClose }: DefectivePointDetailProps) => {
  const severityConfig = {
    critical: { label: "Critical", className: "badge-poor" },
    high: { label: "High", className: "badge-moderate" },
    medium: { label: "Medium", className: "bg-amber-100 text-amber-700" },
    low: { label: "Low", className: "badge-good" },
  };

  const config = severityConfig[point.severity];

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
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-lg">Defect Report</CardTitle>
        </div>
        <Badge className={`${config.className} w-fit`}>{config.label} Severity</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={point.image}
            alt="Road defect"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Location</p>
            <p className="text-sm text-muted-foreground">{point.location}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Reported Date</p>
            <p className="text-sm text-muted-foreground">
              {new Date(point.reportedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="pt-3 border-t border-border">
          <p className="text-sm font-medium mb-2">Description</p>
          <p className="text-sm text-muted-foreground">{point.description}</p>
        </div>

        {/* Coordinates */}
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs font-mono text-muted-foreground">
            Coordinates: {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefectivePointDetail;
