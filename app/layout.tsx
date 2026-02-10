import "./globals.css";

export const metadata = {
  title: "Valentine 💖",
  description: "A special question for you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
