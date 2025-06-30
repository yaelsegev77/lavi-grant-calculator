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

          {/* הלוגו מופיע מתחת לתוכן, ממורכז וגדול יחסית */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: '30vh',
            marginTop: '3rem'
          }}>
            <img
              src="/logo.png.png"
              alt="לוגו יעל שגב"
              style={{
                maxHeight: '100%',
                maxWidth: '250px',
                objectFit: 'contain',
                opacity: 0.7
              }}
            />
          </div>
        </main>
      </body>
    </html>
  );
}
