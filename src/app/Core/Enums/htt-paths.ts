export enum HttPaths {
    /// Employee
    API_CREATE_EMPLOYEE = 'api/Employees/Create',
    API_EDIT_EMPLOYEE = 'api/Employees/Update',
    API_GET_ALL_EMPLOYEES = 'api/Employees/GetAll',
    API_DELETE_EMPLOYEE_BY_ID = 'api/Employees/SoftDelete?Id=',
    // API_SEARCH_FOR_CUSTOMERS = 'api/Customers/Search',
    // API_GET_CUSTOMER_BY_ID = 'api/Customers/GetById?Id=',
    // API_GET_ALL_CLIENTS = 'api/Customers/GetAll',
    // API_UPDATE_CLIENT = 'api/Customers/Update',

    // API_GET_CUSTOMER_ORDERS = 'api/Orders/GetCustomerOrders',


    /// Department
    API_GET_ALL_DEPARTMENTS = 'api/Departments/GetAll',
    API_DELETE_DEPARTMENTS_BY_ID = 'api/Departments/SoftDelete?Id=',
    API_CREATE_DEPARTMENTS = 'api/Departments/Create',
    API_EDIT_DEPARTMENTS = 'api/Departments/Update',

    /// Job
    API_GET_ALL_JOBS = 'api/Jobs/GetAll',
    API_DELETE_JOB_BY_ID = 'api/Jobs/SoftDelete?Id=',
    API_CREATE_JOB = 'api/Jobs/Create',
    API_EDIT_JOB = 'api/Jobs/Update',

    /// Auth
    API_REGISTER_URL = '',
    API_LOGIN_URL = 'api/Auth/login',
    API_CREATE_USER = 'api/Auth/Create',
}
