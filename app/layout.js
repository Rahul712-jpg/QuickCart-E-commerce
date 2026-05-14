import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { AppContextProvider } from "@/context/AppContext";
import { ToastBar } from "react-hot-toast";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        
          <Providers>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </Providers>
        
      </body>
    </html>
    </ClerkProvider>
  );
}