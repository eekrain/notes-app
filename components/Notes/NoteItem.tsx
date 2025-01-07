import React from "react";
import { ChecklistItem } from "@/lib/api";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FaTrash } from "react-icons/fa";

type Props = ChecklistItem & {
  deleteNote: (id: number) => Promise<void>;
};

const NoteItem = (props: Props) => {
  return (
    <Card className="pt-6">
      <CardContent className="flex justify-between items-center">
        <p>{props.name}</p>
        <Button onClick={async () => props.deleteNote(props.id)} size={"icon"}>
          <FaTrash />
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoteItem;
