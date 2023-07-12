import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => {
  return (
    <div className=" ">
      {links.map((link) => {
        return (
          <NavLink
            key={link.name}
            to={link.to}
            className="flex items-center text-slate-400  justify-between p-2 my-2 rounded-md hover:bg-slate-800"
            onClick={() => handleClick && handleClick()}
          >
            <link.icon className="w-6 h-6 mr-2 text-slate-400" />

            <div className="text-sm w-full font-medium">{link.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] px-4 py-10 pt-[rem] bg-slate-900 ">
        <img src={logo} className=" object-contain w-full h-14" alt="" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-4 pt-[rem] right-3 ">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-6 h-6 mr-2 text-white"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-6 h-6 mr-2  text-white"
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483db8]  backdrop-blur-lg z-10 p-6 md:hidden smooth-transition scroll-smooth ${
          mobileMenuOpen ? "left-0" : " -left-full"
        }`}
      >
        <img src={logo} className=" object-contain w-full h-14 " alt="" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
