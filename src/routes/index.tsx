import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div>
        <span>/ page</span>
        <Link to="/auth" search={{ mode: "login" }}>Go to /auth/</Link> 
    </div>
  )
}
