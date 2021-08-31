import React from "react";
import {NavLink} from "react-router-dom";
import {PATCHES} from "../../utils";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Header = (props) => {
  const {user} = props;

  return (
    <header className="header">
      <div className="header_menu">
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.MAIN}>Главная</NavLink>
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.PROFILE}>Профиль</NavLink>
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.INFO}>Информация</NavLink>
        <NavLink className="header_link" activeClassName="active" exact to={PATCHES.TABLE}>Таблица</NavLink>
      </div>

      {user &&
        <div className="header_profile">
          <img alt="name" className="header_avatar" src={user.img}/>
          <p className="header_name">{user.name}</p>
        </div>
      }

      {!user &&
        <NavLink className="header_link" exact to={PATCHES.LOGIN}>Авторизация</NavLink>
      }
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string
  })
}


const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Header);
