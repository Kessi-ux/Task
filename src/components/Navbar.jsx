import { useContext, useState } from "react";
import Logo from "./../assets/Logo.png";
import { LayoutDashboard, User, ClipboardCheck } from "lucide-react";
import { AuthContext } from "../provider";

const asideLinks = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Profile",
    icon: User,
  },

  {
    name: "Add Todo",
    icon: ClipboardCheck,
  },
];

export const Navbar = () => {
  const {user,  logout} = useContext(AuthContext);
  // const [activeNavIndex, setActiveNavIndex] = useState(0);

  return (
    <div>
      <div className="navbar bg-base-100 fixed w-full z-20 top-0 start-0">
        <div className="flex-1">
          <img src={Logo} className="h-8" alt="" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Hello {user.displayName}
          </span>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end"></div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-10"
            >
              <div className="w-10 rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <aside className=" mt-20 bg-gray-50 dark:bg-gray-700 h-screen w-1/4 ml-0 z-10 flex">
        <div className="mt-2 pt-4 pl-22 flex flex-col space-y-8 w-30">
          {asideLinks.map((item, index) => (
            <div
              key={index}
              className={
                "flex space-x-3" +
                (activeNavIndex === index
                  ? " bg-[#ff8c8c] text-white font-sembold"
                  : "")
              }
              onClick={() => setActiveNavIndex(index)}
            >
              <item.icon />
              <span>{item?.name}</span>
            </div>
          ))}
        </div>
      </aside> */}
    </div>
  );
};
