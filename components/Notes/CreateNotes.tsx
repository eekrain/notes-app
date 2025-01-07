import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = {};

const CreateNotes = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Note</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Type in your notes you want to write</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <p>test</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotes;
