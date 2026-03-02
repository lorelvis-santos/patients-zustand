import { useShallow } from "zustand/shallow";
import { usePatientStore } from "../store/store";
import type { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";

type PatientDetailsProps = {
  patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailsProps) {
  const { deletePatient, setEditingId } = usePatientStore(
    useShallow((state) => ({
      deletePatient: state.deletePatient,
      setEditingId: state.setEditingId,
    })),
  );

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="Id" content={patient.id} />
      <PatientDetailItem label="Nombre" content={patient.name} />
      <PatientDetailItem label="Propietario" content={patient.caretaker} />
      <PatientDetailItem label="Email" content={patient.email} />
      <PatientDetailItem
        label="Fecha de alta"
        content={patient.date.toString()}
      />
      <PatientDetailItem label="Síntomas" content={patient.symptoms} />

      <div className="flex flex-col lg:flex-row gap-3 mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer text-white font-bold uppercase rounded lg"
          onClick={() => setEditingId(patient.id)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 transition-colors cursor-pointer text-white font-bold uppercase rounded lg"
          onClick={() => deletePatient(patient.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
