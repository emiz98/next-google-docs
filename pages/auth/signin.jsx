import { getProviders, signIn as SignIntoProvider } from 'next-auth/react'
import Header from '../../components/Header'

function signin({ providers }) {
  return (
    <>
      <Header />

      <div className="my-20 mx-auto flex min-h-fit max-w-6xl flex-col items-center justify-center">
        <img className="w-1/3 object-contain" src="/docs_horiz.png" alt="" />

        <h1 className="mb-10 max-w-2xl text-center !font-sans text-3xl font-normal md:max-w-4xl md:text-6xl">
          Build your best ideas together, in Google Docs Clone
        </h1>
        <p className="font-xs text-center italic">
          This is not a real app, It is built only for educational purposes
          only.
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-md bg-blue-500 p-3 text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: '/' })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default signin
