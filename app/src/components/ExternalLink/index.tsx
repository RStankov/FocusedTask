import * as React from 'react';
import { openURI } from 'utils/electron';

interface IProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  title?: string;
}

export default function ExternalLink({ children, ...props }: IProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={e => {
        e.preventDefault();
        openURI(props.href);
      }}>
      {children}
    </a>
  );
}
