import React, {useRef} from "react";

const Login = () => {

  const formRef = useRef(null)

  return (
    <div className="login">
      <form ref={formRef} className="login_form">
        <p className="login_title">Вход</p>
        <input className="login_input" name="email" type="text" required placeholder="email"/>
        <input className="login_input" name="password" type="password" required placeholder="пароль"/>
        <button
          type="button"
          className="login_submit"
          onClick={(evt) => {
            evt.preventDefault();
            const data = new FormData(formRef.current);
            console.log(data)
          }}
        >
          Вход
        </button>
      </form>
    </div>
  );
}

export default Login;
