import React from 'react'
import './Nav.css';
import { useState, useEffect, useRef } from 'react';

function NavBar() {

    const [isVisible, setIsVisible] = useState(true);
    const [isHidden, setIsHidden] = useState(false);


    useEffect(() => {
      let lastScrollTop = 0;
  
      const handleScroll = () => {
        const currentScroll = window.scrollY;
  
        if (currentScroll > lastScrollTop) {
          setIsVisible(false); 
        } else {
          setIsVisible(true);
          setIsHidden(false);
        }
  
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);



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
        <div
        id="NavBar"
        className={`header grid grid-cols-12  ${
          isVisible ? "animate-fadeInUp" : "animate-fadeInDown"
        } ${isHidden ? "hidden" : ""}`
    }  onAnimationEnd={() => {
        if (!isVisible) {
            setTimeout(() => setIsHidden(true),10);
        }
      }}
      >
                <div className="col-span-12 md:col-span-4 p-4 ml-13 md:ml-20 flex items-center">
                    <a href="https://www.furia.gg" className='mr-3'>Loja Fúria</a>
                    <a href="/" className='mx-3'>Noticias</a>
                    <a href="https://escharts.com/pt/organizations/furia-esports" className='mx-3'>E-Sports</a>
                </div>
                <div className="col-span-12 md:col-span-4 p-4 flex justify-center"><img src='/logo-furia.svg'></img></div>
                <div className="col-span-12 md:col-span-4 p-4 text-center">
                    <div className="relative inline-block text-left">
                        <button
                            onClick={toggleDropdown}
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors duration-300 ease-in-out"
                        >
                            Fique por Dentro ▼
                        </button>

                        <div
                            id="dropdownMenu"
                            className="opacity-0 scale-95 invisible transition-all duration-300 ease-out absolute w-48 bg-white shadow-md z-30 mt-3 bg-white shadow-md rounded-md "
                        >
                            <a href="https://www.instagram.com/furiagg/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">FuriaGG</a>
                            <a href="https://www.instagram.com/furia.lol/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">League of Legends</a>
                            <a href="https://www.youtube.com/@FURIAggCS" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Counter Strike</a>
                            <a href="https://kingsleague.pro/pt/times/50-furia-fc" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Kings League</a>
                            <a href="https://www.instagram.com/furia.valorant/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Valorant</a>
                            <a href="https://www.instagram.com/furia.redram/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Furia Redram</a>
                            <a href="https://www.instagram.com/furia.r6/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Rainbow Six</a>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default NavBar