export function InputWrapper({ error = {}, children }) {
  return (
    <div className="flex flex-col mb-1">
      {children}
      <div className="text-red-500 text-sm w-full h-1 pl-2">
        {error.message || ' '}
      </div>
    </div>
  );
}
