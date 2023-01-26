import React, { FC, useRef, useEffect, useState, Fragment } from 'react';
import { Button, Text, Field } from '../../../../components';
import { FunctionWithoutParamsT } from '../../../../types';

type Props = {
  initValue: string;
  placeholder: string;
  onChangeValue: (value: string) => void;
  onStartEditField: FunctionWithoutParamsT;
};

export const EditOnPlaceField: FC<Props> = ({
  initValue,
  placeholder,
  onChangeValue,
  onStartEditField,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tempValue, setTempValue] = useState(initValue);

  useEffect(() => {
    setTempValue(initValue);
  }, [initValue]);

  const inputNode = useRef<HTMLInputElement>(null);

  const enableEditMode = () => {
    setEditMode(true);
    onStartEditField();
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const handleChangeInput = () => {
    setTempValue(inputNode?.current?.value ?? '');
  };

  const handleSubmitValue = () => {
    disableEditMode();
    onChangeValue(tempValue);
  };

  return (
    <div>
      {!isEditMode && (
        <Fragment>
          <Text>{initValue}</Text>
          <Button isIcon={true} onClick={enableEditMode}>
            Edit
          </Button>
        </Fragment>
      )}

      {isEditMode && (
        <Fragment>
          <div>
            <Field
              inputNode={inputNode}
              placeholder={placeholder}
              type='text'
              value={tempValue}
              autoFocus
              onChange={handleChangeInput}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
          <Button onClick={handleSubmitValue}>Submit</Button>
        </Fragment>
      )}
    </div>
  );
};
