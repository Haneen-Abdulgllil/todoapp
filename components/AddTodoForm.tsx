"use client";
import { createTodoAction } from "@/actions/todo.actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoFormValues, todoFormSchema } from "@/schema";
import Spinner from "./Spinner";
import React, { useState } from "react";



const AddTodoForm = ({ userId }: { userId: string | null }) =>{

    const defaultValues: Partial<TodoFormValues> = {
        title: "",
        body: "",
        completed: false,
    }; 

    const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const onSubmit = async ({ title, body, completed }: TodoFormValues) => {
        setLoading(true);
        await createTodoAction({ title, body, completed, userId});
        setLoading(false);
        setOpen(false);
      };

      const [loading, setLoading] = useState(false);
      const [open, setOpen] = useState(false);

    return(
        <div> 
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className="ml-auto">
                    <Button>
                    <Plus size={14} className="mr-1" />
                    New Todo
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Add a new Todo</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                <Input placeholder="Go to gym" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                                </FormControl>
                                <FormDescription>You can write a short description about your next todo.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel>Completed</FormLabel>
                                </div>
                                <FormDescription>
                                Your to-do item will be uncompleted by default unless you checked it.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="space-x-2" disabled={loading}>
                            {loading ? (
                            <>
                                <Spinner /> Saving
                            </>
                            ) : (
                            "Save"
                            )}
                        </Button>
                        </form>
                    </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );

};

export default AddTodoForm