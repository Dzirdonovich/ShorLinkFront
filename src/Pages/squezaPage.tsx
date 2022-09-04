import { useAppDispatch, useAppSelector } from "../redux/state";
import {
  MouseEventHandler,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { clearState, getLinks, setPage } from "../redux/LinkSlice";

const SquezaPage = () => {
  const currentEl = useRef(null);
  const dispatch = useAppDispatch();
  const [action, setAction] = useState(true);
  const state = useAppSelector((state) => state);

  const onClickLink = (e: string) => {
    navigator.clipboard.writeText(e);
  };

  useEffect(() => {
    const offset = state.link.option.offset;
    state.link.Links.length === 0
      ? dispatch(getLinks({ limit: 10, offset }))
      : console.log(offset);
  });
  return (
    <div className="mx-3">
      <div className=" w-full flex justify-between">
        <div className=" text-center w-1/12">id</div>
        <div className=" text-center w-2/12">short</div>
        <div className="text-center w-8/12">target</div>
        <div className=" text-center w-1/12">counter</div>
      </div>
      {state.link.Links.map((value, index) => (
        <div key={value.id + value.short} className="flex justify-between">
          <div className=" text-center w-1/12">{value.id}</div>
          <div
            ref={currentEl}
            onClick={(event) => onClickLink(event.currentTarget.innerHTML)}
            className=" text-center w-2/12"
          >{`http://79.143.31.216/s/${value.short}`}</div>
          <div className="text-center w-8/12">{value.target}</div>
          <div className=" text-center w-1/12">{value.counter}</div>
        </div>
      ))}
      <div className=" w-full flex justify-center">
        <button
          onClick={() => {
            dispatch(clearState());
            dispatch(setPage("MINUS"));
          }}
          className="mr-1"
        >
          prev
        </button>
        <div>{state.link.option.offset}</div>
        <button
          onClick={() => {
            dispatch(clearState());
            dispatch(setPage("PLUS"));
          }}
          className="ml-1"
        >
          {" "}
          next{" "}
        </button>
      </div>
    </div>
  );
};
export default SquezaPage;
