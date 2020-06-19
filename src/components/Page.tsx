import * as React from 'react';

interface IPageProps {
  currentPageNumber: number;
  pageNumber: number;
  changeFunction: any;
}

export class Page extends React.Component<IPageProps, any> {

  public isActivePage() {
    return this.props.currentPageNumber === this.props.pageNumber;
  }

  public renderedPageNumber() {
    return this.props.pageNumber + 1;
  }

  public click = () => {
    this.props.changeFunction(this.props.pageNumber);
  }

  public render(): any {
    return (
      <div className={'lr-page-item-link' + (this.isActivePage() ? ' lr-page-item-link--active' : '')} onClick={this.click} >{this.renderedPageNumber()}</div>
    );
  }
}
