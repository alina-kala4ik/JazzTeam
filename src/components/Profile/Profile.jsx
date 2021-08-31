import React from "react";
import Header from "../Header/Header";

const Profile = () => {
  return (
    <React.Fragment>
      <Header/>
      <div className="page profile">
        <p>Имя: name</p>
        <p>Фамилия: name</p>
        <p>Отчество: name</p>
      </div>
    </React.Fragment>
  )
}

export default Profile;
