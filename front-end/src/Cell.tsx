import React from 'react';
import { Cell } from './game';

interface Props {
  cell: Cell
}

class BoardCell extends React.Component<Props> {
  render(): React.ReactNode {
    const { cell } = this.props;
    const playable = cell.playable ? 'playable' : '';
    const textClass = cell.text === 'X' ? 'cell-X' : cell.text === 'O' ? 'cell-O' : '';
    return (
      <div className={`cell ${playable} ${textClass}`}>
        {cell.text}
      </div>
    )
  }
}

export default BoardCell;
