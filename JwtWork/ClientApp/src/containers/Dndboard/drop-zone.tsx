import { type FC, type ReactNode } from 'react';
import { useDroppable,type UniqueIdentifier } from '@dnd-kit/core';

export const DropZone: FC<{ children: ReactNode, id: UniqueIdentifier }> = ({ children, id }) => {
  const { setNodeRef, isOver } = useDroppable({ id })

  const style = {
    listStyleType: 'none',
    border: '1px solid red',
    backgroundColor: isOver ? 'grey' : 'inherit',
  };

  return (
    <ul ref={setNodeRef} style={style}>
      {children}
    </ul>
  );
}