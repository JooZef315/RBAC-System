import { useState } from "react";
import downArrow from "../../assets/down-arrow.png";
import { Role } from "../utils/types";

type PropsType = {
  defaultRole: Role;
  id: string;
  editRole: React.Dispatch<React.SetStateAction<Map<string, Role>>>;
};

const roles: Role[] = [Role.ADMIN, Role.SUPER_USER, Role.USER];

export default function DropDownButton({
  defaultRole,
  id,
  editRole,
}: PropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const [newRole, setNewRole] = useState<Role>(defaultRole);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (role: Role) => {
    editRole((state) => {
      setNewRole(role);
      if (role == defaultRole) {
        state.delete(id);
        return state;
      } else {
        state.set(id, role);
        return state;
      }
    });
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
          {newRole}
          <img src={downArrow} alt="downArrow" className="h-3 ml-1 mt-1" />
        </button>
      </div>

      {isOpen && (
        <div className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {roles.map((role) => (
              <button
                key={role}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
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
