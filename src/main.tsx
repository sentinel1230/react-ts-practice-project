import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/lib/queryClient.ts'

import './shared/lib/firebase'

import './index.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  )
}