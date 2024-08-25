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
        <div className="bg-white text-black text-base absolute right-5 flex flex-col shadow-lg mt-5 px-3 py-4">
          <Link href="/">Go to Profile</Link>
          <Link href="/">Settings</Link>
          <Link href="/">Help</Link>
          <Link href="/">Logout</Link>
        </div>
      )}
    </div>
  )
}
export default ProfileDropdown