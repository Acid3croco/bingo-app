import "./globals.css"
import "../styles/theme.scss"

import Sidebar from "@/components/Sidebar"

export const metadata = {
  title: "Bingo App",
  description: "A bingo app built with React and TypeScript."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className="flex gap-4">
          <Sidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
