import React, { useEffect, useState } from "react";
import JournalCard from "../components/JournalCard";
import Loader from "../components/Loader";
import journalService from "../services/journalsServices";
import { toast } from "react-toastify";
import Info from "../components/Info";

const Journals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [journals, setJournals] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const data = await journalService.getJournals();
        setIsLoading(false);
        setJournals(data);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          console.log(ex);
        }
      }
    }
    getData();
  }, []);
  const handleDelete = async (e, id) => {
    try {
      setJournals(journals.filter((journal) => journal._id !== id));
      await journalService.deleteJournal(id);
      toast.success("Journal deleted successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
      } else {
        setIsLoading(true);
        console.log(ex.response.data);
      }
    }
  };
  return (
    <div className="journalsContainer">
      {isLoading ? (
        <Loader />
      ) : journals.length === 0 ? (
        <Info />
      ) : (
        journals.map((journal, key) => (
          <JournalCard key={key} {...journal} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};
export default Journals;
