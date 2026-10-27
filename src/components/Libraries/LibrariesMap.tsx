import type { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Library } from "../../shared/types/library.type";
import { Button } from "../ui/Button";

type LibrariesMapProps = {
  libraries: Library[];
  initialPosition?: LatLngTuple;
  handleSelect: (libraryId: string) => void;
  selectedId: string | null;
};

export function LibrariesMap({
  initialPosition = [50, 30],
  libraries,
  handleSelect,
  selectedId,
}: LibrariesMapProps) {
  return (
    <div
      role="region"
      aria-label="مواقع المكتبات"
      className="h-72 w-full overflow-hidden rounded-xl border border-secondary sm:h-96"
    >
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="مكتبات تطبيق بكسل"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {libraries.map((library) => {
          const isSelected = library.id === selectedId;
          return (
            <Marker key={library.id} position={library.coords as LatLngTuple}>
              <Popup>
                <div className="flex flex-col gap-2 items-center">
                  <strong>{library.title}</strong>

                  <span>{library.location}</span>

                  <Button
                    className={
                      isSelected
                        ? "border-secondary bg-background text-foreground hover:bg-secondary/50"
                        : ""
                    }
                    onClick={() => handleSelect(library.id)}
                  >
                    {isSelected ? "تم الاختيار" : "اختيار"}
                  </Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
