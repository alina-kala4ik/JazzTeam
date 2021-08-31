import React, {useRef} from "react";
import {connect} from "react-redux";
import {operation} from "../../reducer";
import PropTypes from "prop-types";

const Login = (props) => {
  const {login, loginError} = props;

  const formRef = useRef(null)

  return (
    <div className="login">
      <form ref={formRef} className="login_form">
        <p className="login_title">Вход</p>
        <input className="login_input" name="email" type="text" required placeholder="email"/>
        <input className="login_input" name="password" type="password" required placeholder="пароль"/>

        <div className="login_error">
          {loginError && <p>Имя пользователя или пароль введены неверно</p>}
        </div>

        <button
          type="button"
          className="login_submit"
          onClick={(evt) => {
            evt.preventDefault();
            const data = new FormData(formRef.current);
            login({
              email: data.get('email'),
              password: data.get('password')
            });
          }}
        >
          Вход
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  loginError: state.loginError
})

const mapDispatchToProps = (dispatch) => ({
  login(data) {
    dispatch(operation.login(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
