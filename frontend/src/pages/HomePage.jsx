import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import axios from "axios";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NoteNOtFound from "../components/NoteNOtFound";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error in fetching data");
        if (error.response.status == 429) {
          setIsRatelimited(true);
        } else {
          toast.error("Failed to load the notes");
        }
      } finally {
        setIsloading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && (
          <div className="text-center text-primary py-10">
            bhaiyaji 🔫loading...
          </div>
        )}
        {(notes.length === 0 || isRateLimited) && <NoteNOtFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
