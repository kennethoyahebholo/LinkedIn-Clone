const FormInput = ({ ...inputProps }) => {
	const { labelName, labelClass } = inputProps;
	//delete lable properties
	if (inputProps?.labelName) delete inputProps.labelName;
	if (inputProps?.labelClass) delete inputProps.labelClass;

	return (
		<>
			{labelName && <label className={labelClass}>{labelName}</label>}

			<input {...inputProps} />
		</>
	);
};
   
export default FormInput;