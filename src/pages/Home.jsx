import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai"
import { CiMail } from "react-icons/ci";
import { BsCapsule } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import { Hero } from "../components/Hero"
import { Footer } from "../components/Footer"

export const Home = () => {
  return (
    <>
    <div className="text-black">
    <div className="place-content-around bg-green-400 hidden md:flex">
    <div className="flex items-center gap-2"><IoLocationOutline />Feyti Ltd. Level 2 Bugolobi, Kampala Uganda</div>
    <div className="flex items-center gap-2"><AiOutlinePhone />+256-702-776-656</div>
    <div className="flex items-center gap-2"><CiMail />admin@feytimedicaIgroup.com</div>
    </div>
    <Navbar fluid rounded-l>
      <div className="flex md:order-2 ">
        <NavbarToggle />
      </div>
      <NavbarCollapse className = " "> 
        <NavbarLink href="#" active className="md:bg-gray-300 md:rounded-xl md:px-4 md:py-2">
          Home
        </NavbarLink >
        <NavbarLink href="about" className="md:px-4 md:py-2">About</NavbarLink>
        <NavbarLink href="services" className="md:px-4 md:py-2">Services</NavbarLink>
        <NavbarLink href="blogs" className="md:px-4 md:py-2">Blogs</NavbarLink>
      </NavbarCollapse>
      <div className="flex items-center gap-2">
      <div className="rounded-full bg-green-400 px-2 py-2"><BsCapsule /></div>
      Mfeyti
      </div>
      <div className="flex gap-2 items-center"> 
      <IoMdContact />
      <a href="signin" className="hover:text-green-400">Login</a> /
      <a href="signup" className="hover:text-green-400">Register</a>
      </div>
      <button className="bg-green-400 flex gap-2 items-center rounded-l rounded-r px-2 py-1">
      <IoMdContact />
        Contact Us
      </button>
    </Navbar>

    <Hero />

    <Footer />
    </div>
    </>
  );
}
