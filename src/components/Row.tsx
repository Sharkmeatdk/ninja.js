import * as React from 'react';

interface IRowProps {
  row: {
    name1: string,
    email: string,
    edit_path: string,
    per_id: number
  };
  key: any;
}

export class Row extends React.Component<IRowProps, any> {

  public render(): any {

    return (
      <div className="lr-row">
        <h3 className="lr-row-name">{this.props.row.name1}</h3>
        <a className="lr-row-email" href={'mailto:' + this.props.row.email}>{this.props.row.email}</a>
        <a className="lr-row-more" href={this.props.row.edit_path}>Read more</a>
      </div>
    );
  }
}
