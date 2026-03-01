import './globals.css';

export const metadata = {
  title: 'Butterfly Tea X Client',
  description: 'No timeline X client prototype',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
