import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Dropdown, Text } from '../../../../components';
import {
  FunctionWithMouseEvent,
  FunctionWithoutParamsT,
} from '../../../../types';
import styles from './styles.module.css';
import { icons } from '../../../../data';
import { useOnClickOutside } from '../../../../utils/useOnClickOutside';

type Props = {
  initValue: string;
  onChangeIcon: (value: string) => void;
  onStartEditDropdown: FunctionWithoutParamsT;
};

export const EditDropdown: FC<Props> = ({
  initValue,
  onChangeIcon,
  onStartEditDropdown,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [tempValue, setTempValue] = useState(initValue);
  const dropdownRef = useRef<HTMLElement>() as RefObject<HTMLDivElement>;

  useEffect(() => {
    setTempValue(initValue);
  }, [initValue]);

  useEffect(() => {
    handleSubmitValue();
  }, [tempValue]);

  const enableEditMode = () => {
    setEditMode(true);
    onStartEditDropdown();
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const handleIconChange: FunctionWithMouseEvent = (event) => {
    const newIcon = (event.target as HTMLElement)?.innerText;

    if (icons.indexOf(newIcon) < 0) return;
    setTempValue(newIcon);
  };

  const handleSubmitValue = () => {
    disableEditMode();
    if (tempValue) {
      onChangeIcon(tempValue);
    }
  };

  useOnClickOutside(dropdownRef, disableEditMode);

  return (
    <div className={styles['edit-on-place-dropdown']}>
      {!isEditMode && (
        <>
          <Avatar userIcon={initValue} />
          <Button
            className={styles.button}
            asIcon={true}
            onClick={enableEditMode}
          >
            ✏️
          </Button>
        </>
      )}

      {isEditMode && (
        <>
          <Text className={styles['icon-editing']}>{initValue}</Text>
          <Dropdown ref={dropdownRef} onClick={handleIconChange} />
        </>
      )}
    </div>
  );
};
