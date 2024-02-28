import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  UserGroupIcon,
  NewspaperIcon,
  PowerIcon,
  PlusCircleIcon,
  QueueListIcon
} from "@heroicons/react/24/solid";
import {

  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials, clearTokens } from "../../features/slices/authSlice";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const ProfileMenu = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.userInfo.role);
  const tokens = useSelector((state) => state.auth.tokens);
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      link: "/profile",
    },
    ...(role === "user" ? [{
      label: "Teams",
      icon: UserGroupIcon,
      link: "/viewteams",
    }] : []),
    {
      label: "Applications",
      icon: NewspaperIcon,
      link: role === "user" ? "/viewapplications" : (role === "cm" ? "/viewCMapplications" : undefined),
    },
    ...(role === "cm" ? [
      {
        label: "Create Quest",
        icon: PlusCircleIcon,
        link: "/registerquest",
      },
      {
        label: "My Quests",
        icon: QueueListIcon,
        link: "/viewquests",
      },
      {
        label: "Create tasks",
        icon: PlusCircleIcon,
        link: "/registertask",
      }
    ] : []),
    {
      label: "Sign Out",
      icon: PowerIcon,
      link: "/signout",
    },
  ];
  const navigate = useNavigate();
  // console.log(profileMenuItems)
  const handleLogout = () => {

    dispatch(clearCredentials());
    dispatch(clearTokens());
    navigate('/');
    // Perform any additional logout operations you need here
  };
  const [notifications, setNotifications] = useState(0);
  useEffect(() => {
    if (role === "cm") {
      getNotifications();
    }
  }, [role]);
  const getNotifications = async () => {
    try {
      const res = await fetch(`${baseUrl}/get_unviewed/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokens.access}`
        }
      })
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setNotifications(data.length);
      }
      else {
        throw Error(data.message)
      }
    }
    catch (err) {
      toast.error("Failed to fetch notifications.");
    }
  }
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >


          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 size-12 rounded-full"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />{notifications !== 0 && <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            {notifications}
          </span>}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (<div key={key}>
            {!isLastItem && <Link to={link} >
              <MenuItem

                className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                  }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}

                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >{label}

                </Typography>{label === "Applications" && notifications !== 0 && <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {notifications}
                </span>}
              </MenuItem>
            </Link>}
            {isLastItem && <MenuItem

              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}

              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={"red"}
              >
                <p onClick={handleLogout}>{label}</p>
              </Typography>
            </MenuItem>}
          </div>

          );
        })}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;