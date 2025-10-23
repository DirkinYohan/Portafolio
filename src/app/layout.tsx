import "./globals.css";
import { UnifrakturCook } from "next/font/google";

const gothic = UnifrakturCook({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "Portafolio Dirkin",
  description: "Portafolio de Programador",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={gothic.className}>{children}</body>
    </html>
  );
}
