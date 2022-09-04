import { useAppDispatch, useAppSelector } from "../redux/state";
import { useEffect } from "react";
import { getLinks } from "../redux/LinkSlice";

const SquezaPage = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  console.log(state.link);
  useEffect(() => {
    state.link.length === 0
      ? dispatch(getLinks({ limit: 10, offset: 1 }))
      : console.log();
  });
  return (
    <div>
      {state.link.map((value, index) => (
        <div className="flex justify-between">
          <div>{value.id}</div>
          <div>{value.short}</div>
          <div>{value.target}</div>
          <div>{value.counter}</div>
        </div>
      ))}
    </div>
  );
};
export default SquezaPage;
