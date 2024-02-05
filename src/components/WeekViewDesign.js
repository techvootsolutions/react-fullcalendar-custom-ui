import moment from "moment";
import React from "react";
import {
  Badge,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import ".././assets/scss/global.scss";
function CustomViewDesign({
  weekView,
  monthView,
  allEvents,
  MonthDesignView,
  MonthMainDesignView,
  WeekDesignView,
}) {
  if (monthView) {
    let date = monthView;
    const formatedEventdate = moment(date.date).format("DD/MM/YYYY");
    var eventsForToday = [];
    const eventDatesForToday = allEvents
      .filter(
        (event) =>
          moment(event?.session_date).format("DD/MM/YYYY") === formatedEventdate
      )
      .map((event) => {
        eventsForToday.push(event);
        return moment(event?.session_date).format("DD/MM/YYYY");
      });

    if (date.view.type === "dayGridMonth") {
      if (eventDatesForToday.includes(formatedEventdate)) {
        let dateShow = moment(eventsForToday[0].start).format("YYYY-MM-DD");
        return (
          <>
            {date.date.getDate()}
            <div className="date-cell-min-height">
              {MonthMainDesignView ? (
                eventsForToday.map((item, index) => (
                  <MonthMainDesignView key={index} item={item} />
                ))
              ) : (
                <UncontrolledDropdown className="w-full mt-2">
                  <DropdownToggle tag="div" className="cursor-pointer">
                    <Card className="shadow-a">
                      <CardBody className="p-3">
                        {eventsForToday.map((item, index) => {
                          if (index < 3) {
                            return (
                              <p
                                key={index}
                                className="text-light-blue-a text-10 font-regular m-0"
                              >
                                {item.title}
                              </p>
                            );
                          } else if (index === 3) {
                            return (
                              <p className="text-10" key={index}>
                                and {eventsForToday.length - 3} more...
                              </p>
                            );
                          }
                          return null; // Add a return statement for each branch
                        })}
                      </CardBody>
                      <Badge
                        color="none"
                        className={`p-0 h-5 w-5 d-flex align-items-center justify-content-center font-bold rounded-pill position-absolute top-0 start-full translate-middle text-white ${
                          moment(dateShow).diff(
                            moment().format("YYYY-MM-DD"),
                            "days"
                          ) >= 0
                            ? "bg-orange"
                            : "bg-dark-blue-c"
                        }`}
                      >
                        {eventsForToday.length}
                      </Badge>
                    </Card>
                    <DropdownMenu
                      // style={{ ["--x-dropdown-min-width"]: "130px" }}
                      className="p-0 w-64 menu-top-toggle"
                      // positionFixed={true}
                      container="body"
                    >
                      {eventsForToday.map((item, index) => (
                        <DropdownItem tag="div" key={index} className="p-0">
                          {MonthDesignView ? (
                            <MonthDesignView key={index} item={item} />
                          ) : (
                            <p className="m-0 d-flex justify-content-center">
                              {item.title}
                            </p>
                          )}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </DropdownToggle>
                </UncontrolledDropdown>
              )}
            </div>
          </>
        );
      } else {
        return (
          <>
            <p>{date.date.getDate()}</p>
            <div className="date-cell-min-height"></div>
          </>
        );
      }
    } else {
      return <p>{date.dayNumberText}</p>;
    }
  }
  if (weekView) {
    var event = weekView;
    if (event.view.type === "dayGridMonth") {
      return <p></p>;
    }
    if (event.view.type === "dayGridWeek") {
      const eventData = event.event._def;
      return (
        <>
          {WeekDesignView ? (
            <WeekDesignView item={eventData} />
          ) : (
            <Card className="event-card shadow-a">
              <CardBody className="p-2">
                <Row className="gx-0">
                  <Col xs="5" className="hstack justify-content-end text-dark">
                    {eventData?.title}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )}
        </>
      );
    }
  }

  return null; // or any other fallback content if needed
}

export default CustomViewDesign;
