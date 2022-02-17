import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

function WelcomeScreen() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status == 'unauthenticated') {
    signIn()
  }

  return <div></div>
}

export default WelcomeScreen
