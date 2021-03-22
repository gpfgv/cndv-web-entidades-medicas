import React from 'react';
import {signOut, getSession } from "next-auth/client";

const Header = () => {
    function logoutHandler() {
        signOut();
    }

    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2">Bem-vindo</p>
            <button
                onClick={() => logoutHandler() }
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow">
                Sair
            </button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if(!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default Header;