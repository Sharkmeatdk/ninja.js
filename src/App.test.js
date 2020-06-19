import * as React from 'react';
import { mount, shallow } from 'enzyme';
import DataTable from './components/DataTable';

it('renders without crashing', () => {
  shallow(<DataTable rows={[]} rowsPerPage={5} />);
});

// Oops i Did - It Again! I played with your code, got lost in the game
// TODO : Fix tests + typescript
