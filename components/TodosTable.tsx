import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  import { ITodo } from "@/interfaces";
  import TodosTableActions from "./TodosTableActions";
  import { Badge } from "./ui/badge";
  import moment from "moment";
  
  export default function TodosTable({ todos }: { todos: ITodo[] }) {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead> 
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {todos.map((todo , index) => (
            <TableRow key={todo?.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className={todo.completed ? "line-through" : ""}>{todo?.title}</TableCell>
                <TableCell>
                  {todo?.completed ? <Badge>Completed</Badge> : <Badge variant="secondary">Uncompleted</Badge>}
                </TableCell>
                <TableCell>{moment(todo.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell className="items-center justify-start space-x-2">
                  <TodosTableActions todo={todo} />
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">{!todos.length ? "YOU DON'T HAVE ANY TODO YET!" : todos.length}</TableCell>
          </TableRow>
      </TableFooter>
      </Table>
    )
  }
  