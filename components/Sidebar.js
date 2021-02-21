import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ children }) => {

    // routing de Next.js
    const router = useRouter();

    return (
      <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
          <div>
              <p className="text-white text-2xl font-black">CNDV BackOffice</p>
          </div>
          <nav className="mt-5 list-none">
              <li className={router.pathname === "/campanhas" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/campanhas">
                      <a className="text-white block">
                          Campanhas
                      </a>
                  </Link>
              </li>
              <li className={router.pathname === "/entidades" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/entidades">
                      <a className="text-white block">
                          Entidades
                      </a>
                  </Link>
              </li>
              <li className={router.pathname === "/vacinas" ? "bg-blue-800 p-2" : "p-2"}>
                  <Link href="/vacinas">
                      <a className="text-white block">
                          Vacinas
                      </a>
                  </Link>
              </li>
          </nav>
      </aside>
    );
}

export default Sidebar;