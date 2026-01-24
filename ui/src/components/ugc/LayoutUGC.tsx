import "@workspace/ui/globals.css";
import { Website } from "./types";

interface Props {
  website: Website;
  children: React.ReactNode;
}

export const LayoutUGC = ({ website, children }: Props) => {
  return (
    <html lang={website.lang} style={{ overflowY: "scroll" }}>
      <head>
        <meta charSet="utf-8" />

        {website.style === "friendly" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {website.style === "minimalist" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {website.style === "modern" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
              rel="stylesheet"
            />
          </>
        )}

        <meta name="viewport" content="width=device-width" />
        <title>{website.title}</title>
        <meta name="description" content={website.description} />
      </head>
      <body
        className="@container"
        style={{
          fontFamily:
            website.style === "friendly"
              ? "Manrope, sans-serif"
              : website.style === "minimalist"
                ? "Inter, sans-serif"
                : "Outfit, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
};
