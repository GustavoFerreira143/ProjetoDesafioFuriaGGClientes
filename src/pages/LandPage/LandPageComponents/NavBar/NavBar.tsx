import React from 'react'
import './Nav.css';

function NavBar() {
    function toggleDropdown() {
        const menu = document.getElementById("dropdownMenu");

        if (menu.classList.contains("invisible")) {
            menu.classList.remove("invisible", "opacity-0", "scale-95");
            menu.classList.add("visible", "opacity-100", "scale-100");
        } else {
            menu.classList.add("opacity-0", "scale-95");
            menu.classList.remove("opacity-100", "scale-100");

            setTimeout(() => {
                menu.classList.add("invisible");
            }, 300); 
        }
    }
    return (
        <div className='grid grid-cols-12' id="NavBar">
            <div className="col-span-12 md:col-span-4 p-4 ml-13 md:ml-20 flex items-center">
                <a href="https://www.furia.gg" className='mr-3'>Loja Fúria</a>
                <a href="*" className='mx-3'>Noticias</a>
                <a href="*" className='mx-3'>E-Sports</a>
            </div>
            <div className="col-span-12 md:col-span-4 p-4 flex justify-center"><img src='/logo-furia.svg'></img></div>
            <div className="col-span-12 md:col-span-4 p-4 text-center">
                <div className="relative inline-block text-left">
                    <button
                        onClick={toggleDropdown}
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
                    >
                        Veja Notícias ▼
                    </button>

                    <div
                        id="dropdownMenu"
                        className="opacity-0 scale-95 invisible transition-all duration-300 ease-out absolute w-48 bg-white shadow-md z-30 mt-3 bg-white shadow-md rounded-md "
                    >
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Counter-Strike</a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">League of Legends</a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Kings League</a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Valorant</a>
                        <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Furia Redram</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar