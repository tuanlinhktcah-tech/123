import { useState, useEffect, useRef, useMemo } from "react";
import { 
  Search, 
  ChevronDown, 
  Phone, 
  MessageCircle, 
  Send, 
  User, 
  Users, 
  Bot, 
  X, 
  ExternalLink, 
  FileText, 
  Home, 
  MapPin, 
  UserCheck, 
  CreditCard, 
  Car, 
  ShieldAlert, 
  ShieldCheck, 
  Fingerprint, 
  Compass, 
  FileCode, 
  HeartPulse, 
  CalendarRange, 
  Play, 
  CheckCircle2, 
  Moon, 
  Sun, 
  Menu, 
  Info, 
  QrCode, 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowUpRight,
  ChevronRight,
  PhoneCall,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "./assets/images/logo.png";
import { 
  PUBLIC_SERVICES, 
  VNEID_UTILITIES, 
  VIDEO_TUTORIALS, 
  SUPPORT_OFFICERS, 
  FAQS,
  PublicService,
  VNeIDUtility,
  VideoTutorial
} from "./data";

// Asset Image generated
const bannerImg = "/src/assets/images/Anh.jpg";

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(false);
  
  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Active navigation section
  const [activeSection, setActiveSection] = useState<string>("home");

  // Search & Filters for Public Services
  const [serviceSearch, setServiceSearch] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // Selected items for Modals
  const [selectedService, setSelectedService] = useState<PublicService | null>(null);
  const [selectedVNeIDUtility, setSelectedVNeIDUtility] = useState<VNeIDUtility | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // FAQ Accordion open index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // AI Chatbot State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { 
      role: "bot", 
      text: "Xin chào! Tôi là Trợ lý ảo chuyển đổi số của Tuổi trẻ Công an tỉnh Bắc Ninh. Tôi có thể hỗ trợ Anh/Chị thông tin về các thủ tục dịch vụ công trực tuyến và hướng dẫn sử dụng VNeID. Anh/Chị cần hỗ trợ gì hôm nay?" 
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // News items for more visual interest
  const newsItems = [
    {
      id: 1,
      title: "Đoàn Thanh niên Công an tỉnh Bắc Ninh ra quân 'Ngày thứ Bảy tình nguyện' hỗ trợ nhân dân cấp Căn cước mới",
      date: "24/06/2026",
      desc: "Hơn 50 đoàn viên thanh niên xung kích đã có mặt tại các điểm tiếp dân để hướng dẫn quy trình đăng ký trực tuyến.",
      image: "https://picsum.photos/seed/news1/600/400"
    },
    {
      id: 2,
      title: "Bắc Ninh hoàn thành vượt chỉ tiêu 100% kích hoạt tài khoản định danh điện tử VNeID Mức 2 cho công dân",
      date: "20/06/2026",
      desc: "Nỗ lực không quản ngày đêm của lực lượng Công an toàn tỉnh, đặc biệt là vai trò tiên phong của thanh niên Công an xã, phường.",
      image: "https://picsum.photos/seed/news2/600/400"
    },
    {
      id: 3,
      title: "Hội nghị tập huấn nâng cao năng lực số cho Tổ công nghệ số cộng đồng và Đoàn thanh niên Công an cấp cơ sở",
      date: "15/06/2026",
      desc: "Phổ biến các kỹ năng tuyên truyền, hướng dẫn dịch vụ công trực tuyến mức độ toàn trình và tích hợp ví điện tử.",
      image: "https://picsum.photos/seed/news3/600/400"
    }
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  // Sync dark theme to HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  // Map Lucide Icons dynamically
  const getIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case "FileText": return <FileText className={iconClass} />;
      case "Home": return <Home className={iconClass} />;
      case "MapPin": return <MapPin className={iconClass} />;
      case "UserCheck": return <UserCheck className={iconClass} />;
      case "CreditCard": return <CreditCard className={iconClass} />;
      case "Car": return <Car className={iconClass} />;
      case "ShieldAlert": return <ShieldAlert className={iconClass} />;
      case "ShieldCheck": return <ShieldCheck className={iconClass} />;
      case "Fingerprint": return <Fingerprint className={iconClass} />;
      case "Compass": return <Compass className={iconClass} />;
      case "FileCode": return <FileCode className={iconClass} />;
      case "HeartPulse": return <HeartPulse className={iconClass} />;
      case "CalendarRange": return <CalendarRange className={iconClass} />;
      default: return <Info className={iconClass} />;
    }
  };

  // Filter public services based on search & filter category
  const filteredServices = useMemo(() => {
    return PUBLIC_SERVICES.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(serviceSearch.toLowerCase()) || 
                            service.description.toLowerCase().includes(serviceSearch.toLowerCase());
      
      if (serviceFilter === "all") return matchesSearch;
      if (serviceFilter === "cu-tru") {
        return matchesSearch && ["dang-ky-thuong-tru", "dang-ky-tam-tru", "khai-bao-luu-tru", "khai-bao-tam-vang"].includes(service.id);
      }
      if (serviceFilter === "cccd") {
        return matchesSearch && ["cap-doi-cccd"].includes(service.id);
      }
      if (serviceFilter === "tu-phap") {
        return matchesSearch && ["ly-lich-tu-phap"].includes(service.id);
      }
      if (serviceFilter === "giao-thong") {
        return matchesSearch && ["dang-ky-phuong-tien", "nop-phat-giao-thong"].includes(service.id);
      }
      if (serviceFilter === "an-ninh") {
        return matchesSearch && ["to-giac-toi-pham"].includes(service.id);
      }
      return matchesSearch;
    });
  }, [serviceSearch, serviceFilter]);

  // Send message to Gemini AI chatbot
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    // Update messages
    setChatMessages(prev => [...prev, { role: "user", text: textToSend }]);
    if (!customText) setChatInput("");
    setIsTyping(true);

    try {
      // Build conversation history format
      const history = chatMessages.slice(-6).map(m => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history })
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      
      setChatMessages(prev => [...prev, { role: "bot", text: data.text }]);
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { 
        role: "bot", 
        text: "Rất tiếc, đã có lỗi kết nối xảy ra trong hệ thống trợ lý. Xin vui lòng thử lại sau giây lát, hoặc kết nối trực tiếp đến số điện thoại nóng của cán bộ hỗ trợ để được tư vấn ngay lập tức!" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [isDark]);
  return (
    <div className="min-h-screen transition-colors duration-300 font-sans bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      
      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Brand */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo("home")}>
              {/* Custom SVG logo representing Police Badge + Youth Star */}
              <img
                src={logo}
                alt="Đoàn Thanh niên Công an tỉnh Bắc Ninh"
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500 block">Đoàn Thanh Niên</span>
                <span className="text-sm font-extrabold text-blue-900 dark:text-blue-400 leading-tight block">CA TỈNH BẮC NINH</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
              {[
                { name: "Trang chủ", id: "home" },
                { name: "Dịch vụ công", id: "public-services" },
                { name: "Tiện ích VNeID", id: "vneid" },
                { name: "Video hướng dẫn", id: "videos" },
                { name: "Tin tức số", id: "news" },
                { name: "Liên hệ hỗ trợ", id: "support" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeSection === item.id 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Utility buttons */}
            <div className="flex items-center space-x-2">
              {/* Dark/Light mode toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-inner"
                title={isDark ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                id="theme-toggle"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-1 shadow-lg"
            >
              {[
                { name: "Trang chủ", id: "home" },
                { name: "Dịch vụ công trực tuyến", id: "public-services" },
                { name: "Hướng dẫn VNeID", id: "vneid" },
                { name: "Video hướng dẫn", id: "videos" },
                { name: "Tin tức chuyển đổi số", id: "news" },
                { name: "Liên hệ hỗ trợ", id: "support" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Header Brand Slogan Text banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white py-3 px-4 text-center text-xs sm:text-sm font-semibold tracking-wider border-b border-amber-500 shadow-sm">
        📢 Website thuộc Đề án Chuyển đổi số Quốc gia của Đoàn Thanh niên Công an tỉnh Bắc Ninh đồng hành cùng Nhân dân
      </div>

      {/* 2. BANNER CHÍNH (HERO SECTION) */}
      <section id="home" className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20">
        
        {/* Ambient background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Slogan and Text (Left) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-extrabold tracking-wide uppercase border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                Tiên phong - Bản lĩnh - Kỷ cương - Sáng tạo
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5x1 font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Tuổi trẻ Công an Bắc Ninh <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 bg-clip-text text-transparent">
                  Tiên phong trong Chuyển đổi số
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                "Mỗi đoàn viên là một tuyên truyền viên chuyển đổi số" - Chúng tôi tiên phong hướng dẫn, hỗ trợ Nhân dân tiếp cận dịch vụ công trực tuyến và khai thác tối đa tiện ích từ tài khoản định danh điện tử VNeID.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => scrollTo("public-services")}
                  className="px-8 py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-amber-300" />
                  Dịch vụ công trực tuyến
                </button>
                <button
                  onClick={() => scrollTo("vneid")}
                  className="px-8 py-4 rounded-xl font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 shadow-md active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Fingerprint className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Khám phá tiện ích VNeID
                </button>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">100%</div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Xã phường phủ sóng</div>
                </div>
                <div className="text-center sm:text-left border-x border-slate-200 dark:border-slate-800 px-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">24/7</div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hỗ trợ trực tuyến</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-500">30K+</div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lượt hỗ trợ thành công</div>
                </div>
              </div>

            </div>

            {/* Generated Image Banner (Right) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Glowing ring */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-amber-500 opacity-75 blur-md animate-pulse"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
                  <img
                    src={bannerImg}
                    alt="Tuổi trẻ Công an Bắc Ninh hướng dẫn người dân chuyển đổi số"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle caption bar on image overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-5 text-white">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">Công nghệ số</p>
                    <p className="text-sm font-semibold">Tổ Thanh niên Công an Bắc Ninh hỗ trợ dịch vụ số hướng dẫn Nhân dân thực hiện thủ tục hành chính trực tuyến</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KHU VỰC DỊCH VỤ CÔNG TRỰC TUYẾN */}
      <section id="public-services" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-200 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dịch Vụ Công Trực Tuyến Bộ Công An
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Tìm kiếm và làm các thủ tục hành chính công trực tiếp ngay tại nhà, giúp tiết kiệm tối đa thời gian, chi phí đi lại.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Nhập dịch vụ cần tìm (ví dụ: cư trú, lý lịch tư pháp...)"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium text-sm"
                />
                {serviceSearch && (
                  <button 
                    onClick={() => setServiceSearch("")} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
                {[
                  { name: "Tất cả", id: "all" },
                  { name: "Cư trú", id: "cu-tru" },
                  { name: "Căn cước", id: "cccd" },
                  { name: "Tư pháp / Hộ chiếu", id: "tu-phap" },
                  { name: "Giao thông", id: "giao-thong" },
                  { name: "An ninh / Tố giác", id: "an-ninh" }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setServiceFilter(category.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      serviceFilter === category.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex flex-col bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 group transition-all duration-300"
                >
                  <div className="mb-4 p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 w-fit group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow line-clamp-3">
                    {service.description}
                  </p>
                  
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 group-hover:text-white group-hover:bg-blue-600 hover:shadow-md transition-all font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Xem hướng dẫn
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
              <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400 font-bold">Không tìm thấy dịch vụ nào phù hợp</p>
              <button onClick={() => {setServiceSearch(""); setServiceFilter("all");}} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                Xóa bộ lọc và tìm lại
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. KHU VỰC TIỆN ÍCH ỨNG DỤNG VNEID */}
      <section id="vneid" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              Ứng dụng định danh điện tử Quốc gia
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Khám phá tiện ích ứng dụng VNeID
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              VNeID tích hợp nhiều loại giấy tờ cá nhân, bảo mật đa lớp giúp giải quyết các thủ tục trực tuyến nhanh chóng nhất.
            </p>
          </div>

          {/* Grid of Utilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VNEID_UTILITIES.map((util, idx) => (
              <motion.div
                key={util.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-950 rounded-2xl p-8 border border-slate-200/55 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:border-amber-500 dark:hover:border-amber-500 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="mb-5 p-4 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    {getIcon(util.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {util.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {util.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedVNeIDUtility(util)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 group-hover:border-amber-500 text-slate-700 dark:text-slate-300 group-hover:bg-amber-500 group-hover:text-white transition-all font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  Xem chi tiết tiện ích
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. KHU VỰC VIDEO HƯỚNG DẪN */}
      <section id="videos" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Thư viện video hướng dẫn
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Các video trực quan sinh động từng bước giúp bất cứ ai cũng có thể tự cài đặt VNeID và nộp hồ sơ công trực tuyến thành công.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEO_TUTORIALS.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-800 hover:shadow-lg transition-all flex flex-col h-full group"
              >
                {/* Thumbnail container */}
                <div className="relative aspect-video bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setActiveVideoUrl(video.youtubeId)}>
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-slate-900/85 text-white text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {video.duration}
                  </div>
                  {/* Category tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-bold">
                    {video.category}
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-4">
                    {video.title}
                  </h3>
                  <button
                    onClick={() => setActiveVideoUrl(video.youtubeId)}
                    className="w-full py-2.5 rounded-xl border border-blue-600/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Xem Ngay Video
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* NEW SECTION: TIN TỨC CHUYỂN ĐỔI SỐ (NEWS) */}
      <section id="news" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tin tức & hoạt động Chuyển đổi số
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Cập nhật các hoạt động, phong trào xung kích vì Nhân dân của lực lượng thanh niên Công an toàn tỉnh Bắc Ninh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <div key={news.id} className="bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200/65 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col">
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-xs font-bold">
                    {news.date}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base line-clamp-2 leading-snug hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3">
                      {news.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-900 mt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-red-600 dark:text-red-500">ĐTN Công an Bắc Ninh</span>
                    <button className="text-xs font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                      Đọc tiếp <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. KHU VỰC QR CODE */}
      <section className="py-16 bg-white dark:bg-slate-950 border-t border-b border-slate-100 dark:border-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            
            {/* Ambient visual background vectors */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-widest">
                Quét mã QR - Tải & Truy cập ngay
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Trung Tâm Tra Cứu & Tải Ứng Dụng
              </h2>
              <p className="text-blue-200 text-sm sm:text-base">
                Dùng điện thoại quét các mã QR dưới đây để tải nhanh ứng dụng VNeID chính thức hoặc truy cập tức thì các cổng thông tin công ích.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-center">
              {[
                {
                  title: "Dịch vụ công Quốc gia",
                  desc: "Truy cập cổng dịch vụ",
                  qrText: "CỔNG DVC QUỐC GIA",
                  bg: "from-blue-600 to-indigo-700"
                },
                {
                  title: "VNeID Android (Google Play)",
                  desc: "Tải ứng dụng cho máy Android",
                  qrText: "VNEID ANDROID",
                  bg: "from-green-600 to-teal-700"
                },
                {
                  title: "VNeID iOS (App Store)",
                  desc: "Tải ứng dụng cho iPhone",
                  qrText: "VNEID IOS APPSTORE",
                  bg: "from-sky-600 to-blue-700"
                },
                {
                  title: "ĐTN Công an Bắc Ninh",
                  desc: "Trang thông tin hỗ trợ",
                  qrText: "ĐTN CA BẮC NINH",
                  bg: "from-amber-500 to-red-600"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-white/15 flex flex-col justify-between items-center group hover:bg-white/15 transition-all">
                  <div className="space-y-1.5 mb-4">
                    <h4 className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">{item.title}</h4>
                    <p className="text-xs text-blue-200">{item.desc}</p>
                  </div>
                  
                  {/* Clean Vector SVG generated QR code representation */}
                  <div className={`p-3 rounded-xl bg-white text-slate-900 w-32 h-32 flex flex-col items-center justify-center relative shadow-md`}>
                    <div className="grid grid-cols-5 gap-1.5 w-full h-full relative opacity-90">
                      {/* Standard QR alignment squares */}
                      <div className="col-span-2 row-span-2 border-4 border-slate-900 bg-transparent flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-slate-900"></div>
                      </div>
                      <div className="col-span-1"></div>
                      <div className="col-span-2 row-span-2 border-4 border-slate-900 bg-transparent flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-slate-900"></div>
                      </div>
                      <div className="col-span-1"></div>
                      <div className="col-span-2 row-span-2 border-4 border-slate-900 bg-transparent flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-slate-900"></div>
                      </div>
                      <div className="col-span-3 grid grid-cols-3 gap-1">
                        <div className="w-2 h-2 bg-slate-900"></div>
                        <div className="w-2 h-2 bg-transparent"></div>
                        <div className="w-2 h-2 bg-slate-900"></div>
                        <div className="w-2 h-2 bg-slate-900"></div>
                        <div className="w-2 h-2 bg-slate-900"></div>
                        <div className="w-2 h-2 bg-transparent"></div>
                      </div>
                    </div>
                    {/* Small inner logo badge */}
                    <div className="absolute inset-0 m-auto w-8 h-8 rounded bg-blue-600 text-white font-extrabold flex items-center justify-center text-[8px] border-2 border-white shadow-md">
                      QR
                    </div>
                  </div>

                  <span className="mt-4 text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                    {item.qrText}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. GÓC HỖ TRỢ NGƯỜI DÂN & AI CHATBOT */}
      <section id="support" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hệ Thống Kênh Liên Hệ Hỗ Trợ
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Nhân dân có thể liên hệ trực tiếp với các cán bộ Công an hoặc chat với Trợ lý ảo AI thông minh của chúng tôi bất cứ lúc nào.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Officers and Support Links (Left) */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Quick actions box */}
              <div className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-md">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
                  <span className="p-1.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </span>
                  Kênh Kết Nối Nhanh
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone Call Button */}
                  <a
                    href="tel:0222.3822.415"
                    className="p-5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center gap-4 transition-all group"
                  >
                    <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/10 group-hover:scale-110 transition-transform">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Đường Dây Nóng</span>
                      <span className="text-base font-extrabold text-blue-900 dark:text-blue-300">0222.3822.415</span>
                    </div>
                  </a>

                  {/* Chat Zalo/Messenger Mock */}
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border border-amber-100 dark:border-amber-900 flex items-center gap-4 transition-all group"
                  >
                    <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/10 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Kênh Zalo OA</span>
                      <span className="text-base font-extrabold text-amber-700 dark:text-amber-500">Công an Bắc Ninh</span>
                    </div>
                  </a>

                </div>
              </div>

              {/* Supporting Officers list */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span className="p-1.5 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-lg">
                    <Users className="w-5 h-5" />
                  </span>
                  Cán Bộ Hỗ Trợ Chuyển Đổi Số
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUPPORT_OFFICERS.map((officer, index) => (
                    <div key={index} className="bg-white dark:bg-slate-950 rounded-xl p-4 border border-slate-200/50 dark:border-slate-800 flex items-center space-x-4">
                      <img
                        src={officer.avatar}
                        alt={officer.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/35"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{officer.name}</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold truncate mb-1">{officer.role}</p>
                        <a href={`tel:${officer.phone}`} className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-600 dark:text-slate-400 hover:text-blue-600">
                          <Phone className="w-3.5 h-3.5" />
                          {officer.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Smart AI Chatbot Panel (Right) */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[560px]">
              
              {/* Chatbot Header */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex items-center justify-between text-white border-b border-blue-950">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-950 rounded-xl">
                    <Bot className="w-6 h-6 text-amber-400 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                      Trợ Lý Số Tuổi Trẻ Bắc Ninh
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    </h3>
                    <p className="text-[10px] sm:text-xs text-blue-200 font-semibold uppercase tracking-wider">Hỗ trợ DVC & VNeID 24/7</p>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start max-w-[85%] space-x-2 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                      
                      {/* Avatar icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" : "bg-blue-600 text-white"}`}>
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
                      </div>

                      {/* Bubble Text */}
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-blue-600 text-white rounded-tr-none shadow-md" 
                          : "bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/70 dark:border-slate-800 shadow-sm"
                      }`}>
                        {msg.text}
                      </div>

                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 text-white shrink-0 shadow-sm">
                        <Bot className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl rounded-tl-none border border-slate-200/70 dark:border-slate-800 shadow-sm flex items-center space-x-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400 animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestions Chips */}
              <div className="px-6 py-2 border-t border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
                {[
                  "Đăng ký thường trú cần giấy tờ gì?",
                  "Quên mật khẩu VNeID?",
                  "Lý lịch tư pháp mất bao lâu?",
                  "Bảo hiểm y tế VNeID?"
                ].map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sugg)}
                    className="inline-block px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-950 text-xs font-bold border border-slate-200 dark:border-slate-800 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {sugg}
                  </button>
                ))}
              </div>

              {/* Chat Input Field */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Nhập câu hỏi tại đây để hỏi Trợ lý ảo..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. PHẦN HỎI ĐÁP FAQ */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Câu hỏi thường gặp (FAQ)
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
              Giải đáp nhanh những băn khoăn phổ biến của công dân về thủ tục định danh VNeID và dịch vụ công trực tuyến.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="p-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Hỏi</span>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 transition-colors duration-200 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            
            {/* Column 1: Brand Info */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center space-x-3">
                <img
                src={logo}
                alt="Đoàn Thanh niên Công an tỉnh Bắc Ninh"
                className="w-12 h-12 object-contain"
              />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block">Đoàn Thanh Niên</span>
                  <span className="text-sm font-extrabold text-white leading-tight block">CÔNG AN TỈNH BẮC NINH</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Cổng hỗ trợ, tuyên truyền số của lực lượng Thanh niên Công an Bắc Ninh hướng đến mục tiêu phục vụ tối đa nhu cầu cải cách hành chính, chuyển đổi số quốc gia của người dân tỉnh nhà.
              </p>

              {/* Social links */}
              <div className="flex space-x-3">
                {["Facebook", "Zalo OA", "Youtube", "Cổng thông tin CA"].map((social, i) => (
                  <button
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-white text-xs font-semibold transition-all cursor-pointer border border-slate-700"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="text-white font-extrabold text-base tracking-wider uppercase">Liên kết hữu ích</h3>
              <ul className="space-y-2 text-sm text-slate-400 font-medium">
                <li>
                  <a href="https://dichvucong.gov.vn/" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    Cổng DVC Quốc gia <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://dichvucong.bocongan.gov.vn/" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    Cổng DVC Bộ Công an <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://conganbacninh.gov.vn" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                    Cổng TTĐT Công an Bắc Ninh <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <button onClick={() => scrollTo("vneid")} className="hover:text-amber-400 transition-colors text-left block">Hướng dẫn cài đặt VNeID</button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-white font-extrabold text-base tracking-wider uppercase">Thông tin liên hệ</h3>
              <div className="space-y-3 text-sm text-slate-400 font-medium">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Số 01 đường Giáp Hải, phường Bắc Giang, tỉnh Bắc Ninh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>0222.xxxx.xxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>doanthanhnienconganbacninh@gmail.com</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-bold uppercase tracking-wider space-y-2">
            <p>© 2026 Đoàn Thanh niên Công an tỉnh Bắc Ninh</p>
            <p className="text-[10px] text-slate-600">Phát triển bởi Đội ngũ Công nghệ số - Đoàn Thanh niên Công an tỉnh Bắc Ninh</p>
          </div>

        </div>
      </footer>

      {/* FLOATING ACTION CHATBOT TRIGGER */}
      <button
        onClick={() => {
          setIsChatOpen(true);
          // If already opened, just focus
        }}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center gap-2 transition-all cursor-pointer group active:scale-95 ${
          isChatOpen ? "scale-0" : "scale-100"
        }`}
      >
        <div className="relative">
          <Bot className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-sm whitespace-nowrap">
          Hỏi Trợ lý AI
        </span>
      </button>

      {/* SIDEBAR DETACHED CHATBOT WIDGET OVERLAY */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[430px] bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[580px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-5 py-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <Bot className="w-6 h-6 text-amber-400" />
                <div>
                  <h4 className="font-extrabold text-sm flex items-center gap-1.5">
                    Trợ lý ảo Công an Bắc Ninh
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </h4>
                  <p className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">Tư vấn DVC & VNeID</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-1 rounded-full bg-blue-950/50 hover:bg-blue-950 text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages box */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-slate-900/35">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start max-w-[85%] space-x-2 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" : "bg-blue-600 text-white"}`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-blue-600 text-white rounded-tr-none shadow-md" 
                        : "bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-800 shadow-inner"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-600 text-white shrink-0 shadow-sm">
                      <Bot className="w-4 h-4 text-amber-300" />
                    </div>
                    <div className="bg-white dark:bg-slate-950 p-3.5 rounded-2xl rounded-tl-none border border-slate-200/60 dark:border-slate-800 shadow-sm flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-5 py-2 border-t border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
              {[
                "Khai báo tạm trú online?",
                "Kích hoạt VNeID mức 2?",
                "Nộp phạt vi phạm giao thông?",
                "Xin lý lịch tư pháp?"
              ].map((sugg, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sugg)}
                  className="inline-block px-3 py-1.5 rounded-full bg-white dark:bg-slate-950 text-[11px] font-bold border border-slate-200 dark:border-slate-800 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  {sugg}
                </button>
              ))}
            </div>

            {/* Input fields */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2">
              <input
                type="text"
                placeholder="Nhập nội dung thắc mắc..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* A. PUBLIC SERVICE MODAL DETAILED GUIDE */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 flex items-center justify-between border-b border-blue-950">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-950 rounded-xl text-amber-400">
                    {getIcon(selectedService.icon)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-white leading-tight">{selectedService.title}</h3>
                    <p className="text-xs text-blue-200 mt-1">Hướng dẫn dịch vụ công trực tuyến Bộ Công an</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full hover:bg-blue-950 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                
                {/* Description */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 rounded-r-xl">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                    {selectedService.description}
                  </p>
                </div>

                {/* Step timeline */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Quy trình thực hiện từng bước
                  </h4>
                  <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-6">
                    {selectedService.steps.map((step, sIdx) => (
                      <div key={sIdx} className="relative">
                        {/* Number bullet */}
                        <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                          {sIdx + 1}
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements check list */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Thành Phần Hồ Sơ Yêu Cầu
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.documents.map((doc, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Youtube Embed Player */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                    <Play className="w-5 h-5 text-red-500" />
                    Video Hướng Dẫn Trực Quan
                  </h4>
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-md">
                    <video controls className="w-full h-full">
                      <source
                        src={selectedService.videoFile}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>

              </div>

              {/* Action Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Đóng lại
                </button>
                <a
                  href={selectedService.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/20 transition-all cursor-pointer"
                >
                  Nộp hồ sơ trực tuyến
                  <ExternalLink className="w-4 h-4 text-amber-300" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* B. VNEID UTILITY MODAL GUIDE */}
      <AnimatePresence>
        {selectedVNeIDUtility && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-6 flex items-center justify-between border-b border-amber-600">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-950 rounded-xl text-amber-400">
                    {getIcon(selectedVNeIDUtility.icon)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-slate-950 leading-tight">{selectedVNeIDUtility.title}</h3>
                    <p className="text-xs text-slate-850 font-semibold mt-0.5">Tiện ích thông minh trên app VNeID</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVNeIDUtility(null)}
                  className="p-2 rounded-full hover:bg-amber-600 text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Description */}
                <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                  {selectedVNeIDUtility.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Lợi Ích Đem Lại
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedVNeIDUtility.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Check className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to use */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Hướng Dẫn Các Bước Tích Hợp / Sử Dụng
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedVNeIDUtility.howToUse.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <span className="w-5 h-5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{sIdx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Video Youtube Embed if any */}
                {selectedVNeIDUtility.youtubeId && (
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                      <Play className="w-5 h-5 text-red-500" />
                      Video Minh Họa Cách Làm
                    </h4>
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-md">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVNeIDUtility.youtubeId}`}
                        title={selectedVNeIDUtility.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                      ></iframe>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedVNeIDUtility(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md cursor-pointer"
                >
                  Đồng ý, Đóng lại
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* C. GENERAL VIDEO POPUP PLAYER MODAL */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setActiveVideoUrl(null)}
                  className="p-2.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoUrl}?autoplay=1`}
                  title="Youtube Video Player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
