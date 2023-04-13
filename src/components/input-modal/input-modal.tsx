import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Button, Checkbox, ColorInput, Modal, NumberInput, TextInput } from "@mantine/core";
import { TypedOperation } from "../../stats/operation";

export interface InputModalRef {
  open: (operation: TypedOperation<Record<string, never>>, onSubmit: (values: Record<string, never>) => void) => void;
}

const InputModal = forwardRef((props, ref: Ref<InputModalRef>) => {
  const [opened, setOpened] = useState(false);
  const [formInputs, setFormInputs] = useState<Record<string, "Number" | "Text" | "Checkbox" | "Color">>({});
  const [formValues, setFormValues] = useState<Record<string, number | boolean | string>>({});
  const onSubmitRef = React.useRef<(values: Record<string, number | boolean | string>) => void>();
  useImperativeHandle(ref, () => ({
    open: (operation, onSubmit) => {
      setFormInputs(operation.keys);
      setOpened(true);
      onSubmitRef.current = onSubmit;
    }
  }));

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Additional Inputs" size={"md"} centered>
      {Object.entries(formInputs).map(([key, type]) => {
        if (type === "Number") {
          return (
            <NumberInput key={key} label={key} precision={4} onChange={(value) => {
              const newValues = { ...formValues };
              newValues[key] = value as number || 0;
              setFormValues(newValues);
            }} />
          );
        }
        if (type === "Text") {
          return (
            <TextInput key={key} label={key} onChange={(event) => {
              const newValues = { ...formValues };
              newValues[key] = event.currentTarget.value;
              setFormValues(newValues);
            }} />
          );
        }
        if (type === "Checkbox") {
          return (
            <Checkbox key={key} label={key} onChange={(event) => {
              const newValues = { ...formValues };
              newValues[key] = event.currentTarget.checked;
              setFormValues(newValues);
            }}/>
          );
        }
        if (type === "Color") {
          return (
            <ColorInput key={key} label={key} onChange={(value) => {
              const newValues = { ...formValues };
              newValues[key] = value;
              setFormValues(newValues);
            }} />
          );
        }
      })}
      <Button onClick={() => {
        setOpened(false);
        onSubmitRef.current(formValues);
      }} color="green" mt={"md"}>Submit</Button>
    </Modal>
  );
});
InputModal.displayName = "InputModal";
export default InputModal;