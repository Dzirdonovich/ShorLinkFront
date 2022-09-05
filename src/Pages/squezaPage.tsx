import { useAppDispatch, useAppSelector } from "../redux/state";
import {
  MouseEventHandler,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { clearState, getLinks, setPage, SquezzeLink } from "../redux/LinkSlice";

const SquezaPage = () => {
  const [link, setLink] = useState("");
  const currentEl = useRef(null);
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const state = useAppSelector((state) => state);

  const onClickLink = (e: string) => {
    navigator.clipboard.writeText(e);
  };

  useEffect(() => {
    const offset = state.link.option.offset;
    state.link.option.loading === false
      ? dispatch(getLinks({ limit: 10, offset }))
      : dispatch(getLinks({ limit: 10, offset }));
    console.log(state.link.Links);

    // state.link.Links.length === 0
    //   ? dispatch(getLinks({ limit: 10, offset }))
    //   : console.log(offset);
  }, [dispatch]);
  return (
    <div className="mx-3">
      <div className=" w-full flex justify-between">
        <div className=" text-center w-1/12">id</div>
        <div className=" text-center w-2/12">short</div>
        <div className="text-center w-8/12">target</div>
        <div className=" text-center w-1/12">counter</div>
      </div>

      {state.link.option.loading === true ? (
        <div className="text-center">Загрузка</div>
      ) : (
        state.link.Links.map((value, index) => (
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
        ))
      )}
      <div className=" w-full flex justify-center">
        {state.link.option.offset <= 0 ? (
          <button
            disabled={true}
            onClick={() => {
              dispatch(clearState());
              dispatch(setPage("MINUS"));
            }}
            className="mr-1"
          >
            prev
          </button>
        ) : (
          <button
            disabled={false}
            onClick={() => {
              dispatch(clearState());
              dispatch(setPage("MINUS"));
            }}
            className="mr-1"
          >
            prev
          </button>
        )}

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
      <div className="flex items-center flex-col">
        <div className=" font-bold">Создать ссылку</div>
        <input
          className="text-center"
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Введите ссылку"
        />
        {link.length <= 3 ? (
          <button disabled={true}>Отправить ссылку</button>
        ) : (
          <button disabled={false} onClick={() => dispatch(SquezzeLink(link))}>
            {" "}
            Отправить ссылку
          </button>
        )}
        {state.link.newLink ? (
          <div>
            <div>
              {state.link.newLink.short
                ? `http://79.143.31.216/s/${state.link.newLink.short}`
                : ""}
            </div>
            <div>{state.link.newLink.target}</div>
            <div>
              {state.link.newLink.target ? state.link.newLink.counter : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default SquezaPage;
