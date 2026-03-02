import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
  patients: Patient[];
  editingId: Patient["id"] | null;
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  setEditingId: (id: Patient["id"] | null) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
  return { id: uuidv4(), ...patient };
};

export const usePatientStore = create<PatientState>()(
  devtools((set) => ({
    patients: [],
    editingId: null,
    addPatient: (data: DraftPatient) => {
      set((state) => ({
        patients: [...state.patients, createPatient(data)],
      }));
    },
    deletePatient: (id: Patient["id"]) => {
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      }));
    },
    setEditingId: (id: Patient["id"] | null) => {
      set(() => ({ editingId: id }));
    },
  })),
);
