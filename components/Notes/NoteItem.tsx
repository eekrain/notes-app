import React from "react";
import { ChecklistItem } from "@/lib/api";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent } from "../ui/card";

type Props = ChecklistItem & {};

const NoteItem = (props: Props) => {
  return (
    <Card className="pt-6">
      <CardContent>
        <div>
          <Checkbox id={`${props.id}`} />
          <label
            htmlFor={`${props.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-4"
          >
            {props.name}
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
