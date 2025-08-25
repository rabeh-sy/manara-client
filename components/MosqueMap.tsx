'use client';

import { useEffect, useState, useRef } from 'react';
import { Mosque } from '@/lib/types';
import { MosqueCard } from './MosqueCard';

// Types for Leaflet
interface LeafletMap {
  remove: () => void;
}

interface LeafletMarker {
  remove: () => void;
}

interface LeafletContainer extends HTMLElement {
  _leaflet_id?: number;
}

// Extend Window interface
declare global {
  interface Window {
    selectMosque: (mosqueId: string) => void;
  }
}

// Dynamic imports for Leaflet to avoid SSR issues
const MosqueMapComponent = ({ mosques }: { mosques: Mosque[] }) => {
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [markers, setMarkers] = useState<LeafletMarker[]>([]);
  const mapInitialized = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Prevent multiple initializations
    if (mapInitialized.current) return;

    // Wait for mosques data to be available
    if (!mosques || mosques.length === 0) return;

    const initMap = async () => {
      try {
        const L = await import('leaflet');
        
        // Import Leaflet CSS only once
        const existingLink = document.querySelector('link[href*="leaflet.css"]');
        if (!existingLink) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // Check if map container exists
        const mapContainer = document.getElementById('mosque-map') as LeafletContainer;
        if (!mapContainer) return;

        // Check if Leaflet has already initialized this container
        if (mapContainer._leaflet_id) {
          return; // Container is already initialized, exit early
        }

        // Clear any existing content and remove any existing Leaflet classes
        mapContainer.innerHTML = '';
        mapContainer.className = mapContainer.className.replace(/leaflet-\S+/g, '').trim();
        mapContainer.className += ' w-full h-full rounded-lg';

        // Create map centered on Syria with scroll wheel zoom disabled
        const mapInstance = L.map('mosque-map', {
          scrollWheelZoom: false,
          doubleClickZoom: false
        }).setView([34.8021, 38.9968], 7);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        setMap(mapInstance);
        mapInitialized.current = true;

        // Create custom mosque icon
        const mosqueIcon = L.divIcon({
          html: `
            <div class="bg-[#103935] text-white rounded-full p-2 shadow-lg border-2 border-white" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zM6 19v-9l6-4.5 6 4.5v9H6z"/>
                <path d="M9 14h2v5H9zM13 14h2v5h-2z"/>
              </svg>
            </div>
          `,
          className: 'custom-mosque-icon',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        });

        // Add markers for each mosque with custom icon
        const mosqueMarkers = mosques.map(mosque => {
          const marker = L.marker([mosque.latitude, mosque.longitude], { icon: mosqueIcon })
            .addTo(mapInstance);

          // Show overlay card when marker is clicked
          marker.on('click', () => {
            setSelectedMosque(mosque);
          });

          return marker;
        });

        setMarkers(mosqueMarkers);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    // Cleanup function
    return () => {
      try {
        if (map) {
          map.remove();
          setMap(null);
        }
        
        // Clean up markers
        markers.forEach(marker => {
          if (marker && marker.remove) {
            marker.remove();
          }
        });
        setMarkers([]);
        
        // Clear the container and remove Leaflet ID
        const mapContainer = document.getElementById('mosque-map') as LeafletContainer;
        if (mapContainer) {
          mapContainer.innerHTML = '';
          delete mapContainer._leaflet_id;
          mapContainer.className = 'w-full h-full rounded-lg';
        }
        
        // Reset initialization flag
        mapInitialized.current = false;
      } catch (error) {
        console.error('Error during map cleanup:', error);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mosques]); // Run when mosques data changes

  return (
    <div className="relative w-full h-[600px]">
      <div id="mosque-map" className="w-full h-full rounded-lg"></div>
      
      {/* Selected Mosque Card Overlay */}
      {selectedMosque && (
        <div className="absolute top-4 right-4 map-overlay-card max-w-sm">
          <div className="bg-white rounded-lg shadow-2xl border relative">
            <MosqueCard mosque={selectedMosque} showDetails={true} />
            <button
              onClick={() => setSelectedMosque(null)}
              className="absolute top-2 left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MosqueMapComponent;
