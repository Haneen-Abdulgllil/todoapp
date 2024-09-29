"use server";

import { PrismaClient } from "@prisma/client";
import { ITodo } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { toast } from 'react-toastify';

const prisma = new PrismaClient();

    export const getUserTodoListAction = async ({ userId }: { userId: string | null }) : Promise<Array<ITodo>> =>  {
        try {
            return await prisma.todo.findMany({
              where: {
                user_id: userId as string,
              },
              orderBy: {
                createdAt: "desc",
              },
            });
        } catch (error) {
        throw new Error("Something went wrong");
        }
    };
  

    export const createTodoAction = async ({
        title,
        body,
        completed,
        userId,
      }: {
        title: string;
        body?: string | undefined;
        completed: boolean;
        userId: string | null;
      }) : Promise<void> => {
        try {
          await prisma.todo.create({
            data: {
              title,
              body,
              completed,
              user_id: userId as string,
            },
          });
      
          revalidatePath("/");
        } catch (error) {
          throw new Error("Something went wrong");
        }
      };

      export const deleteTodoAction = async ({ id }: { id: string }) : Promise<void> => {
        // try {
          await prisma.todo.delete({
            where: {
              id,
            },
          });
      
          revalidatePath("/");
      
          // Trigger the toast notification
        //   toast.success('Todo deleted successfully!');
        // } catch (error) {
        //   toast.error('Error deleting todo');
        // }
      };


    export const updateTodoAction = async ({ id, title, body, completed }: ITodo): Promise<void>  => {
      try {
        await prisma.todo.update({
          where: {
            id,
          },
          data: {
            title,
            body,
            completed,
          },
        });
    
        revalidatePath("/");
      } catch (error) {
        throw new Error("Something went wrong");
      }
    };
