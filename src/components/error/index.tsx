import React from 'react';

interface ErrorProps {
  error: string,
}

export const Error: React.FC<ErrorProps> = ({
  error
}) => {
  if (!error) {
    return null;
  }

  return (
    <div>
      {error}
    </div>
  )
}
