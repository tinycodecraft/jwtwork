import styled from '@emotion/styled';

export const ColorSquare = styled.div<{ color: string, isoverlay?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 50px;
  height: 50px;
  color: white;
  background-color: ${props => props.color};
  z-index: ${(props)=> props.isoverlay ? 999: 0};
  cursor: ${(props)=> props.isoverlay ? 'grabbing': 'pointer'};
  
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  `

export const Col = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #000;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
`

export const Box = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${props => props.color};
`;
