import React from 'react';
import { noop } from 'lodash/fp';

export const StoreContext = React.createContext({
    dispatch: noop,
    getState: () => {
        return {
            teamState: {}
        }
    }
});
