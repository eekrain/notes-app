import React from "react";
import CreateNotes from "./CreateNotes";
import NotesList from "./NotesList";

type Props = {};

const NotesHome = (props: Props) => {
  return (
    <div className="container">
      <CreateNotes />
      <NotesList />
    </div>
  );
};

export default NotesHome;
