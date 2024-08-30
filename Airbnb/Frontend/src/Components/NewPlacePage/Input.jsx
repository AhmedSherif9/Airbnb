const Input = ({
  header,
  Subheading,
  registerName,
  register,
  errors,
  inputFlag,
  inputType,
  required,
  headersExist,
}) => {
  const labelClasses = () => {
    return "flex flex-col gap-1";
  };

  const inputClasses = () => {
    return "w-full rounded-full border border-gray-200 px-3 py-1.5";
  };

  const textAreaClasses = () => {
    return "w-full rounded-2xl border border-gray-200 px-3 py-1.5";
  };

  const errorClasses = () => {
    return "text-error text-sm";
  };

  return (
    <div className="flex flex-col gap-0.5">
      <label className={labelClasses()}>
        {headersExist ? (
          <>
            <h1 className="text-xl">{header}</h1>
            <p className="text-sm text-gray-500">{Subheading}</p>
          </>
        ) : (
          <span>{header}</span>
        )}
        {inputFlag ? (
          <input
            {...register(registerName, {
              required: {
                value: true,
                message: `${registerName} is required`,
              },
            })}
            type={inputType}
            className={inputClasses()}
          />
        ) : (
          <textarea
            {...register(registerName, {
              required: {
                value: true,
                message: `${registerName} is required`,
              },
            })}
            rows="5"
            className={textAreaClasses()}
          />
        )}
      </label>
      {required && (
        <p className={errorClasses()}>
          {errors[registerName] ? `*${errors[registerName].message}` : ""}
        </p>
      )}
    </div>
  );
};

export default Input;
