import './globals.css'

export const metadata = {
  title: 'מחשבון מענק כלביא',
  description: 'מחשבון מותאם אישית לפי תנאי מבצע',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
