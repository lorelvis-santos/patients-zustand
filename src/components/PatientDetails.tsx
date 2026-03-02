import type { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";

type PatientDetailsProps = {
  patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailsProps) {
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
    </div>
  );
}
