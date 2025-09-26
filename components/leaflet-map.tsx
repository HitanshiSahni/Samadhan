"use client"

import { useEffect, useRef } from "react"

interface ComplaintMarker {
  id: string
  lat: number
  lng: number
  title: string
  status: "open" | "in-progress" | "resolved"
  category: string
  priority?: string
}

interface LeafletMapProps {
  complaints: ComplaintMarker[]
  height?: string
  showHeatmap?: boolean
  onMarkerClick?: (complaint: ComplaintMarker) => void
  onMapClick?: (lat: number, lng: number) => void
  selectedLocation?: { lat: number; lng: number } | null
}

// Mock complaint locations for demo
const mockComplaintLocations: ComplaintMarker[] = [
  {
    id: "1",
    lat: 40.7128,
    lng: -74.006,
    title: "Pothole on Main Street",
    status: "in-progress",
    category: "road",
    priority: "high",
  },
  {
    id: "2",
    lat: 40.7589,
    lng: -73.9851,
    title: "Overflowing Garbage Bin",
    status: "open",
    category: "garbage",
    priority: "medium",
  },
  {
    id: "3",
    lat: 40.7505,
    lng: -73.9934,
    title: "Street Light Not Working",
    status: "resolved",
    category: "electricity",
    priority: "high",
  },
  {
    id: "4",
    lat: 40.7282,
    lng: -73.7949,
    title: "Water Leak",
    status: "in-progress",
    category: "water",
    priority: "high",
  },
]

export function LeafletMap({
  complaints = mockComplaintLocations,
  height = "h-64",
  showHeatmap = false,
  onMarkerClick,
  onMapClick,
  selectedLocation,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = (await import("leaflet")).default

      // Fix for default markers in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      // Initialize map
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([40.7128, -74.006], 12)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current)

        // Add click handler for map
        if (onMapClick) {
          mapInstanceRef.current.on("click", (e: any) => {
            onMapClick(e.latlng.lat, e.latlng.lng)
          })
        }
      }

      // Clear existing markers
      markersRef.current.forEach((marker) => {
        mapInstanceRef.current.removeLayer(marker)
      })
      markersRef.current = []

      // Add complaint markers
      complaints.forEach((complaint) => {
        const statusColors = {
          open: "#9E9E9E",
          "in-progress": "#1976D2",
          resolved: "#2E7D32",
        }

        const prioritySize = complaint.priority === "high" ? 12 : complaint.priority === "medium" ? 10 : 8

        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              width: ${prioritySize}px;
              height: ${prioritySize}px;
              background-color: ${statusColors[complaint.status]};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
          `,
          iconSize: [prioritySize, prioritySize],
          iconAnchor: [prioritySize / 2, prioritySize / 2],
        })

        const marker = L.marker([complaint.lat, complaint.lng], { icon: customIcon }).addTo(mapInstanceRef.current)

        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${complaint.title}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Status: ${complaint.status}</p>
            <p style="margin: 0; font-size: 12px; color: #666;">Category: ${complaint.category}</p>
          </div>
        `)

        if (onMarkerClick) {
          marker.on("click", () => onMarkerClick(complaint))
        }

        markersRef.current.push(marker)
      })

      // Add selected location marker if provided
      if (selectedLocation) {
        const selectedIcon = L.divIcon({
          className: "selected-marker",
          html: `
            <div style="
              width: 16px;
              height: 16px;
              background-color: #2E7D32;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(46, 125, 50, 0.4);
            "></div>
          `,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })

        const selectedMarker = L.marker([selectedLocation.lat, selectedLocation.lng], {
          icon: selectedIcon,
        }).addTo(mapInstanceRef.current)

        selectedMarker.bindPopup("Selected Location")
        markersRef.current.push(selectedMarker)
      }

      // Add heatmap if requested (simplified version)
      if (showHeatmap && complaints.length > 0) {
        const heatmapData = complaints.map((complaint) => [complaint.lat, complaint.lng, 1])

        // Create a simple circle overlay for heatmap effect
        complaints.forEach((complaint) => {
          const circle = L.circle([complaint.lat, complaint.lng], {
            color: "#2E7D32",
            fillColor: "#A5D6A7",
            fillOpacity: 0.2,
            radius: 500,
          }).addTo(mapInstanceRef.current)

          markersRef.current.push(circle)
        })
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [complaints, showHeatmap, selectedLocation, onMarkerClick, onMapClick])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div ref={mapRef} className={`w-full ${height} rounded-2xl overflow-hidden border`} />
    </>
  )
}
