"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider component for Next.js application.
 *
 * @param {Object} props - The properties for the ThemeProvider.
 * @param {React.ReactNode} props.children - The children components.
 * @param {...any} props.rest - The rest of the properties for the ThemeProvider.
 * @returns {JSX.Element} The ThemeProvider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Render the NextThemesProvider component with the provided properties
  // and children components.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
