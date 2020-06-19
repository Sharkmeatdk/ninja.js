import * as React from 'react';
import { Pagination } from './Pagination';
import { Row } from './Row';
import { Search } from './Search';

interface IDataTableProps {
  rows: Array<{ name1: string, email: string, edit_path: string, per_id: number }>;
  rowsPerPage: number;
  dataLoaded: boolean;
}

interface IDataTableState {
  currentPageNumber: number;
  totalNumberOfPages: number;
  filteredRows: Array<{ name1: string, email: string, edit_path: string, per_id: number }>;
}

export class DataTable extends React.Component<IDataTableProps, IDataTableState> {

  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 0,
      filteredRows: this.props.rows,
      totalNumberOfPages: 0
    };
  }

  public calculateTotalNumberOfPages = () => {
    const calc = Math.ceil(this.state.filteredRows.length / this.props.rowsPerPage);
    if (this.props.rowsPerPage === 0) {
      return 0;
    }
    return calc;
  }

  public search = (event: any) => {
    console.log('search: ' + event.target.value);

    const text = event.target.value;
    let totalRows = [...this.props.rows];
    let foundRows: Array<{ name1: string, email: string, edit_path: string, per_id: number }>;

    // filter for text input
    if (text.length > 0) {
      foundRows = totalRows.filter((row) => {
        return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
          (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1);
      });
    } else {
      foundRows = totalRows;
    }

    // update page with data
    this.setState({ currentPageNumber: 0, filteredRows: foundRows });

    // timeout to make sure filteredRows has been updated before calculations
    setTimeout(() => {
      this.setState({ totalNumberOfPages: this.calculateTotalNumberOfPages() });
    }, 1);

  }

  // change active page
  public changeToPageNumber = (pageNumber: number) => {
    this.setState({ currentPageNumber: pageNumber });
  }

  // re-calculate number of pages on data change
  public componentDidUpdate(prevProps: any) {

    // check if data has changed, then update if true
    if (prevProps.rows !== this.props.rows) {
      this.setState({ currentPageNumber: 0, filteredRows: this.props.rows });

      // timeout to make sure filteredRows has been updated before calculations
      setTimeout(() => {
        this.setState({ totalNumberOfPages: this.calculateTotalNumberOfPages() });
      }, 1);
    }
  }

  public componentDidMount() {

    // calc total now that filteredRows has been set in constructor
    this.setState({ totalNumberOfPages: this.calculateTotalNumberOfPages() });
  }

  public render(): any {

    const rowCurrent = this.props.rowsPerPage * this.state.currentPageNumber;
    const sliceCalc = this.state.filteredRows.slice(rowCurrent, this.props.rowsPerPage + rowCurrent).length;

    return (
      <div>
        <Search
          onSearch={this.search}
          dataLoaded={this.props.dataLoaded}
        />

        {!this.props.dataLoaded && (
          <div className="lr-loader">
            <p className="lr-loader-text">Loading</p>
            <div className="lr-loader-ring"></div>
            <div className="lr-loader-ring"></div>
          </div>
        )}

        <div className={'lr-list' + ' lr-list-' + sliceCalc}>
          <div className="lr-list-inner">
            {this.state.filteredRows
            .slice(rowCurrent, this.props.rowsPerPage + rowCurrent)
            .map((rowData, index) => {
              return (
                <Row key={index + rowData.per_id} row={rowData} />
              );
            })}

            {this.props.dataLoaded && this.state.filteredRows.length === 0 && (
              <h1 className="lr-list-noresult">No result found</h1>
            )}

          </div>
        </div>

        <Pagination
          currentPageNumber={this.state.currentPageNumber}
          totalNumberOfPages={this.state.totalNumberOfPages}
          changeFunction={this.changeToPageNumber}
        />
      </div>
    );
  }
}
