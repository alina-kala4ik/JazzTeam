import React from "react";
import {NavLink} from "react-router-dom";
import {PATCHES} from "../../utils";

const isLogin = false;

const Header = () => {
  return (
    <header className="header">
      <div className="header_menu">
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.MAIN}>Главная</NavLink>
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.PROFILE}>Профиль</NavLink>
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.INFO}>Информация</NavLink>
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.TABLE}>Таблица</NavLink>
      </div>

      {isLogin &&
        <div className="header_profile">
          <img alt="name" className="header_avatar" src="./img/1.png"/>
          <p className="header_name">Name</p>
        </div>
      }

      {!isLogin &&
        <NavLink className="header_link" exact to={PATCHES.LOGIN}>Авторизация</NavLink>
      }
    </header>
  )
}

export default Header;
