import { API_deleteChecklist, API_getChecklist } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import NoteItem from "./NoteItem";
import { toast } from "sonner";

type Props = {};

const NotesList = (props: Props) => {
  const query = useQueryClient();
  const { user } = useContext(AuthContext);
  const { data } = useQuery({
    queryKey: ["notesList"],
    queryFn: () => API_getChecklist(user?.token || ""),
    retry: true,
  });

  useEffect(() => {
    query.invalidateQueries({
      queryKey: ["notesList"],
    });
  }, [user]);

  const { mutateAsync } = useMutation({
    mutationFn: API_deleteChecklist,
  });

  const deleteNote = async (id: number) => {
    const result = await mutateAsync({
      token: user?.token || "",
      id,
    });

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      query.invalidateQueries({
        queryKey: ["notesList"],
      });
    }
  };

  if (data?.data && data?.data?.length > 0) {
    return (
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          {data?.data?.map((item) => (
            <NoteItem key={item.id} deleteNote={deleteNote} {...item} />
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
