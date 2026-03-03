import { useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { toast } from "react-toastify";
import Error from "./Error";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../store/store";

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DraftPatient>();

  const { patients, addPatient, updatePatient, editingId } = usePatientStore(
    useShallow((state) => ({
      patients: state.patients,
      addPatient: state.addPatient,
      updatePatient: state.updatePatient,
      editingId: state.editingId,
    })),
  );

  const registerPatient = (data: DraftPatient) => {
    if (editingId) {
      updatePatient({
        id: editingId,
        ...data,
      });
      toast("Paciente actualizado correctamente", {
        type: "success",
      });
    } else {
      addPatient(data);
      toast("Paciente registrado correctamente", {
        type: "success",
      });
    }

    reset();
  };

  const selectedPatient = editingId
    ? patients.find((patient) => patient.id === editingId)
    : null;

  if (selectedPatient) {
    setValue("name", selectedPatient.name);
    setValue("caretaker", selectedPatient.caretaker);
    setValue("email", selectedPatient.email);
    setValue("date", selectedPatient.date);
    setValue("symptoms", selectedPatient.symptoms);
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className={`w-full p-3 border ${errors.name ? "border-red-600" : "border-gray-100"}`}
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del paciente es obligatorio",
            })}
          />

          <Error message={errors.name?.message} />
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className={`w-full p-3 border ${errors.caretaker ? "border-red-600" : "border-gray-100"}`}
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El nombre del propietario es obligatorio",
            })}
          />
          <Error message={errors.caretaker?.message} />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className={`w-full p-3 border ${errors.email ? "border-red-600" : "border-gray-100"}`}
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El email es inválido",
              },
            })}
          />
          <Error message={errors.email?.message} />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className={`w-full p-3 border ${errors.date ? "border-red-600" : "border-gray-100"}`}
            type="date"
            {...register("date", {
              required: "La fecha de alta es obligatoria",
            })}
          />
          <Error message={errors.date?.message} />
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className={`w-full p-3 border ${errors.symptoms ? "border-red-600" : "border-gray-100"}`}
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "Los síntomas son obligatorios",
            })}
          ></textarea>
          <Error message={errors.symptoms?.message} />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
}
