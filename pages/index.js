import { signIn, signOut, useSession } from 'next-auth/client';

const Index = () => {

  const [ session, loading ] = useSession();

  return (
      <>
        {!session && <> Not signed in<button onClick={() => signIn()}>Sign in</button></>}
        {session && <> Signed in as {session.user.email} and {session.user.name} and {session.cpf}<button onClick={() => signOut()}>Sign out</button></>}
        <h1 className="text-2xl text-gray-800 font-light">Painel Geral</h1>
      </>
  )
};

export default Index;