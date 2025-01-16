import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
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
import { Textarea } from "@/components/ui/textarea"
import { LoaderCircleIcon, PlusCircle } from "lucide-react"

type addEditNameSpacePropType = {
    mode: "edit"| "create"
    initialData?:NamespaceFormValues;
    loading: boolean;
    onSubmitHandler: (data:NamespaceFormValues) => void;
}

type NamespaceFormValues = z.infer<typeof namespaceSchema>;

const namespaceSchema = z.object({
    NameSpaceTitle: z.string().min(2, {
      message: "NameSpace Title must be at least 2 characters.",
    }),
    NameSpaceDescription: z.string().min(6, {
      message: "NameSpace Description must be at least 6 characters.",
    })
})

export function AddEditNameSpace ({mode, loading , initialData, onSubmitHandler}: addEditNameSpacePropType){
  console.log(initialData);
  
  // 1. Define your form.
  const form = useForm<z.infer<typeof namespaceSchema>>({
    resolver: zodResolver(namespaceSchema),
    defaultValues: {
     NameSpaceTitle: initialData?.NameSpaceTitle || "",
     NameSpaceDescription: initialData?.NameSpaceDescription || "" 
   },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof namespaceSchema>) {
   onSubmitHandler(values); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <FormField
          control={form.control}
          name="NameSpaceTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Name Space Title *</FormLabel>
              <FormControl>
                <Input 
                defaultValue={initialData?.NameSpaceTitle? initialData.NameSpaceTitle : ""} 
                placeholder="podcast" 
                {...field} />
              </FormControl>
              <FormDescription>
                This is your name space display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="NameSpaceDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name Space Description *</FormLabel>
              <FormControl>
                <Textarea 
                defaultValue={initialData?.NameSpaceDescription? initialData.NameSpaceDescription: ''}
                placeholder="all you account for podcast" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit"> 
         { loading ? <LoaderCircleIcon className="animate-spin"/> : <PlusCircle/> }
         { loading ? "creating." : "create." }
         </Button>
      </form>
    </Form>
  )  
}
 