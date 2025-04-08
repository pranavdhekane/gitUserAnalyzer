"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import Navigation from "./Navigation"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function UserForm() {
  const [description, setDescription] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username.trim();
  
    try {
      setDescription("Fetching info...")
      const res = await fetch(`https://api.github.com/users/${username}`);
      
      if (res.status === 404) {
        setDescription("GitHub username not found.");
        return;
      }
  
      if (!res.ok) {
        setDescription("Something went wrong. Please try again.")
        return;
      }
  
      const data = await res.json();
      navigate("/details", { state: { userData: data } });
    } catch (error) {
      console.error("Error fetching user:", error);
      setDescription("Network error.")
    }
  }
  

  return (
  <div>
    <Navigation/>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border-2 rounded-xl p-10 w-auto sm:w-120 m-5">
        <h1 className="text-3xl font-semibold text-center ">GitHub User Analyzer</h1>
        <hr className="border"/>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter git username : </FormLabel>
              <FormControl>
                <Input placeholder="example : pranavdhekane" {...field} className="text-white border-2"/>
              </FormControl>
              <FormMessage />
              <FormDescription>
              {description}
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="text-green-700">Submit</Button>
      </form>
    </Form>
  </div>
  )
}
