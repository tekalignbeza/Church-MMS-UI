Church Management System with comprehensive features for managing members, meetings, finances, and generating various reports. 
How its used. 
First excel sheet of members (new and existing) will be ingested with thier payment information for other system. (This can be done every week or month depending on when the customer wish to ingest the data)
the ingested excel file will be sent to backend and it will ingested asyc. 
The admin can also download and print id of ingested members. 
The admin can create meetings also. when meeting created the backend will send notification. 

1. Core Technologies:

- Angular 16.1.0 (Latest major version)
- TypeScript 5.1.6
- Node.js >=18.0.0 requirement
- RxJS 7.8.1 for reactive programming

2. UI Framework:

- Angular Material 16.1.0
- Angular CDK 16.1.0
- Angular Flex Layout 15.0.0-beta.41
- Material Moment Adapter for date handling
- HammerJS for touch gestures
- Mat File Upload component (v15.0.0)

3. Application Structure: The application is modular, divided into several feature modules:

- Dashboard Module: Home component and navigation
- Member Module: Family and member management
- Meeting Module: Meeting management and attendance tracking
- Payment Module: Payment processing and tracking
- Expense Module: Expense management
- Miscellaneous Module: Various utilities and settings
- Report Module: Various reporting components
- Back-service Module: Services and data models

4. Key Features:

- Member Management (families, individual members)
- Meeting Management (scheduling, attendance tracking)
- Financial Management (payments, expenses)
- Reporting (member, income, expense, summary reports)
- Live Attendance Tracking
- Payment Upload Functionality
- Vendor Management
- Type Management (payment types, expense types)

5. Development Tools:

- Angular CLI 16.1.0
- Karma for testing
- Jasmine for unit tests
- Protractor for E2E testing
- TSLint for code linting

The application appears to be
