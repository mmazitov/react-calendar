<h1 align="center">React Calendar</h1>

## 🎯 About

A calendar application built with React. This app allows users to view and manage events on a monthly and weekly basis. Users can add, edit, and delete events, and the calendar will update accordingly.

## 🛠 Tech Stack

- **[React](https://react.dev/):** A JavaScript library for building user interfaces.
- **[Redux Toolkit](https://redux-toolkit.js.org/):** A library for managing application state.
- **[TypeScript](https://www.typescriptlang.org/):** A programming language that adds static typing to JavaScript.
- **[React DnD](https://react-dnd.github.io/react-dnd/):** A library for implementing drag and drop functionality.
- **[Redux Persist](https://www.npmjs.com/package/redux-persist):** A library for persisting Redux state in localStorage.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for styling.

## ✨ Features

- **Monthly and Weekly View**: Toggle between a monthly and weekly calendar view.
- **Add Events**: Create new events with a title, start time, and end time.
- **Edit Events**: Modify existing events, including their title, start time, and end time.
- **Delete Events**: Remove events from the calendar.
- **Drag-and-Drop Support**: Move events between days using drag-and-drop functionality.
- **Search:** Provides event search capabilities.
- **Holidays:** Displays holidays (for the US).
- **Today:** Highlights the current date.

## 📁 Project Structure

- **src/components:** Contains React components for the user interface.
- **src/store:** Contains Redux store configuration and slices for state management.
- **src/hooks:** Contains custom hooks like useEventHandlers for managing events.
- **src/modals:** Contains modal components for displaying event info and editing events.
- **src/utils:** Contains utility functions for working with dates, the calendar, and pagination.
- **src/types:** Contains TypeScript type definitions.

## Components

- **Button:** A customizable button component with support for different styles (primary, secondary, danger).
- **MonthHeading:** Displays the days of the week at the top of the calendar.
- **DayCell:** Represents a single day in the calendar with event details.
- **CalendarHeading:** Displays the current month and year in the calendar header.
- **EventModal:** A modal for adding or editing events.
- **EventInfoModal:** A modal for viewing event details and editing or deleting events.
- **WeekHeading:** Displays the day name and day number for each day in the weekly view.

## 🏁 Starting

```
Before starting 🏁, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

# Clone this project
$ git clone https://github.com/mmazitov/react-calendar

# Access
$ cd react-calendar

# Install the dependencies using Yarn or npm:
$ yarn install or $ npm install

#To start the development server, run:
$ npm run dev or $ yarn dev

# To build the project for production, run:
$ npm run build or $ yarn build

# To preview the production build, run:
$ npm run preview or $ yarn preview

# Lint project
$ npm lint or $ yarn lint


```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have feature requests.
