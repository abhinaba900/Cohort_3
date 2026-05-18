// Dribbble UI Clone Interactive Logic

// Card Data with 12 highly detailed entries
const SHOTS_DATA = [
  {
    id: 1,
    title: "Purple Case & Premium Phone UI",
    creator: "Upnow Studio",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    image: "assets/purple_phone.png",
    category: "mobile",
    tags: ["phone", "case", "app", "ui", "purple"],
    description: "An elegant purple smartphone case paired with a futuristic glassmorphic UI design showcasing rich charts and biometric login."
  },
  {
    id: 2,
    title: "Make Every Nickel Count Branding",
    creator: "FANCY",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces",
    badge: "TEAM",
    likes: 31,
    views: "6.6k",
    image: "assets/metallic_coins.png",
    category: "branding",
    tags: ["branding", "coin", "gold", "typography", "3d"],
    description: "A premium gold and nickel coin showcase that brings financial branding to life. Designed for a modern fintech company."
  },
  {
    id: 3,
    title: "Dark Trading Desktop Dashboard",
    creator: "Extoj UI UX Design",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    image: "assets/laptop_dashboard.png",
    category: "web-design",
    tags: ["dashboard", "trading", "crypto", "dark", "charts"],
    description: "A high-fidelity financial dashboard mockup displayed on a premium laptop. Features vivid cyan and green trading charts."
  },
  {
    id: 4,
    title: "PLEXO - Crypto Payments UI",
    creator: "Lmote",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces",
    badge: "TEAM",
    likes: 31,
    views: "6.6k",
    image: "assets/plexo_crypto.png",
    category: "illustration",
    tags: ["crypto", "payments", "yellow", "minimal", "branding"],
    description: "Striking high-contrast neon yellow and black layout for PLEXO, an innovative decentralized cryptocurrency payments gateway."
  },
  {
    id: 5,
    title: "Manage Business Budget Page",
    creator: "Victa Ville",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    image: "assets/business_budget.png",
    category: "typography",
    tags: ["budget", "business", "minimal", "pink", "illustration"],
    description: "Soft pink and cream pastel landing page with abstract plant illustrations and bento-grid cards for direct budgeting control."
  },
  {
    id: 6,
    title: "Bonsai billing platform UI",
    creator: "Bonsai",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    category: "web-design",
    tags: ["billing", "saas", "dashboard", "green", "bento"],
    description: "A clean, pastel mint bento-box UI illustrating business invoicing, client management, and revenue analytics for modern agencies.",
    customHtml: `
      <div class="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-emerald-950 flex flex-col justify-between p-6 select-none relative overflow-hidden">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span class="font-bold text-xs tracking-wider text-slate-800 dark:text-emerald-300">Bonsai</span>
          </div>
          <span class="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full font-semibold">Active</span>
        </div>
        
        <div class="my-auto space-y-3 z-10">
          <p class="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">One Platform</p>
          <h4 class="text-xl font-bold text-slate-800 dark:text-white leading-tight font-serif-header">Streamline your agency business.</h4>
          
          <div class="grid grid-cols-3 gap-2 pt-2">
            <div class="bg-white dark:bg-slate-700/50 p-2.5 rounded-xl border border-emerald-100/50 dark:border-white/5 shadow-sm">
              <span class="text-[9px] text-slate-400">Invoicing</span>
              <div class="h-1 w-full bg-emerald-100 dark:bg-emerald-900 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-emerald-500 w-4/5"></div>
              </div>
            </div>
            <div class="bg-white dark:bg-slate-700/50 p-2.5 rounded-xl border border-emerald-100/50 dark:border-white/5 shadow-sm">
              <span class="text-[9px] text-slate-400">Contracts</span>
              <div class="h-1 w-full bg-emerald-100 dark:bg-emerald-900 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-teal-500 w-3/5"></div>
              </div>
            </div>
            <div class="bg-white dark:bg-slate-700/50 p-2.5 rounded-xl border border-emerald-100/50 dark:border-white/5 shadow-sm">
              <span class="text-[9px] text-slate-400">Proposals</span>
              <div class="h-1 w-full bg-emerald-100 dark:bg-emerald-900 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-emerald-400 w-11/12"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-200 dark:bg-emerald-900/30 rounded-full blur-xl opacity-70"></div>
      </div>
    `
  },
  {
    id: 7,
    title: "Minimal Geometric Bird Logo",
    creator: "Typo8 (Jalen pavlovic)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    category: "branding",
    tags: ["logo", "bird", "green", "minimal", "vector"],
    description: "An elegant, geometric vector line-art representation of a flying bird. Ideal for high-end digital identity branding.",
    customHtml: `
      <div class="w-full h-full bg-[#0cd394] flex items-center justify-center p-8 select-none relative overflow-hidden group">
        <svg class="w-28 h-28 text-[#0a1e36] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
          <!-- Bird Vector -->
          <path d="M15,45 Q35,15 65,30 Q85,40 70,55 Q50,45 35,55 L25,65 L35,68 L48,55 Q65,60 75,75 Q55,75 40,65 L25,78 L20,78 L15,45 Z" />
          <circle cx="55" cy="38" r="2.5" fill="currentColor" />
        </svg>
        <div class="absolute bottom-4 left-4 text-xs font-semibold text-[#0a1e36]/70 uppercase tracking-widest">typo8 branding</div>
      </div>
    `
  },
  {
    id: 8,
    title: "Konus UI UX Mobile Finance App",
    creator: "Konus UI UX Tech",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    category: "mobile",
    tags: ["fintech", "charts", "glassmorphism", "iphone", "app"],
    description: "An isometric mobile app showcase featuring premium glassmorphism layouts, live budget lists, and interactive asset pie charts.",
    customHtml: `
      <div class="w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center p-6 select-none relative overflow-hidden">
        <!-- Back glow -->
        <div class="absolute w-40 h-40 bg-white/20 rounded-full blur-2xl -top-10 -left-10 animate-pulse"></div>
        
        <!-- Mobile Frame Mockup -->
        <div class="w-[125px] h-[220px] bg-slate-900 rounded-[24px] border-[3px] border-slate-800 shadow-2xl p-2 flex flex-col justify-between transform -rotate-12 transition-transform duration-500 hover:rotate-0 hover:scale-105">
          <!-- Phone Head -->
          <div class="flex justify-between items-center px-1">
            <span class="text-[7px] text-white font-medium">9:41</span>
            <div class="w-10 h-2 bg-black rounded-full"></div>
            <div class="w-2 h-1 bg-white/40 rounded-full"></div>
          </div>
          
          <!-- Card balance UI -->
          <div class="bg-white/10 backdrop-blur-md rounded-xl p-2 mt-2 border border-white/10 space-y-1">
            <span class="text-[6px] text-violet-200">Total Balance</span>
            <h5 class="text-xs font-bold text-white">$4,860.00</h5>
            <div class="flex justify-between text-[5px] text-violet-200 pt-1">
              <span>**** 4920</span>
              <span>VISA</span>
            </div>
          </div>
          
          <!-- Mini charts -->
          <div class="flex gap-1.5 mt-2 flex-1">
            <div class="bg-white/5 rounded-lg flex-1 p-1.5 flex flex-col justify-between">
              <span class="text-[5px] text-slate-400">Activity</span>
              <div class="flex items-end justify-between h-8 gap-0.5">
                <div class="w-1 bg-violet-400 rounded-full h-2"></div>
                <div class="w-1 bg-violet-400 rounded-full h-4"></div>
                <div class="w-1 bg-white rounded-full h-7"></div>
                <div class="w-1 bg-violet-400 rounded-full h-5"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-[125px] h-[220px] bg-slate-900 rounded-[24px] border-[3px] border-slate-800 shadow-2xl p-2 flex flex-col justify-between transform rotate-12 transition-transform duration-500 hover:rotate-0 hover:scale-105 absolute right-6 bottom-4">
          <!-- Balance status -->
          <div class="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-3 text-white space-y-2">
            <span class="text-[6px] opacity-80">Saved this month</span>
            <h4 class="text-sm font-bold">$1,250.00</h4>
          </div>
          
          <div class="space-y-1">
            <div class="h-4 bg-white/5 rounded-md flex items-center px-1 justify-between">
              <span class="text-[5px] text-white">Apple Subscription</span>
              <span class="text-[5px] text-emerald-400">-$9.99</span>
            </div>
            <div class="h-4 bg-white/5 rounded-md flex items-center px-1 justify-between">
              <span class="text-[5px] text-white">Stripe Payout</span>
              <span class="text-[5px] text-emerald-400">+$2,450.00</span>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 9,
    title: "Empower Your Finances Dashboard",
    creator: "Bato",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop&crop=faces",
    badge: "TEAM",
    likes: 31,
    views: "6.6k",
    category: "web-design",
    tags: ["fintech", "neon", "dashboard", "bento", "card"],
    description: "An ultra-premium black design mockup featuring glowing neon green buttons, active credit card displays, and live metrics grids.",
    customHtml: `
      <div class="w-full h-full bg-[#070b0f] flex flex-col justify-between p-6 select-none relative overflow-hidden border border-slate-800">
        <!-- Grid glow -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>
        
        <div class="flex items-center justify-between z-10">
          <div class="flex items-center gap-1.5">
            <div class="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center">
              <svg class="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="font-bold text-xs text-white">BATO</span>
          </div>
          <span class="text-[8px] bg-slate-900 border border-slate-800 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">PRO VERSION</span>
        </div>

        <div class="my-auto space-y-2 z-10 py-4">
          <h3 class="text-lg font-bold text-white tracking-tight leading-snug">Empower Your Finances!</h3>
          <p class="text-[9px] text-slate-400 max-w-[200px]">Next-generation business tracking dashboard with automated billing pipelines.</p>
        </div>

        <!-- Bento blocks -->
        <div class="grid grid-cols-2 gap-2 z-10">
          <div class="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
            <div class="space-y-0.5">
              <span class="text-[7px] text-slate-500 block uppercase">Conversion</span>
              <span class="text-xs font-bold text-white">94.2%</span>
            </div>
            <span class="text-[7px] text-emerald-400 bg-emerald-500/10 px-1 rounded">+2.5%</span>
          </div>
          <div class="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
            <div class="space-y-0.5">
              <span class="text-[7px] text-slate-500 block uppercase">Revenue</span>
              <span class="text-xs font-bold text-white">$124.5k</span>
            </div>
            <span class="text-[7px] text-emerald-400 bg-emerald-500/10 px-1 rounded">Live</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 10,
    title: "Floncek Modern Corporate Identity",
    creator: "Jovel Ahmed",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    category: "branding",
    tags: ["branding", "forest-green", "logo", "minimal", "corporate"],
    description: "Deep forest green branding card showcasing custom minimal logo typography for 'Floncek' - a smart architecture firm.",
    customHtml: `
      <div class="w-full h-full bg-[#0a2e36] flex flex-col justify-between p-7 select-none relative overflow-hidden">
        <!-- Logo Top -->
        <div class="flex justify-between items-start">
          <div class="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
            <svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <span class="text-[9px] text-emerald-300 font-semibold tracking-widest uppercase">Est. 2026</span>
        </div>
        
        <!-- Big text -->
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h2 class="text-3xl font-bold tracking-tight text-white font-serif-header">Floncek</h2>
          </div>
          <p class="text-[9px] text-emerald-300/60 uppercase tracking-widest font-semibold pl-8">Corporate Architecture</p>
        </div>

        <div class="text-[8px] text-slate-400">floncek.design</div>
      </div>
    `
  },
  {
    id: 11,
    title: "Running Rabbit Branding Grid",
    creator: "Levi Lowell",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    category: "illustration",
    tags: ["rabbit", "grid", "logo", "branding", "minimalist"],
    description: "A colorful, minimalist 2x2 grid featuring a clean running rabbit vector logo layout in lavender, emerald, navy, and purple.",
    customHtml: `
      <div class="w-full h-full grid grid-cols-2 grid-rows-2 select-none">
        <div class="bg-[#10b981] flex items-center justify-center p-4 relative group">
          <svg class="w-12 h-12 text-[#111827] transform -rotate-12 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20,60 C20,60 40,40 55,40 C70,40 85,55 85,55 L75,65 C75,65 60,50 50,55 C40,60 25,60 25,60 M55,40 C55,40 60,20 65,20 C70,20 75,30 75,30" />
            <circle cx="50" cy="46" r="2" fill="currentColor" />
          </svg>
        </div>
        <div class="bg-[#c084fc] flex items-center justify-center p-4 relative group">
          <svg class="w-12 h-12 text-[#111827] transform rotate-12 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20,60 C20,60 40,40 55,40 C70,40 85,55 85,55 L75,65 C75,65 60,50 50,55 C40,60 25,60 25,60 M55,40 C55,40 60,20 65,20 C70,20 75,30 75,30" />
            <circle cx="50" cy="46" r="2" fill="currentColor" />
          </svg>
        </div>
        <div class="bg-[#0b253a] flex items-center justify-center p-4 relative group">
          <svg class="w-12 h-12 text-[#10b981] transform -rotate-6 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20,60 C20,60 40,40 55,40 C70,40 85,55 85,55 L75,65 C75,65 60,50 50,55 C40,60 25,60 25,60 M55,40 C55,40 60,20 65,20 C70,20 75,30 75,30" />
            <circle cx="50" cy="46" r="2" fill="currentColor" />
          </svg>
        </div>
        <div class="bg-[#e9d5ff] flex items-center justify-center p-4 relative group">
          <svg class="w-12 h-12 text-[#c084fc] transform rotate-6 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20,60 C20,60 40,40 55,40 C70,40 85,55 85,55 L75,65 C75,65 60,50 50,55 C40,60 25,60 25,60 M55,40 C55,40 60,20 65,20 C70,20 75,30 75,30" />
            <circle cx="50" cy="46" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    `
  },
  {
    id: 12,
    title: "Vintage Free Sample Pack Poster",
    creator: "Ulysses Design Co.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=faces",
    badge: "PRO",
    likes: 31,
    views: "6.6k",
    category: "typography",
    tags: ["vintage", "poster", "retro", "sample", "pack"],
    description: "A gorgeous retro poster design card featuring bold typographic textures and custom serif styling proclaiming a 'FREE SAMPLE PACK'.",
    customHtml: `
      <div class="w-full h-full bg-[#efe8db] border-4 border-[#121c2b] flex flex-col justify-between p-6 select-none relative overflow-hidden">
        <!-- Distressed print overlay -->
        <div class="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
        
        <div class="flex justify-between items-center text-[8px] font-bold text-[#121c2b] border-b border-[#121c2b]/30 pb-2">
          <span>BRANDING RESOURCES</span>
          <span>ESTD 2026</span>
        </div>
        
        <div class="text-center my-auto space-y-1">
          <p class="text-[8px] font-semibold text-[#121c2b] uppercase tracking-widest">ULYSSES DESIGN CO. PRESENTS</p>
          <h1 class="text-4xl font-extrabold text-[#121c2b] uppercase tracking-tighter font-serif-header leading-none select-none">FREE</h1>
          <p class="text-xs font-bold text-[#ea4c89] tracking-widest uppercase">SAMPLE PACK</p>
          <div class="w-10 h-0.5 bg-[#121c2b] mx-auto my-1"></div>
          <p class="text-[7px] text-[#121c2b] uppercase tracking-wider font-semibold">TYPEFACES | TEMPLATES | GRAPHICS</p>
        </div>
        
        <div class="flex justify-between items-center text-[7px] font-bold text-[#121c2b] pt-2 border-t border-[#121c2b]/30">
          <span>CREATIVE ASSETS</span>
          <span>GET IT NOW</span>
        </div>
      </div>
    `
  }
];

// Active Filters State
let activeCategory = "discover";
let searchQuery = "";
let currentPopularFilter = "popular";
let advancedFilters = {
  tags: "",
  color: "",
  type: "all"
};

// Simulated comment replies for lightbox modal
const MOCK_COMMENTS = [
  { user: "Jane Cooper", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop", text: "This looks absolutely breathtaking! The design precision is phenomenal! 🔥" },
  { user: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop", text: "Wow, the color palette and composition is spot on. Loved the subtle shadow structures!" }
];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Theme
  initTheme();
  
  // Render Initial Shots
  renderShots(SHOTS_DATA);
  
  // Setup Search Listeners
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    applyFiltersWithLoader();
  });
  
  // Setup Trending Tags Listeners
  const trendingTags = document.querySelectorAll(".trending-tag");
  trendingTags.forEach(tag => {
    tag.addEventListener("click", () => {
      const tagText = tag.getAttribute("data-tag");
      searchInput.value = tagText;
      searchQuery = tagText.toLowerCase();
      applyFiltersWithLoader();
    });
  });

  // Setup Category Navigation
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("text-black", "dark:text-white", "bg-gray-100", "dark:bg-slate-800", "font-semibold"));
      btn.classList.add("text-black", "dark:text-white", "bg-gray-100", "dark:bg-slate-800", "font-semibold");
      
      activeCategory = btn.getAttribute("data-category");
      applyFiltersWithLoader();
    });
  });

  // Setup Popularity Select
  const popularBtn = document.getElementById("popular-filter-btn");
  const popularDropdown = document.getElementById("popular-filter-dropdown");
  if (popularBtn && popularDropdown) {
    popularBtn.addEventListener("click", () => {
      popularDropdown.classList.toggle("hidden");
    });
    
    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!popularBtn.contains(e.target) && !popularDropdown.contains(e.target)) {
        popularDropdown.classList.add("hidden");
      }
    });

    const popularOptions = popularDropdown.querySelectorAll(".popular-option");
    popularOptions.forEach(opt => {
      opt.addEventListener("click", () => {
        const val = opt.getAttribute("data-val");
        popularBtn.querySelector("span").textContent = opt.textContent.trim();
        currentPopularFilter = val;
        popularDropdown.classList.add("hidden");
        applyFiltersWithLoader();
      });
    });
  }

  // Setup Collapsible Advanced Filters
  const filterToggleBtn = document.getElementById("filter-toggle-btn");
  const filterPanel = document.getElementById("filter-panel");
  if (filterToggleBtn && filterPanel) {
    filterToggleBtn.addEventListener("click", () => {
      filterPanel.classList.toggle("hidden");
      filterToggleBtn.classList.toggle("bg-gray-100");
      filterToggleBtn.classList.toggle("dark:bg-slate-800");
    });
  }

  // Advanced Filters Handlers
  const advTagsInput = document.getElementById("adv-tags");
  const advColorInput = document.getElementById("adv-color");
  const advTypeSelect = document.getElementById("adv-type");
  const applyAdvBtn = document.getElementById("apply-adv-filters");
  const resetAdvBtn = document.getElementById("reset-adv-filters");

  if (applyAdvBtn) {
    applyAdvBtn.addEventListener("click", () => {
      advancedFilters.tags = advTagsInput ? advTagsInput.value.toLowerCase().trim() : "";
      advancedFilters.color = advColorInput ? advColorInput.value : "";
      advancedFilters.type = advTypeSelect ? advTypeSelect.value : "all";
      applyFiltersWithLoader();
    });
  }

  if (resetAdvBtn) {
    resetAdvBtn.addEventListener("click", () => {
      if (advTagsInput) advTagsInput.value = "";
      if (advColorInput) advColorInput.value = "#ffffff";
      if (advTypeSelect) advTypeSelect.value = "all";
      advancedFilters = { tags: "", color: "", type: "all" };
      applyFiltersWithLoader();
    });
  }

  // Lightbox Modal setup
  const modalClose = document.getElementById("modal-close");
  const modalOverlay = document.getElementById("detail-modal");
  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", () => {
      closeShotModal();
    });
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeShotModal();
      }
    });
  }

  // Theme Toggle Button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Back to Top setup
  initBackToTop();
  
  // Interactive global Sign up modals
  const signupButtons = document.querySelectorAll(".trigger-signup");
  const signupModal = document.getElementById("signup-modal");
  const signupModalClose = document.getElementById("signup-modal-close");
  
  if (signupModal) {
    signupButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        signupModal.classList.remove("hidden");
        signupModal.classList.add("flex");
        document.body.style.overflow = "hidden";
      });
    });
    
    if (signupModalClose) {
      signupModalClose.addEventListener("click", () => {
        signupModal.classList.add("hidden");
        signupModal.classList.remove("flex");
        document.body.style.overflow = "";
      });
    }

    signupModal.addEventListener("click", (e) => {
      if (e.target === signupModal) {
        signupModal.classList.add("hidden");
        signupModal.classList.remove("flex");
        document.body.style.overflow = "";
      }
    });
  }
});

// Render Shots grid dynamically
function renderShots(shots) {
  const grid = document.getElementById("shots-grid");
  if (!grid) return;

  if (shots.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 flex flex-col items-center justify-center text-center">
        <div class="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-600 mb-4 animate-bounce">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-slate-800 dark:text-white">No results found</h3>
        <p class="text-sm text-slate-400 mt-1 max-w-sm">We couldn't find any shots matching your filters. Try adjusting your terms or categories!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = "";

  shots.forEach((shot) => {
    const card = document.createElement("div");
    card.className = "group flex flex-col bg-transparent rounded-xl transition-all-custom";
    
    // Check if card contains standard image or custom vector HTML mockup
    let previewHtml = "";
    if (shot.image) {
      previewHtml = `
        <div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 zoom-container">
          <img src="${shot.image}" alt="${shot.title}" class="w-full h-full object-cover zoom-image" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 cursor-pointer" onclick="openShotModal(${shot.id})">
            <div class="flex justify-end gap-2">
              <button class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:text-[#ea4c89] flex items-center justify-center shadow-md transition-colors" title="Save to bucket" onclick="event.stopPropagation(); triggerGlobalSignup()">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between text-white">
              <span class="font-bold text-sm truncate max-w-[200px]">${shot.title}</span>
            </div>
          </div>
        </div>
      `;
    } else if (shot.customHtml) {
      previewHtml = `
        <div class="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800/50 shadow-sm bg-gray-50 dark:bg-slate-900 group">
          <div class="w-full h-full">
            ${shot.customHtml}
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 cursor-pointer" onclick="openShotModal(${shot.id})">
            <div class="flex justify-end gap-2">
              <span class="absolute top-4 left-4 bg-[#ea4c89] pulse-glow text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Interactive CSS</span>
              <button class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:text-[#ea4c89] flex items-center justify-center shadow-md transition-colors" title="Save to bucket" onclick="event.stopPropagation(); triggerGlobalSignup()">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between text-white">
              <span class="font-bold text-sm truncate max-w-[200px]">${shot.title}</span>
            </div>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      ${previewHtml}
      
      <!-- Footer Details -->
      <div class="flex items-center justify-between mt-3 px-1 text-xs">
        <div class="flex items-center gap-2">
          <img src="${shot.avatar}" alt="${shot.creator}" class="w-6 h-6 rounded-full object-cover border border-gray-100 dark:border-slate-800" />
          <span class="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[100px] hover:text-[#ea4c89] dark:hover:text-[#ea4c89] cursor-pointer" onclick="triggerGlobalSignup()">${shot.creator}</span>
          ${shot.badge ? `
            <span class="bg-gray-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[8px] px-1 rounded uppercase tracking-widest leading-none py-0.5">${shot.badge}</span>
          ` : ""}
        </div>
        
        <div class="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-semibold select-none">
          <button class="flex items-center gap-1 hover:text-[#ea4c89] dark:hover:text-[#ea4c89] transition-colors group/like" onclick="likeShot(${shot.id}, this)">
            <svg class="w-3.5 h-3.5 heart-icon transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="like-count">${shot.likes}</span>
          </button>
          <div class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>${shot.views}</span>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Liking action with nice bounce animation
function likeShot(id, btnElement) {
  event.stopPropagation();
  const shot = SHOTS_DATA.find(s => s.id === id);
  if (!shot) return;

  const heartIcon = btnElement.querySelector(".heart-icon");
  const likeCountElement = btnElement.querySelector(".like-count");

  // Check if already liked (simulated locally on heart element class)
  const isLiked = heartIcon.getAttribute("fill") === "#ea4c89";

  if (!isLiked) {
    shot.likes += 1;
    heartIcon.setAttribute("fill", "#ea4c89");
    heartIcon.setAttribute("stroke", "#ea4c89");
    heartIcon.classList.add("animate-heart");
    btnElement.classList.add("text-[#ea4c89]");
  } else {
    shot.likes -= 1;
    heartIcon.setAttribute("fill", "none");
    heartIcon.setAttribute("stroke", "currentColor");
    heartIcon.classList.remove("animate-heart");
    btnElement.classList.remove("text-[#ea4c89]");
  }

  likeCountElement.textContent = shot.likes;
  
  // Clear animation class after a short delay so it can be re-run
  setTimeout(() => {
    heartIcon.classList.remove("animate-heart");
  }, 400);
}

// Client Side Advanced Filter Application with Loader
function applyFiltersWithLoader() {
  const grid = document.getElementById("shots-grid");
  if (!grid) return;

  // Show Skeletal Loader
  grid.innerHTML = Array(8).fill(0).map(() => `
    <div class="flex flex-col bg-transparent rounded-xl animate-pulse">
      <div class="aspect-[4/3] bg-gray-200 dark:bg-slate-800 rounded-xl skeleton-loading"></div>
      <div class="flex items-center justify-between mt-3 px-1">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-gray-200 dark:bg-slate-800 skeleton-loading"></div>
          <div class="h-3 w-16 bg-gray-200 dark:bg-slate-800 rounded-md skeleton-loading"></div>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-3 w-8 bg-gray-200 dark:bg-slate-800 rounded-md skeleton-loading"></div>
          <div class="h-3 w-8 bg-gray-200 dark:bg-slate-800 rounded-md skeleton-loading"></div>
        </div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    let filtered = SHOTS_DATA.filter((shot) => {
      // Category filter
      if (activeCategory !== "discover" && shot.category !== activeCategory) {
        return false;
      }

      // Search Query filter
      if (searchQuery) {
        const matchesTitle = shot.title.toLowerCase().includes(searchQuery);
        const matchesCreator = shot.creator.toLowerCase().includes(searchQuery);
        const matchesTags = shot.tags.some(t => t.toLowerCase().includes(searchQuery));
        if (!matchesTitle && !matchesCreator && !matchesTags) {
          return false;
        }
      }

      // Advanced Tag filter
      if (advancedFilters.tags) {
        if (!shot.tags.some(t => t.toLowerCase().includes(advancedFilters.tags))) {
          return false;
        }
      }

      // Advanced Type filter (Static vs Custom HTML Mockups)
      if (advancedFilters.type !== "all") {
        if (advancedFilters.type === "animated" && !shot.customHtml) return false;
        if (advancedFilters.type === "static" && shot.customHtml) return false;
      }

      return true;
    });

    // Sorting popular filter (simulated logic)
    if (currentPopularFilter === "new") {
      filtered = filtered.reverse();
    } else if (currentPopularFilter === "goods") {
      filtered = filtered.filter(s => s.badge === "PRO" || s.badge === "TEAM");
    }

    renderShots(filtered);
  }, 400);
}

// Lightbox Modal Control
function openShotModal(id) {
  const shot = SHOTS_DATA.find(s => s.id === id);
  if (!shot) return;

  const modal = document.getElementById("detail-modal");
  const modalImageContainer = document.getElementById("modal-image-container");
  const modalTitle = document.getElementById("modal-title");
  const modalCreator = document.getElementById("modal-creator");
  const modalAvatar = document.getElementById("modal-avatar");
  const modalBadge = document.getElementById("modal-badge");
  const modalLikes = document.getElementById("modal-likes");
  const modalViews = document.getElementById("modal-views");
  const modalDescription = document.getElementById("modal-description");
  const modalTagsContainer = document.getElementById("modal-tags-container");
  const commentSection = document.getElementById("modal-comments-list");

  // Format modal mockup preview content
  if (shot.image) {
    modalImageContainer.innerHTML = `<img src="${shot.image}" alt="${shot.title}" class="w-full h-auto rounded-xl object-contain max-h-[70vh] shadow-lg mx-auto" />`;
  } else if (shot.customHtml) {
    modalImageContainer.innerHTML = `
      <div class="w-full aspect-[4/3] md:w-[640px] h-auto rounded-xl overflow-hidden shadow-lg mx-auto border border-gray-100 dark:border-slate-800">
        ${shot.customHtml}
      </div>
    `;
  }

  // Title & Creator
  modalTitle.textContent = shot.title;
  modalCreator.textContent = shot.creator;
  modalAvatar.src = shot.avatar;
  
  if (shot.badge) {
    modalBadge.textContent = shot.badge;
    modalBadge.classList.remove("hidden");
  } else {
    modalBadge.classList.add("hidden");
  }

  // Stats
  modalLikes.textContent = shot.likes;
  
  // Format views
  let currentViews = parseFloat(shot.views.replace('k', '')) + 0.1;
  shot.views = currentViews.toFixed(1) + 'k';
  modalViews.textContent = shot.views;

  // Description
  modalDescription.textContent = shot.description || "No description provided for this creative asset.";

  // Tags
  modalTagsContainer.innerHTML = "";
  shot.tags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-[#ea4c89] hover:text-white transition-colors duration-200";
    span.textContent = `#${tag}`;
    span.addEventListener("click", () => {
      closeShotModal();
      const sInput = document.getElementById("search-input");
      sInput.value = tag;
      searchQuery = tag;
      applyFiltersWithLoader();
    });
    modalTagsContainer.appendChild(span);
  });

  // Load Mock Comments
  loadMockComments(commentSection);

  // Comment Box Submit Setup
  const commentInput = document.getElementById("comment-input");
  const commentSubmit = document.getElementById("comment-submit-btn");
  
  // Remove existing listeners
  const newSubmit = commentSubmit.cloneNode(true);
  commentSubmit.parentNode.replaceChild(newSubmit, commentSubmit);

  newSubmit.addEventListener("click", () => {
    const txt = commentInput.value.trim();
    if (!txt) return;

    const li = document.createElement("div");
    li.className = "flex gap-3 items-start border-b border-gray-100 dark:border-slate-800/80 pb-3 animate-fade-in";
    li.innerHTML = `
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" class="w-8 h-8 rounded-full object-cover" />
      <div>
        <h6 class="font-bold text-xs text-slate-800 dark:text-white">You (Visitor)</h6>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${txt}</p>
      </div>
    `;
    commentSection.appendChild(li);
    commentInput.value = "";
    commentSection.scrollTop = commentSection.scrollHeight;
  });

  // Open modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeShotModal() {
  const modal = document.getElementById("detail-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

function loadMockComments(container) {
  container.innerHTML = "";
  MOCK_COMMENTS.forEach(c => {
    const div = document.createElement("div");
    div.className = "flex gap-3 items-start border-b border-gray-100 dark:border-slate-800/80 pb-3";
    div.innerHTML = `
      <img src="${c.avatar}" class="w-8 h-8 rounded-full object-cover" />
      <div>
        <h6 class="font-bold text-xs text-slate-800 dark:text-white">${c.user}</h6>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${c.text}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

// Scroll to Top Radial Ring
function initBackToTop() {
  const progressPath = document.querySelector('.progress-wrap path');
  if (!progressPath) return;

  const pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.transition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = 'stroke-dashoffset 10ms linear';

  const updateProgress = () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress);

  const offset = 150;
  const progressWrap = document.querySelector('.progress-wrap');

  window.addEventListener('scroll', () => {
    if (window.scrollY > offset) {
      progressWrap.classList.add('active-progress');
    } else {
      progressWrap.classList.remove('active-progress');
    }
  });

  progressWrap.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Theme Handlers
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
    updateThemeIcon(true);
  } else {
    document.documentElement.classList.remove("dark");
    updateThemeIcon(false);
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    updateThemeIcon(false);
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    updateThemeIcon(true);
  }
}

function updateThemeIcon(isDark) {
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  if (!sunIcon || !moonIcon) return;

  if (isDark) {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  } else {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  }
}

// Direct popups
function triggerGlobalSignup() {
  const signupModal = document.getElementById("signup-modal");
  if (signupModal) {
    signupModal.classList.remove("hidden");
    signupModal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}
window.triggerGlobalSignup = triggerGlobalSignup;
