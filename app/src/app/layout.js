import PropTypes from 'prop-types'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Toolbox Task - Files App',
  description: 'Simple app that renders files from an API'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired
}
