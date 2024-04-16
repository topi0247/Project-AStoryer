import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const InputText = (
  {
    control,
    name,
    label,
    rules,
    type = "text",
    autoComplete = "",
  }: {
    control: any;
    name: string;
    label: string;
    rules: object;
    type?: string;
    autoComplete?: string;
  },
  {}
) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          variant="outlined"
          autoComplete={autoComplete}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
        />
      )}
    />
  );
};
