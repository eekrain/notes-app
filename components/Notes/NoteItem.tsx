import React from "react";
import { ChecklistItem } from "@/lib/api";
import { Checkbox } from "../ui/checkbox";

type Props = ChecklistItem & {};

const NoteItem = (props: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={`${props.id}`} />
      <label
        htmlFor={`${props.id}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.name}
      </label>
    </div>
  );
};

export default NoteItem;
