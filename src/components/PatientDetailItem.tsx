type PatientDetailItemProps = {
  label: string;
  content: string;
};

export default function PatientDetailItem({
  label,
  content,
}: PatientDetailItemProps) {
  return (
    <p className="font-bold mb-3 text-gray-700">
      {label}: {""}
      <span className="font-normal">{content}</span>
    </p>
  );
}
