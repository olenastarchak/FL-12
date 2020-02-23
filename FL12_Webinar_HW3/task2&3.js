//task2

class Employee {
  static EMPLOYEES = [];
  constructor(input) {
    this.id = input.id;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.birthday = input.birthday;
    this.salary = input.salary;
    this.position = input.position;
    this.department = input.department;
    Employee.EMPLOYEES.push(this);
  }

  get age() {
    return Math.floor((new Date() - new Date(this.birthday)) /
        (1000*60*60*24*365.25));
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  quit() {
    return Employee.EMPLOYEES.splice(Employee.EMPLOYEES.indexOf(this), 1);
  }

  retire() {
    console.log('It was such a pleasure to work with you!');
    this.quit();
  }

  getFired() {
    console.log('Not a big deal!');
    this.quit();
  }

  changeDepartment(newDepartment) {
    this.department = newDepartment;
  }

  changePosition(newPosition) {
    this.position = newPosition;
  }

  changeSalary(newSalary) {
    this.salary = newSalary;
  }

  changeParams(params, mes) {
    for (let item in params) {
      switch(item) {
        case 'salary':
          this.changeSalary(params[item]);
          break;
        case 'position':
          this.changePosition(params[item]);
          break;
        case 'department':
          this.changeDepartment(params[item]);
          break;
        default:
          throw new Error('Something went wrong!');
      }
    } 
    console.log(mes);
  }

  getPromoted(benefits) {
    this.changeParams(benefits, 'Yoohooo!');
  }

  getDemoted(punishment) {
    this.changeParams(punishment, 'Damn!');
  }
}

class Manager extends Employee {
  constructor(input) {
    super(input);
    this.position = 'manager';
  }

  get managedEmployees() {
    return Employee.EMPLOYEES.filter((el) => {
      return (el.department === this.department) &&
          (el.position !== 'manager');
    })
  }
}

class BlueCollarWorker extends Employee {}

class HRManager extends Manager {
  constructor(input) {
    super(input);
    this.department = 'hr';
  }
}

class SalesManager extends Manager {
  constructor(input) {
    super(input);
    this.department = 'sales';
  }
}


//task3
//implemented different logic then shown in example of the task
//so person can be promoted using existing method getPromoted()

const canPromote = (manager) => ({
  promote: (person, params) => {
    manager.managedEmployees.includes(person) ? person.getPromoted(params) :
        console.log(`Can't promote ${person} from another department`);
  }
})

const ManagerPro = (manager) => {
  if (manager instanceof Manager) {
    return Object.assign(manager, canPromote(manager));
  }
};


//tests

const salesManager = new SalesManager({
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  birthday: '10/04/1994',
  salary: 5000
});

const hrManager = new HRManager({
  id: 2,
  firstName: 'Bob',
  lastName: 'Doe',
  birthday: '10/04/1994',
  salary: 5000
});

const blueCollarWorkerOne = new BlueCollarWorker({
  id: 3,
  firstName: 'Mary',
  lastName: 'Doe',
  birthday: '10/04/1994',
  salary: 5000,
  position: 'office worker',
  department: 'sales'
});

const blueCollarWorkerTwo = new BlueCollarWorker({
  id: 4,
  firstName: 'Jane',
  lastName: 'Doe',
  birthday: '10/04/1994',
  salary: 5000,
  position: 'office worker',
  department: 'hr'
});

console.log(Employee.EMPLOYEES);
console.log(salesManager.getPromoted({salary:7500}));
console.log(blueCollarWorkerTwo.birthday);
console.log(blueCollarWorkerTwo.fullName);
console.log(blueCollarWorkerTwo.age);
const managerPro = ManagerPro(salesManager);
console.log(managerPro.promote(blueCollarWorkerOne, {salary:6000, position:'IT specialist'}));
console.log(blueCollarWorkerTwo);
console.log(blueCollarWorkerOne);
console.log(blueCollarWorkerTwo.getFired());
console.log(Employee.EMPLOYEES);