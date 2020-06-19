import * as React from 'react';
import { Page } from './Page';

interface IPaginationProps {
  currentPageNumber: number;
  totalNumberOfPages: number;
  changeFunction: any;
}

export class Pagination extends React.Component<IPaginationProps, any> {

  public render(): any {

    let items = [];
    for (let i = 0; i < this.props.totalNumberOfPages; i++) {
      items.push(<Page
        key={'page' + i}
        currentPageNumber={this.props.currentPageNumber}
        pageNumber={i}
        changeFunction={this.props.changeFunction} />
      );
    }

    return (
      <div className="lr-pagination">
        {items}
      </div>
    );
  }
}
