import './globals.css';

export const metadata = {
  title: {
    default: 'Tetebatu Trails | Local Tour Guide Lombok Timur',
    template: '%s | Tetebatu Trails',
  },
  description:
    'Local tour guide in Tetebatu, East Lombok. Waterfall treks, rice terrace walks, bamboo craft in Loyok, traditional weaving in Pringgasela.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
