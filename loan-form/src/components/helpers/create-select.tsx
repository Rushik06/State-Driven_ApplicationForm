interface SelectFieldProps<T extends string> {
  options: readonly T[];
  value: T | '';
  onChange: (value: T | null) => void;
}

export function SelectField<T extends string>({
  options,
  value,
  onChange
}: SelectFieldProps<T>) {
  return (
    <select
      value={value}
      onChange={e =>
        onChange(e.target.value ? (e.target.value as T) : null)
      }
    >
      <option value="">-- Select --</option>
      {options.map(o => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}