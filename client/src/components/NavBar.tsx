import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { IAuthUser } from '../interfaces'

const NavBar = (): JSX.Element => {
    const pathName = window.location.pathname;
    const path = pathName === "/" ? "home" : pathName.substr(1);
    const [activeItem, setActiveItem] = useState(path);
    const { user, logout }: IAuthUser = useContext(AuthContext);

    const handleItemClick = (e: React.SyntheticEvent, { name }: { name: string }) => setActiveItem(name);

    const NavBar = user ? (
        <Menu pointing secondary size="massive" color="blue">
            <Menu.Item
                name={user.username}
                active
                as={Link}
                to="/"
            />
            <Menu.Menu position="right">
                <Menu.Item
                    name="logout"
                    onClick={() => logout()}
                />
            </Menu.Menu>
        </Menu>
    ) : (
            <Menu pointing secondary size="massive" color="blue">
                <Menu.Item
                    name="home"
                    active={activeItem === "home"}
                    onClick={() => handleItemClick}
                    as={Link}
                    to="/"
                />
                <Menu.Menu position="right">
                    <Menu.Item
                        name="login"
                        active={activeItem === "login"}
                        onClick={() => handleItemClick}
                        as={Link}
                        to="/login"
                    />
                    <Menu.Item
                        name="register"
                        active={activeItem === "register"}
                        onClick={() => handleItemClick}
                        as={Link}
                        to="/register"
                    />
                </Menu.Menu>
            </Menu>
        );

    return NavBar;
};

export default NavBar;
