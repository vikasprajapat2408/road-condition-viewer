import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, MapPin, Route, AlertTriangle, Activity, User } from "lucide-react";
import DefectiveRoadMap from "@/components/DefectiveRoadMap";
import RoadConditionMap from "@/components/RoadConditionMap";
import DefectivePointDetail from "@/components/DefectivePointDetail";
import RoadSectionDetail from "@/components/RoadSectionDetail";
import { defectivePoints, roadSections, DefectivePoint, RoadSection } from "@/data/roadData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("defective");
  const [selectedPoint, setSelectedPoint] = useState<DefectivePoint | null>(null);
  const [selectedSection, setSelectedSection] = useState<RoadSection | null>(null);
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const criticalCount = defectivePoints.filter((p) => p.severity === "critical").length;
  const poorRoadsCount = roadSections.filter((s) => s.status === "poor" || s.status === "critical").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-card">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Road Monitor</h1>
                <p className="text-xs text-muted-foreground">Infrastructure Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Stats */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">{criticalCount} Critical</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-lg">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-600">{poorRoadsCount} Need Repair</span>
                </div>
              </div>

              {/* User */}
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{username}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto bg-secondary/50">
            <TabsTrigger value="defective" className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Defective Road</span>
              <Badge variant="secondary" className="ml-1 bg-destructive/10 text-destructive">
                {defectivePoints.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="condition" className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Route className="w-4 h-4" />
              <span>Road Condition</span>
              <Badge variant="secondary" className="ml-1">
                {roadSections.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Defective Road Tab */}
          <TabsContent value="defective" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2">
                <Card className="shadow-card-lg border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-[500px] lg:h-[600px]">
                      <DefectiveRoadMap
                        points={defectivePoints}
                        selectedPoint={selectedPoint}
                        onPointSelect={setSelectedPoint}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-1">
                {selectedPoint ? (
                  <DefectivePointDetail point={selectedPoint} onClose={() => setSelectedPoint(null)} />
                ) : (
                  <Card className="shadow-card border-0">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Select a Point</h3>
                      <p className="text-sm text-muted-foreground">
                        Click on any marker on the map to view details about the road defect, including location, severity, and images.
                      </p>
                      <div className="mt-6 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Legend</p>
                        <div className="flex flex-wrap justify-center gap-3 text-xs">
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-road-critical"></span> Critical
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-orange-500"></span> High
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-road-moderate"></span> Medium
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-road-good"></span> Low
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Points List */}
                <Card className="mt-4 shadow-card border-0">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-3">All Defects ({defectivePoints.length})</h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {defectivePoints.map((point) => (
                        <button
                          key={point.id}
                          onClick={() => setSelectedPoint(point)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            selectedPoint?.id === point.id
                              ? "bg-primary/10 border border-primary/20"
                              : "bg-secondary/50 hover:bg-secondary"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                point.severity === "critical"
                                  ? "bg-road-critical"
                                  : point.severity === "high"
                                  ? "bg-orange-500"
                                  : point.severity === "medium"
                                  ? "bg-road-moderate"
                                  : "bg-road-good"
                              }`}
                            ></span>
                            <span className="text-sm font-medium truncate">{point.location}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Road Condition Tab */}
          <TabsContent value="condition" className="mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2">
                <Card className="shadow-card-lg border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-[500px] lg:h-[600px]">
                      <RoadConditionMap
                        sections={roadSections}
                        selectedSection={selectedSection}
                        onSectionSelect={setSelectedSection}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detail Panel */}
              <div className="lg:col-span-1">
                {selectedSection ? (
                  <RoadSectionDetail section={selectedSection} onClose={() => setSelectedSection(null)} />
                ) : (
                  <Card className="shadow-card border-0">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Route className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Select a Section</h3>
                      <p className="text-sm text-muted-foreground">
                        Click on any road section on the map to view its condition percentage, last inspection date, and maintenance status.
                      </p>
                      <div className="mt-6 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Legend</p>
                        <div className="flex flex-wrap justify-center gap-3 text-xs">
                          <span className="flex items-center gap-1.5">
                            <span className="w-4 h-1 rounded bg-road-good"></span> Good (70%+)
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-4 h-1 rounded bg-road-moderate"></span> Moderate (50-69%)
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-4 h-1 rounded bg-orange-500"></span> Poor (30-49%)
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-4 h-1 rounded bg-road-critical"></span> Critical (&lt;30%)
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Sections List */}
                <Card className="mt-4 shadow-card border-0">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-3">All Sections ({roadSections.length})</h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {roadSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setSelectedSection(section)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            selectedSection?.id === section.id
                              ? "bg-primary/10 border border-primary/20"
                              : "bg-secondary/50 hover:bg-secondary"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">{section.name}</span>
                            <span
                              className={`text-sm font-bold ${
                                section.conditionPercent >= 70
                                  ? "text-road-good"
                                  : section.conditionPercent >= 50
                                  ? "text-road-moderate"
                                  : section.conditionPercent >= 30
                                  ? "text-orange-500"
                                  : "text-road-critical"
                              }`}
                            >
                              {section.conditionPercent}%
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
