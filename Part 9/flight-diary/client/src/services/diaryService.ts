import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

const getDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
    .catch(error => console.log(error));
}

const addDiary =  (newEntry: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, newEntry)
    .then(response => response.data)
    .catch(error => console.log(error)) 
}

export default { getDiaries, addDiary };