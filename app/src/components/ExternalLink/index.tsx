import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function ExternalLink({ children, ...props }: IProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
