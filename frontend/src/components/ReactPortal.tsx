'use client';

import ReactDOM from 'react-dom';

interface Props {
  containerId?: string;
  children: React.ReactNode;
}

export default function ReactPortal({
  containerId = 'portal-root',
  children,
}: Props) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}
