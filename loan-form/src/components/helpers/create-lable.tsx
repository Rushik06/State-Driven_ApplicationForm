interface LabelProps {
  text: string;
  htmlFor?: string;
}

export function Label({ text, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor}>
      {text}
    </label>
  );
}