import { create } from "zustand";
import type { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
  patients: Patient[];
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
  return { id: uuidv4(), ...patient };
};

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
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
}));
