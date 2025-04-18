import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Blog Example'
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head backgroundColor={{ dark: '#0f172a', light: '#fcfcfa' }} />
      <body>
          <Layout>
            <Navbar pageMap={await getPageMap()}>
              <Search />
              <ThemeSwitch />
            </Navbar>

            {children}
            <Analytics />

            <Footer>
              <abbr
                title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
                style={{ cursor: 'help' }}
              >
                CC BY-NC 4.0
              </abbr>{' '}
              {new Date().getFullYear()} © makotyo
              <a href="/feed.xml" style={{ float: 'right' }}>
                RSS
              </a>
            </Footer>
          </Layout>
      </body>
    </html>
  )
}
