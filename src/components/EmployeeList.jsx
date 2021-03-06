import { h, render, Component } from 'preact';
import { getEmployees } from 'Services/employee-service';
import EmployeeCard from 'Components/EmployeeCard.jsx';
import classnames from 'classnames';

class EmployeeList extends Component {

  constructor() {
    super();
    this.state = { employees: [], activeId: null };
  }

  componentDidMount() {
    getEmployees()
      .then(employees =>
        this.setState({ employees }));
  }

  onCardClick(e, id) {
    e.preventDefault();
    this.setState({ activeId: id != this.state.activeId ? id : null });
  }

  render() {
    const { activeId } = this.state;
    return (
      <main>
        <ul className={classnames('cards', { 'cards--has-active-card': !!activeId })}>
          {
            this.state.employees.map(employee =>
              <EmployeeCard
                {...employee}
                onClick={this.onCardClick.bind(this)}
                activeId={this.state.activeId}
              />
            )
          }
        </ul>
      </main>
    );
  }
}

export default EmployeeList;
