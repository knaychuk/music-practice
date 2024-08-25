import { useState } from "react";
import Link from "next/link";

export interface ProfileDropdownProps {
  user: {};
}

const ProfileDropdown = ({user}: ProfileDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userInitial = user.email.charAt(0).toUpperCase();
  // console.log(userInitial);

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
          className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-sm"
          onClick={toggleDropdown}
        >
        
        {userInitial}
 
        </div>
      </button>
      {isDropdownOpen && (
        <div onClick={closeDropdown} className="fixed inset-0 bg-transparent z-10">
          <div onClick={e => {e.stopPropagation()}} className="bg-white text-black absolute right-6 mt-24 max-w-fit text-base flex flex-col shadow-lg px-3 py-4">
            <div className="flex flex-col p-2">
              <span className="italic">{user.email}</span>
              <span>username</span>
            </div>
            <hr />  
            <div className="flex flex-col p-2">
              <Link href="/">Go to Profile</Link>
              <Link href="/">Settings</Link>
              <Link href="/">Help</Link>
              <Link href="/">Logout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ProfileDropdown