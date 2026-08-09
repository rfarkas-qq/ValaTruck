import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./tailwind-compiled.css";

export const metadata: Metadata = {
  title: "ValaTruck - Private Site Navigation PWA",
  description: "Lightweight, offline-capable 5x5 km haul truck navigation PWA for private sites lacking Google Street View data.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ValaTruck",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-driver-dark text-slate-900 antialiased min-h-screen">
        {children}
        {/* Service Worker Registration / Localhost Cleanup */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                      registration.unregister();
                    }
                  });
                } else {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js');
                  });
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
