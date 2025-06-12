import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import { SidebarProvider } from "./contexts/SidebarContext";

export const metadata = {
  title: "Collabify",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/CollabifyMauve.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Noto+Sans:300,400,500,600,700,800|PT+Mono:300,400,500,600,700"
          rel="stylesheet"
        />
      </head>
      <body>
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}
