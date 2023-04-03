import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { Button, Modal, NumberInput } from "@mantine/core";
import { Operation } from "../../stats/operation";

export interface InputModalRef {
  open: (operation: Operation<Record<string, number>>, onSubmit: (values: Record<string, number>) => void) => void;
}

const InputModal = forwardRef((props, ref: Ref<InputModalRef>) => {
  const [opened, setOpened] = useState(false);
  const [formLabels, setFormLabels] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, number>>({});
  const onSubmitRef = React.useRef<(values: Record<string, number>) => void>();
  useImperativeHandle(ref, () => ({
    open: (operation, onSubmit) => {
      setFormLabels(operation.keys);
      setOpened(true);
      onSubmitRef.current = onSubmit;
    }
  }));

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Additional Inputs" size={"md"} centered>
      {formLabels.map((formLabel, index) => (
        <NumberInput key={index} label={formLabel} precision={4} onChange={(value) => {
          const newValues = { ...formValues };
          newValues[formLabel] = value as number || 0;
          setFormValues(newValues);
        }} />
      ))}
      <Button onClick={() => {
        setOpened(false);
        onSubmitRef.current(formValues);
      }} color="green" mt={"md"}>Submit</Button>
    </Modal>
  );
});
InputModal.displayName = "InputModal";
export default InputModal;