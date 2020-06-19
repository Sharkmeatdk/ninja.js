import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataTable } from './components/DataTable';
import './scss/main.scss';

const mockData = require('./mock/dataTableMock.json');

interface IAppProps {
  props?: () => void;
}

interface IAppState {
  dataLoaded: boolean;
  rows: Array<{ name1: string, email: string, edit_path: string, per_id: number }>;
}

class ListReader extends React.Component <IAppProps, IAppState> {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      rows: []
    };
  }

  public componentDidMount() {

    // fake async data fetch
    setTimeout(() => {
      this.setState({dataLoaded: true, rows: mockData});
    }, ((Math.floor(Math.random() * 6) + 1)  * 500));
  }

  public render(): any {
    return (
      <div className="lr-wrapper">

          {/* async data load - version */}
          <DataTable rows={this.state.rows} rowsPerPage={5} dataLoaded={this.state.dataLoaded} />

          {/* data already loaded - version
          <DataTable rows={mockData} rowsPerPage={3} dataLoaded={true} />
          */}

      </div>
    );
  }

}

ReactDOM.render(
    <ListReader />,
    document.getElementById('root')
);
