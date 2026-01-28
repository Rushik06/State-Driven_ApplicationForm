interface InputFieldProps {
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (value: string) => void;
}

export function InputField({ type, value, onChange }: InputFieldProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}