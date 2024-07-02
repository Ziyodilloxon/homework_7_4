import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormCheckbox from "../components/FormCheckbox";
import { useEffect } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  return { title, completed };
};

function Home() {
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "todos", id)).then(() => {
      toast.success("Deleted Success");
    });
  };

  const userData = useActionData();
  const { user } = useSelector((state) => state.user);
  const { data: todos } = useCollection("todos", ["uid", "==", user.uid]);

  useEffect(() => {
    if (userData) {
      const newDoc = { ...userData, uid: user.uid };
      addDoc(collection(db, "todos"), newDoc).then(() => {
        toast.success("Added Success");
      });
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Add New Task
              </h3>
              <Form method="post" className="space-y-4">
                <FormInput type="text" label="Add Task" name="title" />
                <FormCheckbox name="completed" />
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Add
                </button>
              </Form>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Tasks
              </h3>
              {todos &&
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex justify-between items-center border-b-2 border-gray-200 py-4"
                  >
                    <h3 className="text-lg text-gray-900">{todo.title}</h3>
                    <button
                      onClick={() => deleteItem(todo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
