import { useContext, useEffect, useState } from "react";
import { addData, deleteData,streamDataList } from "../firestore";
import { AuthContext } from "../provider";
export const Main = () => {
  const [todoList, setTodoList] = useState([]);
  const {user} = useContext(AuthContext);
  // Triggers when App is started
  useEffect(() => {
    
      return streamDataList({
        path:"todos",
        query:(colRef,query,where)=>query(colRef, where("uid", "==", user.uid)),
        snapshot:((shots)=>{
        const data=  shots.docs.map(doc => ({...doc.data(),id:doc.id}));
        setTodoList(data);
        })
      });
  }, []);

  return (
    <>
      <div className="flex h-screen justify-center items-start">
        <div className="mt-32">
          <div className="flex justify-center items-center">
            <AddTodo />
          </div>
          {
            todoList.map((todo)=> <ListTile 
            key={todo.id} 
            todo={todo} 
            title={`${todo.title}`} 
            date={todo.createdAt?.toDate()?.toString()} 
            des={todo.des}
            id={todo.id}
            />
            )
            // todoList.map((todo)=>     <ListTile key={todo.id} id={todo.id} title={`${todo.title} -- ${todo.createdAt.toDate()}`} des={todo.des}/>)
            // todoList.map((todo)=>     <ListTile key={todo.id} title={'the title'} des={'the des'}/>)
          }
     
      

        </div>
      </div>
    </>
  );
};
function ListTile({title,des,date,id}) {
  const deleteTodo = () => {
    deleteData(`todos/${id}`)
      .catch((e) => {
        alert(e?.message);
      })
      .then(() => {

      });
  };
  return (
    
    <div className="card w-96 bg-base-100 shadow-xl">
            <button onClick={deleteTodo}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{des}</p>
        <p className="text-[10px]">{date??""}</p>
      </div>
    </div>
  );
}

const AddTodo = () => {
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState("Title");
  const [des, setDes] = useState("Description...");
  const addTodo = () => {
    addData("todos", { title, des,uid: user.uid })
      .catch((e) => {
        alert(e?.message);
      })
      .then(() => {
        document.getElementById("closeTodo").click();
      });
  };
  return (
    <>
      {" "}
      <button
        className="btn btn-neutral w-full"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add task
      </button>
      
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="closeTodo"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="px-3 pt-5">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>
            <button className="btn btn-neutral w-full" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
