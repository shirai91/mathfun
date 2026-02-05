import { Nunito } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/contexts/SoundContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LevelProvider } from "@/contexts/LevelContext";
import IntlProvider from "@/components/providers/IntlProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata = {
  title: "MathFun - Học toán vui vẻ!",
  description: "Ứng dụng học toán vui nhộn cho trẻ em",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${nunito.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; });`,
          }}
        />
        <IntlProvider>
          <LanguageProvider>
            <SoundProvider>
              <LevelProvider>
                {children}
              </LevelProvider>
            </SoundProvider>
          </LanguageProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
