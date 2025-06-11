// components/LiveUserGlobe.tsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";

interface UserLocation {
  id: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  name?: string; // Add city name
  users?: number; // Add user count
}

const LAND_REGIONS = [
  // North America (avoiding oceans)
  { latMin: 30, latMax: 50, lngMin: -125, lngMax: -70 },
  // Europe
  { latMin: 40, latMax: 60, lngMin: -10, lngMax: 40 },
  // Asia
  { latMin: 30, latMax: 50, lngMin: 60, lngMax: 100 },
  // South America
  { latMin: -5, latMax: 10, lngMin: -80, lngMax: -60 },
];

const LiveUserGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [activeLocations, setActiveLocations] = useState<UserLocation[]>([]);
  const [hoveredLocation, setHoveredLocation] = useState<UserLocation | null>(
    null
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const markersRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number>(0);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const controlsRef = useRef<OrbitControls | null>(null);

  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Corrected lat/lng to 3D position conversion
  const latLngToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Handle mouse move for hover detection
  const handleMouseMove = (event: MouseEvent) => {
    if (
      !containerRef.current ||
      !markersRef.current ||
      !cameraRef.current ||
      !controlsRef.current
    )
      return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

    // Increase the threshold for intersection detection
    const intersects = raycasterRef.current.intersectObjects(
      markersRef.current.children,
      true
    );

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const markerGroup = intersect.object.parent;

      if (markerGroup && markerGroup.userData.location) {
        const location = markerGroup.userData.location;
        setHoveredLocation(location);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
        setShowTooltip(true);
        controlsRef.current.autoRotate = false;
        return;
      }
    }

    // If no intersection, hide tooltip and resume rotation
    if (showTooltip) {
      setShowTooltip(false);
      setHoveredLocation(null);
      controlsRef.current.autoRotate = true;
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setHoveredLocation(null);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = true;
    }
  };

  // Initialize scene
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x020817, 400, 2000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000
    );

    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.6,
      0.8
    );
    composer.addPass(bloomPass);

    const filmPass = new FilmPass(0.15, 0.25, 1500, 0);
    composer.addPass(filmPass);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 300;
    controls.maxDistance = 600;
    controlsRef.current = controls;

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1800 + Math.random() * 200;
      starVertices.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Globe
    const globeGeometry = new THREE.SphereGeometry(170, 64, 64);
    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load("/earth_atmos_2048.jpg");
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      normalScale: new THREE.Vector2(0.6, 0.6),
      transparent: true,
      opacity: 0.98,
      shininess: 5,
      specular: 0x111111,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);

    scene.add(globe);
    globeRef.current = globe;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x808080, 1.63);
    scene.add(ambientLight);

    // Markers group
    const markers = new THREE.Group();

    scene.add(markers);
    markersRef.current = markers;

    // Event listeners
    containerRef.current.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    // Generate initial data
    generateUserData();

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (globeRef.current) {
        const rotationSpeed = 0.000001;
        globeRef.current.rotation.y += rotationSpeed;

        if (markersRef.current) {
          markersRef.current.rotation.y += rotationSpeed;
        }
      }

      controls.update();
      composer.render();
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
      composer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Generate user data with accurate geographic positions
  const generateUserData = () => {
    setIsLoading(true);

    if (markersRef.current) {
      while (markersRef.current.children.length > 0) {
        markersRef.current.remove(markersRef.current.children[0]);
      }
    }

    const locations: UserLocation[] = [];
    const count = 180 + Math.floor(Math.random() * 10);

    // Major cities with their actual coordinates
    const cities = [
      // North America
      { name: "New York", lat: 40.7128, lng: -74.006, color: "#ffffff" },
      { name: "Los Angeles", lat: 34.0522, lng: -118.2437, color: "#ffffff" },
      { name: "Chicago", lat: 41.8781, lng: -87.6298, color: "#ffffff" },
      { name: "Toronto", lat: 43.6532, lng: -79.3832, color: "#ffffff" },
      { name: "Mexico City", lat: 19.4326, lng: -99.1332, color: "#ffffff" },
      { name: "Montreal", lat: 45.5019, lng: -73.5674, color: "#ffffff" },
      { name: "Vancouver", lat: 49.2827, lng: -123.1207, color: "#ffffff" },
      // Europe
      { name: "London", lat: 51.5074, lng: -0.1278, color: "#ffffff" },
      { name: "Paris", lat: 48.8566, lng: 2.3522, color: "#ffffff" },
      { name: "Berlin", lat: 52.52, lng: 13.405, color: "#ffffff" },
      { name: "Madrid", lat: 40.4168, lng: -3.7038, color: "#ffffff" },
      { name: "Rome", lat: 41.9028, lng: 12.4964, color: "#ffffff" },
      // Asia
      { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#ffffff" },
      { name: "Shanghai", lat: 31.2304, lng: 121.4737, color: "#ffffff" },
      { name: "Mumbai", lat: 19.076, lng: 72.8777, color: "#ffffff" },
      { name: "Seoul", lat: 37.5665, lng: 126.978, color: "#ffffff" },
      // South America
      { name: "São Paulo", lat: -23.5505, lng: -46.6333, color: "#ffffff" },
      { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, color: "#ffffff" },
    ];

    // Fill with city markers
    const cityMarkersCount = Math.floor(count * 0.6);
    for (let i = 0; i < cityMarkersCount; i++) {
      const city = cities[Math.floor(Math.random() * cities.length)];
      locations.push({
        id: `city-${i}`,
        lat: city.lat + (Math.random() - 0.1) * 3,
        lng: city.lng + (Math.random() - 0.1) * 3,
        size: 0.8,
        color: city.color,
        name: city.name,
        users: 5 + Math.floor(Math.random() * 20), // Random user count
      });
    }
    // Add concentrated users in land regions
    for (let i = cityMarkersCount; i < count; i++) {
      const region =
        LAND_REGIONS[Math.floor(Math.random() * LAND_REGIONS.length)];
      const lat =
        region.latMin + Math.random() * (region.latMax - region.latMin);
      const lng =
        region.lngMin + Math.random() * (region.lngMax - region.lngMin);

      locations.push({
        id: `random-${i}`,
        lat,
        lng,
        size: 0.6,
        color: "#ffffff",
      });
    }

    // Create markers
    locations.forEach((location) => {
      if (markersRef.current) {
        const marker = createMarker(location);
        markersRef.current.add(marker);
      }
    });

    setActiveLocations(locations);
    setUserCount(count);
    setIsLoading(false);
  };

  // Create marker with accurate positioning
  const createMarker = (location: UserLocation) => {
    const markerGroup = new THREE.Group();
    markerGroup.userData = { location };
    const { size, lat, lng, color } = location;

    const position = latLngToVector3(lat, lng, 172);
    markerGroup.position.copy(position);

    // Create a glowing dot
    const markerGeometry = new THREE.SphereGeometry(size, 30, 30);
    const markerMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color),
      emissiveIntensity: 1.2,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      transmission: 0.2,
    });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    markerGroup.add(marker);

    // Add a subtle glow effect
    const glowGeometry = new THREE.SphereGeometry(size * 1.5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    markerGroup.add(glow);

    const haloGeometry = new THREE.RingGeometry(size * 1.3, size * 1.8, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });

    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.lookAt(new THREE.Vector3(0, 0, 0)); // Face toward globe center
    markerGroup.add(halo);

    // 3. Add directional indicator
    const indicatorGeometry = new THREE.ConeGeometry(size * 0.3, size * 1.2, 4);
    const indicatorMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
    });

    const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
    indicator.position.y = size * 1.5;
    indicator.rotation.x = Math.PI;
    markerGroup.add(indicator);

    return markerGroup;
  };

  // Rest of the component remains the same...
  // (The JSX return statement and overlay UI)

  return (
    <div className="relative h-[600px] w-full rounded-xl overflow-hidden border border-cyan-900/30 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div ref={containerRef} className="h-full w-full" />

      {/* Enhanced Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6 bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl p-5 rounded-2xl border border-cyan-900/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-3 w-3 bg-cyan-400 rounded-full animate-pulse" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Views
            </h2>
          </div>
          <p className="text-5xl font-bold font-mono text-white">
            {userCount.toLocaleString()}
          </p>
          <div className="flex justify-between items-center mt-3 text-cyan-300 text-sm font-medium">
            <span>ACTIVE SESSIONS</span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              REAL-TIME
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 flex gap-4">
          <div className="bg-gradient-to-br from-gray-900/70 to-slate-900/70 backdrop-blur-md px-5 py-3 rounded-xl border border-cyan-900/30">
            <p className="text-sm text-cyan-300 font-medium">
              Most Active Region
            </p>
            <p className="text-white font-bold text-lg">North America</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-green-400 text-sm">↑ 12.5%</span>
              <span className="text-xs text-slate-400">from last hour</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900/70 to-slate-900/70 backdrop-blur-md px-5 py-3 rounded-xl border border-cyan-900/30">
            <p className="text-sm text-cyan-300 font-medium">Peak Activity</p>
            <p className="text-white font-bold text-lg">1,240/min</p>
            <div className="text-xs text-slate-400 mt-1">current: 780/min</div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-slate-900/90 flex items-center justify-center backdrop-blur-sm">
          <div className="text-cyan-400 flex flex-col items-center gap-3">
            <div className="relative">
              <div className="border-4 border-cyan-500/30 border-t-cyan-500 rounded-full w-14 h-14 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-cyan-500 rounded-full w-1.5 h-1.5 animate-pulse"></div>
              </div>
            </div>
            <p className="text-sm font-medium tracking-wider">
              SYNCING LIVE DATA...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveUserGlobe;
