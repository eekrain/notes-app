import React, { useContext, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { CreateChecklistForm, createChecklistSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_createChecklist } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider";
import { toast } from "sonner";

type Props = {};

const CreateNotes = (props: Props) => {
  const { user } = useContext(AuthContext);
  const query = useQueryClient();
  const form = useForm<CreateChecklistForm>({
    resolver: zodResolver(createChecklistSchema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["signup"],
    mutationFn: API_createChecklist,
  });

  const [open, setOpen] = useState(false);

  async function onSubmit(values: CreateChecklistForm) {
    const result = await mutateAsync({
      token: user?.token || "",
      input: values,
    });

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      query.invalidateQueries({
        queryKey: ["notesList"],
      });
    }
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Type in your notes you want to write</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama checklist</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Nama checklist"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mx-auto" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotes;
