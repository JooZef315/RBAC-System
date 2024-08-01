import { useState } from "react";
import downArrow from "../../assets/down-arrow.png";

type PropsType = {
  defaultRole: string;
};

enum Role {
  USER = "USER",
  SUPER_USER = "SUPER_USER",
  ADMIN = "ADMIN",
}

const roles: Role[] = [Role.ADMIN, Role.SUPER_USER, Role.USER];

export default function DropDownButton({ defaultRole }: PropsType) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (role: string) => {
    console.log(role);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={handleToggle}
        >
          {defaultRole || "Select Role"}
          <img src={downArrow} alt="downArrow" className="h-3 ml-1 mt-1" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {roles.map((role) => (
              <button
                key={role}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => handleSelect(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
