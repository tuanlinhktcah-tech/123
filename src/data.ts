export interface PublicService {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: string[];
  documents: string[];
  youtubeId: string;
  videoFile?: string;
  portalUrl: string;
}

export interface VNeIDUtility {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  howToUse: string[];
  youtubeId: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  category: string;
}

export interface SupportOfficer {
  name: string;
  role: string;
  unit: string;
  phone: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const PUBLIC_SERVICES: PublicService[] = [
  {
    id: "ly-lich-tu-phap",
    title: "Cấp Phiếu lý lịch tư pháp",
    description: "Cấp phiếu lý lịch tư pháp trực tuyến giúp tiết kiệm thời gian đi lại cho người dân, nhận kết quả tại nhà qua bưu điện.",
    icon: "FileText",
    steps: [
      "Truy cập Cổng dịch vụ công Bộ Công an hoặc Cổng Dịch vụ công Quốc gia.",
      "Đăng nhập bằng tài khoản Định danh điện tử VNeID.",
      "Điền đầy đủ thông tin vào Tờ khai yêu cầu cấp Phiếu lý lịch tư pháp.",
      "Tải lên các tài liệu đính kèm (bản scan CMND/CCCD hoặc hộ chiếu).",
      "Chọn hình thức nhận kết quả (qua bưu điện) và thực hiện thanh toán lệ phí trực tuyến.",
      "Theo dõi trạng thái hồ sơ và nhận kết quả tại địa chỉ đã đăng ký."
    ],
    documents: [
      "Tờ khai yêu cầu cấp Phiếu lý lịch tư pháp trực tuyến",
      "Thẻ Căn cước công dân hoặc Hộ chiếu còn hạn",
      "Giấy tờ chứng minh đối tượng được miễn, giảm lệ phí (nếu có)"
    ],
    videofile: "Cap-phieu-LLTP-so2.mp4",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "thong-bao-luu-tru",
    title: "Thông báo lưu trú",
    description: "Thực hiện thông báo khi có khách đến lưu trú qua đêm tại hộ gia đình, khách sạn, nhà nghỉ, ký túc xá.",
    icon: "UserCheck",
    steps: [
      "Mở ứng dụng VNeID (đã kích hoạt tài khoản mức 2).",
      "Chọn mục 'Thủ tục hành chính'.",
      "Chọn chức năng 'Thông báo lưu trú'.",
      "Chọn loại hình cơ sở lưu trú (Hộ gia đình, Nhà cho thuê, Khách sạn...)",
      "Điền thông tin người đến lưu trú (Họ tên, Số định danh, Lý do, Thời gian lưu trú).",
      "Xác nhận gửi khai báo. Hệ thống lập tức tiếp nhận thông tin và chuyển tới cơ quan Công an xã/phường quản lý."
    ],
    documents: [
      "Thông tin giấy tờ tùy thân của khách lưu trú (CCCD, Hộ chiếu)",
      "Thông tin của người khai báo lưu trú"
    ],
    youtubeId: "g6f-r3o1kL0",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
   {
    id: "dang-ky-tam-tru",
    title: "Đăng ký tạm trú",
    description: "Đăng ký tạm trú trực tuyến cho công dân đến sinh sống, học tập hoặc làm việc tại tỉnh Bắc Ninh.",
    icon: "MapPin",
    steps: [
      "Mở ứng dụng VNeID (đã kích hoạt tài khoản mức 2).",
      "Chọn mục 'Thủ tục hành chính'.",
      "Chọn mục 'Đăng ký tạm trú'.",
      "Điền chi tiết thông tin địa chỉ nơi tạm trú, thời gian tạm trú dự kiến.",
      "Đính kèm tài liệu chứng minh chỗ ở hợp pháp hoặc sự đồng ý của chủ hộ.",
      "Thực hiện nộp hồ sơ và theo dõi kết quả trả về trong vòng 3 ngày làm việc."
    ],
    documents: [
      "Tờ khai thay đổi thông tin cư trú (Mẫu CT01)",
      "Giấy tờ chứng minh chỗ ở hợp pháp khi đăng ký tạm trú (Hợp đồng thuê nhà, sổ đỏ chủ nhà)"
    ],
    youtubeId: "Wp6Wb8Y_8dY",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "dang-ky-thuong-tru",
    title: "Đăng ký thường trú",
    description: "Thủ tục đăng ký hộ khẩu thường trú cho người dân khi chuyển đến nơi ở mới hợp pháp.",
    icon: "Home",
    steps: [
      "Đăng nhập ứng dụng VNeID.",
      "Chọn mục 'Thủ tục hành chính'.",
      "Nộp hồ sơ trực tuyến, chọn thủ tục 'Đăng ký thường trú'.",
      "Điền đầy đủ thông tin người đăng ký và các thành viên cùng thay đổi.",
      "Tải lên bản chụp/scan giấy tờ chứng minh chỗ ở hợp pháp (Sổ đỏ, Hợp đồng mua bán, Giấy cho thuê...).",
      "Nộp hồ sơ trực tuyến và đợi kết quả giải quyết của Công an cấp xã/phường."
    ],
    documents: [
      "Tờ khai thay đổi thông tin cư trú (Mẫu CT01)",
      "Giấy tờ, tài liệu chứng minh chỗ ở hợp pháp (Giấy chứng nhận QSDĐ, Hợp đồng thuê nhà...)"
    ],
    youtubeId: "uO0X27gAisg",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "khai-bao-tam-vang",
    title: "Khai báo tạm vắng",
    description: "Thực hiện khai báo khi đi khỏi nơi cư trú",
    icon: "UserCheck",
    steps: [
      "Mở ứng dụng VNeID (đã kích hoạt tài khoản mức 2).",
      "Chọn mục 'Thủ tục hành chính'.",
      "Chọn chức năng 'Khai báo tạm vắng'.",
      "Điền đầy đủ các thông tin theo yêu cầu: lý do, thời gian, địa chỉ nơi đến.",
      "Xác nhận thông tin và gửi yêu cầu."
    ],
    documents: [
      "Thông tin cá nhân (họ tên, số định danh hoặc hộ chiếu)",
      "Thông tin tạm vắng: lý do, thời gian dự kiến vắng, địa điểm nơi đến..."
    ],
    youtubeId: "g6f-r3o1kL0",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "dieu-chinh-thong-tin-cu-tru",
    title: "Điều chỉnh thông tin về cưu trú trong CSDL cư trú",
    description: "Thủ tục dành cho công dân khi phát hiện thông tin cư trú trong Cơ sở dữ liệu về cư trú chưa chính xác hoặc có thay đổi cần được cập nhật, điều chỉnh theo quy định.",
    icon: "Home",
    steps: [
      "Mở ứng dụng VNeID (đã kích hoạt tài khoản mức 2).",
      "Chọn mục 'Thủ tục hành chính'.",
      "Chọn dịch vụ công 'Điều chỉnh thông tin về cư trú trong CSDL cư trú'.",
      "Kiểm tra và nhập đầy đủ các nội dung thông tin cần điều chỉnh, bổ sung hoặc cập nhật.",
      "Tải lên bản chụp/scan các giấy tờ, tài liệu chứng minh nội dung thay đổi hoặc điều chỉnh thông tin cư trú.",
      "Kiểm tra lại thông tin, nộp hồ sơ trực tuyến và theo dõi kết quả xử lý từ cơ quan đăng ký cư trú."
    ],
    documents: [
      "Tờ khai thay đổi thông tin cư trú (Mẫu CT01).",
      "Giấy tờ, tài liệu chứng minh nội dung điều chỉnh thông tin cư trú theo quy định."
    ],
    youtubeId: "g6f-r3o1kL0",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "xac-nhan-thong-tin-cu-tru",
    title: "Xác nhận thông tin về cư trú",
    description: "Thủ tục dành cho công dân có nhu cầu được cơ quan đăng ký cư trú xác nhận thông tin cư trú để phục vụ các giao dịch hành chính, dân sự hoặc các mục đích hợp pháp khác.",
    icon: "Home",
    steps: [
      "Mở ứng dụng VNeID (đã kích hoạt tài khoản mức 2).",
      "Chọn mục 'Thủ tục hành chính'.",
      "Chọn dịch vụ công 'Xác nhận thông tin cư trú'.",
      "Điền đầy đủ thông tin yêu cầu xác nhận và mục đích sử dụng giấy xác nhận thông tin cư trú (nếu có).",
      "Kiểm tra thông tin và gửi yêu cầu xác nhận trực tuyến.",
      "Theo dõi trạng thái xử lý và nhận kết quả xác nhận thông tin cư trú theo hình thức đã đăng ký."
    ],
    documents: [
      "Tờ khai thay đổi thông tin cư trú (Mẫu CT01) trong trường hợp pháp luật yêu cầu khai báo bổ sung thông tin.",
      "Giấy tờ, tài liệu liên quan phục vụ việc xác nhận thông tin cư trú theo yêu cầu của cơ quan có thẩm quyền (nếu có)."
    ],
    youtubeId: "g6f-r3o1kL0",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "xoa-dang-ky-thuong-tru",
    title: "Xóa đăng ký thường trú",
    description: "Thủ tục thực hiện khi công dân thuộc các trường hợp bị xóa đăng ký thường trú theo quy định của pháp luật về cư trú hoặc có yêu cầu thực hiện thủ tục liên quan.",
    icon: "UserCheck",
    steps: [
      "Mở ứng dụng VNeID (đã kích hoạt tài khoản mức 2).",
      "Chọn mục 'Thủ tục hành chính'.",
      "Chọn dịch vụ công 'Xóa đăng ký thường trú'.",
      "Khai báo đầy đủ thông tin của người đề nghị xóa đăng ký thường trú và lý do thực hiện thủ tục.",
      "Tải lên bản chụp/scan các giấy tờ, tài liệu chứng minh thuộc trường hợp xóa đăng ký thường trú theo quy định.",
      "Nộp hồ sơ trực tuyến và theo dõi kết quả giải quyết của cơ quan đăng ký cư trú có thẩm quyền."
    ],
    documents: [
      "Tờ khai thay đổi thông tin cư trú (Mẫu CT01).",
      "Giấy tờ, tài liệu chứng minh thuộc trường hợp xóa đăng ký thường trú theo quy định của pháp luật."
    ],
    youtubeId: "g6f-r3o1kL0",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "cap-doi-cccd",
    title: "Cấp đổi căn cước công dân",
    description: "Thủ tục đăng ký cấp đổi thẻ Căn cước công dân sang Căn cước mẫu mới, hẹn lịch thu nhận vân tay, ảnh chân dung.",
    icon: "CreditCard",
    steps: [
      "Đăng nhập Cổng dịch vụ công Bộ Công an.",
      "Chọn mục 'Cấp thẻ Căn cước cho người từ đủ 14 tuổi' hoặc 'Cấp đổi, cấp lại thẻ Căn cước'.",
      "Lựa chọn cơ quan thực hiện (Công an huyện/thành phố nơi cư trú).",
      "Chọn ngày, giờ hẹn đến làm việc trực tiếp tại cơ quan Công an.",
      "Nhận phiếu hẹn trực tuyến và đến cơ quan Công an đúng lịch để lấy vân tay, chụp ảnh chân dung."
    ],
    documents: [
      "Hồ sơ đã được lưu trên Cơ sở dữ liệu quốc gia về dân cư",
      "Thẻ CCCD cũ (nếu có cấp đổi)"
    ],
    youtubeId: "G3mH9eI3gA0",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "cap-ho-chieu-trong-nuoc",
    title: "Cấp hộ chiếu phổ thông trong nước",
    description: "Thủ tục dành cho công dân Việt Nam có nhu cầu đề nghị cấp mới hộ chiếu phổ thông trong nước thông qua hình thức trực tuyến.",
    icon: "FileText",
    steps: [
      "Mở ứng dụng VNeID (đã kích hoạt tài khoản mức 2).",
      "Chọn mục 'Thủ tục hành chính'.",
      "Chọn dịch vụ công 'Cấp hộ chiếu phổ thông trong nước'.",
      "Điền đầy đủ thông tin cá nhân theo yêu cầu của hồ sơ cấp hộ chiếu.",
      "Tải lên ảnh chân dung và các giấy tờ, tài liệu liên quan theo quy định (nếu có).",
      "Lựa chọn hình thức nhận hộ chiếu trực tiếp hoặc qua dịch vụ bưu chính công ích và thực hiện thanh toán lệ phí trực tuyến.",
      "Nộp hồ sơ trực tuyến và theo dõi tình trạng xử lý hồ sơ từ cơ quan quản lý xuất nhập cảnh."
    ],
    documents: [
      "Tờ khai đề nghị cấp hộ chiếu phổ thông theo mẫu điện tử.",
      "Ảnh chân dung theo tiêu chuẩn ảnh hộ chiếu.",
      "Căn cước công dân hoặc thông tin định danh điện tử còn hiệu lực.",
      "Giấy tờ chứng minh người đại diện hợp pháp đối với trường hợp người dưới 14 tuổi hoặc người mất năng lực hành vi dân sự (nếu có).",
      "Các giấy tờ liên quan khác theo yêu cầu của cơ quan quản lý xuất nhập cảnh (nếu có)."
    ],
    videofile: "Cap-phieu-LLTP-so2.mp4",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "dang-ky-phuong-tien",
    title: "Đăng ký phương tiện",
    description: "Nộp hồ sơ đăng ký xe máy, xe ô tô trực tuyến, nhận biển số và giấy tờ đăng ký xe tại nhà hoặc cơ quan Công an.",
    icon: "Car",
    steps: [
      "Truy cập Cổng dịch vụ công Quốc gia hoặc Cổng dịch vụ công Bộ Công an.",
      "Khai báo thông tin đăng ký xe theo mẫu điện tử (nhập mã lệ phí trước bạ, hóa đơn điện tử).",
      "Đặt lịch hẹn mang xe đến cơ quan Cảnh sát giao thông để kiểm tra xe và bấm biển số.",
      "Nhận chứng nhận đăng ký xe trực tiếp tại cơ quan đăng ký hoặc qua bưu điện."
    ],
    documents: [
      "Giấy khai đăng ký xe trực tuyến",
      "Chứng từ lệ phí trước bạ điện tử",
      "Hóa đơn bán hàng điện tử",
      "Chứng từ nguồn gốc xe (Phiếu kiểm tra chất lượng xuất xưởng)"
    ],
    youtubeId: "gN7m1K4Plo0",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  },
  {
    id: "nop-phat-giao-thong",
    title: "Nộp phạt vi phạm giao thông",
    description: "Tra cứu quyết định xử phạt vi phạm hành chính lĩnh vực giao thông đường bộ và nộp tiền phạt trực tuyến nhanh chóng.",
    icon: "ShieldAlert",
    steps: [
      "Truy cập Cổng Dịch vụ công Quốc gia (dichvucong.gov.vn).",
      "Chọn mục 'Thanh toán trực tuyến' -> 'Nộp phạt vi phạm hành chính'.",
      "Tra cứu theo mã quyết định xử phạt hoặc số biên bản vi phạm hành chính.",
      "Xác nhận thông tin quyết định xử phạt và số tiền cần nộp.",
      "Thực hiện thanh toán qua ví điện tử hoặc tài khoản ngân hàng liên kết.",
      "Đăng ký nhận lại giấy tờ bị tạm giữ tại nhà qua bưu điện (nếu có nhu cầu)."
    ],
    documents: [
      "Số quyết định xử phạt hoặc số biên bản vi phạm hành chính",
      "Tài khoản ngân hàng hoặc ví điện tử để thực hiện thanh toán"
    ],
    youtubeId: "WfOPh6zUq7E",
    portalUrl: "https://dichvucong.gov.vn/"
  },
  {
    id: "to-giac-toi-pham",
    title: "Tố giác tội phạm trực tuyến",
    description: "Gửi tin báo, tố giác tội phạm bảo mật đến cơ quan Công an có thẩm quyền để kịp thời giải quyết, đảm bảo an ninh trật tự.",
    icon: "ShieldCheck",
    steps: [
      "Đăng nhập ứng dụng VNeID mức 2 hoặc truy cập Cổng Dịch vụ công Bộ Công an.",
      "Chọn chức năng 'Kiến nghị, phản ánh về ANTT' hoặc 'Tố giác tội phạm'.",
      "Nhập đầy đủ thông tin vụ việc: Thời gian, địa điểm, tóm tắt nội dung sự việc diễn ra.",
      "Tải lên các tài liệu chứng cứ kèm theo (hình ảnh, video, ghi âm nếu có).",
      "Chọn cơ quan tiếp nhận tin báo (ví dụ Công an xã/phường nơi xảy ra sự việc).",
      "Gửi hồ sơ bảo mật. Hệ thống tự động chuyển tiếp an toàn đến cơ quan Công an trực tiếp giải quyết."
    ],
    documents: [
      "Hình ảnh chứng cứ, video, tập tin liên quan (nếu có)",
      "Nội dung phản ánh rõ ràng"
    ],
    youtubeId: "8g4L6Wc-y18",
    portalUrl: "https://dichvucong.bocongan.gov.vn/"
  }
];

export const VNEID_UTILITIES: VNeIDUtility[] = [
  {
    id: "dinh-danh-1-2",
    title: "Định danh điện tử mức 1 và mức 2",
    description: "Tài khoản định danh điện tử giúp công dân thực hiện các giao dịch trên môi trường điện tử nhanh chóng, bảo mật tuyệt đối.",
    icon: "Fingerprint",
    benefits: [
      "Mức 1: Cho phép đăng nhập, sử dụng các dịch vụ công trực tuyến cơ bản, khai báo lưu trú.",
      "Mức 2: Giá trị tương đương thẻ Căn cước công dân vật lý, hộ chiếu, tích hợp thông tin cá nhân và thay thế nhiều giấy tờ bản cứng.",
      "Đảm bảo an toàn thông tin cá nhân nhờ mã hóa và bảo mật đa lớp."
    ],
    howToUse: [
      "Để đăng ký mức 1: Công dân tự thực hiện tải app VNeID, chụp ảnh chân dung, quét chip thẻ CCCD.",
      "Để đăng ký mức 2: Công dân trực tiếp đến cơ quan Công an cấp huyện/thành phố hoặc xã/phường để chụp ảnh chân dung, thu nhận vân tay và kích hoạt."
    ],
    youtubeId: "0b-jA6m2ZDo"
  },
  {
    id: "giay-phep-lai-xe",
    title: "Tích hợp Giấy phép lái xe",
    description: "Xuất trình Giấy phép lái xe đã được phê duyệt hợp lệ trên VNeID khi có yêu cầu kiểm tra từ Cảnh sát giao thông.",
    icon: "Compass",
    benefits: [
      "Thay thế hoàn toàn bằng lái xe vật lý trong quá trình tuần tra, kiểm soát giao thông.",
      "Tránh thất lạc, rách hỏng thẻ cứng.",
      "Cập nhật trạng thái bằng lái xe (hết hạn, vi phạm) tức thời."
    ],
    howToUse: [
      "Đăng nhập VNeID mức 2, chọn mục 'Ví giấy tờ'.",
      "Chọn 'Tích hợp thông tin' -> 'Tạo mới yêu cầu'.",
      "Chọn loại giấy tờ là 'Giấy phép lái xe'.",
      "Nhập số giấy phép lái xe, hạng xe và gửi yêu cầu xác thực.",
      "Chờ kết quả phê duyệt từ Bộ Giao thông vận tải hiển thị trên màn hình ứng dụng."
    ],
    youtubeId: "246Kbe6qW7Y"
  },
  {
    id: "dang-ky-xe",
    title: "Tích hợp Đăng ký xe",
    description: "Lưu trữ thông tin giấy chứng nhận đăng ký xe máy, xe ô tô chính chủ ngay trong ví giấy tờ điện tử.",
    icon: "FileCode",
    benefits: [
      "Chứng minh quyền sở hữu phương tiện khi lưu thông trên đường.",
      "Tích hợp đồng bộ dữ liệu nhanh từ cơ sở dữ liệu đăng ký xe Bộ Công an."
    ],
    howToUse: [
      "Trong mục 'Ví giấy tờ', chọn 'Tích hợp giấy tờ'.",
      "Chọn 'Đăng ký xe', nhập biển số xe và loại phương tiện (Ô tô/Xe máy).",
      "Nhập số khung/số máy hoặc mã hồ sơ đăng ký để đối chiếu.",
      "Hệ thống sẽ đối soát dữ liệu và phê duyệt sau ít ngày."
    ],
    youtubeId: "246Kbe6qW7Y"
  },
  {
    id: "bao-hiem-y-te",
    title: "Tích hợp Bảo hiểm y tế",
    description: "Khám chữa bệnh thuận tiện bằng thẻ bảo hiểm y tế điện tử tích hợp trên VNeID tại mọi bệnh viện trên toàn quốc.",
    icon: "HeartPulse",
    benefits: [
      "Không cần đem theo thẻ bảo hiểm y tế bằng giấy.",
      "Tránh tình trạng rách hỏng, thông tin nhòe mờ trên thẻ giấy.",
      "Lịch sử khám chữa bệnh bảo hiểm được liên kết cập nhật an toàn."
    ],
    howToUse: [
      "Vào chức năng 'Ví giấy tờ', chọn 'Tích hợp thông tin'.",
      "Chọn 'Thẻ Bảo hiểm y tế'.",
      "Nhập mã số thẻ bảo hiểm y tế gồm 10 hoặc 15 ký tự và gửi yêu cầu xác thực.",
      "Dữ liệu được phê duyệt tự động từ Bảo hiểm xã hội Việt Nam sau 24h."
    ],
    youtubeId: "T7MhM4FbeR0"
  },
  {
    id: "thong-tin-cu-tru",
    title: "Tích hợp thông tin cư trú",
    description: "Xác nhận thông tin thành viên hộ gia đình, thông tin nơi thường trú, tạm trú điện tử thay thế cho Sổ hộ khẩu giấy.",
    icon: "Users",
    benefits: [
      "Xác minh thông tin cư trú nhanh chóng khi thực hiện thủ tục đất đai, học tập, ngân hàng.",
      "Hiển thị đầy đủ danh sách các thành viên trong hộ gia đình cùng thông tin chi tiết."
    ],
    howToUse: [
      "Chọn mục 'Cá nhân' hoặc 'Thông tin cư trú' trên VNeID.",
      "Nhập mật khẩu / mã Passcode bảo mật thiết bị.",
      "Hệ thống hiển thị trực quan thông tin cư trú hiện tại và danh sách thành viên hộ gia đình của bạn."
    ],
    youtubeId: "Yp86tT_H_F8"
  },
  {
    id: "khai-bao-luu-tru-vneid",
    title: "Khai báo & Thông báo lưu trú",
    description: "Chủ cơ sở lưu trú và người dân thông báo lưu trú trực tiếp cho Công an cấp xã mà không cần trực tiếp đến đồn.",
    icon: "CalendarRange",
    benefits: [
      "Khai báo nhanh mọi lúc mọi nơi ngay trên smartphone.",
      "Tiết kiệm thời gian, sổ sách giấy tờ khai báo.",
      "Tránh bị xử phạt hành chính về hành vi không khai báo lưu trú đúng hạn."
    ],
    howToUse: [
      "Chọn biểu tượng 'Khai báo lưu trú' trên trang chủ ứng dụng.",
      "Thêm thông tin cơ sở lưu trú và chọn người cần khai báo.",
      "Nhập các trường bắt buộc rồi ấn 'Gửi yêu cầu'."
    ],
    youtubeId: "g6f-r3o1kL0"
  }
];

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: "v1",
    title: "Hướng dẫn đăng ký tài khoản VNeID Mức 2 tại Cơ quan Công an",
    duration: "3:45",
    youtubeId: "0b-jA6m2ZDo",
    category: "VNeID"
  },
  {
    id: "v2",
    title: "Hướng dẫn tự tích hợp Giấy phép lái xe, Đăng ký xe tại nhà cực kỳ dễ dàng",
    duration: "4:12",
    youtubeId: "246Kbe6qW7Y",
    category: "VNeID"
  },
  {
    id: "v3",
    title: "Hướng dẫn nộp hồ sơ xin cấp Phiếu Lý lịch tư pháp trên Cổng Dịch vụ công",
    duration: "5:30",
    youtubeId: "vB-0G78R6cI",
    category: "Dịch vụ công"
  },
  {
    id: "v4",
    title: "Quy trình khai báo và nộp phạt vi phạm giao thông trực tuyến",
    duration: "4:50",
    youtubeId: "WfOPh6zUq7E",
    category: "Dịch vụ công"
  },
  {
    id: "v5",
    title: "Hướng dẫn thực hiện thủ tục đăng ký thường trú và tạm trú trực tuyến",
    duration: "6:15",
    youtubeId: "uO0X27gAisg",
    category: "Dịch vụ công"
  },
  {
    id: "v6",
    title: "Cách thực hiện thanh toán trực tuyến lệ phí dịch vụ công trên Cổng quốc gia",
    duration: "3:20",
    youtubeId: "T7MhM4FbeR0",
    category: "Thanh toán"
  }
];

export const SUPPORT_OFFICERS: SupportOfficer[] = [
  {
    name: "Lĩnh vực Quản lý hành chính",
    role: "Đ/c Nguyễn Hoàng Long - Bí thư Chi đoàn",
    unit: "Phòng Cảnh sát QLHC về TTXH",
    phone: "0394.859.668",
    avatar: "https://picsum.photos/seed/officer1/150/150"
  },
  {
    name: "Lĩnh vực Hộ chiếu",
    role: "Đ/c Trần Thị Thảo - Đoàn viên Chi đoàn",
    unit: "Phòng Xuất nhập cảnh",
    phone: "0912.xxx.xxx",
    avatar: "https://picsum.photos/seed/officer2/150/150"
  },
  {
    name: "Lĩnh vực Giao thông",
    role: "Đ/c Trần Ngọc Phương - Bí thư Chi đoàn",
    unit: "Phòng Cảnh sát giao thông",
    phone: "0945.xxx.xxx",
    avatar: "https://picsum.photos/seed/officer3/150/150"
  },
  {
    name: "Lĩnh vực Lý lịch tư pháp",
    role: "Đ/c .. Xuân - Đoàn viên Chi đoàn",
    unit: "Phòng Hồ sơ nghiệp vụ",
    phone: "0963.xxx.xxx",
    avatar: "https://picsum.photos/seed/officer4/150/150"
  }
];

export const FAQS: FAQ[] = [
  {
    question: "Tài khoản VNeID mức 2 là gì và có tác dụng thế nào?",
    answer: "Tài khoản VNeID mức 2 là tài khoản được cấp sau khi công dân được thu nhận ảnh chân dung và vân tay trực tiếp tại Cơ quan Công an. Tài khoản này có giá trị pháp lý tương đương thẻ CCCD vật lý và có thể thay thế nhiều loại giấy tờ bản cứng (Giấy phép lái xe, Đăng ký xe, Thẻ BHYT...) khi thực hiện các giao dịch hành chính hoặc xuất trình khi đi máy bay.",
    category: "VNeID"
  },
  {
    question: "Tôi bị quên mật khẩu hoặc mã Passcode của ứng dụng VNeID thì phải làm sao?",
    answer: "Bạn mở ứng dụng VNeID trên điện thoại, nhấn vào nút 'Quên mật khẩu' ngay dưới khung đăng nhập. Nhập số CCCD và số điện thoại đăng ký. Một mã OTP sẽ được gửi về tin nhắn máy điện thoại của bạn, hãy nhập mã OTP đó và tiến hành thiết lập lại mật khẩu mới. Đối với Passcode, bạn có thể thiết lập lại trong phần cài đặt của tài khoản sau khi đăng nhập.",
    category: "VNeID"
  },
  {
    question: "Thời gian xử lý và trả kết quả cho hồ sơ trực tuyến thông thường là bao lâu?",
    answer: "Thời gian giải quyết phụ thuộc vào từng thủ tục hành chính cụ thể: Khai báo lưu trú được xử lý tự động ngay lập tức; Đăng ký tạm trú, đăng ký thường trú thường từ 3 - 5 ngày làm việc; Cấp đổi thẻ căn cước từ 7 - 10 ngày làm việc; Cấp Phiếu lý lịch tư pháp trực tuyến khoảng 10 ngày làm việc kể từ khi nhận đủ hồ sơ hợp lệ.",
    category: "Dịch vụ công"
  },
  {
    question: "Tôi có thể nhận kết quả dịch vụ công tại nhà mà không cần đến cơ quan Công an không?",
    answer: "Hoàn toàn có thể! Hiện nay, Công an tỉnh Bắc Ninh đã liên kết với Bưu điện tỉnh để triển khai dịch vụ chuyển phát hồ sơ và kết quả giải quyết thủ tục hành chính qua đường bưu điện (Bưu chính công ích). Khi điền đơn trực tuyến, bạn chỉ cần đánh dấu tích chọn hình thức nhận kết quả tại nhà qua bưu điện và điền chính xác địa chỉ nhận của bạn.",
    category: "Dịch vụ công"
  },
  {
    question: "Đăng ký tạm trú trực tuyến có cần sự đồng ý của chủ nhà trọ/chủ hộ không?",
    answer: "Có. Theo quy định, khi đăng ký tạm trú trực tuyến, bạn cần tải lên tài liệu chứng minh chỗ ở hợp pháp (ví dụ như Hợp đồng thuê nhà có chữ ký của hai bên) hoặc văn bản đồng ý cho đăng ký tạm trú của chủ hộ/chủ sở hữu chỗ ở hợp pháp đó. Công an xã/phường sẽ tiến hành kiểm tra xác minh thực tế trước khi phê duyệt.",
    category: "Dịch vụ công"
  }
];
