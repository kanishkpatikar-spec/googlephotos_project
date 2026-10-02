import "./globals.css"

export const metadata = {
  title: 'Consumer Search MVP | Google Photos',
  description: 'AI-Powered Semantic Image Retrieval',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="referrer" content="no-referrer" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body-md text-body-md text-on-surface bg-[#090710]">
        <header className="fixed top-0 left-0 right-0 h-16 z-50">
          <div className="h-16 w-full max-w-[1800px] mx-auto px-6 flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-lg">
              <div className="flex items-center gap-3 cursor-pointer select-none">
                <span className="material-symbols-outlined text-primary text-[36px]">lens_blur</span>
                <span className="font-headline-sm text-2xl tracking-[0.2em] uppercase text-white font-semibold mt-1">Lumina</span>
              </div>
            </div>
            <div className="flex items-center gap-space-md">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full pt-16">
          <div className="flex flex-col w-full relative selection:bg-primary-container selection:text-on-primary-container">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
