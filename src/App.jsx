import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Youtube,
  Trash2,
  FolderPlus,
  Plus,
  Search,
  Sun,
  Moon,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Video,
  Pencil,
} from "lucide-react";

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const LS_KEY = "album-data-v2";
const THEME_KEY = "theme";
const CLOUD_KEY = "cloudinary-config";

function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const shortsIdx = parts.indexOf("shorts");
    if (shortsIdx !== -1 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
    const embedIdx = parts.indexOf("embed");
    if (embedIdx !== -1 && parts[embedIdx + 1]) return parts[embedIdx + 1];
  } catch {}
  return null;
}

const defaultState = {
  sections: [
    { id: uid(), name: "Ceremonia" },
    { id: uid(), name: "Recepción" },
    { id: uid(), name: "Luna de miel" },
    { id: uid(), name: "Las mejores Fotos" },
    { id: uid(), name: "Videos" },
    { id: uid(), name: "Videos Luna de Miel" },
  ],
  items: [
    {
      id: uid(),
      type: "photo",
      title: "Ceremonia 1",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760878794/fotos-boda/eo3fgxuk84eujpq2af7a.jpg",
      sectionName: "Ceremonia",
      createdAt: Date.now(),
      position: 0,
    },
    {
      id: uid(),
      type: "photo",
      title: "Ceremonia 2",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760878941/fotos-boda/njjgma7qziffaavm9ux8.jpg",
      sectionName: "Ceremonia",
      createdAt: Date.now(),
      position: 1,
    },
    {
      id: uid(),
      type: "photo",
      title: "Ceremonia 3",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760879110/fotos-boda/axe6xdpmgg9dna6iwhai.jpg",
      sectionName: "Ceremonia",
      createdAt: Date.now(),
      position: 2,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 1",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760879640/fotos-boda/aeopinlqszway5y8lwjn.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 3,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 2",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760879781/fotos-boda/zg54cesgrie5a2poww6k.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 4,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 3",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760883847/fotos-boda/ohiijkbvhzfpuiaapgmc.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 5,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 4",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884002/fotos-boda/jf48tzscgwux6q4qqsut.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 6,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 5",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884151/fotos-boda/yd1pbzogghh3vawuyvw2.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 7,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884212/fotos-boda/pazhuwrsketf0pcums56.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 8,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 7",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884357/fotos-boda/tntsroz5vsrokha8daw3.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 9,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 8",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884573/fotos-boda/nszn3hwtyxznacgm1lnt.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 10,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 9",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884698/fotos-boda/bkpb9uqfncw4iirjntsv.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 11,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 10",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884804/fotos-boda/v7ichdhhptrqhs3ncqcd.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 12,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 11",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760884925/fotos-boda/dhaac0venqabsgrdjbf5.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 13,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 12",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760885052/fotos-boda/ryvk0k1sew5on51n8yp0.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 14,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 13",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760885216/fotos-boda/b0loedcpjxwiwtz0prhs.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 15,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 14",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760900489/fotos-boda/pli7ctojpynclrxznqtl.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 16,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 15",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760902459/fotos-boda/vzw6hlht9sur25zjjv8w.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 17,
    },
    {
      id: uid(),
      type: "photo",
      title: "Recepción 16",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760935157/fotos-boda/sa81xaekbzehsfpqer5w.jpg",
      sectionName: "Recepción",
      createdAt: Date.now(),
      position: 18,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 1",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760982814/fotos-boda/cni8ykxro3gj8vn0o1tc.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 19,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 2",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760982866/fotos-boda/mtt0onmhmcz4f0otfdxy.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 20,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 3",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760982928/fotos-boda/ab1nbgsx9pr0omgaxpz6.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 21,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 4",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983006/fotos-boda/jboany2bqy7jdmgldqkw.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 22,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 5",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983086/fotos-boda/fnexqvjdxbkkg7ypiozf.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 23,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 7",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760989148/fotos-boda/vfvk23ddjsp1b9lywclw.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 25,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 8",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760989353/fotos-boda/qaj9kcrcg2xcu2snbeee.heic",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 26,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 9",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760989410/fotos-boda/xexrp9nypeqrayxtsudv.heic",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 27,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "photo",
      title: "Luna de miel 6",
      url: "https://res.cloudinary.com/dfhlgx2ii/image/upload/v1760983193/fotos-boda/e9mmxdpumy2vyd1xfozg.jpg",
      sectionName: "Luna de miel",
      createdAt: Date.now(),
      position: 24,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Ingreso a recepción Matrimonio Alexandra Y Alejandro",
      url: "https://youtube.com/shorts/gZN0tm2T5cg",
      videoId: "gZN0tm2T5cg",
      sectionName: "Videos",
      createdAt: Date.now(),
      position: 100,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Recepción Matrimonio Alexandra Y Alejandro Boda Hielo Cristal ❄️",
      url: "https://www.youtube.com/shorts/tUHyC-6gogo",
      videoId: "tUHyC-6gogo",
      sectionName: "Videos",
      createdAt: Date.now(),
      position: 101,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Primer baile como esposos",
      url: "https://youtube.com/shorts/2saAnbhZePE",
      videoId: "2saAnbhZePE",
      sectionName: "Videos",
      createdAt: Date.now(),
      position: 102,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Ingreso Parranda Vallenata",
      url: "https://www.youtube.com/shorts/XjOdBETTv9E",
      videoId: "XjOdBETTv9E",
      sectionName: "Videos",
      createdAt: Date.now(),
      position: 103,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Show de fuego  Punta Cana",
      url: "https://youtu.be/QRSrE2i3RO0",
      videoId: "QRSrE2i3RO0",
      sectionName: "Videos Luna de Miel",
      createdAt: Date.now(),
      position: 104,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Buggies Punta Cana",
      url: "https://youtu.be/zKorSMgQ4Jo",
      videoId: "zKorSMgQ4Jo",
      sectionName: "Videos Luna de Miel",
      createdAt: Date.now(),
      position: 105,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Buggies Punta Cana 2",
      url: "https://youtu.be/hqCdg8wyApE",
      videoId: "hqCdg8wyApE",
      sectionName: "Videos Luna de Miel",
      createdAt: Date.now(),
      position: 106,
    },
    {
      id: uid(),
      type: "youtube",
      title: "Buggies Punta Cana 3",
      url: "https://youtu.be/-zb3WlcQ81Q",
      videoId: "-zb3WlcQ81Q",
      sectionName: "Videos Luna de Miel",
      createdAt: Date.now(),
      position: 107,
    },
  ],
};

export default function App() {
  const [sections, setSections] = useState(defaultState.sections);
  const [items, setItems] = useState(defaultState.items);
  const [activeSection, setActiveSection] = useState("Todos");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(() =>
    localStorage.getItem(THEME_KEY) ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  // Modales / formularios
  const [showAddItem, setShowAddItem] = useState(false);
  const [newType, setNewType] = useState("photo"); // "photo" | "youtube" | "cloudVideo"
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newSection, setNewSection] = useState("Todos");
  const [error, setError] = useState("");

  const [showAddSection, setShowAddSection] = useState(false);
  const [sectionName, setSectionName] = useState("");

  const [showUpload, setShowUpload] = useState(false);
  const [cloudCfg, setCloudCfg] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLOUD_KEY) || "null");
    } catch {
      return null;
    }
  });
  const [fileToUpload, setFileToUpload] = useState(null);
  const fileImportRef = useRef(null);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  // Drag & Drop
  const [dragId, setDragId] = useState(null);

  // Editor (mini-parche)
  const [showEditItem, setShowEditItem] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editSection, setEditSection] = useState("Todos");
  const [editError, setEditError] = useState("");

  // Tema
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Cargar/guardar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.sections && data.items) {
          setSections(data.sections);
          setItems(data.items.map((it, idx) => ({ position: idx, ...it })));
          return;
        }
      }
      localStorage.setItem(LS_KEY, JSON.stringify(defaultState));
    } catch (e) {
      console.error("Error leyendo localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ sections, items }));
    } catch (e) {
      console.error("Error guardando localStorage", e);
    }
  }, [sections, items]);

  // Filtros y orden
  const visibleItems = useMemo(() => {
    return items
      .filter((it) =>
        activeSection === "Todos" ? true : it.sectionName === activeSection
      )
      .filter((it) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          (it.title || "").toLowerCase().includes(q) ||
          (it.sectionName || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }, [items, activeSection, query]);

  const ensureTodosExists = (arr) =>
    arr.find((s) => s.name === "Todos")
      ? arr
      : [{ id: uid(), name: "Todos" }, ...arr];

  // Secciones
  const onAddSection = () => {
    const name = sectionName.trim();
    setError("");
    if (!name) return setError("Ponle un nombre a la sección.");
    if (sections.find((s) => s.name.toLowerCase() === name.toLowerCase()))
      return setError("Ya existe una sección con ese nombre.");
    setSections((prev) => [...prev, { id: uid(), name }]);
    setSectionName("");
    setShowAddSection(false);
  };
  const onDeleteSection = (name) => {
    if (name === "Todos") return;
    if (
      !confirm(
        `¿Eliminar la sección "${name}"? Se moverán sus elementos a "Todos".`
      )
    )
      return;
    setItems((prev) =>
      prev.map((it) =>
        it.sectionName === name ? { ...it, sectionName: "Todos" } : it
      )
    );
    setSections((prev) => prev.filter((s) => s.name !== name));
    if (activeSection === name) setActiveSection("Todos");
  };

  // Elementos
  const onAddItem = () => {
    setError("");
    const url = newUrl.trim();
    const title = newTitle.trim();
    const section = newSection || "Todos";
    if (!url) return setError("Agrega una URL válida.");
    const nextPos = items.length
      ? Math.max(...items.map((i) => i.position ?? 0)) + 1
      : 0;

    if (newType === "youtube") {
      const id = extractYouTubeId(url);
      if (!id) return setError("URL de YouTube no válida.");
      const item = {
        id: uid(),
        type: "youtube",
        title: title || "Video de YouTube",
        url,
        videoId: id,
        sectionName: section,
        createdAt: Date.now(),
        position: nextPos,
      };
      setItems((prev) => [...prev, item]);
    } else if (newType === "cloudVideo") {
      const item = {
        id: uid(),
        type: "cloudVideo",
        title: title || "Video",
        url,
        sectionName: section,
        createdAt: Date.now(),
        position: nextPos,
      };
      setItems((prev) => [...prev, item]);
    } else {
      const item = {
        id: uid(),
        type: "photo",
        title: title || "Foto",
        url,
        sectionName: section,
        createdAt: Date.now(),
        position: nextPos,
      };
      setItems((prev) => [...prev, item]);
    }

    setNewTitle("");
    setNewUrl("");
    setNewType("photo");
    setNewSection(section);
    setShowAddItem(false);
  };

  const onDeleteItem = (id) => {
    if (!confirm("¿Eliminar este elemento?")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Export/Import
  const exportJSON = () => {
    const data = { sections, items };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "album.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const fileImportRefCb = (e) => fileImportRef.current?.click();
  const importJSON = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.sections || !data.items) throw new Error("Estructura inválida");
      const normalized = data.items.map((it, idx) => ({
        position: idx,
        ...it,
      }));
      setSections(ensureTodosExists(data.sections));
      setItems(normalized);
      alert("Álbum importado correctamente.");
    } catch (err) {
      alert("No se pudo importar el JSON: " + err.message);
    } finally {
      e.target.value = "";
    }
  };

  // DnD
  const onDragStart = (id) => setDragId(id);
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (targetId) => {
    if (!dragId || dragId === targetId) return;
    const visIds = visibleItems.map((it) => it.id);
    const startIndex = visIds.indexOf(dragId);
    const endIndex = visIds.indexOf(targetId);
    if (startIndex === -1 || endIndex === -1) return;
    const reordered = [...visibleItems];
    const [moved] = reordered.splice(startIndex, 1);
    reordered.splice(endIndex, 0, moved);
    const idToPos = new Map(reordered.map((it, idx) => [it.id, idx]));
    setItems((prev) =>
      prev.map((it) =>
        idToPos.has(it.id) ? { ...it, position: idToPos.get(it.id) } : it
      )
    );
    setDragId(null);
  };

  // Lightbox
  const openLightboxAt = (id) => {
    const idx = visibleItems.findIndex((it) => it.id === id);
    if (idx >= 0) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
      const t = visibleItems[idx]?.type;
      setIsPaused(t !== "photo"); // pausa si es video (YouTube / Cloudinary)
    }
  };
  const next = () =>
    setLightboxIndex((i) => (visibleItems.length ? (i + 1) % visibleItems.length : 0));
  const prev = () =>
    setLightboxIndex((i) =>
      visibleItems.length ? (i - 1 + visibleItems.length) % visibleItems.length : 0
    );

  useEffect(() => {
    if (!lightboxOpen || isPaused || visibleItems.length < 2) return;
    autoplayRef.current = setInterval(next, 4000);
    return () => clearInterval(autoplayRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, isPaused, visibleItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const it = visibleItems[lightboxIndex];
    if (it?.type !== "photo") setIsPaused(true); // si es video, pausa
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, lightboxOpen]);

  const currentItem =
    lightboxOpen && visibleItems.length ? visibleItems[lightboxIndex] : null;

  // Cloudinary upload
  const saveCloudCfg = (cfg) => {
    setCloudCfg(cfg);
    localStorage.setItem(CLOUD_KEY, JSON.stringify(cfg));
  };
  const uploadToCloudinary = async () => {
    try {
      if (!fileToUpload) {
        alert("Selecciona un archivo primero.");
        return;
      }
      let cfg = cloudCfg;
      if (!cfg?.cloudName || !cfg?.preset) {
        const cloudName = prompt("Cloud name:", cfg?.cloudName || "");
        const preset = prompt("Upload preset (unsigned):", cfg?.preset || "");
        const folder = prompt("Folder (opcional, ej. album-fotos/):", cfg?.folder || "");
        cfg = { cloudName, preset, folder };
        if (!cloudName || !preset) return alert("Falta cloud name o preset.");
        saveCloudCfg(cfg);
      }
      const url = `https://api.cloudinary.com/v1_1/${cfg.cloudName}/auto/upload`;
      const form = new FormData();
      form.append("upload_preset", cfg.preset);
      if (cfg.folder) form.append("folder", cfg.folder);
      form.append("file", fileToUpload);
      const res = await fetch(url, { method: "POST", body: form });
      const data = await res.json();
      if (data.secure_url) {
        setShowUpload(false);
        setShowAddItem(true);
        const isVideo =
          (data.resource_type || "").toLowerCase() === "video" ||
          (fileToUpload.type || "").startsWith("video/");
        setNewType(isVideo ? "cloudVideo" : "photo");
        setNewUrl(data.secure_url);
      } else {
        alert("No se pudo subir. Revisa tu cloud/preset/folder.");
      }
    } catch (e) {
      alert("Error subiendo a Cloudinary: " + e.message);
    }
  };

  // Editor
  const openEdit = (id) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    setEditId(id);
    setEditTitle(it.title || "");
    setEditUrl(it.url || "");
    setEditSection(it.sectionName || "Todos");
    setEditError("");
    setShowEditItem(true);
  };

  const saveEdit = () => {
    setEditError("");
    const url = editUrl.trim();
    if (!url) {
      setEditError("La URL no puede estar vacía.");
      return;
    }
    const current = items.find((it) => it.id === editId);
    let vid = null;
    if (current?.type === "youtube") {
      vid = extractYouTubeId(url);
      if (!vid) {
        setEditError("URL de YouTube no válida.");
        return;
      }
    }
    setItems((prev) =>
      prev.map((it) =>
        it.id === editId
          ? {
              ...it,
              title: editTitle.trim(),
              url,
              sectionName: editSection,
              ...(current?.type === "youtube" ? { videoId: vid } : {}),
            }
          : it
      )
    );
    setShowEditItem(false);
    setEditId(null);
  };

  // ✅ NUEVO: borrar datos locales (sin afectar la nube)
  const clearLocalData = () => {
    localStorage.removeItem(LS_KEY);
    // Opcional: limpia también tu config de nube y tema
    // localStorage.removeItem(CLOUD_KEY);
    // localStorage.removeItem(THEME_KEY);
    alert("Datos locales eliminados. Se recargará la página.");
    location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 dark:from-slate-900 dark:to-slate-900 dark:text-slate-100">
      {/* Header */}
      <header
        className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center shadow dark:bg-slate-100 dark:text-slate-900">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold leading-tight">
                Álbum fotográfico
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Secciones, fotos y videos
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative basis-full sm:basis-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                className="input pl-9 w-full sm:w-64 bg-white dark:bg-slate-900"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
              />
            </div>

            <button className="btn btn-outline" onClick={exportJSON} title="Exportar JSON">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Exportar</span>
            </button>
            <input
              ref={fileImportRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={importJSON}
            />
            <button className="btn btn-outline" onClick={fileImportRefCb} title="Importar JSON">
              <Upload className="h-4 w-4" />
              <span className="hidden md:inline">Importar</span>
            </button>

            <button
              className="btn btn-outline"
              onClick={() => setShowUpload(true)}
              title="Subir archivo"
            >
              <Upload className="h-4 w-4" />
              <span className="hidden md:inline">Subir</span>
            </button>

            {/* 🧹 Borrar local */}
            <button
              className="btn btn-outline"
              onClick={clearLocalData}
              title="Borrar datos locales"
            >
              <span className="mr-1">🧹</span>
              <span className="hidden md:inline">Borrar local</span>
            </button>

            <button
              className="btn btn-outline"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Tema"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden md:inline">
                {theme === "dark" ? "Claro" : "Oscuro"}
              </span>
            </button>

            <button
              className="btn btn-outline"
              onClick={() => setShowAddSection(true)}
              title="Nueva sección"
            >
              <FolderPlus className="h-4 w-4" />
              <span className="hidden md:inline">Sección</span>
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddItem(true)} title="Agregar">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Agregar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs + grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="tabs">
          {ensureTodosExists(sections).map((s) => {
            const isActive = activeSection === s.name;
            const count =
              s.name === "Todos"
                ? items.length
                : items.filter((it) => it.sectionName === s.name).length;
            return (
              <button
                key={s.id}
                className={`tab ${isActive ? "tab-active" : ""}`}
                onClick={() => setActiveSection(s.name)}
              >
                <span className="badge mr-2">{count}</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-semibold">
                Sección: {activeSection}
              </h2>
              {activeSection !== "Todos" && (
                <button
                  className="btn btn-outline text-sm"
                  onClick={() => onDeleteSection(activeSection)}
                >
                  <Trash2 className="h-4 w-4" />{" "}
                  <span className="hidden md:inline">Eliminar sección</span>
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {visibleItems.length} elementos
            </p>
          </div>

          <div className="masonry">
            {visibleItems.length > 0 ? (
              visibleItems.map((it) => (
                <div
                  key={it.id}
                  className="masonry-item"
                  draggable
                  onDragStart={() => onDragStart(it.id)}
                  onDragOver={onDragOver}
                  onDrop={() => onDrop(it.id)}
                >
                  <div className="card">
                    <div className="p-3 flex items-center justify-between gap-2">
                      <div className="truncate font-medium text-sm">
                        {it.title || (it.type === "photo" ? "Foto" : "Video")}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge capitalize">{it.type}</span>
                        <button
                          className="btn btn-ghost"
                          onClick={() => openEdit(it.id)}
                          title="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={() => onDeleteItem(it.id)}
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div
                      className="p-0 cursor-zoom-in"
                      onClick={() => openLightboxAt(it.id)}
                    >
                      {it.type === "photo" ? (
                        <img
                          src={it.url}
                          alt={it.title || "Foto"}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      ) : it.type === "youtube" ? (
                        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                          <iframe
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            src={`https://www.youtube-nocookie.com/embed/${it.videoId}`}
                            title={it.title || "Video de YouTube"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <video
                          className="w-full h-auto pointer-events-none"
                          muted
                          playsInline
                          preload="metadata"
                          src={it.url}
                        />
                      )}
                      <div className="p-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>
                          {new Date(it.createdAt).toLocaleDateString()} · {it.sectionName}
                        </span>
                        <a
                          className="hover:underline"
                          href={it.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Abrir origen
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-500 dark:text-slate-400 py-16">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 grid place-items-center mb-3">
                  {activeSection === "Videos" ? (
                    <Video className="h-6 w-6" />
                  ) : (
                    <ImageIcon className="h-6 w-6" />
                  )}
                </div>
                <p className="font-medium">Sin elementos por ahora</p>
                <p className="text-sm">Usa el botón “Agregar” para incluir fotos o videos.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
            <button className="btn btn-ghost" onClick={() => setIsPaused((p) => !p)}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              <span className="text-sm">{isPaused ? "Reanudar" : "Pausar"}</span>
            </button>
          </div>
          <button
            className="lightbox-btn left-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused(true);
              prev();
            }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="lightbox-btn right-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsPaused(true);
              next();
            }}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Contenedor del media; ahora fotos verticales se adaptan al alto visible */}
          <div className="max-w-5xl w-full px-2" onClick={(e) => e.stopPropagation()}>
            {currentItem.type === "photo" ? (
              <img
                src={currentItem.url}
                alt={currentItem.title || "Imagen"}
                className="mx-auto rounded-xl object-contain max-h-[85vh] w-auto max-w-full"
              />
            ) : currentItem.type === "youtube" ? (
              <div
              className="relative mx-auto rounded-xl overflow-hidden"
              style={{
              width: "min(100%, 1280px)",
              aspectRatio: "16 / 9",
              maxHeight: "85vh",
              }}
              >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${currentItem.videoId}?autoplay=1&mute=1&playsinline=1`}
              title={currentItem.title || "Video"}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              />
          </div>
            ) : (
              <video
                className="mx-auto rounded-xl object-contain max-h-[85vh] w-auto max-w-full"
                src={currentItem.url}
                autoPlay
                controls
                playsInline
              />
            )}
            <div className="mt-3 text-center text-sm text-white/80">
              {currentItem.title || (currentItem.type === "photo" ? "Foto" : "Video")} ·{" "}
              {currentItem.sectionName}
            </div>
          </div>
        </div>
      )}

      {/* Modales */}
      {showAddSection && (
        <div
          className="fixed inset-0 bg-black/30 grid place-items-center z-40"
          onClick={() => setShowAddSection(false)}
        >
          <div
            className="modal-card bg-white dark:bg-slate-900 rounded-2xl p-4 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-1">Crear nueva sección</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Organiza mejor tu álbum.
            </p>
            <input
              className="input mb-2 bg-white dark:bg-slate-900"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder="Ej. Mascotas"
            />
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            <div className="flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setShowAddSection(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={onAddSection}>
                Crear sección
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddItem && (
        <div
          className="fixed inset-0 bg-black/30 grid place-items-center z-40"
          onClick={() => setShowAddItem(false)}
        >
          <div
            className="modal-card bg-white dark:bg-slate-900 rounded-2xl p-4 w-full max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-1">Agregar elemento</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Agrega una foto, un video de YouTube o un video subido a Cloudinary.
            </p>

            <div className="grid gap-3">
              <div>
                <label className="text-sm">Tipo</label>
                <div className="mt-1 flex gap-2">
                  <button
                    className={`btn ${newType === "photo" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setNewType("photo")}
                  >
                    Foto
                  </button>
                  <button
                    className={`btn ${newType === "youtube" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setNewType("youtube")}
                  >
                    YouTube
                  </button>
                  <button
                    className={`btn ${newType === "cloudVideo" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setNewType("cloudVideo")}
                  >
                    Video (archivo)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm">Título (opcional)</label>
                <input
                  className="input bg-white dark:bg-slate-900"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Paseo en bici"
                />
              </div>

              <div>
                <label className="text-sm">
                  {newType === "youtube"
                    ? "URL de YouTube"
                    : newType === "cloudVideo"
                    ? "URL del video (Cloudinary)"
                    : "URL de la imagen"}
                </label>
                <input
                  className="input bg-white dark:bg-slate-900"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder={
                    newType === "youtube"
                      ? "https://www.youtube.com/watch?v=..."
                      : newType === "cloudVideo"
                      ? "https://res.cloudinary.com/.../video/upload/..."
                      : "https://res.cloudinary.com/.../image/upload/..."
                  }
                />
              </div>

              <div>
                <label className="text-sm">Sección</label>
                <select
                  className="input bg-white dark:bg-slate-900"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                >
                  {ensureTodosExists(sections).map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowAddItem(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={onAddItem}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpload && (
        <div
          className="fixed inset-0 bg-black/30 grid place-items-center z-40"
          onClick={() => setShowUpload(false)}
        >
          <div
            className="modal-card bg-white dark:bg-slate-900 rounded-2xl p-4 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-1">Subir archivo</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Cloudinary (unsigned). Puedes configurar una carpeta destino.
            </p>
            <div className="grid gap-2">
              <input
                className="input bg-white dark:bg-slate-900"
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
              />
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Cloud: {cloudCfg?.cloudName || "—"} · Preset: {cloudCfg?.preset || "—"} · Folder:{" "}
                {cloudCfg?.folder || "—"}{" "}
                <button
                  className="underline"
                  onClick={() => {
                    const cloudName = prompt(
                      "Cloudinary cloud name",
                      cloudCfg?.cloudName || ""
                    );
                    const preset = prompt(
                      "Upload preset (unsigned)",
                      cloudCfg?.preset || ""
                    );
                    const folder = prompt(
                      "Carpeta (opcional, ej. album-fotos/)",
                      cloudCfg?.folder || ""
                    );
                    if (cloudName && preset) {
                      const cfg = { cloudName, preset, folder };
                      setCloudCfg(cfg);
                      localStorage.setItem(CLOUD_KEY, JSON.stringify(cfg));
                    }
                  }}
                >
                  configurar
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowUpload(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={uploadToCloudinary}>
                Subir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal EDITAR */}
      {showEditItem && (
        <div
          className="fixed inset-0 bg-black/30 grid place-items-center z-40"
          onClick={() => setShowEditItem(false)}
        >
          <div
            className="modal-card bg-white dark:bg-slate-900 rounded-2xl p-4 w-full max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-1">Editar elemento</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Cambia el título, la URL o la sección. (Si es YouTube, se recalcula el video
              automáticamente)
            </p>

            <div className="grid gap-3">
              <div>
                <label className="text-sm">Título</label>
                <input
                  className="input bg-white dark:bg-slate-900"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm">URL</label>
                <input
                  className="input bg-white dark:bg-slate-900"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                />
                {items.find((it) => it.id === editId)?.type === "youtube" && (
                  <p className="text-xs text-slate-500 mt-1">
                    Acepta <code>watch?v=</code>, <code>youtu.be/</code> o <code>shorts/</code>
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm">Sección</label>
                <select
                  className="input bg-white dark:bg-slate-900"
                  value={editSection}
                  onChange={(e) => setEditSection(e.target.value)}
                >
                  {ensureTodosExists(sections).map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {editError && <p className="text-sm text-red-600">{editError}</p>}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-ghost" onClick={() => setShowEditItem(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={saveEdit}>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-xs text-slate-500 dark:text-slate-400">
        Realizado por AlejandrO RomáN
      </footer>
    </div>
  );
}
