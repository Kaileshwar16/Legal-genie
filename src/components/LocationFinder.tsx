
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Loader2 } from "lucide-react";

interface Lawyer {
  name: string;
  address: string;
  rating: number;
  total_ratings: number;
  place_id: string;
  location: {
    lat: number;
    lng: number;
  };
  open_now?: boolean;
}

interface LocationFinderProps {
  onFindLawyers: (lat: number, lng: number) => Promise<Lawyer[]>;
}

export const LocationFinder = ({ onFindLawyers }: LocationFinderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [error, setError] = useState("");

  const handleFindNearbyLawyers = () => {
    setIsLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const foundLawyers = await onFindLawyers(latitude, longitude);
          setLawyers(foundLawyers);
        } catch (error) {
          console.error("Error finding lawyers:", error);
          setError("Failed to find nearby lawyers. Please try again.");
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(
          "Location access denied. Please enable location services and try again."
        );
        setIsLoading(false);
      }
    );
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Button
          onClick={handleFindNearbyLawyers}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          Find Lawyers Near Me
        </Button>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {lawyers.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Nearby Legal Professionals</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {lawyers.map((lawyer) => (
              <Card key={lawyer.place_id} className="p-3 text-sm">
                <h4 className="font-medium">{lawyer.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(lawyer.rating)}
                  <span className="text-xs text-gray-500">
                    ({lawyer.total_ratings})
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">{lawyer.address}</p>
                <div className="mt-1 text-xs">
                  {lawyer.open_now !== undefined && (
                    <span
                      className={
                        lawyer.open_now ? "text-green-600" : "text-red-600"
                      }
                    >
                      {lawyer.open_now ? "Open Now" : "Closed"}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
