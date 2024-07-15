import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "HealthPlus",
  description:
    "A health care patient management System designed to streamline patient registration, appointment scheduling, and medical records management for health care providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

/**
 * RootLayout component for the Next.js application.
 * This component sets up the base HTML structure and wraps the children components.
 *
 * @param {Object} props - The properties for the RootLayout component.
 * @param {React.ReactNode} props.children - The children components.
 * @returns {JSX.Element} The RootLayout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Set up the base HTML structure with the appropriate classes and attributes.
  return (
    <html lang='en'>
      <body
        className={cn(
          // Set the minimum height of the screen to the full height.
          "min-h-screen",
          // Set the background color to dark-300.
          "bg-dark-300",
          // Set the font family to the variable font-sans.
          "font-sans",
          // Enable anti-aliasing for text.
          "antialiased",
          // Apply the variable font-sans to the body element.
          fontSans.variable,

          "scroll-smooth"
        )}>
        {/* Wrap the children components with the ThemeProvider component.
            The ThemeProvider component sets up the theme for the application. */}
        <ThemeProvider attribute='class' defaultTheme='dark'>
          {/* Render the children components. */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
