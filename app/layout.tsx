import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from '@/components/site-header'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { ThemeProvider } from "@/components/theme-provider"
import { BusinessLayout } from '@/components/business-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Harmony Grove Church',
  description: 'A welcoming community of faith',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-background text-foreground h-full`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BusinessLayout>
            <div className="flex h-full">
              <MainNav />
              <div className="flex-1 flex flex-col ml-16">
                <SiteHeader />
                <main className="flex-1 overflow-y-auto p-8">
                  <div>
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </BusinessLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

