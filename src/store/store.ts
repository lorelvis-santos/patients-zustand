import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
  patients: Patient[];
  editingId: Patient["id"] | null;
  addPatient: (data: DraftPatient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: Patient["id"]) => void;
  setEditingId: (id: Patient["id"] | null) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
  return { id: uuidv4(), ...patient };
};

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        editingId: null,
        addPatient: (data: DraftPatient) => {
          set((state) => ({
            patients: [...state.patients, createPatient(data)],
          }));
        },
        updatePatient: (patient: Patient) => {
          set((state) => ({
            patients: state.patients.map((p) =>
              p.id === patient.id ? patient : p,
            ),
            editingId: null,
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
      }),
      {
        name: "patient-storage",
      },
    ),
  ),
);
