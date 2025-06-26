import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm(" are you sure you want to delete the note")) return;
    const deletePost = await api.delete(`/notes/${id}`);
    console.log("hello user find the delete post", deletePost);
    if (deletePost.status == 200) {
      toast.success("Note deleted successfully");
      //to refresh the page
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1000);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-300 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon />
            <button
              className="btn btn-ghost text-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
