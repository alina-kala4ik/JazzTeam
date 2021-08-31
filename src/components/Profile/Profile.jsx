import React from "react";
import Header from "../Header/Header";
import {connect} from "react-redux";
import history from "../../history";
import {PATCHES} from "../../utils";
import PropTypes from "prop-types";

const Profile = (props) => {
  const {user} = props;

  if (!user) {
    history.push(PATCHES.LOGIN)
    return null;
  }

  return (
    <React.Fragment>
      <Header/>

      <div className="page profile">
        <p>Имя: {user.name}</p>
        <p>Фамилия: {user.lastname}</p>
        <p>Отчество: {user.secondname}</p>
      </div>
    </React.Fragment>
  )
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    lastname: PropTypes.string,
    secondname: PropTypes.string
  })
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Profile);
