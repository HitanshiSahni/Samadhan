import { MapPin } from "lucide-react"

export function MapPlaceholder() {
  return (
    <div className="w-full h-64 bg-muted/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
      <div className="text-center">
        <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
        <p className="text-muted-foreground font-medium">Interactive Map</p>
        <p className="text-sm text-muted-foreground">Leaflet.js integration will be added here</p>
      </div>
    </div>
  )
}
