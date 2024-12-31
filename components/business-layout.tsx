import { ReactNode } from 'react'

type BusinessLayoutProps = {
  children: ReactNode
}

export function BusinessLayout({ children }: BusinessLayoutProps) {
  return (
    <div>
      {children}
    </div>
  )
}

