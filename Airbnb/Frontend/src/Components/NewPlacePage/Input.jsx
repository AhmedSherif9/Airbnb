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
    return "w-full rounded-full border border-gray-200 px-3 py-1.5 dark:bg-gray-800";
  };

  const textAreaClasses = () => {
    return "w-full rounded-2xl border border-gray-200 px-3 py-1.5 dark:bg-gray-800";
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
                value: required,
                message: `${registerName} is required`,
              },
            })}
            type={inputType}
            {...(inputType === "number" &&
              header.includes("Check") && { min: "1", max: "24" })}
            {...(inputType === "number" &&
              (header.includes("Price") || header.includes("guests")) && {
                min: "0",
              })}
            className={inputClasses()}
          />
        ) : (
          <textarea
            {...register(registerName, {
              required: {
                value: required,
                message: `${registerName} is required`,
              },
            })}
            rows="5"
            className={textAreaClasses()}
          />
        )}
      </label>
      <p className={errorClasses()}>
        {errors[registerName] ? `*${errors[registerName].message}` : ""}
      </p>
    </div>
  );
};

export default Input;
