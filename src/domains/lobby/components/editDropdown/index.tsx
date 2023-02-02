import React, { FC, useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Text } from '../../../../components';
import { useTranslation } from 'react-i18next';
import { FunctionWithoutParamsT } from '../../../../types';
import styles from './styles.module.css';

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
  const { t } = useTranslation();

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

  const handleIconChange = (event: React.MouseEvent<HTMLElement>) => {
    setTempValue((event.target as HTMLElement)?.innerText ?? '');
  };

  const handleSubmitValue = () => {
    disableEditMode();
    if (tempValue) {
      onChangeIcon(tempValue);
    }
  };

  return (
    <div className={styles['edit-on-place-dropdown']}>
      {!isEditMode && (
        <>
          <Avatar userIcon={initValue} />
          <Button
            className={styles.button}
            isIcon={true}
            onClick={enableEditMode}
          >
            {t('edit')}
          </Button>
        </>
      )}

      {isEditMode && (
        <>
          <Text className={styles['icon-editing']}>{initValue}</Text>
          <Dropdown onClick={handleIconChange} />
          {/* <Button className={styles.button} onClick={handleSubmitValue}>
            {t('submit')}
          </Button> */}
        </>
      )}
    </div>
  );
};
