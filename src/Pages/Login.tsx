import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/state";
import { login, register, setNewUser } from "../redux/UserSlice";

const Login = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const onClickHandler = (e: any) => {
    dispatch(login({ username: username, password: password }));
  };
  return (
    <form className=" w-1/12  m-auto flex flex-col items-center  justify-center">
      <div>
        <label htmlFor=""></label>
        <input
          className="bg-inherit w-full outline-0"
          value={username}
          onChange={(event) => setUserName(event.target.value)}
          type="text"
          name="username"
          placeholder="Имя"
        />
      </div>
      <div>
        <label htmlFor=""></label>
        <input
          className="bg-inherit w-full outline-0"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="text"
          name="password"
          placeholder="Пароль"
        />
      </div>
      <div className="flex justify-between w-full">
        <Link
          to={"/squezze"}
          onClick={(event) => onClickHandler(event)}
          type="submit"
        >
          Логин
        </Link>
        <Link to={"/register"}>Регистрация</Link>
      </div>
    </form>
  );
};

export default Login;
