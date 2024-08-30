const Input = ({
  header,
  Subheading,
  registerName,
  labelClasses,
  inputClasses,
  errorClasses,
  register,
  errors,
  inputFlag,
  required,
}) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label className={labelClasses()}>
        <h1 className="text-xl">{header}</h1>
        <p className="text-sm text-gray-500">{Subheading}</p>
        {inputFlag ? (
          <input
            {...register(registerName, {
              required: {
                value: true,
                message: `${registerName} is required`,
              },
            })}
            type="text"
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
            className={inputClasses()}
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
