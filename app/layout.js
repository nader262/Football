export const metadata = {
  title: 'تطبيق إدارة فريق كرة القدم',
  description: 'إدارة تدريبات ولاعبين فريق الصغار',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
