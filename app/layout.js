import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Footer from "./components/ui/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/ui/Header/Header";
import StructuredData from "./components/StructuredData";

const vazirmatn = Vazirmatn({ 
  subsets: ["arabic"],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata = {
  title: {
    default: "تگانه - موتور جستجوی فارسی اخبار",
    template: "%s | تگانه"
  },
  description: "تگانه، سریع‌ترین موتور جستجوگر خبر ایران که اخبار لحظه به لحظه را از معتبرترین خبرگزاری‌های پارسی‌زبان گردآوری می‌کند. اخبار سیاسی، اقتصادی، ورزشی، فرهنگی و اجتماعی ایران و جهان.",
  keywords: ["اخبار", "خبر", "اخبار ایران", "اخبار جهان", "موتور جستجو", "خبرگزاری", "اخبار سیاسی", "اخبار اقتصادی", "اخبار ورزشی"],
  authors: [{ name: "تگانه" }],
  creator: "تگانه",
  publisher: "تگانه",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://taganeh.ir'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "تگانه - موتور جستجوی فارسی اخبار",
    description: "سریع‌ترین موتور جستجوگر خبر ایران که اخبار لحظه به لحظه را از معتبرترین خبرگزاری‌های پارسی‌زبان گردآوری می‌کند.",
    url: 'https://taganeh.ir',
    siteName: 'تگانه',
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "تگانه - موتور جستجوی فارسی اخبار",
    description: "سریع‌ترین موتور جستجوگر خبر ایران",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
      </head>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col bg-gray-50`}>
        <AuthProvider>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
