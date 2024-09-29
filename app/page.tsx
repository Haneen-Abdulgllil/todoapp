
import AddTodoForm from "@/components/AddTodoForm";
import TodosTable from "@/components/TodosTable";
import { getUserTodoListAction } from "@/actions/todo.actions";
import { auth } from "@clerk/nextjs/server";
// import { ToastProvider } from '@/components/ToastProvider';

export default async function Home() {

  const { userId } = await auth();
  const todos = await getUserTodoListAction({ userId });
 

  return (
    <main className="container">
        <div className="mx-auto flex w-full lg:w-3/4 flex-col justify-center space-y-4 mt-10">

          {/* <ToastProvider /> */}
         
          <AddTodoForm userId={userId}/>
          <TodosTable todos={todos}/>
        
      </div>

    </main>
  );
}
