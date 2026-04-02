export type Project = {
  slug:        string;
  title:       string;
  year:        string;
  category:    string;
  color:       string;
  image:       string;
  imageAlt:    string;
  role:        string;
  duration:    string;
  description: string;
  problem:     string;
  solution:    string;
  features:    string[];
  tags:        string[];
  liveUrl?:    string;
  githubUrl?:  string;
};

export const projects: Project[] = [
  {
    slug:        "cinta-zakat",
    title:       "Cinta Zakat",
    year:        "2025",
    category:    "Fintech",
    color:       "#f97316",
    image:       "/project/cinta-zakat.png",
    imageAlt:    "Cinta Zakat — Platform Donasi Digital BAZNAS",
    role:        "Full Stack Developer",
    duration:    "Ongoing",
    description:
      "Platform donasi zakat & infak digital nasional milik BAZNAS yang memudahkan masyarakat Indonesia menunaikan kewajiban zakat secara online. Menampilkan berbagai kampanye aktif dengan progress real-time, kalkulator zakat, dan laporan keuangan transparan.",
    problem:
      "Masyarakat kesulitan menunaikan zakat secara praktis — antrian panjang di kantor BAZNAS, kurang transparansi penyaluran dana, dan tidak ada platform terpusat yang menjangkau seluruh Indonesia.",
    solution:
      "Platform web & mobile yang mengintegrasikan semua channel zakat dalam satu portal: pembayaran digital (transfer, e-wallet, QRIS), tracking campaign real-time, dan laporan penyaluran yang terbuka untuk publik.",
    features: [
      "Kampanye zakat beragam: zakat penghasilan, maal, fitrah, infak & sedekah",
      "Real-time campaign progress tracker dengan target dana transparan",
      "Kalkulator zakat otomatis sesuai nisab terkini",
      "Integrasi pembayaran multi-channel via Midtrans (transfer bank, e-wallet, QRIS, kartu kredit)",
      "Laporan keuangan & penyaluran dana yang dapat diakses publik",
      "Aplikasi mobile iOS & Android untuk donasi kapan saja",
      "Autentikasi JWT dengan sistem akun donatur",
    ],
    tags:     ["Next.js", "React", "Laravel", "Midtrans", "JWT", "Tailwind CSS", "MySQL"],
    liveUrl:  "https://cintazakat.baznas.go.id/",
  },
  {
    slug:        "baznas-kantor-digital",
    title:       "BAZNAS Kantor Digital",
    year:        "2024",
    category:    "Government",
    color:       "#22c55e",
    image:       "/project/kantor-digital.png",
    imageAlt:    "BAZNAS Kantor Digital — Portal Zakat Kota",
    role:        "Full Stack Developer",
    duration:    "Ongoing",
    description:
      "Sistem portal zakat digital yang di-deploy untuk 400+ kantor BAZNAS di seluruh kota & kabupaten Indonesia. Setiap kantor memiliki subdomain dan identitas kota masing-masing, namun berjalan di atas satu platform terpusat yang dikembangkan di Direktorat Inovasi dan Teknologi Informasi BAZNAS.",
    problem:
      "Ratusan kantor BAZNAS daerah tidak memiliki kehadiran digital yang profesional — tidak ada portal online untuk terima donasi, publikasi program, atau laporan transparansi kepada muzakki lokal.",
    solution:
      "Platform multi-tenant skalabel yang memungkinkan setiap kantor BAZNAS kota/kabupaten memiliki portal web-nya sendiri dengan branding lokal, konten mandiri, dan integrasi pembayaran daerah — semua dikelola dari satu sistem pusat.",
    features: [
      "Multi-tenant architecture — 400+ subdomain kota dari satu platform",
      "Profil kantor BAZNAS per kota dengan program & berita lokal",
      "Kalkulator zakat & channel donasi online terintegrasi Midtrans",
      "Portal transparansi: laporan penerimaan & penyaluran ZIS per kota",
      "Pendaftaran & manajemen mustahiq (penerima zakat) secara digital",
      "CMS internal untuk admin kota kelola konten mandiri",
      "Optimized SEO per halaman kota untuk jangkauan lokal yang luas",
    ],
    tags:     ["Next.js", "Laravel", "MySQL", "Midtrans", "Tailwind CSS", "Multi-tenant", "GCP"],
    liveUrl:  "https://kotabogor.baznas.go.id/",
  },
  {
    slug:        "siamri",
    title:       "SIAMRI",
    year:        "2024",
    category:    "Internal System",
    color:       "#6366f1",
    image:       "/project/siamri-aplikasi-manajemen-aset-siamri.png",
    imageAlt:    "SIAMRI — Sistem Manajemen Aset Kampus",
    role:        "Full Stack Developer",
    duration:    "3 bulan",
    description:
      "Aplikasi manajemen dan inventarisasi aset kampus berbasis web untuk institusi Mikroskil. Memungkinkan admin dan staf mengelola, melacak, dan memonitor seluruh aset institusi secara digital — menggantikan pencatatan manual yang rentan kesalahan.",
    problem:
      "Pengelolaan aset kampus masih dilakukan secara manual menggunakan spreadsheet yang tidak terpusat, menyebabkan data tidak konsisten, sulit dilacak, dan sering terjadi kehilangan aset tanpa catatan yang jelas.",
    solution:
      "Sistem informasi berbasis web dengan dashboard terpusat yang memungkinkan pencatatan, kategorisasi, dan monitoring aset secara real-time dengan akses berbasis peran (role-based access) untuk admin dan staf.",
    features: [
      "Dashboard inventarisasi aset kampus terpusat dengan statistik real-time",
      "Manajemen kategori aset: elektronik, furnitur, kendaraan, dan lainnya",
      "Sistem pencatatan kondisi aset (baik, rusak, hilang) dengan riwayat perubahan",
      "Role-based authentication — admin pusat dan staf per unit/departemen",
      "Export laporan aset ke PDF & Excel untuk kebutuhan audit",
      "Pencarian dan filter aset berdasarkan lokasi, kategori, dan status",
      "Dark mode UI dengan desain responsif untuk akses mobile staf",
    ],
    tags:     ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "MySQL"],
    liveUrl:  "https://siamri.vercel.app/",
  },
  {
    slug:        "unu-course",
    title:       "Unu Course",
    year:        "2023",
    category:    "EdTech",
    color:       "#a855f7",
    image:       "/project/course-unusia.png",
    imageAlt:    "Unu Course — Platform E-Learning Digital",
    role:        "Full Stack Developer",
    duration:    "4 bulan",
    description:
      "Platform e-learning digital yang menyediakan kursus teknologi berkualitas di 11+ kategori: web development, data science, mobile development, cybersecurity, UI/UX, dan lainnya. Dilengkapi sistem mentoring, komunitas belajar, dan integrasi pembayaran untuk pemula hingga profesional.",
    problem:
      "Akses ke pendidikan teknologi berkualitas di Indonesia masih terbatas — konten tersebar, harga tidak terjangkau, dan tidak ada pendampingan nyata dari mentor berpengalaman.",
    solution:
      "Marketplace kursus online terintegrasi dengan sistem mentoring langsung, forum komunitas via Telegram & Discord, dan payment gateway lokal yang memudahkan akses bagi pelajar di seluruh Indonesia.",
    features: [
      "Marketplace kursus dengan 11+ kategori teknologi dan bisnis digital",
      "Sistem review & rating mahasiswa untuk transparansi kualitas kursus",
      "Live mentoring session terjadwal dengan instruktur berpengalaman",
      "Integrasi komunitas belajar via Telegram dan Discord",
      "Pembayaran multi-channel via Midtrans (transfer, e-wallet, cicilan)",
      "Progress tracking kursus dengan sertifikat penyelesaian otomatis",
      "Responsive design untuk akses optimal di semua perangkat",
    ],
    tags:     ["Laravel", "React", "Midtrans", "Tailwind CSS", "MySQL", "SweetAlert2"],
    liveUrl:  "https://ecourse.pidev.biz.id/",
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null;
}
