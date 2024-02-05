# @techvootsolutions/react-fullcalendar-custom-ui

Welcome to the `@techvootsolutions/react-fullcalendar-custom-ui` package! This package is designed to customize the appearance of FullCalendar's month view and week view, specifically focusing on the `dayGridPlugin`.

Customize the appearance of calendar event cards in React using HTML.

**Note:**

```bash
- For the successful use of this package, ensure that you have the FullCalendar library installed.
- We currently support custom designs for the `dayGridPlugin` only.
```

- [Install](#install)
- [Usage](#usage)
- [Props](#available-props)
- [License](#license)

## Installation

You can install the package using npm:

```bash
npm i @techvootsolutions/react-fullcalendar-custom-ui
```

## Usage

Here's an example of basic usage:

```javascript
import React from "react";
import { CustomViewDesign } from "@techvootsolutions/react-fullcalendar-custom-ui" // Here you can import cutom design card

const MyCalentdar = () => {
  const sessions = [
    // Your events data here
    {
      id: 1,
      start: "2024-01-01",
      title: "Title",
      groupId: 1,
      session_date: "2024/01/01",
      name: "Test Name",
      duration: "00:00:01",
      slotDuration: "00:00:01",
    },
    ...
  ];
  const [allEvents, setAllEvents] = useState(sessions);
  const monthDesign = ({ item }) => {
    return <p>{item.title}</p>;
  };
  const weekDayDesign = ({ item }) => {
    return <p>{item.title}</p>;
  };
  const monthMainDiv = ({ item }) => {
    return (
      <>
        <p onClick={() => alert(`MonthMainDesignView  ${item.id}`)}>{item.start}</p>
      </>
    );
  };
  return (<div className="FullCalendarCustomStyle">
              <FullCalendar
                plugins={[momentPlugin, dayGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "title",
                  center: "",
                  right: "dayGridWeek,dayGridMonth prev,next",
                }} // set header
                views={{
                  dayGridMonth: {
                    titleFormat: { year: "numeric", month: "long" },
                    dayHeaderFormat: { weekday: "long" },
                    slotDuration: "00:00:01",
                    slotMinTime: "00:00:01",
                    slotMaxTime: "00:00:01",
                  },
                  dayGridWeek: {
                    titleFormat: {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                    dayHeaderFormat: { day: "numeric", weekday: "long" },
                    slotDuration: "00:00:01",
                    slotMinTime: "00:00:01",
                    slotMaxTime: "00:00:01",
                  },
                }}
                eventOverlap={true} // Allow events to overlap
                slotDuration={"00:00:01"}
                duration={"00:00:01"}
                initialView="dayGridMonth"
                eventContent={(e) => (
                  <CustomViewDesign // Here you can pass our custom design component for customize week view
                    weekView={e} // here is compulsory pass this argument for component
                    WeekDesignView={weekDayDesign} // here you can pass your main view design for week view
                  ></CustomViewDesign>
                )}
                events={allEvents} // show events
                dayCellContent={(e) => (
                  <CustomViewDesign
                    monthView={e} // here is compulsory pass this argument for component
                    allEvents={allEvents} // here is compulsory pass this argument for component
                    MonthDesignView={monthDesign} // here you can pass your dropdown inner design for month view
                    MonthMainDesignView={monthMainDiv} // here you can pass your main view design for month view
                  ></CustomViewDesign>
                )}
              />
            </div>);
};

export default MyCalendar;
```

## Available props

# Week view props

- Here is props you have to pass for week view deign.

| Prop           | Type          | required | Description                                   |
| -------------- | ------------- | -------- | --------------------------------------------- |
| weekView       | event         | true     | -                                             |
| WeekDesignView | HTML/Function | false    | by passing html you can customize your design |

# Month view props

- Here is props you have to pass for month view deign.

| Prop                | Type          | required | Description                                                   |
| ------------------- | ------------- | -------- | ------------------------------------------------------------- |
| monthView           | event         | true     | -                                                             |
| allEvents           | Array         | true     | by passing html you can customize your design                 |
| MonthDesignView     | HTML/Function | false    | by passing html you can customize your month view design      |
| MonthMainDesignView | HTML/Function | false    | by passing html you can customize your main month view design |

# CustomViewDesign Component

- You can customize the appearance of event cards using the CustomViewDesign component. Refer to the CustomViewDesign component for available customization options.

## license

- Feel free to modify this template further to suit your package's specific details and features. It provides a clear structure for users to understand how to use your package, what props are available, and how to customize the appearance.
