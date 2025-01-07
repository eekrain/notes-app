import { API_getChecklist } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import NoteItem from "./NoteItem";

type Props = {};

const NotesList = (props: Props) => {
  const { user } = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: ["notesList"],
    queryFn: () => API_getChecklist(user?.token || ""),
  });

  if (data?.data && data?.data?.length > 0) {
    return (
      <div className="mt-8">
        <div className="grid grid-cols-3">
          {data?.data?.map((item) => (
            <NoteItem {...item} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <p className="text-center"> There is no notes to show</p>
    </div>
  );
};

export default NotesList;
