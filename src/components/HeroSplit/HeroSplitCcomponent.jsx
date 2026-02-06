//  {/* MOBILE MENU OVERLAY */}
//             <div className={`lg:hidden fixed inset-0 bg-black z-40 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
//                 <nav className="flex flex-col items-center justify-center space-y-8 h-full">
//                     {NavLinks.map((item) => {
//                         const isActive = pathname === item.path;
//                         return (
//                             <Link 
//                                 key={item.name} 
//                                 href={item.path}
//                                 onClick={closeMenu}
//                                 className={`text-2xl tracking-[0.3em] uppercase font-light transition-all duration-300 
//                                 ${isActive ? 'text-amber-600' : 'text-gray-300 hover:text-amber-500'}`}
//                             >
//                                 {item.name}
//                             </Link>
//                         );
//                     })}
                    
//                     {/* Mobile Sign In Link */}
//                     <Link href="/login" onClick={closeMenu} className="text-gray-400 text-sm tracking-widest uppercase pt-4">
//                         {isLoggedIn ? 'Account' : 'Sign In'}
//                     </Link>

//                     <div className="pt-6">
//                         <Link 
//                             href="/reservations" 
//                             onClick={closeMenu}
//                             className="bg-amber-600 text-white px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-bold"
//                         >
//                             Book a Table
//                         </Link>
//                     </div>
//                 </nav>
//             </div>