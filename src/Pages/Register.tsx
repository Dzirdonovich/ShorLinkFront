import { Link } from "react-router-dom";
import { MouseEventHandler, ReactEventHandler, useState } from "react";
import { register, setNewUser } from "../redux/UserSlice";
import { useAppDispatch, useAppSelector } from "../redux/state";

const Register = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const onClickHandler = (e: any) => {
    e.preventDefault();

    dispatch(register({ username: username, password: password }));
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
        <button onClick={(event) => onClickHandler(event)} type="submit">
          Регистрация
        </button>
        <Link to={"/login"}>Логин</Link>
      </div>
    </form>
  );
};

export default Register;
