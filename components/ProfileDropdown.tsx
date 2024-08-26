import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/utils/supabase/authLogout";
// icons
import { IoPersonCircleOutline, IoSettingsOutline, IoHelpCircleOutline, IoLogOutOutline} from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io"

interface User {
  email: string;
}

export interface ProfileDropdownProps {
  user: User | null;
}

const ProfileDropdown = ({user}: ProfileDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userInitial = user?.email?.charAt(0).toUpperCase();
  
  const dropdownItems = [
    { name: 'Profile', path: '/profile', icon: IoPersonCircleOutline},
    { name: 'Settings', path: '/settings', icon: IoSettingsOutline},
    { name: 'Help', path: '/help', icon: IoHelpCircleOutline},
  ]

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  }

  return (
    <div>
      <button>
        <div 
          className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-white"
          onClick={toggleDropdown}
        >
        {userInitial}
        </div>
      </button>
      {isDropdownOpen && (
        <div onClick={closeDropdown} className="fixed inset-0 bg-transparent z-10">
          <div onClick={e => {e.stopPropagation()}} className="bg-white text-black absolute right-6 mt-24 min-w-72 text-base flex flex-col shadow-lg rounded-lg">
            <div className="flex flex-col p-4">
              <span className="italic">{user.email}</span>
              <span>username</span>
            </div>
            <hr className="" />  
            <div className="">
            {dropdownItems.map(item => (
              <div className="">
                <Link href={item.path} className="flex flex-row justify-between items-center hover:bg-primary hover:text-white  px-4 py-2">
                  <div className="flex">
                    <item.icon className="text-2xl" />
                    <span className="mx-2">{item.name}</span>
                  </div> 
                  <IoIosArrowForward />               
                </Link>
              </div>
            ))}
            </div>
            <form action={signOut}>
            <button className="flex flex-row items-center hover:bg-primary hover:text-white w-full px-4 py-2">
              <IoLogOutOutline className="text-2xl"/>  
              <span className="mx-2">Logout</span>
            </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default ProfileDropdown