import http from "./httpServices";
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/journals";
const getJournals = async () => {
  const { data: journals } = await http.get(apiEndPoint);
  return journals;
};

const getJournalById = async (id) => {
  const { data: journal } = await http.get(apiEndPoint + "/" + id);
  return journal;
};
const addJournal = async (journal, id) => {
  if (id) {
    await http.put(apiEndPoint + "/" + id, journal);
  } else {
    await http.post(apiEndPoint, journal);
  }
};

const deleteJournal = async (id) => {
  const { data: journal } = await http.delete(apiEndPoint + "/" + id);
  return journal;
};
const journalService = {
  getJournals: getJournals,
  addJournal,
  getJournalById,
  deleteJournal,
};

export default journalService;
