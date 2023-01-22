import React, { useEffect, useState, ReactNode } from 'react';
import { TODO_ANY } from '../types';

type FTValue = string | boolean | number;
type FeatureToggles = Record<string, FTValue>;

export type FeatureToggleProps = {
  children: ReactNode;
  featureToggles?: FeatureToggles;
};

const getParamsByNameFromUrl = (
  href: TODO_ANY,
  paramName: string,
  value: boolean
) => {
  const query = new URL(href).searchParams;

  return new URLSearchParams(query).getAll(paramName).reduce((acc, curr) => {
    return { ...acc, [curr]: value };
  }, {});
};

const Ctx = React.createContext<TODO_ANY>({});

export const FeatureToggleProvider: React.FC<FeatureToggleProps> = ({
  children,
  featureToggles: initialToggles,
}) => {
  const [featureToggles, setFeatureToggles] = useState(initialToggles || {});

  useEffect(() => {
    const enabledFeaturesFromUrl = getParamsByNameFromUrl(
      window.location.href,
      'feature_on',
      true
    );
    const disabledFeaturesFromUrl = getParamsByNameFromUrl(
      window.location.href,
      'feature_off',
      false
    );

    const tgls = {
      ...initialToggles,
      ...enabledFeaturesFromUrl,
      ...disabledFeaturesFromUrl,
    };

    setFeatureToggles(tgls);
  }, []);

  return <Ctx.Provider value={featureToggles}>{children}</Ctx.Provider>;
};

/**
 * @example
 * // enable feature in URL
 * domain/game?feature_on=teams
 * @example
 * // disable feature in URL
 * domain/game?feature_off=teams
 */
export function useFeatureToggles<T>(): T {
  return React.useContext<T>(Ctx);
}
