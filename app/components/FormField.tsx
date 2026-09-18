interface FormFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  defaultValue?: string
  error?: string
}

const FormField = ({
  label,
  name,
  type = 'text',
  required,
  defaultValue,
  error,
}: FormFieldProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label>
        {label}
        <input
          type={type}
          name={name}
          required={required}
          defaultValue={defaultValue}
          className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
        />
      </label>
      {error && <p className='text-[var(--danger)]'>{error}</p>}
    </div>
  )
}

export default FormField
