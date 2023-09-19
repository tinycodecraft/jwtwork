import { type FC } from "react";
import styled from "@emotion/styled";
import type { ColorType } from "../../fragments/types";

import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from "@dnd-kit/core";

import { Item } from '../../fragments';
import { SortableItem } from './sortable-item';

const List = styled.ul`
  min-width: 200px;
  padding: 20px 10px;
  border: 1px solid black;
  border-radius: 5px;
  list-style-type: none;
`

interface Props {
  items: ColorType[]
  width?: string;
}

export const ColorPallette: FC<Props> = ({ items, width }) => {

  const { setNodeRef } = useDroppable({ id: "pallette", })

  return <SortableContext
    items={items.map((item) => item.id)}
    strategy={rectSortingStrategy}>
    <List ref={setNodeRef}>
      {items.map(({ id, color }) => <Item key={id}>
        <SortableItem color={color} id={id} />
      </Item>)}
    </List>
  </SortableContext>
}