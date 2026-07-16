"use client";

import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type Theme = "system" | "light" | "dark";
type View = "home" | "chat" | "images" | "apps" | "gpts" | "research" | "pricing";
type ChatPhase = "idle" | "thinking" | "streaming" | "done";
type ResearchStatus = "ready" | "running" | "complete";
type IconName =
  | "spark"
  | "panel"
  | "edit"
  | "search"
  | "image"
  | "grid"
  | "research"
  | "tag"
  | "settings"
  | "help"
  | "user"
  | "plus"
  | "mic"
  | "voice"
  | "chevron"
  | "close"
  | "paperclip"
  | "globe"
  | "wand"
  | "file"
  | "send"
  | "arrow"
  | "back"
  | "copy"
  | "refresh"
  | "check"
  | "pause"
  | "play";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "spark":
      return <svg {...common}><path d="M12 2.8 14 8l5.2 2-5.2 2-2 5.2-2-5.2-5.2-2 5.2-2L12 2.8Z"/><path d="m18.5 16 .75 1.9 1.95.75-1.95.75-.75 1.9-.75-1.9-1.95-.75 1.95-.75.75-1.9Z"/></svg>;
    case "panel":
      return <svg {...common}><rect x="3.2" y="4" width="17.6" height="16" rx="3"/><path d="M15.5 4v16"/></svg>;
    case "edit":
      return <svg {...common}><path d="M13.5 6.5 17.5 10.5"/><path d="m18.1 3.9 2 2a1.4 1.4 0 0 1 0 2L10 18l-5 1 1-5L16.1 3.9a1.4 1.4 0 0 1 2 0Z"/></svg>;
    case "search":
      return <svg {...common}><circle cx="10.7" cy="10.7" r="6.4"/><path d="m15.5 15.5 4.2 4.2"/></svg>;
    case "image":
      return <svg {...common}><rect x="4" y="5.2" width="15.7" height="14" rx="3"/><circle cx="9" cy="10" r="1.4"/><path d="m5.2 17 4.5-4 3 2.5 2.5-2.2 3.3 3"/><path d="M8 5.2 9.1 3h7.4l1.1 2.2"/></svg>;
    case "grid":
      return <svg {...common}><rect x="4" y="4" width="5.5" height="5.5" rx="1.6"/><rect x="14.5" y="4" width="5.5" height="5.5" rx="1.6"/><rect x="4" y="14.5" width="5.5" height="5.5" rx="1.6"/><rect x="14.5" y="14.5" width="5.5" height="5.5" rx="1.6"/></svg>;
    case "research":
      return <svg {...common}><path d="m4 14 7-3 2 2-3 7-1.7-4.3L4 14Z"/><path d="m12 11 5.8-5.8"/><circle cx="18.3" cy="4.7" r="2.2"/><path d="m13.5 17.5 3 3M3.5 9.5l3 1"/></svg>;
    case "tag":
      return <svg {...common}><path d="m3.8 11.3 7.5-7.5h7.1l1.8 1.8v7.1l-7.5 7.5a2 2 0 0 1-2.8 0l-6.1-6.1a2 2 0 0 1 0-2.8Z"/><circle cx="16.2" cy="7.8" r="1.2"/></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>;
    case "help":
      return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M9.8 9a2.4 2.4 0 0 1 4.6 1c0 1.8-2.4 2-2.4 3.7"/><path d="M12 17.5h.01"/></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="9.2" r="2.6"/><path d="M7.8 17.2c.8-2.2 2.2-3.3 4.2-3.3s3.4 1.1 4.2 3.3"/></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "mic":
      return <svg {...common}><rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3.5M9.5 20.5h5"/></svg>;
    case "voice":
      return <svg {...common}><path d="M4 9v6M8 6v12M12 8v8M16 4v16M20 8v8"/></svg>;
    case "chevron":
      return <svg {...common}><path d="m7.5 9.5 4.5 4.5 4.5-4.5"/></svg>;
    case "close":
      return <svg {...common}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case "paperclip":
      return <svg {...common}><path d="M9.5 12.8v-5a3.2 3.2 0 0 1 6.4 0v8a4.8 4.8 0 0 1-9.6 0V8.5"/></svg>;
    case "globe":
      return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.3 3.2 5.2 3.2 8.5s-1 6.2-3.2 8.5M12 3.5C9.8 5.8 8.8 8.7 8.8 12s1 6.2 3.2 8.5"/></svg>;
    case "wand":
      return <svg {...common}><path d="m5 19 10-10 4 4L9 23 5 19ZM13.5 10.5l4-4"/><path d="M7 3v3M5.5 4.5h3M18 2v3M16.5 3.5h3"/></svg>;
    case "file":
      return <svg {...common}><path d="M6 3.5h7l5 5v12H6v-17Z"/><path d="M13 3.5v5h5M9 13h6M9 16h6"/></svg>;
    case "send":
      return <svg {...common}><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5"/></svg>;
    case "back":
      return <svg {...common}><path d="M19 12H5M10 7l-5 5 5 5"/></svg>;
    case "copy":
      return <svg {...common}><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>;
    case "refresh":
      return <svg {...common}><path d="M20 11a8 8 0 1 0-2.2 5.5"/><path d="M20 4v7h-7"/></svg>;
    case "check":
      return <svg {...common}><path d="m5 12.5 4.2 4.2L19 7"/></svg>;
    case "pause":
      return <svg {...common}><path d="M9 7v10M15 7v10"/></svg>;
    case "play":
      return <svg {...common} fill="currentColor" stroke="none"><path d="m9 7 8 5-8 5V7Z"/></svg>;
  }
}

const assistantResponse = "Here’s a concise way to approach it: start by defining the outcome, separate the work into the smallest testable steps, and validate the riskiest assumption first. Once that holds, build the remaining pieces in order and keep a short record of what changed. That gives you a clear path forward without over-planning.";

const imageIdeas = ["Portrait mode", "Pin collection", "Miniature figure", "Hand-drawn style", "Interior design"];

const appDirectory = [
  { name: "Canvas Studio", copy: "Create, review, and refine visual designs", tone: "violet", letter: "C", category: "Productivity" },
  { name: "Tablebase", copy: "Add structured data to your conversations", tone: "white", letter: "T", category: "Productivity" },
  { name: "Soundwave", copy: "Build playlists and discover new audio", tone: "rose", letter: "S", category: "Lifestyle" },
  { name: "Stayfinder", copy: "Compare memorable stays for your next trip", tone: "blue", letter: "B", category: "Lifestyle" },
  { name: "Sketchbook", copy: "Turn ideas into editable product concepts", tone: "multi", letter: "F", category: "Productivity" },
  { name: "CodePilot", copy: "Prototype and explain working applications", tone: "orange", letter: "R", category: "Productivity" },
  { name: "Trailguide", copy: "Plan thoughtful trips and local itineraries", tone: "green", letter: "T", category: "Lifestyle" },
  { name: "Kitchen Notes", copy: "Find recipes and organize weekly meals", tone: "yellow", letter: "K", category: "Lifestyle" },
];

const gptDirectory = [
  { name: "Research Scholar", copy: "Find sources and turn dense papers into clear notes.", by: "Nimbus Labs", tone: "violet", letter: "R", category: "Research & Analysis" },
  { name: "Trip Planner", copy: "Shape a practical itinerary around your pace and budget.", by: "Community", tone: "yellow", letter: "T", category: "Productivity" },
  { name: "Visual Maker", copy: "Develop polished concepts for images, decks, and campaigns.", by: "Nimbus Labs", tone: "multi", letter: "V", category: "Productivity" },
  { name: "Code Companion", copy: "Debug, explain, test, and improve working code.", by: "Community", tone: "green", letter: "C", category: "Programming" },
  { name: "Writing Coach", copy: "Edit drafts and strengthen voice, clarity, and structure.", by: "Nimbus Labs", tone: "rose", letter: "W", category: "Writing" },
  { name: "Data Analyst", copy: "Explore datasets and surface the decisions that matter.", by: "Community", tone: "blue", letter: "D", category: "Research & Analysis" },
];

const plans = [
  { name: "Free", price: "$0", note: "Best for trying Nimbus", features: ["Limited smart responses", "Limited messages and uploads", "Slower image creation", "Limited deep research"] },
  { name: "Go", price: "$8", note: "Best for longer conversations", features: ["More messages", "More uploads", "More image creation", "Longer memory"] },
  { name: "Plus", price: "$20", note: "Best for advanced work", badge: "Popular", features: ["Advanced reasoning", "Expanded messages and uploads", "Expanded deep research", "Projects and custom assistants"] },
  { name: "Pro", price: "$200", note: "Best for research and coding", features: ["Maximum model access", "Faster image creation", "Maximum deep research", "Largest memory and context"] },
];

const researchSteps = [
  { title: "Planning the approach", copy: "Breaking the question into focused lines of inquiry" },
  { title: "Searching across sources", copy: "Scanning reports, articles, and reference material" },
  { title: "Comparing evidence", copy: "Checking claims and reconciling conflicting details" },
  { title: "Writing the report", copy: "Synthesizing the strongest findings with citations" },
];

function ActionButton({ children, variant = "secondary", onClick, className = "" }: { children: React.ReactNode; variant?: "primary" | "secondary"; onClick?: () => void; className?: string }) {
  return <button className={`pill-button ${variant} ${className}`} onClick={onClick} type="button">{children}</button>;
}

function LogoMark({ size = 24 }: { size?: number }) {
  return <span className="logo-mark" style={{ width: size, height: size }} aria-hidden="true"><i /><i /><i /></span>;
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [view, setView] = useState<View>("home");
  const [modelMenu, setModelMenu] = useState(false);
  const [toolsMenu, setToolsMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(true);
  const [theme, setTheme] = useState<Theme>("system");
  const [toast, setToast] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [response, setResponse] = useState("");
  const [chatPhase, setChatPhase] = useState<ChatPhase>("idle");
  const [historyTitle, setHistoryTitle] = useState("Designing a thoughtful plan");
  const [historyPending, setHistoryPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageState, setImageState] = useState<"idle" | "loading" | "done">("idle");
  const [imageIdeaOffset, setImageIdeaOffset] = useState(0);
  const [appQuery, setAppQuery] = useState("");
  const [appCategory, setAppCategory] = useState("Featured");
  const [featuredSlide, setFeaturedSlide] = useState(0);
  const [gptQuery, setGptQuery] = useState("");
  const [gptCategory, setGptCategory] = useState("Top Picks");
  const [researchQuery, setResearchQuery] = useState("");
  const [researchStatus, setResearchStatus] = useState<ResearchStatus>("ready");
  const [researchStep, setResearchStep] = useState(0);
  const [audience, setAudience] = useState<"individual" | "business">("individual");
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyTooltipPosition, setCopyTooltipPosition] = useState<{ left: number; top: number } | null>(null);
  const [regenerating, setRegenerating] = useState(false);
  const [pricingReturnView, setPricingReturnView] = useState<View>("home");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const historyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const regenerateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("nimbus-theme") as Theme | null;
      if (saved === "light" || saved === "dark" || saved === "system") setTheme(saved);
      if (window.matchMedia("(max-width: 767px)").matches) setSidebarOpen(false);
      const route = window.location.hash.replace("#", "") as View;
      if (["chat", "images", "apps", "gpts", "research", "pricing"].includes(route)) setView(route);
    });
    const onHash = () => {
      const route = window.location.hash.replace("#", "") as View;
      setView(["chat", "images", "apps", "gpts", "research", "pricing"].includes(route) ? route : "home");
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", onHash); window.removeEventListener("popstate", onHash); };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModelMenu(false);
        setToolsMenu(false);
        setSearchOpen(false);
        setSettingsOpen(false);
        setCheckoutPlan(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (researchStatus !== "running") return;
    const timer = window.setInterval(() => {
      setResearchStep((step) => {
        if (step >= researchSteps.length - 1) {
          window.clearInterval(timer);
          setResearchStatus("complete");
          return step;
        }
        return step + 1;
      });
    }, 1750);
    return () => window.clearInterval(timer);
  }, [researchStatus]);

  useEffect(() => {
    if (!copied) return;
    const placeTooltip = () => {
      const rect = copyButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const tooltipHalfWidth = 34;
      const gutter = 12;
      const centered = rect.left + rect.width / 2;
      setCopyTooltipPosition({
        left: Math.min(Math.max(centered, gutter + tooltipHalfWidth), window.innerWidth - gutter - tooltipHalfWidth),
        top: Math.max(38, rect.top - 8),
      });
    };
    placeTooltip();
    window.addEventListener("resize", placeTooltip);
    window.addEventListener("scroll", placeTooltip, true);
    return () => {
      window.removeEventListener("resize", placeTooltip);
      window.removeEventListener("scroll", placeTooltip, true);
    };
  }, [copied]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (streamTimer.current) clearInterval(streamTimer.current);
    if (historyTimer.current) clearTimeout(historyTimer.current);
    if (imageTimer.current) clearTimeout(imageTimer.current);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    if (regenerateTimer.current) clearTimeout(regenerateTimer.current);
  }, []);

  const showToast = (text: string) => {
    setToast(text);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const go = (next: View) => {
    if (next === "pricing" && view !== "pricing") setPricingReturnView(view);
    if (next !== "chat" && regenerateTimer.current) {
      clearTimeout(regenerateTimer.current);
      regenerateTimer.current = null;
      setRegenerating(false);
    }
    setView(next);
    setModelMenu(false);
    setToolsMenu(false);
    setSearchOpen(false);
    if (window.matchMedia("(max-width: 767px)").matches) setSidebarOpen(false);
    const hash = next === "home" ? "" : `#${next}`;
    if (`${window.location.pathname}${window.location.hash}` !== `${window.location.pathname}${hash}`) window.history.pushState(null, "", `${window.location.pathname}${hash}`);
  };

  const newChat = () => {
    if (streamTimer.current) clearInterval(streamTimer.current);
    setMessage("");
    setActivePrompt("");
    setResponse("");
    setChatPhase("idle");
    go("home");
  };

  const chooseTheme = (next: Theme) => {
    setTheme(next);
    window.localStorage.setItem("nimbus-theme", next);
  };

  const toggleModel = (event: MouseEvent) => {
    event.stopPropagation();
    setModelMenu((open) => !open);
    setToolsMenu(false);
    setSearchOpen(false);
  };

  const toggleTools = (event: MouseEvent) => {
    event.stopPropagation();
    setToolsMenu((open) => !open);
    setModelMenu(false);
  };

  const streamAnswer = (prompt: string) => {
    if (streamTimer.current) clearInterval(streamTimer.current);
    if (historyTimer.current) clearTimeout(historyTimer.current);
    setActivePrompt(prompt);
    setResponse("");
    setCopied(false);
    setRegenerating(false);
    setChatPhase("thinking");
    setHistoryPending(true);
    go("chat");
    const words = assistantResponse.split(" ");
    let cursor = 0;
    historyTimer.current = setTimeout(() => {
      setHistoryTitle(prompt.split(/\s+/).slice(0, 6).join(" "));
      setHistoryPending(false);
      setChatPhase("streaming");
      streamTimer.current = setInterval(() => {
        cursor += 2;
        setResponse(words.slice(0, cursor).join(" "));
        if (cursor >= words.length) {
          if (streamTimer.current) clearInterval(streamTimer.current);
          setChatPhase("done");
        }
      }, 45);
    }, 650);
  };

  const submitChat = (event: FormEvent) => {
    event.preventDefault();
    const prompt = message.trim();
    if (!prompt) return;
    setMessage("");
    streamAnswer(prompt);
  };

  const copyResponse = async () => {
    let success = false;
    try {
      await navigator.clipboard.writeText(response);
      success = true;
    } catch {
      try {
        const fallback = document.createElement("textarea");
        fallback.value = response;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "fixed";
        fallback.style.opacity = "0";
        document.body.appendChild(fallback);
        fallback.select();
        success = document.execCommand("copy");
        fallback.remove();
      } catch {
        success = false;
      }
    }
    if (!success) {
      showToast("Copy is unavailable in this browser.");
      return;
    }
    setCopied(true);
    showToast("Response copied.");
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 3000);
  };

  const regenerateResponse = () => {
    if (regenerating) return;
    setRegenerating(true);
    if (regenerateTimer.current) clearTimeout(regenerateTimer.current);
    regenerateTimer.current = setTimeout(() => {
      regenerateTimer.current = null;
      streamAnswer(activePrompt);
    }, 440);
  };

  const generateImage = (event?: FormEvent, promptOverride?: string) => {
    event?.preventDefault();
    const nextPrompt = (promptOverride ?? imagePrompt.trim()) || "A quiet glass cabin beneath a violet night sky";
    setImagePrompt(nextPrompt);
    setImageState("loading");
    if (imageTimer.current) clearTimeout(imageTimer.current);
    imageTimer.current = setTimeout(() => setImageState("done"), 1450);
  };

  const startResearch = (event?: FormEvent) => {
    event?.preventDefault();
    if (!researchQuery.trim()) setResearchQuery("How are compact cities redesigning public space for extreme heat?");
    setResearchStep(0);
    setResearchStatus("running");
  };

  const showPricingSection = (selector: string, nextAudience?: "individual" | "business") => {
    if (nextAudience) setAudience(nextAudience);
    window.requestAnimationFrame(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const openDemoNotice = () => showToast("Authentication is disabled in this front-end demo.");

  const filteredApps = useMemo(() => appDirectory.filter((item) => {
    const categoryMatch = appCategory === "Featured" || item.category === appCategory;
    const textMatch = `${item.name} ${item.copy}`.toLowerCase().includes(appQuery.toLowerCase());
    return categoryMatch && textMatch;
  }), [appCategory, appQuery]);

  const filteredGpts = useMemo(() => gptDirectory.filter((item) => {
    const categoryMatch = gptCategory === "Top Picks" || item.category === gptCategory;
    const textMatch = `${item.name} ${item.copy} ${item.by}`.toLowerCase().includes(gptQuery.toLowerCase());
    return categoryMatch && textMatch;
  }), [gptCategory, gptQuery]);

  const orderedImageIdeas = useMemo(() => imageIdeas.map((_, index) => imageIdeas[(index + imageIdeaOffset + imageIdeas.length) % imageIdeas.length]), [imageIdeaOffset]);

  const recentChats = [historyTitle, "Weekend itinerary ideas", "Explain a design system", "Notes for a product brief"];
  const searchResults = recentChats.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
  const viewNames: Record<View, string> = { home: "home", chat: "your chat", images: "Images", apps: "Apps", gpts: "GPTs", research: "Deep research", pricing: "Pricing" };
  const activeNav = view === "chat" ? "New chat" : view === "gpts" ? "Apps" : view;
  const rootClass = `app-shell ${sidebarOpen ? "sidebar-open" : "sidebar-closed"} ${cookieVisible ? "with-cookie" : ""} ${view === "pricing" ? "pricing-mode" : ""}`;

  return (
    <div className={rootClass} data-theme={theme} onClick={() => { setModelMenu(false); setToolsMenu(false); setSearchOpen(false); }}>
      <a className="skip-link" href="#main">Skip to content</a>

      <aside className="sidebar" aria-label="Chat history">
        <div className="sidebar-header">
          <button className="icon-button brand-mark" aria-label="Home" onClick={newChat} type="button"><LogoMark size={22} /></button>
          <button className="icon-button sidebar-toggle" aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"} aria-expanded={sidebarOpen} onClick={(event) => { event.stopPropagation(); setSidebarOpen((open) => !open); }} type="button"><Icon name="panel" size={20} /></button>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          <button className={`nav-item ${activeNav === "New chat" || view === "home" ? "active" : ""}`} onClick={newChat} type="button"><Icon name="edit" size={20} /><span>New chat</span><kbd>⇧⌘O</kbd></button>
          <div className="nav-search-anchor">
            <button className={`nav-item ${searchOpen ? "active" : ""}`} onClick={(event) => { event.stopPropagation(); setSearchOpen((open) => !open); setModelMenu(false); }} type="button"><Icon name="search" size={20} /><span>Search chats</span></button>
            {searchOpen && (
              <section className="search-panel popover" role="dialog" aria-labelledby="search-panel-title" onClick={(event) => event.stopPropagation()}>
                <button className="search-close" aria-label="Close search" onClick={() => setSearchOpen(false)} type="button"><Icon name="close" size={17}/></button>
                <div className="search-art"><span /><span /><span /></div>
                <div className="search-panel-copy">
                  <h2 id="search-panel-title">Search your chat history</h2>
                  <label className="search-field"><Icon name="search" size={18} /><input autoFocus aria-label="Search chats" onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search chats" value={searchQuery} /></label>
                  <div className="search-results">
                    {searchResults.length ? searchResults.map((item, index) => (
                      <button key={`${item}-${index}`} onClick={() => { setSearchOpen(false); setActivePrompt(item); setResponse(assistantResponse); setChatPhase("done"); go("chat"); }} type="button"><Icon name="edit" size={16} /><span>{item}</span></button>
                    )) : <p>No matching chats</p>}
                  </div>
                </div>
              </section>
            )}
          </div>
          <button className={`nav-item ${activeNav === "images" ? "active" : ""}`} onClick={() => go("images")} type="button"><Icon name="image" size={20} /><span>Images</span></button>
          <button className={`nav-item ${activeNav === "Apps" || activeNav === "apps" ? "active" : ""}`} onClick={() => go("apps")} type="button"><Icon name="grid" size={20} /><span>Apps</span></button>
          <button className={`nav-item ${activeNav === "research" ? "active" : ""}`} onClick={() => go("research")} type="button"><Icon name="research" size={20} /><span>Deep research</span></button>
        </nav>

        {(view === "chat" || historyPending) && sidebarOpen && (
          <section className="history-section" aria-label="Recent chats">
            <h2>Today</h2>
            <button className="history-item active" onClick={() => go("chat")} type="button">
              {historyPending ? <span className="history-shimmer" /> : <span>{historyTitle}</span>}
            </button>
          </section>
        )}

        <div className="sidebar-spacer" />

        <nav className="sidebar-nav bottom-nav" aria-label="Secondary navigation">
          <button className={`nav-item ${view === "pricing" ? "active" : ""}`} onClick={() => go("pricing")} type="button"><Icon name="tag" size={20} /><span>See plans and pricing</span></button>
          <button className="nav-item" onClick={() => setSettingsOpen(true)} type="button"><Icon name="settings" size={20} /><span>Settings</span></button>
          <button className="nav-item" onClick={() => showToast("Help is not available in this demo.")} type="button"><Icon name="help" size={20} /><span>Help</span></button>
        </nav>

        <section className="sidebar-login-card"><strong>Get responses tailored to you</strong><p>Log in to get answers based on saved chats, plus create images and upload files.</p><ActionButton onClick={openDemoNotice}>Log in</ActionButton></section>
        <button className="rail-profile icon-button" onClick={openDemoNotice} aria-label="Open profile menu" type="button"><Icon name="user" size={18} /></button>
      </aside>

      {sidebarOpen && <button className="mobile-scrim" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} type="button" />}

      <div className="page-column">
        {view === "pricing" ? (
          <header className="pricing-header">
            <div className="pricing-return-group">
              <button className="pricing-back" aria-label={`Back to ${viewNames[pricingReturnView]}`} onClick={() => go(pricingReturnView)} title={`Back to ${viewNames[pricingReturnView]}`} type="button"><Icon name="back" size={18}/><span>Back</span></button>
              <button className="pricing-brand" aria-label="Nimbus home" onClick={newChat} title="Nimbus home" type="button"><LogoMark size={28} /><span>Nimbus</span></button>
            </div>
            <nav aria-label="Pricing navigation"><button onClick={() => showPricingSection(".pricing-hero")} type="button">About</button><button onClick={() => showPricingSection(".compare-preview")} type="button">Features</button><button onClick={() => showToast("Learning resources are not available in this demo.")} type="button">Learn</button><button onClick={() => showPricingSection(".business-grid", "business")} type="button">Business</button><button className="selected" onClick={() => showPricingSection(".pricing-hero")} type="button">Pricing</button></nav>
            <div className="header-actions"><ActionButton variant="primary" onClick={openDemoNotice}>Log in</ActionButton><ActionButton onClick={openDemoNotice}>Sign up for free</ActionButton></div>
          </header>
        ) : (
          <header className="page-header">
            <button className="mobile-menu icon-button" aria-label="Open sidebar" onClick={(event) => { event.stopPropagation(); setSidebarOpen(true); }} type="button"><Icon name="panel" size={20} /></button>
            <div className="model-wrap" onClick={(event) => event.stopPropagation()}>
              <button className="model-button" aria-label="Model selector" aria-expanded={modelMenu} onClick={toggleModel} type="button">Nimbus <Icon name="chevron" size={16} /></button>
              {modelMenu && <section className="model-menu popover" aria-label="Model information"><div className="model-art" /><div className="model-copy"><h2>Try advanced features for free</h2><p>Get smarter responses, upload files, create images, and more by logging in.</p><div className="model-actions"><ActionButton onClick={openDemoNotice}>Log in</ActionButton><ActionButton onClick={openDemoNotice}>Sign up for free</ActionButton></div></div></section>}
            </div>
            <div className="header-actions"><ActionButton variant="primary" onClick={openDemoNotice}>Log in</ActionButton><ActionButton onClick={openDemoNotice}>Sign up for free</ActionButton></div>
          </header>
        )}

        <main id="main" className={`main-stage view-${view}`}>
          {(view === "home" || (view === "chat" && !activePrompt)) && (
            <section className="welcome" aria-label="Start a conversation">
              <h1>Where should we begin?</h1>
              <ChatComposer message={message} setMessage={setMessage} submit={submitChat} toolsMenu={toolsMenu} toggleTools={toggleTools} showToast={showToast} openDemoNotice={openDemoNotice} />
            </section>
          )}

          {view === "chat" && activePrompt && (
            <section className="chat-view" aria-live="polite">
              <div className="chat-scroll">
                <div className="message-row user-row"><div className="user-message">{activePrompt}</div></div>
                <div className="message-row assistant-row"><div className={`assistant-mark ${chatPhase === "thinking" ? "thinking" : ""}`}><LogoMark size={22} /></div><div className="assistant-message">
                  {chatPhase === "thinking" ? <div className="typing-state"><span /><span /><span /></div> : <p>{response}<span className={chatPhase === "streaming" ? "stream-caret" : ""} /></p>}
                  {chatPhase === "done" && <div className="response-actions"><button ref={copyButtonRef} className={`response-action ${copied ? "copied" : ""}`} aria-describedby={copied ? "copy-feedback" : undefined} aria-label={copied ? "Copied" : "Copy response"} data-tooltip="Copy" onClick={copyResponse} type="button"><span className="action-icon-swap"><span className="copy-glyph"><Icon name="copy" size={18}/></span><span className="check-glyph"><Icon name="check" size={18}/></span></span></button><button className={`response-action ${regenerating ? "regenerating" : ""}`} aria-label="Regenerate response" data-tooltip="Regenerate" disabled={regenerating} onClick={regenerateResponse} type="button"><Icon name="refresh" size={18}/></button></div>}
                </div></div>
              </div>
              <div className="chat-composer-dock"><ChatComposer message={message} setMessage={setMessage} submit={submitChat} toolsMenu={toolsMenu} toggleTools={toggleTools} showToast={showToast} openDemoNotice={openDemoNotice} compact /></div>
            </section>
          )}

          {view === "images" && (
            <section className="directory-view images-view">
              <div className="images-rail">
                <form className="image-prompt" onSubmit={generateImage}><Icon name="paperclip" size={20} /><input aria-label="Describe a new image" onChange={(event) => setImagePrompt(event.target.value)} placeholder="Describe a new image" value={imagePrompt} /><Icon name="mic" size={20} /><button aria-label="Create image" disabled={imageState === "loading"} type="submit"><Icon name="send" size={20} /></button></form>
                <h1>Images</h1>
                <div className="section-heading"><h2>Create an image</h2><div><button aria-label="Previous image ideas" onClick={() => setImageIdeaOffset((offset) => (offset - 1 + imageIdeas.length) % imageIdeas.length)} type="button">‹</button><button aria-label="Next image ideas" onClick={() => setImageIdeaOffset((offset) => (offset + 1) % imageIdeas.length)} type="button">›</button></div></div>
                <div className="image-idea-row">
                  {orderedImageIdeas.map((label, index) => <button className={`image-idea art-${index + 1}`} key={label} onClick={() => generateImage(undefined, label)} type="button"><span>{label}</span></button>)}
                </div>
                {imageState !== "idle" && <section className={`image-result ${imageState}`} aria-live="polite"><div className="generated-art"><div className="moon"/><div className="cabin"/><div className="ground"/></div><div><h2>{imageState === "loading" ? "Creating your image…" : "Your image is ready"}</h2><p>{imageState === "loading" ? "Composing light, texture, and detail" : imagePrompt}</p>{imageState === "done" && <button onClick={() => setImageState("idle")} type="button">Create another</button>}</div></section>}
              </div>
            </section>
          )}

          {view === "apps" && (
            <section className="directory-view apps-view">
              <div className="content-rail">
                <div className="directory-title"><div><h1>Apps</h1><p>Chat with your favorite apps in Nimbus</p></div><label className="directory-search"><Icon name="search" size={18} /><input aria-label="Search apps" onChange={(event) => setAppQuery(event.target.value)} placeholder="Search apps" value={appQuery} /></label></div>
                <div className={`featured-app slide-${featuredSlide}`}>
                  <div className="featured-copy"><span className="app-icon hero-icon">{featuredSlide ? "S" : "C"}</span><h2>{featuredSlide ? "Plan with Stayfinder" : "Create with Canvas"}</h2><p>{featuredSlide ? "Compare stays and shape an itinerary" : "Make designs, flyers, and social posts"}</p><ActionButton onClick={() => showToast("App connections are disabled in this demo.")}>View</ActionButton></div>
                  <div className="featured-preview"><span className="mention">@{featuredSlide ? "Stayfinder plan a quiet weekend" : "Canvas create a launch post"}</span><div className="preview-window"><div/><div/><p>{featuredSlide ? "Three calm stays matched to your dates and pace." : "Here are two visual directions for your campaign."}</p></div></div>
                  <div className="carousel-controls"><button aria-label={featuredSlide ? "Play carousel" : "Pause carousel"} onClick={() => setFeaturedSlide((slide) => slide ? 0 : 1)} type="button"><Icon name={featuredSlide ? "play" : "pause"} size={15}/></button><i className={!featuredSlide ? "active" : ""}/><i className={featuredSlide ? "active" : ""}/></div>
                  <button className="carousel-next" aria-label="Next featured app" onClick={() => setFeaturedSlide((slide) => slide ? 0 : 1)} type="button">›</button>
                </div>
                <div className="directory-tabs" role="tablist" aria-label="App categories">
                  {["Featured", "Lifestyle", "Productivity"].map((category) => <button aria-selected={appCategory === category} className={appCategory === category ? "active" : ""} key={category} onClick={() => setAppCategory(category)} role="tab" type="button">{category}</button>)}
                  <button className="gpt-switch" onClick={() => go("gpts")} type="button">Explore GPTs <Icon name="arrow" size={16}/></button>
                </div>
                <div className="app-grid">{filteredApps.map((item) => <button className="app-list-card" key={item.name} onClick={() => showToast(`${item.name} is a visual demo.`)} type="button"><span className={`app-icon ${item.tone}`}>{item.letter}</span><span><strong>{item.name}</strong><small>{item.copy}</small></span><b>›</b></button>)}</div>
                {!filteredApps.length && <p className="empty-state">No apps match your search.</p>}
              </div>
            </section>
          )}

          {view === "gpts" && (
            <section className="directory-view gpts-view">
              <div className="gpts-hero"><h1>GPTs</h1><p>Discover custom assistants that combine instructions, extra knowledge, and focused skills.</p><label className="directory-search"><Icon name="search" size={18}/><input aria-label="Search GPTs" onChange={(event) => setGptQuery(event.target.value)} placeholder="Search GPTs" value={gptQuery}/></label></div>
              <div className="gpt-rail">
                <div className="gpt-categories" role="tablist" aria-label="GPT categories">{["Top Picks", "Productivity", "Programming", "Writing", "Research & Analysis"].map((category) => <button aria-selected={gptCategory === category} className={gptCategory === category ? "active" : ""} key={category} onClick={() => setGptCategory(category)} role="tab" type="button">{category}</button>)}<button onClick={() => go("apps")} type="button">Apps</button></div>
                <div className="gpt-section-title"><h2>Featured</h2><p>Curated top picks from this week</p></div>
                <div className="gpt-feature-grid">{filteredGpts.slice(0,3).map((item) => <button key={item.name} onClick={() => showToast(`${item.name} is a visual demo.`)} type="button"><span className={`gpt-icon ${item.tone}`}>{item.letter}</span><span><strong>{item.name}</strong><small>{item.copy}</small><em>By {item.by}</em></span></button>)}</div>
                <div className="gpt-section-title trending-title"><h2>Trending</h2><p>Most popular assistants in our community</p></div>
                <div className="gpt-trending">{filteredGpts.map((item, index) => <button key={item.name} onClick={() => showToast(`${item.name} is a visual demo.`)} type="button"><b>{index + 1}</b><span className={`gpt-icon small ${item.tone}`}>{item.letter}</span><span><strong>{item.name}</strong><small>{item.copy}</small><em>By {item.by}</em></span></button>)}</div>
                {!filteredGpts.length && <p className="empty-state gpt-empty">No GPTs match this view.</p>}
              </div>
            </section>
          )}

          {view === "research" && (
            <section className="research-view">
              {researchStatus === "ready" ? <div className="research-start"><span className="research-badge"><Icon name="research" size={22}/></span><h1>Turn questions into research</h1><p>Explore the web, compare evidence, and produce a structured report with source notes.</p><form className="research-composer" onSubmit={startResearch}><textarea aria-label="Research question" onChange={(event) => setResearchQuery(event.target.value)} placeholder="What would you like to investigate?" rows={2} value={researchQuery}/><div><button onClick={() => setResearchQuery("Compare how coastal cities are adapting public transit for extreme weather.")} type="button">Choose sources</button><button aria-label="Start research" type="submit"><Icon name="send" size={19}/></button></div></form><div className="research-suggestions"><button onClick={() => setResearchQuery("Compare the most promising approaches to low-carbon concrete.")} type="button">Compare emerging technologies</button><button onClick={() => setResearchQuery("Build a cited market map for independent creative software.")} type="button">Create a market landscape</button></div></div> : <div className="research-progress-view"><div className="research-progress-header"><div><span>{researchStatus === "complete" ? "Research complete" : "Deep research in progress"}</span><h1>{researchQuery}</h1></div><button onClick={() => { setResearchStatus("ready"); setResearchStep(0); }} type="button">{researchStatus === "complete" ? "New research" : "Stop"}</button></div><div className="research-layout"><div className="research-orbit"><i/><i/><i/><span>{researchStatus === "complete" ? <Icon name="check" size={26}/> : `${researchStep + 1}/4`}</span></div><ol className="research-timeline">{researchSteps.map((step, index) => <li className={index < researchStep || researchStatus === "complete" ? "done" : index === researchStep ? "active" : ""} key={step.title}><span>{index < researchStep || researchStatus === "complete" ? <Icon name="check" size={15}/> : index + 1}</span><div><strong>{step.title}</strong><small>{step.copy}</small></div></li>)}</ol></div>{researchStatus === "complete" && <article className="research-report"><div className="report-meta"><span>12 sources</span><span>6 min read</span></div><h2>Key findings</h2><p>Across the strongest examples, effective heat adaptation pairs shade and vegetation with changes to street geometry, transit access, and maintenance budgets. Projects work best when cities measure surface temperature and pedestrian use before and after installation.</p><h3>What stands out</h3><ul><li>Small, distributed interventions can outperform a single flagship project.</li><li>Transit stops and walking routes create the clearest equity gains.</li><li>Long-term maintenance funding is as important as capital design.</li></ul><div className="source-chips"><button type="button">Urban climate review ↗</button><button type="button">City design study ↗</button><button type="button">Transit resilience brief ↗</button></div></article>}</div>}
            </section>
          )}

          {view === "pricing" && (
            <section className="pricing-view">
              <div className="pricing-hero"><span>Nimbus</span><h1>Pricing</h1><p>See pricing for our individual, business, and enterprise plans.</p><div className="audience-toggle" role="group" aria-label="Choose pricing audience"><button className={audience === "individual" ? "active" : ""} onClick={() => setAudience("individual")} type="button"><Icon name="user" size={17}/>Individual</button><button className={audience === "business" ? "active" : ""} onClick={() => setAudience("business")} type="button"><Icon name="grid" size={17}/>Business & Enterprise</button></div></div>
              {audience === "individual" ? <div className="pricing-grid">{plans.map((plan) => <article className={plan.badge ? "featured" : ""} key={plan.name}>{plan.badge && <span className="plan-badge">{plan.badge}</span>}<h2>{plan.name}</h2><p>{plan.note}</p><div className="price"><strong>{plan.price}</strong><span>/ month</span></div><button onClick={() => setCheckoutPlan(plan.name)} type="button">Get {plan.name} <Icon name="arrow" size={16}/></button><h3>{plan.name === "Free" ? "Includes:" : `Everything in ${plan.name === "Go" ? "Free" : plan.name === "Plus" ? "Go" : "Plus"}, and:`}</h3><ul>{plan.features.map((feature) => <li key={feature}><Icon name="check" size={16}/>{feature}</li>)}</ul></article>)}</div> : <div className="business-grid"><article><span>For growing teams</span><h2>Business</h2><p>A secure collaborative workspace with generous access, shared projects, and admin controls.</p><strong>$25 <small>/ user / month</small></strong><button onClick={() => setCheckoutPlan("Business")} type="button">Start a workspace</button></article><article><span>For large organizations</span><h2>Enterprise</h2><p>Advanced security, support, controls, and flexible deployment for organization-wide AI.</p><strong>Let’s talk</strong><button onClick={() => setCheckoutPlan("Enterprise")} type="button">Contact sales</button></article></div>}
              <div className="compare-preview"><h2>Compare features across plans</h2><div><span>Feature</span><span>Free</span><span>Go</span><span>Plus</span><span>Pro</span></div>{["Messages and interactions", "Image creation", "Deep research", "Memory and context"].map((feature, index) => <div key={feature}><strong>{feature}</strong><span>{index < 2 ? "Limited" : "—"}</span><span>Expanded</span><span>Expanded</span><span>Maximum</span></div>)}</div>
            </section>
          )}

          {(view === "home" || view === "chat") && <p className="disclaimer"><span>Nimbus is an independent front-end demonstration.</span><span>Messages are not sent or stored.<button onClick={() => setSettingsOpen(true)} type="button">Appearance settings</button></span></p>}
        </main>
      </div>

      {cookieVisible && <section className="cookie-banner" role="dialog" aria-labelledby="cookie-title"><div className="cookie-copy"><h2 id="cookie-title">We use cookies</h2><p>Cookies help this site function, measure usage, and support marketing.<br/><button onClick={() => setSettingsOpen(true)} type="button">Manage</button> your cookie preferences anytime.</p></div><button className="cookie-close icon-button" aria-label="Close cookie notice" onClick={() => setCookieVisible(false)} type="button"><Icon name="close" size={18}/></button><div className="cookie-actions"><ActionButton onClick={() => setCookieVisible(false)}>Reject non-essential</ActionButton><ActionButton variant="primary" onClick={() => setCookieVisible(false)}>Accept all</ActionButton></div></section>}

      {settingsOpen && <div className="modal-backdrop" role="presentation" onClick={() => setSettingsOpen(false)}><section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={(event) => event.stopPropagation()}><aside className="settings-tabs"><button className="modal-close icon-button" aria-label="Close settings" onClick={() => setSettingsOpen(false)} type="button"><Icon name="close" size={20}/></button><button className="settings-tab selected" type="button"><Icon name="settings" size={19}/> General</button><button className="settings-tab" onClick={() => showToast("Data controls are not available in this demo.")} type="button"><Icon name="file" size={19}/> Data controls</button></aside><div className="settings-content"><header><h2 id="settings-title">General</h2></header><div className="setting-row"><label htmlFor="appearance">Appearance</label><select id="appearance" onChange={(event) => chooseTheme(event.target.value as Theme)} value={theme}><option value="system">System</option><option value="dark">Dark</option><option value="light">Light</option></select></div><div className="setting-row"><label htmlFor="language">Language</label><select id="language" defaultValue="auto"><option value="auto">Auto-detect</option><option value="en">English</option></select></div></div></section></div>}

      {checkoutPlan && <div className="modal-backdrop checkout-backdrop" role="presentation" onClick={() => setCheckoutPlan(null)}><section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={(event) => event.stopPropagation()}><button className="icon-button" aria-label="Close checkout" onClick={() => setCheckoutPlan(null)} type="button"><Icon name="close" size={19}/></button><LogoMark size={30}/><span>Front-end preview</span><h2 id="checkout-title">Continue with {checkoutPlan}</h2><p>This checkout is intentionally inactive. No payment or account information is collected.</p><button onClick={() => { setCheckoutPlan(null); showToast("Checkout is disabled in this demo."); }} type="button">Return to pricing</button></section></div>}

      {copied && copyTooltipPosition && <div id="copy-feedback" className="copy-feedback-tooltip" role="tooltip" style={{ left: copyTooltipPosition.left, top: copyTooltipPosition.top }}>Copied</div>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function ChatComposer({ message, setMessage, submit, toolsMenu, toggleTools, showToast, openDemoNotice, compact = false }: { message: string; setMessage: (value: string) => void; submit: (event: FormEvent) => void; toolsMenu: boolean; toggleTools: (event: MouseEvent) => void; showToast: (text: string) => void; openDemoNotice: () => void; compact?: boolean }) {
  return <form className={`composer ${compact ? "compact" : ""}`} onSubmit={submit} onClick={(event) => event.stopPropagation()}><div className="tools-wrap"><button className="composer-button" aria-label="Add files and more" aria-expanded={toolsMenu} onClick={toggleTools} type="button"><Icon name="plus" size={22}/></button>{toolsMenu && <div className="tools-menu popover" role="menu"><button onClick={() => showToast("File uploads are disabled in this demo.")} role="menuitem" type="button"><Icon name="paperclip" size={20}/><span>Add photos</span><kbd>⌘ U</kbd></button><button onClick={() => showToast("Web search is a visual demo.")} role="menuitem" type="button"><Icon name="globe" size={20}/><span>Web search</span></button><div className="menu-label">Demo modes</div><button onClick={() => showToast("Use Deep research from the sidebar.")} role="menuitem" type="button"><Icon name="research" size={20}/><span>Deep research</span></button><button onClick={() => showToast("Use Images from the sidebar.")} role="menuitem" type="button"><Icon name="wand" size={20}/><span>Create image</span></button><button className="disabled-item" onClick={openDemoNotice} role="menuitem" type="button"><Icon name="file" size={20}/><span>Add files</span></button></div>}</div><textarea aria-label="Chat with Nimbus" onChange={(event) => setMessage(event.target.value)} placeholder="Ask anything" rows={1} value={message}/><div className="composer-trailing"><button className="composer-button mic-button" aria-label="Start dictation" onClick={() => showToast("Microphone access is disabled in this demo.")} type="button"><Icon name="mic" size={21}/></button>{message.trim() ? <button className="send-button" aria-label="Send prompt" type="submit"><Icon name="send" size={19}/></button> : <button className="voice-button" aria-label="Start Voice" onClick={() => showToast("Voice mode is disabled in this demo.")} type="button"><Icon name="voice" size={20}/><span>Voice</span></button>}</div></form>;
}
