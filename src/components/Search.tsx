import * as React from 'react';

interface ISearchProps {
  onSearch: any;
  dataLoaded: boolean;
}

export class Search extends React.Component<ISearchProps, any> {
  public render(): any {
    return (
      <div className="lr-search">
        <input
          type="search"
          className="lr-search-input"
          placeholder="Search for users"
          onChange={this.props.onSearch}
          disabled={!this.props.dataLoaded}
        />
      </div>
    );
  }
}
