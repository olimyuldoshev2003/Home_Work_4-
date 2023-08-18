import { useDispatch, useSelector } from "react-redux";
import { ITodo, addUser, completedUser, deleteUser, editUser, openModal, setModal, setText, setTitle } from "./reducers/Todo/Todo";
import "./App.css"


const App = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state:any) => state.Todo.todo);
  const title = useSelector((state:any) => state.Todo.title);
  const text = useSelector((state: any) => state.Todo.text);
  const modal = useSelector((state: any) => state.Todo.modal);
  
  console.log(todo);
  return (
    <div className="flex flex-col justify-center items-center">
      <header className="header">
        <h1 className="text-center text-[60px] text-[#fff] font-[700]">
          TO DO LIST
        </h1>
        <form
          action=""
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            dispatch(addUser(event))
          }
          className="flex items-center gap-[20px]"
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="Add user"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setTitle(event.target.value))
            }
            className="outline-none bg-[red] text-[#fff] placeholder:text-[#fff] p-[5px_30px] rounded-[30px]"
          />
          <button
            type="submit"
            className="p-[6px_30px] bg-[green] text-[#fff] rounded-[30px] text-[16px]"
          >
            Add
          </button>
        </form>
      </header>
      <section className="section mt-[40px] flex flex-col gap-[20px]">
        {todo.map((item: ITodo) => {
          return (
            <div key={item.id} className="flex items-center  gap-[40px]">
              {item.complete ? (
                <h1 className="line-through text-[red] text-[20px]">
                  {item.title}
                </h1>
              ) : (
                <h1 className="text-[#fff] text-[20px]">{item.title}</h1>
              )}
              <button
                className="p-[6px_30px] bg-[#10608f] text-[#fff] rounded-[30px] text-[16px]"
                onClick={() => dispatch(deleteUser(item.id))}
              >
                Delete
              </button>
              <button
                className="p-[6px_30px] bg-[#075964] text-[#fff] rounded-[30px] text-[16px]"
                onClick={() => dispatch(openModal(item))}
              >
                Edit
              </button>
              <input
                type="checkbox"
                name=""
                id=""
                className="w-[30px] h-[30px]"
                onClick={() => dispatch(completedUser(item.id))}
              />
            </div>
          );
        })}
        {modal === true ? (
          <div className="w-[500px] h-[300px] absolute top-[50%] left-[30%] border-[1px] border-[red] bg-[green] rounded-[40px]">
            <span
              className="ml-[400px] text-[20px] cursor-pointer"
              onClick={() => dispatch(setModal())}
            >
              &times;
            </span>
            <form
              action=""
              className="flex justify-center items-center mt-[100px]"
              onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                dispatch(editUser(event))
              }
            >
              <input
                type="text"
                className="outline-none bg-[red] text-[#fff] placeholder:text-[#fff] p-[5px_30px] rounded-[30px]"
                value={text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setText(event.target.value))
                }
              />
              <button
                className="p-[6px_30px] bg-[#075964] text-[#fff] rounded-[30px] text-[16px]"
                type="submit"
              >
                Edit
              </button>
            </form>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default App;
