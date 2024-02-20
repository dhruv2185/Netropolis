import React from "react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    UserGroupIcon,
    NewspaperIcon,
    PowerIcon,
    
  } from "@heroicons/react/24/solid";
  import {
    
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearCredentials, clearTokens } from "../../features/slices/authSlice";
const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      link:"/profile",
    },
    {
      label: "Teams",
      icon: UserGroupIcon,
      link:"/viewteams",
    },
    {
      label: "Applications",
      icon: NewspaperIcon,
      link:"/viewapplications",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      link:"/signout",
    },
  ];
const ProfileMenu=()=> {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(clearTokens());
    // Perform any additional logout operations you need here
  };
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
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon,link }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
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
                >{!isLastItem && <Link to={link}>{label}</Link>}
                  {isLastItem && <p onClick={handleLogout}>{label}</p>}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

export default ProfileMenu;