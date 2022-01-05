import React, { useContext } from "react";

import { UserContext } from "../contexts/user-context";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center p-4 mb-6">
      <div className="flex items-center space-x-4">
        {user?.profile_picture && (
          <img
            src={user?.profile_picture}
            className="w-12 h-12 rounded-full border shadow object-cover"
          />
        )}
        <h1 className="text-3xl font-bold">
          Hello {user?.first_name} {user?.last_name}
        </h1>
      </div>

      <a className="button danger cursor-pointer" href="/sign_out">
        Sign out
      </a>
    </div>
  );
}
