import { render } from "react-dom";
import "../../../styles/Calendar.css";
import "../../../styles/material.css";
import "../../../styles/bootstrap.min.css";
import '../../../styles/Form.css';
import React, { useEffect } from "react";
import {
  ButtonComponent,
  SwitchComponent,
} from "@syncfusion/ej2-react-buttons";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { 
  DropDownListComponent,
  MultiSelectComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-react-dropdowns";
import {
  UploaderComponent,
  TextBoxComponent,
} from "@syncfusion/ej2-react-inputs";
import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
  ContextMenuComponent,
} from "@syncfusion/ej2-react-navigations";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Year,
  TimelineViews,
  TimelineMonth,
  TimelineYear,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
  Agenda,
  Print,
  ExcelExport,
  ICalendarImport,
  ICalendarExport,
  Timezone,
} from "@syncfusion/ej2-react-schedule";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import {
  addClass,
  Browser,
  closest,
  extend,
  Internationalization,
  isNullOrUndefined,
  removeClass,
  remove,
} from "@syncfusion/ej2-base";
import { DataManager, Predicate, Query } from "@syncfusion/ej2-data";
import { tz } from "moment-timezone";
import { Base } from "./Base";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from '../../API/FirebaseAPI' //"../../api/collections";
import firebase from "firebase";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import './test2.css';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject as Inject2, Page, Edit,Toolbar as Toolbar2, CommandColumn } from '@syncfusion/ej2-react-grids';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { RecurrenceEditorComponent } from '@syncfusion/ej2-react-schedule';
// import { scheduleData, gridData } from './data';
import { Text, View } from 'react-native';
// import * as data from './dataSource.json';
import { PropertyPane } from './property-pane';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DataUtil } from '@syncfusion/ej2-data';
// import Form from './Form';

// var stringData=[{
//     'ActivityID': 1,
//     'Activity': 'Lecture',
//     'CourseCode': 'CSC1015S',
//     'Location': 'Zoom meeting',
//     'StartDate': 'Sun Sep 19 2021 00:00:00 GMT+0200 (South Africa Standard Time)',
//     'EndDate': 'Thu Sep 30 2021 00:00:00 GMT+0200 (South Africa Standard Time)',
//     'Hours': 0,
//     'Minutes': 45,
//     'Recurrence': 'FREQ=DAILY;INTERVAL=2;COUNT=8',
//     'Comments': 'Notes about lecture'
// }]



export class Calendar extends Base {
  constructor() {
    super(...arguments);
    console.log("constructor...");

    this.state = {
      data: [],
      calendarEvents: [],
      render: false, //Set render state to false
      hideDialog: true,
      activityData: [],
      // Activity: 'Lecture',
      // ActivityID: 0,
      // Comments: '',
      // CourseCode: '',
      // EndDate: new Date(),
      // Hours: 0,
      // Location: '',
      // Minutes: 0,
      // Recurrence: '',
      // StartDate: new Date(),
      ///////////////////////////////////////
    };
    this.isTimelineView = false;
    this.intl = new Internationalization();
    this.weekDays = [
      { text: "Sunday", value: 0 },
      { text: "Monday", value: 1 },
      { text: "Tuesday", value: 2 },
      { text: "Wednesday", value: 3 },
      { text: "Thursday", value: 4 },
      { text: "Friday", value: 5 },
      { text: "Saturday", value: 6 },
    ];
    this.exportItems = [
      { text: "iCalendar", iconCss: "e-icons e-schedule-ical-export" },
      { text: "Excel", iconCss: "e-icons e-schedule-excel-export" },
    ];
    this.contextMenuItems = [
      { text: "New Event", iconCss: "e-icons new", id: "Add" },
      {
        text: "New Recurring Event",
        iconCss: "e-icons recurrence",
        id: "AddRecurrence",
      },
      { text: "Today", iconCss: "e-icons today", id: "Today" },
      { text: "Edit Event", iconCss: "e-icons edit", id: "Save" },
      { text: "Delete Event", iconCss: "e-icons delete", id: "Delete" },
      {
        text: "Delete Event",
        id: "DeleteRecurrenceEvent",
        iconCss: "e-icons delete",
        items: [
          { text: "Delete Occurrence", id: "DeleteOccurrence" },
          { text: "Delete Series", id: "DeleteSeries" },
        ],
      },
      {
        text: "Edit Event",
        id: "EditRecurrenceEvent",
        iconCss: "e-icons edit",
        items: [
          { text: "Edit Occurrence", id: "EditOccurrence" },
          { text: "Edit Series", id: "EditSeries" },
        ],
      },
    ];
    this.calendarCollections = [
      { CalendarText: "School", CalendarId: 1, CalendarColor: "blue" },
      { CalendarText: "Company", CalendarId: 2, CalendarColor: "#ff7f50" },
      { CalendarText: "Birthday", CalendarId: 3, CalendarColor: "#AF27CD" },
      { CalendarText: "Holiday", CalendarId: 4, CalendarColor: "#808000" },
      { CalendarText: "My Calendar", CalendarId: 5, CalendarColor: "#c43081" },
    ];
    this.timezoneData = [
      { text: "UTC -12:00", value: "Etc/GMT+12" },
      { text: "UTC -11:00", value: "Etc/GMT+11" },
      { text: "UTC -10:00", value: "Etc/GMT+10" },
      { text: "UTC -09:00", value: "Etc/GMT+9" },
      { text: "UTC -08:00", value: "Etc/GMT+8" },
      { text: "UTC -07:00", value: "Etc/GMT+7" },
      { text: "UTC -06:00", value: "Etc/GMT+6" },
      { text: "UTC -05:00", value: "Etc/GMT+5" },
      { text: "UTC -04:00", value: "Etc/GMT+4" },
      { text: "UTC -03:00", value: "Etc/GMT+3" },
      { text: "UTC -02:00", value: "Etc/GMT+2" },
      { text: "UTC -01:00", value: "Etc/GMT+1" },
      { text: "UTC +00:00", value: "Etc/GMT" },
      { text: "UTC +01:00", value: "Etc/GMT-1" },
      { text: "UTC +02:00", value: "Etc/GMT-2" },
      { text: "UTC +03:00", value: "Etc/GMT-3" },
      { text: "UTC +04:00", value: "Etc/GMT-4" },
      { text: "UTC +05:00", value: "Etc/GMT-5" },
      { text: "UTC +05:30", value: "Asia/Calcutta" },
      { text: "UTC +06:00", value: "Etc/GMT-6" },
      { text: "UTC +07:00", value: "Etc/GMT-7" },
      { text: "UTC +08:00", value: "Etc/GMT-8" },
      { text: "UTC +09:00", value: "Etc/GMT-9" },
      { text: "UTC +10:00", value: "Etc/GMT-10" },
      { text: "UTC +11:00", value: "Etc/GMT-11" },
      { text: "UTC +12:00", value: "Etc/GMT-12" },
      { text: "UTC +13:00", value: "Etc/GMT-13" },
      { text: "UTC +14:00", value: "Etc/GMT-14" },
    ];
    this.majorSlotData = [
      { Name: "1 hour", Value: 60 },
      { Name: "1.5 hours", Value: 90 },
      { Name: "2 hours", Value: 120 },
      { Name: "2.5 hours", Value: 150 },
      { Name: "3 hours", Value: 180 },
      { Name: "3.5 hours", Value: 210 },
      { Name: "4 hours", Value: 240 },
      { Name: "4.5 hours", Value: 270 },
      { Name: "5 hours", Value: 300 },
      { Name: "5.5 hours", Value: 330 },
      { Name: "6 hours", Value: 360 },
      { Name: "6.5 hours", Value: 390 },
      { Name: "7 hours", Value: 420 },
      { Name: "7.5 hours", Value: 450 },
      { Name: "8 hours", Value: 480 },
      { Name: "8.5 hours", Value: 510 },
      { Name: "9 hours", Value: 540 },
      { Name: "9.5 hours", Value: 570 },
      { Name: "10 hours", Value: 600 },
      { Name: "10.5 hours", Value: 630 },
      { Name: "11 hours", Value: 660 },
      { Name: "11.5 hours", Value: 690 },
      { Name: "12 hours", Value: 720 },
    ];
    this.minorSlotData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.timeFormatData = [
      { Name: "12 hours", Value: "hh:mm a" },
      { Name: "24 hours", Value: "HH:mm" },
    ];
    this.weekNumberData = [
      { Name: "Off", Value: "Off" },
      { Name: "First Day of Year", Value: "FirstDay" },
      { Name: "First Full Week", Value: "FirstFullWeek" },
      { Name: "First Four-Day Week", Value: "FirstFourDayWeek" },
    ];
    this.convertToString = this.convertToString.bind(this);
    this.addData = this.addData.bind(this);
    this.addActivity = this.addActivity.bind(this)
    this.generateEvents = this.generateEvents.bind(this);
    this.getDaysArray = this.getDaysArray.bind(this);

    this.calendarEventsRef = firebase
      .firestore()
      .collection("members")
      .doc(firebase.auth().currentUser.uid)
      .collection("calendarEvents");
    
    this.activityDataRef = firebase
    .firestore()
    .collection("members")
    .doc(firebase.auth().currentUser.uid)
    .collection("activityData");


    
    this.ActivityID = 2;
    this.Activity = 'Lecture'
    this.Comments = ''
    this.CourseCode = ''
    this.EndDate = new Date()
    this.Hours = 0
    this.Location = ''
    this.Minutes = 0
    this.Recurrence = ''
    this.StartDate = new Date()

    // onSnapshot(
    //   this.calendarEventsRef,
    //   (newData) => {
    //     if (Browser.isIE) {
    //       Timezone.prototype.offset = (date, timezone) =>
    //         tz.zone(timezone).utcOffset(date.getTime());
    //     }
    //     let timezone = new Timezone();
    //     let currentTimezone = timezone.getLocalTimezoneName();

    //     for (let g = 0; g < newData.length; g++){
    //       newData[g].data.StartTime = new Date(newData[g].data.StartTime.seconds * 1000)
    //       newData[g].data.StartTime = timezone.convert(
    //         newData[g].data.StartTime,
    //         "UTC",
    //         currentTimezone
    //       );
    //       newData[g].data.EndTime = new Date(newData[g].data.EndTime.seconds * 1000)
    //       newData[g].data.EndTime = timezone.convert(
    //         newData[g].data.EndTime,
    //         "UTC",
    //         currentTimezone
    //       );
    //       newData[g].data.startDate = newData[g].data.StartTime
    //       newData[g].data.endDate = newData[g].data.EndTime;
    //       // console.log(new Date(newData[g].data.StartTime).toUTCString())
    //       newData[g].data.CalendarId = 5;
    //       // console.log(this)
    //       this.state.calendarEvents.push(newData[g].data)
    //     }
    //     this.state.ActivityID = newData.length;
        
    //   },
    //   {
    //     sort: (a, b) => {
    //       if (a.index < b.index) {
    //         return -1;
    //       }

    //       if (a.index > b.index) {
    //         return 1;
    //       }

    //       return 0;
    //     },
    //   }
    // );

    // onSnapshot(
    //   this.activityDataRef,
    //   (newData) => {
    //     if (Browser.isIE) {
    //       Timezone.prototype.offset = (date, timezone) =>
    //         tz.zone(timezone).utcOffset(date.getTime());
    //     }
    //     let timezone = new Timezone();
    //     let currentTimezone = timezone.getLocalTimezoneName();

    //     for (let g = 0; g < newData.length; g++){
    //       newData[g].data.StartTime = new Date(newData[g].data.StartTime.seconds * 1000)
    //       newData[g].data.StartTime = timezone.convert(
    //         newData[g].data.StartTime,
    //         "UTC",
    //         currentTimezone
    //       );
    //       newData[g].data.EndTime = new Date(newData[g].data.EndTime.seconds * 1000)
    //       newData[g].data.EndTime = timezone.convert(
    //         newData[g].data.EndTime,
    //         "UTC",
    //         currentTimezone
    //       );
    //       newData[g].data.startDate = newData[g].data.StartTime
    //       newData[g].data.endDate = newData[g].data.EndTime;
    //       // console.log(new Date(newData[g].data.StartTime).toUTCString())
    //       // newData[g].data.CalendarId = 5;
    //       // console.log(this)
    //       this.state.activityData.push(newData[g].data)
    //     }
    //     this.state.ActivityID = newData.length;
        
    //   },
    //   {
    //     sort: (a, b) => {
    //       if (a.index < b.index) {
    //         return -1;
    //       }

    //       if (a.index > b.index) {
    //         return 1;
    //       }

    //       return 0;
    //     },
    //   }
    // );
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
    this.rule = '';
    this.data1 = [
        { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
        { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
        { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
        { x: new Date(2011, 0, 1), y: 70 }
    ];
    this.data2 = [
        { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
        { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
        { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
    ];
    this.headerText = [
        { "text": "Calendar" },
        { "text": "Activities" },
        { "text": "Add Activity" },
        { "text": "Rich Text Editor" },
        { "text": "Scheduler" }
    ];

    this.buttonRef = element => {
        this.buttonEle = element;
    };
    this.buttons = [{
            click: () => {
                this.dialogInstance.hide();
            },
            buttonModel: {
                content: 'OK',
                isPrimary: true
            }
        },
        {
            click: () => {
                this.dialogInstance.hide();
            },
            buttonModel: {
                content: 'CANCEL',
            }
        }];
    this.animationSettings = { effect: 'Zoom' };

    // define the JSON of data
    this.temp = 'activityType';
    this.activityType = [
        {"Id": "Activity1", "Activity": "Lecture"},
        {"Id": "Activity2", "Activity": "Test"},
        {"Id": "Activity3", "Activity": "Exam"},
        {"Id": "Activity4", "Activity": "Workshop"},
        {"Id": "Activity5", "Activity": "Lab"},
        {"Id": "Activity6", "Activity": "Other"}
    ]
    this.itemData = {
        Id: "Activity1",
        Activity: "Lecture"
    }
    // console.log('sports', this.sportsData)
    // maps the appropriate column to fields property
    this.fields = { text: 'Activity', value: 'Id' };
    // set the value to select an item based on mapped value at initial rendering
    this.value = 'Activity1';

    this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.maxDate = new Date(new Date().getFullYear(), 12, 31);
    this.dateValueStart = new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10, 30);
    this.dateValueEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 14, 10, 30);

    // this.toolbarOptions = ['Add', 'Edit', 'Delete'];
    // this.editSettings = {
    //   allowEditing: true,
    //   allowAdding: true,
    //   allowDeleting: true,
    //   mode: 'Dialog',
    //   template: this.dialogTemplate,
    // };
    this.validationRules = { required: true };
    this.orderidRules = { required: true, number: true };
    this.pageSettings = { pageCount: 5 };

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
    this.editparams = { params: { popupHeight: '300px' } };
    this.validationRule = { required: true };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
        { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
        { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
        { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
  addData = (data) => {
    // const index = this.scheduleObj.getEventMaxID();//.length > 1 ? data[data.length - 1].index + 1 : 0;
    console.log("data:", data);
    if (data !== undefined) addDoc(this.calendarEventsRef, { data }); //, index });
    console.log("calendarEventsRef: ", this.calendarEventsRef);
  };
  addActivity = (data) => {
    console.log("data:", data);
    if (data !== undefined) addDoc(this.activityDataRef, { data }); //, index });
    console.log("activityDataRef: ", this.activityDataRef);
  }
  componentDidMount() {
    const self = this;
    this.generateEvents().then((result) => this.state.calendarEvents = result)
    console.log("componentDidMount...", this.state.calendarEvents);
    setTimeout(function() { //Start the timer
      this.setState({render: true}) //After 1 second, set render to true
    }.bind(this), 2000)
    
  }
  generateEvents = async () => {
    console.log("generateEvents...");
    let eventData = [];
    if (Browser.isIE) {
      Timezone.prototype.offset = (date, timezone) =>
        tz.zone(timezone).utcOffset(date.getTime());
    }
    let timezone = new Timezone();
    let currentTimezone = timezone.getLocalTimezoneName();
    let eventSubjects = [
      "Bering Sea Gold",
      "Technology",
      "Maintenance",
      "Meeting",
      "Travelling",
      "Annual Conference",
      "Birthday Celebration",
      "Farewell Celebration",
      "Wedding Aniversary",
      "Alaska: The Last Frontier",
      "Deadest Catch",
      "Sports Day",
      "MoonShiners",
      "Close Encounters",
      "HighWay Thru Hell",
      "Daily Planet",
      "Cash Cab",
      "Basketball Practice",
      "Rugby Match",
      "Guitar Class",
      "Music Lessons",
      "Doctor checkup",
      "Brazil - Mexico",
      "Opening ceremony",
      "Final presentation",
    ];
    let weekDate = new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay())
    );
    let startDate = new Date(
      weekDate.getFullYear(),
      weekDate.getMonth(),
      weekDate.getDate(),
      10,
      0
    );
    let endDate = new Date(
      weekDate.getFullYear(),
      weekDate.getMonth(),
      weekDate.getDate(),
      11,
      30
    );
    startDate = timezone.convert(startDate, "UTC", currentTimezone);
    endDate = timezone.convert(endDate, "UTC", currentTimezone);

    // console.log(this.state.hi);
    for (let a = 0, id = 1; a < 500; a++) {
      let month = Math.floor(Math.random() * (11 - 0 + 1) + 0);
      let date = Math.floor(Math.random() * (28 - 1 + 1) + 1);
      let hour = Math.floor(Math.random() * (23 - 0 + 1) + 0);
      let minutes = Math.floor(Math.random() * (59 - 0 + 1) + 0);
      let start = new Date(
        new Date().getFullYear(),
        month,
        date,
        hour,
        minutes,
        0
      );
      let end = new Date(start.getTime());
      end.setHours(end.getHours() + 2);
      let startDate = new Date(start.getTime());
      let endDate = new Date(end.getTime());
      startDate = timezone.convert(startDate, "UTC", currentTimezone);
      endDate = timezone.convert(endDate, "UTC", currentTimezone);
      eventData.push({
        Id: id,
        Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
        StartTime: startDate,
        startDate,
        EndTime: endDate,
        endDate,
        Location: "",
        Description: "Event Scheduled",
        IsAllDay: id % 10 === 0,
        IsReadonly: endDate < new Date(),
        CalendarId: 5//(a % 4) + 1,
      });
      id++;
    }
    console.log("eventdata: ", this.state.data);
    return extend([], [], undefined, true);
    // return extend([], eventData, undefined, true);
  };
  updateLiveTime() {
    let scheduleTimezone = this.scheduleObj
      ? this.scheduleObj.timezone
      : "Etc/GMT";
    let timeBtn = document.querySelector(".schedule-overview #timeBtn");
    if (timeBtn) {
      timeBtn.innerHTML =
        '<span class="e-btn-icon e-icons e-schedule-clock e-icon-left"></span>' +
        new Date().toLocaleTimeString("en-US", { timeZone: scheduleTimezone });
    }
  }
  onImportClick(args) {
    // this.scheduleObj.importICalendar('str');//args.event.target.files[0]);
    console.log("args:", args);
    // console.log("args.event.target.files[0]:", args.event.target.files[0]);
    // console.log("this.scheduleObj: ", this.scheduleObj);

    this.convertToString(args);
  } 
  getDaysArray = (start, end) => {
    // results = []
    for(var dates=[],date=new Date(start); date<=end; date.setDate(date.getDate()+1)){
        dates.push(new Date(date));
        // res = {
        //   date: date,
        //   freeHours: 16,
        //   events: this.scheduleObj.getEvents
        // }
        // results.push(res)
    }
    return dates;
};
  convertToString = (args) => {
    // this.generateEvents()
    if (Browser.isIE) {
      Timezone.prototype.offset = (date, timezone) =>
        tz.zone(timezone).utcOffset(date.getTime());
    }
    let timezone = new Timezone();
    let currentTimezone = timezone.getLocalTimezoneName();
    const self = this;

    let assignments = [];
    let quiz = [];
    let tests = [];
    let pracs = [];
    let tuts = [];
    let exams = [];
    let others = [];

    var file = args.event.target.files[0];
    var reader = new FileReader();
    console.log('day', (new Date()).getDay())
    let dates = this.getDaysArray(
      new Date(), 
      new Date(new Date().setDate(new Date().getDate() + 10))
    )
    // 
    let counter = 0;
    for (let f = 0; f < dates.length; f++){
      console.log(dates[f])
      let location =
        location === undefined ? "" : location;

      let StartTime = new Date(
        dates[f].getFullYear(),
        dates[f].getMonth(),
        dates[f].getDate(),
        14,
        0
        // event.start.getHours(),
        // event.start.getMinutes()
      );

      // let indexHour = duration.indexOf("H");
      let hours = 2;
        // indexHour == -1 ? 0 : parseInt(duration.substr(2, indexHour));
      // let indexMin = duration.indexOf("M");
      let minutes = 0;
        // indexMin == -1
        //   ? 0
        //   : parseInt(duration.substr(indexHour + 1, indexMin));

      let EndTime = new Date(StartTime);
      EndTime.setHours(EndTime.getHours() + hours);
      EndTime.setMinutes(EndTime.getMinutes() + minutes);

      // this.scheduleObj.addEvent({
      //   Id: self.scheduleObj.getEventMaxID() + counter++, //event.uid;
      //   Subject: 'event.comment',
      //   StartTime: StartTime,
      //   EndTime: EndTime,
      //   startDate: StartTime,
      //   endDate: EndTime,
      //   Location: location,
      //   IsAllDay: false,
      //   IsReadonly: EndTime < new Date(),
      //   Description: 'event.summary',
      //   CalendarId: 1,
      //   RecurrenceID: 605,
      //   RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10;",
      //   StartTimezone: null,
      //   EndTimezone: null,
      // });
    }

    this.scheduleObj.addEvent([{
      CalendarId: 1,
      Description: "Add notesmmmmmmmmmmmmmmmmm,",
      EndTime: new Date(new Date().setHours(new Date().getHours() + 2)),
      EndTimezone: null,
      Guid: "ba2dc1bf-611b-b4f9-a976-2e8d8e089524",
      Id: 590,
      IsAllDay: false,
      Location: '',
      RecurrenceException: null,
      RecurrenceID: null,
      RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5;",
      StartTime: new Date(),
      StartTimezone: null,
      Subject: "Addhhhhhhhhhhhhh",
    }])

    /**this.scheduleObj.crudModule.saveEvent({
        CalendarId: 1,
        Description: "Add notes",
        EndTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        EndTimezone: null,
        Guid: "ba2dc1bf-611b-b4f9-a976-2e8d8e089524",
        Id: 605,
        IsAllDay: false,
        Location: '',
        RecurrenceID: 605,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10;",
        StartTime: new Date(),
        StartTimezone: null,
        Subject: "Add titlehhhhhhhhhhhh",
      },'Save')
      
      this.scheduleObj.addEvent([{
        CalendarId: 1,
        Description: "Add notes",
        EndTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        EndTimezone: null,
        Guid: "ba2dc1bf-611b-b4f9-a976-2e8d8e089524",
        Id: 590,
        IsAllDay: false,
        Location: '',
        RecurrenceException: null,
        RecurrenceID: null,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5;",
        StartTime: new Date(),
        StartTimezone: null,
        Subject: "Add titlehhhhhhhhhhhh",
      }, {
        CalendarId: 1,
        Description: "Add notes",
        EndTime: new Date(new Date().setHours(new Date().getHours() + 4)),
        EndTimezone: null,
        Guid: "ba2dc1bf-611b-b4f9-a976-2e8d8e089524",
        Id: 590,
        IsAllDay: false,
        Location: '',
        RecurrenceException: null,
        RecurrenceID: null,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5;",
        StartTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        StartTimezone: null,
        Subject: "Add titlehhhhhhhhhhhh",
      }])**/


    var textFile = /text.*/;
    var eventData = [];
    if (file.type.match(textFile)) {
      reader.onload = function (event) {
        const ical = require("node-ical");
        const directEvents = ical.sync.parseICS(event.target.result);

        // loop through events
        console.log("direct events: ", directEvents);
        var counter = 0;
        for (const event of Object.values(directEvents)) {
          // console.log('info: ', event.)
          let location = event.location === undefined ? "" : event.location;
          
          let addObj = {}
          
          addObj.Location = location
          addObj.Subject = event.comment
          addObj.Description = event.summary
          addObj.CalendarId = 1;
          addObj.Id = self.scheduleObj.getEventMaxID() + counter++;
                //   StartTime: StartTime,
                //   EndTime: EndTime,
                //   startDate: StartTime,
                //   endDate: EndTime,
                //   IsAllDay: false,
                //   IsReadonly: EndTime < new Date(),
                //   ,
          if (event.type !== "VTIMEZONE") {
            if (event.duration === "PT0S") {
              if (event.description.indexOf('Assignment') === 0 || event.summary.includes('Assignment') || event.description.includes('Assignment') || event.comment.includes('Assignment')) {
                                // console.log('summary: ',event)    
                
                // get course code
                let index = event.comment.indexOf('(');
                addObj.CourseCode = event.comment.substring(index+1, index+9)
                addObj.dtstamp = event.dtstamp
                // addObj.EndTime = event.start
                // console.log(CourseCode)

                // assignments.push(addObj)           
                // console.log(event)
                // get course code
                // let index = event.comment.indexOf('(');
                // addObj.CourseCode = event.comment.substring(index+1, index+9)
                
                
                addObj.StartTime = new Date(
                    // event.dtstamp
                    new Date(event.start).getFullYear(),
                    new Date(event.start).getMonth(),
                    new Date(event.start).getDate(),
                    18,
                    0,
                    0
                  )
                  // new Date (
                  //   event.start
                  // )
                  addObj.StartTime.setDate(addObj.StartTime.getDate() - 5);
                  addObj.StartTime.setHours(18)
                  addObj.StartTime.setMinutes(0)
                  addObj.StartTime.setSeconds(0)
                  // let a = new Date( event.start ).toISOString()
                  // console.log('iso: ', a)
                  // 
                // addObj.startDate = 
                // new Date(
                //   new Date(event.dtstamp).getFullYear(),
                //   new Date(event.dtstamp).getMonth(),
                //   new Date(event.dtstamp).getDate(),
                //   18,
                //   0,
                //   0
                // )
                addObj.EndTime = addObj.StartTime
                addObj.EndTime.setHours(20)
                  // new Date(
                  //   new Date(event.dtstamp).getFullYear(),
                  //   new Date(event.dtstamp).getMonth(),
                  //   new Date(event.dtstamp).getDate(),
                  //   20,
                  //   0,
                  //   0
                  // )
                // addObj.EndDate = new Date(
                //   new Date(event.dtstamp).getFullYear(),
                //   new Date(event.dtstamp).getMonth(),
                //   new Date(event.dtstamp).getDate(),
                //   20,
                //   0,
                //   0
                // )
                
                addObj.isAllDay = false
                addObj.IsReadonly = addObj.EndTime < new Date()
                addObj.RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=5;"
                
                eventData.push({
                  Id: addObj.Id,
                  Subject: addObj.Subject,
                  StartTime: addObj.StartTime,
                  EndTime: addObj.EndTime,
                  startDate: addObj.StartTime,
                  endDate: addObj.EndTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  RecurrenceRule: addObj.RecurrenceRule,
                  IsReadonly: addObj.EndTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });

                // eventData.push(addObj)
                assignments.push(addObj)
                // counter--
              } 
              else if (event.summary.includes('Quiz') || event.description.includes('Quiz') || event.comment.includes('Quiz')){
                console.log('quiz: ',event)
                // prepare time
                // do task time
                // get date first
                // The time limit is 2 hr, 30 min.
                // There is no time limit. /// 1 hour

                let description = event.description
                let items = description.split(' ')
                let index = items.indexOf('available')
                // let time = items[index + 2]// + ' ' + items[index + 3] + ' ' + items[index + 4];
                let hour_index = items.indexOf('hr') - 1
                let hours = (hour_index === -1) ? 1 : parseInt(items[hour_index])
                let min_index = items.indexOf('min') - 1
                let minutes = (min_index === -1) ? 0 : parseInt(items[min_index])

                
                let day = items[index + 2].split('/')
                let time = items[index + 3].split(':')
                if (items[index + 4] === 'PM'){
                  items[index + 4] += 12
                }

                addObj.StartTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0],
                  time[1],
                  day[2]
                )
                addObj.EndTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] + hours,
                  time[1] + minutes,
                  time[2]
                )
                let prepTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] - 2,
                  time[1],
                  day[2]
                )

                // prepare
                eventData.push({
                  Id: addObj.Id,
                  Subject: 'Prepare for quiz',// addObj.Subject,
                  StartTime: prepTime,
                  EndTime: addObj.StartTime,
                  startDate: prepTime,
                  endDate: addObj.StartTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.StartTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });

                // do task 
                let id = addObj.Id++
                eventData.push({
                  Id: id,
                  Subject: 'Do quiz',//addObj.Subject,
                  StartTime: addObj.StartTime,
                  EndTime: addObj.EndTime,
                  startDate: addObj.StartTime,
                  endDate: addObj.EndTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.EndTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });
                
                
                counter++


                // console.log(addObj.StartTime)
                

                quiz.push(event)
              }
              else if (event.summary.includes('Test') || event.description.includes('Test') || event.comment.includes('Test')){
                tests.push(event);
                console.log('test: ', event)
                let description = event.description
                let items = description.split(' ')
                let index = items.indexOf('available')
                // let time = items[index + 2]// + ' ' + items[index + 3] + ' ' + items[index + 4];
                let hour_index = items.indexOf('hr') - 1
                let hours = (hour_index === -1) ? 1 : parseInt(items[hour_index])
                let min_index = items.indexOf('min') - 1
                let minutes = (min_index === -1) ? 0 : parseInt(items[min_index])

                
                let day = items[index + 2].split('/')
                let time = items[index + 3].split(':')
                if (items[index + 4] === 'PM'){
                  items[index + 4] += 12
                }

                addObj.StartTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0],
                  time[1],
                  day[2]
                )

                

                addObj.EndTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] + hours,
                  time[1] + minutes,
                  time[2]
                )

                
                let prepStart = new Date(addObj.StartTime)
                prepStart.setDate(prepStart.getDate() - 7);
                prepStart.setHours(18)
                prepStart.setMinutes(0)

                let prepEnd = new Date(prepStart)
                prepEnd.setHours(prepEnd.getHours() + 4)
                // let prepTime = new Date (
                //   day[2],
                //   day[1],
                //   day[0],
                //   time[0] - 2,
                //   time[1],
                //   day[2]
                // )

                // // prepare
                eventData.push({
                  Id: addObj.Id,
                  Subject: 'Prepare for test',// addObj.Subject,
                  StartTime: prepStart,
                  EndTime: prepEnd,
                  startDate: prepStart,
                  endDate: prepEnd,
                  Location: addObj.Location,
                  IsAllDay: false,
                  RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=7;",
                  IsReadonly: prepStart < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });

                // do task 
                let id = addObj.Id++
                eventData.push({
                  Id: id,
                  Subject: 'Write test',//addObj.Subject,
                  StartTime: addObj.StartTime,
                  EndTime: addObj.EndTime,
                  startDate: addObj.StartTime,
                  endDate: addObj.EndTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.EndTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });
                
                
                counter++

              }
              else if (event.summary.includes('Prac') || event.description.includes('Prac') || event.comment.includes('Prac')){
                pracs.push(event);
                let description = event.description
                let items = description.split(' ')
                let index = items.indexOf('available')
                // let time = items[index + 2]// + ' ' + items[index + 3] + ' ' + items[index + 4];
                let hour_index = items.indexOf('hr') - 1
                let hours = (hour_index === -1) ? 1 : parseInt(items[hour_index])
                let min_index = items.indexOf('min') - 1
                let minutes = (min_index === -1) ? 0 : parseInt(items[min_index])

                
                let day = items[index + 2].split('/')
                let time = items[index + 3].split(':')
                if (items[index + 4] === 'PM'){
                  items[index + 4] += 12
                }

                addObj.StartTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0],
                  time[1],
                  day[2]
                )
                addObj.EndTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] + hours,
                  time[1] + minutes,
                  time[2]
                )
                let prepTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] - 2,
                  time[1],
                  day[2]
                )

                // prepare
                eventData.push({
                  Id: addObj.Id,
                  Subject: 'Prepare for prac',// addObj.Subject,
                  StartTime: prepTime,
                  EndTime: addObj.StartTime,
                  startDate: prepTime,
                  endDate: addObj.StartTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.StartTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });

                // do task 
                let id = addObj.Id++
                eventData.push({
                  Id: id,
                  Subject: 'Do prac',//addObj.Subject,
                  StartTime: addObj.StartTime,
                  EndTime: addObj.EndTime,
                  startDate: addObj.StartTime,
                  endDate: addObj.EndTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.EndTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });
                
                
                counter++

              }
              else if (event.summary.includes('Tutorial') || event.description.includes('Tutorial') || event.comment.includes('Tutorial')){
                tuts.push(event);
                let description = event.description
                let items = description.split(' ')
                let index = items.indexOf('available')
                // let time = items[index + 2]// + ' ' + items[index + 3] + ' ' + items[index + 4];
                let hour_index = items.indexOf('hr') - 1
                let hours = (hour_index === -1) ? 1 : parseInt(items[hour_index])
                let min_index = items.indexOf('min') - 1
                let minutes = (min_index === -1) ? 0 : parseInt(items[min_index])

                
                let day = items[index + 2].split('/')
                let time = items[index + 3].split(':')
                if (items[index + 4] === 'PM'){
                  items[index + 4] += 12
                }

                addObj.StartTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0],
                  time[1],
                  day[2]
                )
                addObj.EndTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] + hours,
                  time[1] + minutes,
                  time[2]
                )
                let prepTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] - 2,
                  time[1],
                  day[2]
                )

                // prepare
                eventData.push({
                  Id: addObj.Id,
                  Subject: 'Prepare for tutorial',// addObj.Subject,
                  StartTime: prepTime,
                  EndTime: addObj.StartTime,
                  startDate: prepTime,
                  endDate: addObj.StartTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.StartTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });

                // do task 
                let id = addObj.Id++
                eventData.push({
                  Id: id,
                  Subject: 'Do tutorial',//addObj.Subject,
                  StartTime: addObj.StartTime,
                  EndTime: addObj.EndTime,
                  startDate: addObj.StartTime,
                  endDate: addObj.EndTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.EndTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });
                
                
                counter++

              }
              else if (event.summary.includes('Exam') || event.description.includes('Exam') || event.comment.includes('Exam')){
                exams.push(event);
                let description = event.description
                let items = description.split(' ')
                let index = items.indexOf('available')
                // let time = items[index + 2]// + ' ' + items[index + 3] + ' ' + items[index + 4];
                let hour_index = items.indexOf('hr') - 1
                let hours = (hour_index === -1) ? 1 : parseInt(items[hour_index])
                let min_index = items.indexOf('min') - 1
                let minutes = (min_index === -1) ? 0 : parseInt(items[min_index])

                
                let day = items[index + 2].split('/')
                let time = items[index + 3].split(':')
                if (items[index + 4] === 'PM'){
                  items[index + 4] += 12
                }

                addObj.StartTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0],
                  time[1],
                  day[2]
                )
                addObj.EndTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] + hours,
                  time[1] + minutes,
                  time[2]
                )

                let prepStart = new Date(addObj.StartTime)
                prepStart.setDate(prepStart.getDate() - 21);
                prepStart.setHours(18)
                prepStart.setMinutes(0)

                let prepEnd = new Date(prepStart)
                prepEnd.setHours(prepEnd.getHours() + 7)
                // let prepTime = new Date (
                //   day[2],
                //   day[1],
                //   day[0],
                //   time[0] - 2,
                //   time[1],
                //   day[2]
                // )

                // // prepare
                eventData.push({
                  Id: addObj.Id,
                  Subject: 'Prepare for test',// addObj.Subject,
                  StartTime: prepStart,
                  EndTime: prepEnd,
                  startDate: prepStart,
                  endDate: prepEnd,
                  Location: addObj.Location,
                  IsAllDay: false,
                  RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=21;",
                  IsReadonly: prepStart < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });

                // do task 
                let id = addObj.Id++
                eventData.push({
                  Id: id,
                  Subject: 'Write test',//addObj.Subject,
                  StartTime: addObj.StartTime,
                  EndTime: addObj.EndTime,
                  startDate: addObj.StartTime,
                  endDate: addObj.EndTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.EndTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });
                
                counter++

              }
              else{//} if (event.summary.includes('Test') || event.description.includes('Test') || event.comment.includes('Test')){
                others.push(event);
                let description = event.description
                let items = description.split(' ')
                let index = items.indexOf('available')
                // let time = items[index + 2]// + ' ' + items[index + 3] + ' ' + items[index + 4];
                let hour_index = items.indexOf('hr') - 1
                let hours = (hour_index === -1) ? 1 : parseInt(items[hour_index])
                let min_index = items.indexOf('min') - 1
                let minutes = (min_index === -1) ? 0 : parseInt(items[min_index])

                
                let day = items[index + 2].split('/')
                let time = items[index + 3].split(':')
                if (items[index + 4] === 'PM'){
                  items[index + 4] += 12
                }

                addObj.StartTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0],
                  time[1],
                  day[2]
                )
                addObj.EndTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] + hours,
                  time[1] + minutes,
                  time[2]
                )
                let prepTime = new Date (
                  day[2],
                  day[1],
                  day[0],
                  time[0] - 1,
                  time[1],
                  day[2]
                )

                // prepare
                eventData.push({
                  Id: addObj.Id,
                  Subject: 'Prepare for other task',// addObj.Subject,
                  StartTime: prepTime,
                  EndTime: addObj.StartTime,
                  startDate: prepTime,
                  endDate: addObj.StartTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.StartTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });

                // do task 
                let id = addObj.Id++
                eventData.push({
                  Id: id,
                  Subject: 'Do other task',//addObj.Subject,
                  StartTime: addObj.StartTime,
                  EndTime: addObj.EndTime,
                  startDate: addObj.StartTime,
                  endDate: addObj.EndTime,
                  Location: addObj.Location,
                  IsAllDay: false,
                  IsReadonly: addObj.EndTime < new Date(),
                  Description: addObj.Description,
                  CalendarId: 1,
                });
                
                
                counter++



              }

              // let  = [];
              // let  = [];
              // let  = [];
              // let  = [];

              // console.log(event)

              

              // console.log('Description: ',event.description+'\nSummary: ',event.summary);
              // if ()
              /** test and quizzes
               * Description:
               * ...
               * There is no time limit. Students can submit this an unlimited number of times. (The highest score will be recorded).
               * Summary: Due ... Quiz(n) ...
               */
              /** Prac/workshop
               * Description: Prac(n) ...
               * Summary: Due:  ... Prac(n) ...
               */
              /** assignment
               * Description: Assignment ...
               * Summary: Due ...
               */
              /**
               * manually add test dates , prac test/exam dates, and exam dates
               */
              /**
               * option to change meeting to exam, test, prac
               */

              //  this.state.calendarEvents.push({
              //   CalendarId: 1,
              //   Description: "Add notes",
              //   EndTime: new Date(new Date().setHours(new Date().getHours() + 2)),
              //   EndTimezone: null,
              //   Guid: "ba2dc1bf-611b-b4f9-a976-2e8d8e089524",
              //   Id: 605,
              //   IsAllDay: false,
              //   Location: '',
              //   RecurrenceID: 605,
              //   RecurrenceRule: "FREQ=DAILY;INTERVAL=1;UNTIL=20210929T220000Z;",
              //   StartTime: new Date(),
              //   StartTimezone: null,
              //   Subject: "Add title",
              // })
              // console.log('no duration: ', event)
            } else {
              
              const duration = event.duration;
              let defined = duration == undefined ? -1 : 0;
              if (defined == 0) {

                // let s = new Date(
                //   event.start
                // )
                // var date = new Date();
                // date.setDate(date.getDate() - 7);

                let StartTime = new Date(
                  event.start.getFullYear(),
                  event.start.getMonth(),
                  event.start.getDate(),
                  event.start.getHours(),
                  event.start.getMinutes()
                );

                let indexHour = duration.indexOf("H");
                let hours =
                  indexHour == -1 ? 0 : parseInt(duration.substr(2, indexHour));
                let indexMin = duration.indexOf("M");
                let minutes =
                  indexMin == -1
                    ? 0
                    : parseInt(duration.substr(indexHour + 1, indexMin));

                let EndTime = new Date(event.start);
                EndTime.setHours(EndTime.getHours() + hours);
                EndTime.setMinutes(EndTime.getMinutes() + minutes);
                
                eventData.push({
                  Id: self.scheduleObj.getEventMaxID() + counter++, //event.uid;
                  Subject: event.comment,
                  StartTime: StartTime,
                  EndTime: EndTime,
                  startDate: StartTime,
                  endDate: EndTime,
                  Location: location,
                  IsAllDay: false,
                  IsReadonly: EndTime < new Date(),
                  Description: event.summary,
                  CalendarId: 1,
                });
              }
            }
          }
        }
        console.log('assignments: ', assignments)

        console.log("eventdata: ", eventData);
        let overviewEvents = extend([], eventData, undefined, true);
        
        for (let event of overviewEvents) {
          event.StartTime = timezone.convert(
            event.StartTime,
            "UTC",
            currentTimezone
          );
          event.EndTime = timezone.convert(
            event.EndTime,
            "UTC",
            currentTimezone
          );
          self.scheduleObj.addEvent(event)
          console.log('event: ', event)
          // self.addData(event);
          // self.state.calendarEvents.push(event);
        } 
        console.log(overviewEvents)
      };
    } else {
      console.log("something went wrong! Make sure your file is a .ics file");
    }
    reader.readAsText(file);
  }
  addTestExam() {
    // need to store test dates
    // schedule exam immediately after last test date
  }
  onPrint() {
    this.scheduleObj.print();
  }
  onExportClick(args) {
    if (args.item.text === "Excel") {
      let exportDatas = [];
      let eventCollection = this.scheduleObj.getEvents();
      let resourceCollection = this.scheduleObj.getResourceCollections();
      let resourceData = resourceCollection[0].dataSource;
      for (let resource of resourceData) {
        let data = eventCollection.filter(
          (e) => e.CalendarId === resource.CalendarId
        );
        exportDatas = exportDatas.concat(data);
      }
      this.scheduleObj.exportToExcel({
        exportType: "xlsx",
        customData: exportDatas,
        fields: ["Id", "Subject", "StartTime", "EndTime", "CalendarId"],
      });
    } else {
      this.scheduleObj.exportToICalendar();
    }
  }
  getEventData() {
    const date = this.scheduleObj.selectedDate;
    return {
      Id: this.scheduleObj.getEventMaxID(),
      Subject: "",
      StartTime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        new Date().getHours(),
        0,
        0
      ),
      EndTime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        new Date().getHours() + 1,
        0,
        0
      ),
      Location: "",
      Description: "",
      IsAllDay: false,
      CalendarId: 1,
    };
  }
  onToolbarItemClicked(args) {
    switch (args.item.text) {
      case "Day":
        this.scheduleObj.currentView = this.isTimelineView
          ? "TimelineDay"
          : "Day";
        break;
      case "Week":
        this.scheduleObj.currentView = this.isTimelineView
          ? "TimelineWeek"
          : "Week";
        break;
      case "WorkWeek":
        this.scheduleObj.currentView = this.isTimelineView
          ? "TimelineWorkWeek"
          : "WorkWeek";
        break;
      case "Month":
        this.scheduleObj.currentView = this.isTimelineView
          ? "TimelineMonth"
          : "Month";
        break;
      case "Year":
        this.scheduleObj.currentView = this.isTimelineView
          ? "TimelineYear"
          : "Year";
        break;
      case "Agenda":
        this.scheduleObj.currentView = "Agenda";
        break;
      case "New Event":
        const eventData = this.getEventData();
        this.scheduleObj.openEditor(eventData, "Add", true);
        break;
      case "New Recurring Event":
        const recEventData = this.getEventData();
        this.scheduleObj.openEditor(recEventData, "Add", true, 1);
        break;
    }
  }
  timelineTemplate() {
    return (
      <div style={{ height: "46px", lineHeight: "23px" }}>
        <div className="icon-child" style={{ textAlign: "center" }}>
          <SwitchComponent
            id="timeline_views"
            checked={false}
            change={(args) => {
              this.isTimelineView = args.checked;
              switch (this.scheduleObj.currentView) {
                case "Day":
                case "TimelineDay":
                  this.scheduleObj.currentView = this.isTimelineView
                    ? "TimelineDay"
                    : "Day";
                  break;
                case "Week":
                case "TimelineWeek":
                  this.scheduleObj.currentView = this.isTimelineView
                    ? "TimelineWeek"
                    : "Week";
                  break;
                case "WorkWeek":
                case "TimelineWorkWeek":
                  this.scheduleObj.currentView = this.isTimelineView
                    ? "TimelineWorkWeek"
                    : "WorkWeek";
                  break;
                case "Month":
                case "TimelineMonth":
                  this.scheduleObj.currentView = this.isTimelineView
                    ? "TimelineMonth"
                    : "Month";
                  break;
                case "Year":
                case "TimelineYear":
                  this.scheduleObj.currentView = this.isTimelineView
                    ? "TimelineYear"
                    : "Year";
                  break;
                case "Agenda":
                  this.scheduleObj.currentView = "Agenda";
                  break;
              }
            }}
          />
        </div>
        <div className="text-child" style={{ fontSize: "14px" }}>
          Timeline Views
        </div>
      </div>
    );
  }
  multiDragTemplate() {
    return (
      <div style={{ height: "46px", lineHeight: "23px" }}>
        <div className="icon-child" style={{ textAlign: "center" }}>
          <SwitchComponent
            id="multi_drag"
            checked={false}
            change={(args) => {
              this.scheduleObj.allowMultiDrag = args.checked;
            }}
          />
        </div>
        <div className="text-child" style={{ fontSize: "14px" }}>
          Allow Multi Drag
        </div>
      </div>
    );
  }
  groupTemplate() {
    return (
      <div style={{ height: "46px", lineHeight: "23px" }}>
        <div className="icon-child" style={{ textAlign: "center" }}>
          <SwitchComponent
            id="grouping"
            checked={true}
            change={(args) => {
              this.scheduleObj.group.resources = args.checked
                ? ["Calendars"]
                : [];
            }}
          />
        </div>
        <div className="text-child" style={{ fontSize: "14px" }}>
          Grouping
        </div>
      </div>
    );
  }
  gridlineTemplate() {
    return (
      <div style={{ height: "46px", lineHeight: "23px" }}>
        <div className="icon-child" style={{ textAlign: "center" }}>
          <SwitchComponent
            id="gridlines"
            checked={true}
            change={(args) => {
              this.scheduleObj.timeScale.enable = args.checked;
            }}
          />
        </div>
        <div className="text-child" style={{ fontSize: "14px" }}>
          Gridlines
        </div>
      </div>
    );
  }
  autoHeightTemplate() {
    return (
      <div style={{ height: "46px", lineHeight: "23px" }}>
        <div className="icon-child" style={{ textAlign: "center" }}>
          <SwitchComponent
            id="row_auto_height"
            checked={false}
            change={(args) => {
              this.scheduleObj.rowAutoHeight = args.checked;
            }}
          />
        </div>
        <div className="text-child" style={{ fontSize: "14px" }}>
          Row Auto Height
        </div>
      </div>
    );
  }
  tooltipTemplate() {
    return (
      <div style={{ height: "46px", lineHeight: "23px" }}>
        <div className="icon-child" style={{ textAlign: "center" }}>
          <SwitchComponent
            id="tooltip"
            checked={false}
            change={(args) => {
              this.scheduleObj.eventSettings.enableTooltip = args.checked;
            }}
          />
        </div>
        <div className="text-child" style={{ fontSize: "14px" }}>
          Tooltip
        </div>
      </div>
    );
  }
  getResourceData(data) {
    let resources = this.scheduleObj.getResourceCollections().slice(-1)[0];
    let resourceData = resources.dataSource.filter(
      (resource) => resource.CalendarId === data.CalendarId
    )[0];
    return resourceData;
  }
  getHeaderStyles(data) {
    if (data.elementType === "event") {
      let resourceData = this.getResourceData(data);
      let calendarColor = "#3f51b5";
      if (resourceData) {
        calendarColor = resourceData.CalendarColor.toString();
      }
      return { background: calendarColor, color: "#FFFFFF" };
    } else {
      return { alignItems: "center", color: "#919191" };
    }
  }
  getHeaderTitle(data) {
    return data.elementType === "cell"
      ? "Add Appointment"
      : "Appointment Details";
  }
  getHeaderDetails(data) {
    return (
      this.intl.formatDate(data.StartTime, { type: "date", skeleton: "full" }) +
      " (" +
      this.intl.formatDate(data.StartTime, { skeleton: "hm" }) +
      " - " +
      this.intl.formatDate(data.EndTime, { skeleton: "hm" }) +
      ")"
    );
  }
  getEventType(data) {
    const resourceData = this.getResourceData(data);
    let calendarText = "";
    if (resourceData) {
      calendarText = resourceData.CalendarText.toString();
    }
    return calendarText;
  }
  buttonClickActions(e) {
    const quickPopup = this.scheduleObj.element.querySelector(
      ".e-quick-popup-wrapper"
    );
    const getSlotData = () => {
      let cellDetails = this.scheduleObj.getCellDetails(
        this.scheduleObj.getSelectedElements()
      );
      if (isNullOrUndefined(cellDetails)) {
        cellDetails = this.scheduleObj.getCellDetails(
          this.scheduleObj.activeCellsData.element
        );
      }
      const addObj = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = isNullOrUndefined(this.titleObj.value)
        ? "Add title"
        : this.titleObj.value;
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.endTime);
      addObj.IsAllDay = cellDetails.isAllDay;
      addObj.Description = isNullOrUndefined(this.notesObj.value)
        ? "Add notes"
        : this.notesObj.value;
      addObj.CalendarId = this.eventTypeObj.value;
      addObj.Location = '';
      console.log("addObj: ", addObj);
      // console.log("scheduleObj: ", this.scheduleObj);
      return addObj;
    };
    if (e.target.id === "add") {
      const addObj = getSlotData();
      this.scheduleObj.addEvent(addObj);
      console.log('aaaaaaaaaaaaaa: ', addObj);
      // console.log("yyyyyyyyyyy ", this.scheduleObj);
      // const data = addObj;
      // this.addData(addObj);
      // this.state.calendarEvents.push(addObj)
      // console.log("ddddddd: ", addObj);
    } else if (e.target.id === "delete") {
      const eventDetails = this.scheduleObj.activeEventData.event;
      let currentAction = "Delete";
      if (eventDetails.RecurrenceRule) {
        currentAction = "DeleteOccurrence";
      }
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup =
        quickPopup.firstElementChild.classList.contains("e-cell-popup");
      const eventDetails = isCellPopup
        ? getSlotData()
        : this.scheduleObj.activeEventData.event;
      let currentAction = isCellPopup ? "Add" : "Save";
      console.log(getSlotData)
      let a = isCellPopup ? "" : eventDetails;
      console.log("details: ", a);
      if (eventDetails.RecurrenceRule) {
        currentAction = "EditOccurrence";
      }
      this.scheduleObj.openEditor(eventDetails, currentAction, true);
    }
    this.scheduleObj.closeQuickInfoPopup();
  }
  headerTemplate(props) {
    return (
      <div className="quick-info-header">
        <div
          className="quick-info-header-content"
          style={this.getHeaderStyles(props)}
        >
          <div className="quick-info-title">{this.getHeaderTitle(props)}</div>
          <div className="duration-text">{this.getHeaderDetails(props)}</div>
        </div>
      </div>
    );
  }
  contentTemplate(props) {
    return (
      <div className="quick-info-content">
        {props.elementType === "cell" ? (
          <div className="e-cell-content">
            <div className="content-area">
              <TextBoxComponent
                id="title"
                ref={(textbox) => (this.titleObj = textbox)}
                placeholder="Title"
              />
            </div>
            <div className="content-area">
              <DropDownListComponent
                id="eventType"
                ref={(ddl) => (this.eventTypeObj = ddl)}
                dataSource={this.calendarCollections}
                fields={{ text: "CalendarText", value: "CalendarId" }}
                placeholder="Choose Type"
                index={0}
                popupHeight="200px"
              />
            </div>
            <div className="content-area">
              <TextBoxComponent
                id="notes"
                ref={(textbox) => (this.notesObj = textbox)}
                placeholder="Notes"
              />
            </div>
          </div>
        ) : (
          <div className="event-content">
            <div className="meeting-type-wrap">
              <label>Subject</label>:<span>{props.Subject}</span>
            </div>
            <div className="meeting-subject-wrap">
              <label>Type</label>:<span>{this.getEventType(props)}</span>
            </div>
            <div className="notes-wrap">
              <label>Notes</label>:<span>{props.Description}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  footerTemplate(props) {
    return (
      <div className="quick-info-footer">
        {props.elementType == "cell" ? (
          <div className="cell-footer">
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              onClick={this.buttonClickActions.bind(this)}
            />
            <ButtonComponent
              id="add"
              cssClass="e-flat"
              content="Add"
              isPrimary={true}
              onClick={this.buttonClickActions.bind(this)}
            />
          </div>
        ) : (
          <div className="event-footer">
            <ButtonComponent
              id="delete"
              cssClass="e-flat"
              content="Delete"
              onClick={this.buttonClickActions.bind(this)}
            />
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              isPrimary={true}
              onClick={this.buttonClickActions.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
  getDateHeaderText(value) {
    return this.intl.formatDate(value, { skeleton: "Ed" });
  }
  getWeather(value) {
    switch (value.getDay()) {
      case 0:
        return '<img class="weather-image"  src= "https://ej2.syncfusion.com/react/demos/src/schedule/images/weather-clear.svg" /><div class="weather-text">25°C</div>';
      case 1:
        return '<img class="weather-image" src="https://ej2.syncfusion.com/react/demos/src/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
      case 2:
        return '<img class="weather-image" src="https://ej2.syncfusion.com/react/demos/src/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
      case 3:
        return '<img class="weather-image" src="https://ej2.syncfusion.com/react/demos/src/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
      case 4:
        return '<img class="weather-image" src="https://ej2.syncfusion.com/react/demos/src/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
      case 5:
        return '<img class="weather-image" src="https://ej2.syncfusion.com/react/demos/src/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
      case 6:
        return '<img class="weather-image" src="https://ej2.syncfusion.com/react/demos/src/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
      default:
        return null;
    }
  }
  dateHeaderTemplate(props) {
    return (
      <div>
        <div>{this.getDateHeaderText(props.date)}</div>
        <div
          className="date-text"
          dangerouslySetInnerHTML={{ __html: this.getWeather(props.date) }}
        ></div>
      </div>
    );
  }
  onResourceChange(args) {
    let resourcePredicate;
    for (let value of args.value) {
      if (resourcePredicate) {
        resourcePredicate = resourcePredicate.or(
          new Predicate("CalendarId", "equal", value)
        );
      } else {
        resourcePredicate = new Predicate("CalendarId", "equal", value);
      }
    }
    this.scheduleObj.resources[0].query = resourcePredicate
      ? new Query().where(resourcePredicate)
      : new Query().where("CalendarId", "equal", 1);
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

floatFocus(args) {
    args.target.parentElement.classList.add('e-input-focus');
    console.log('focus', args)
}
floatBlur(args) {
    args.target.parentElement.classList.remove('e-input-focus');
    console.log('blur', args)
}
onSubmitClick() {

    // if (this.formObject.validate()) {
    //     // this.formObject.element.reset();
    //     console.log('log')
    // }
}
onDragStart(args) {
    args.navigation.enable = true;
}
load(args) {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
}
onChartLoad(args) {
    let chart = document.getElementById('charts');
    chart.setAttribute('title', '');
}
buttonClick() {
    this.dialogInstance.show();
}
dialogClose() {
    this.buttonEle.style.display = "block";
    console.log('dialogClose', this)
}
dialogOpen() {
    this.buttonEle.style.display = "none";
    console.log('dialogOpen', this)
}
onChange2() {
    console.log(this.listObj)
    if (this.listObj) this.itemData = this.listObj.itemData;
    // if (this.fields.value !== undefined) this.fields.value = (this.listObj.value === null) ? this.fields.value : this.listObj.value.toString();
    // console.log(this.fields) 
    // console.log(this.value)
    // let value = document.getElementById('value');
    // let text = document.getElementById('text');
    // update the text and value property values in property panel based on selected item in DropDownList
    // if (value !== undefined && value !== null) value.innerHTML = this.listObj.value === null ? 'null' : this.listObj.value.toString();
    // if (text !== undefined && text !== null) text.innerHTML = this.listObj.text === null ? 'null' : this.listObj.text;
}
onChange(args) { 
    // let outputElement = document.querySelector('#rule-output');
    // outputElement.innerText = args.value;
    this.rule = args.value;
    console.log('args: ', args)
}
onChange3(args) { 
    // let outputElement = document.querySelector('#rule-output');
    // outputElement.innerText = args.value;
    // this.rule = args.value;
    console.log('args: ', args)
    this.dateValueStart = args.value;
    console.log('this.dateValueStart: ', this.dateValueStart)
}
onChange4(args) { 
    // let outputElement = document.querySelector('#rule-output');
    // outputElement.innerText = args.value;
    // this.rule = args.value;
    console.log('args: ', args)
    this.dateValueEnd = args.value;
    console.log('this.dateValueEnd: ', this.dateValueEnd)
}
dataSourceChanged(args){
  console.log('data change? ',args)
}
dialogTemplate(props) {
    console.log('props: ', props)
    // this.props.activityType = this.activityType;
    return (<Form {...props}/>);
}
actionComplete(args) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
        if (Browser.isDevice) {
            args.dialog.height = window.innerHeight - 90 + 'px';
            args.dialog.dataBind();
        }
    }
}
rendereComplete() {
    const options = {
        // add the rules for validation
        rules: {
            'user': {
                required: [true, '* Enter your name']
            },
            'dob': {
                required: [true, '* Enter your date of birth']
            },
            'city': {
                required: [true, '* Enter your city']
            },
            'state': {
                required: [true, '* Enter your state']
            },
        }
    };
    // let outputElement = document.querySelector('#rule-output');
    // this.recObject.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');
    // outputElement.innerText = this.recObject.value;
    // initialize the form validator
    this.formObject = new FormValidator('#formId', options);
    this.onChange2();
    console.log('back')
}
content0 () {
    return(<View>
        {this.table()}
    </View>)
}
content1 () {
    return(<View>
        {this.form()}
    </View>)
}
content3 () {
    return(<View>
        {this.form2()}
    </View>)
}
content2 () {
    return (
    <View>
        <div className="e-float-input">
        <label className="e-float-text e-label-top" id="label_StartTime" htmlFor='activitie'>Activity Type</label>                
        <DropDownListComponent 
        style={{paddingTop: '25px'}}
        id="activitie" 
        dataSource={this.activityType}
        ref={(dropdownlist) => { this.listObj = dropdownlist }} 
        fields={this.fields} 
        change={this.onChange2.bind(this)} 
        placeholder="Select Activity" 
        value={this.value} 
        popupHeight="220px" 
    /></div></View> 
    )
}
table () {
    return (
        <div className='control-pane'>
            <div className='control-section'>
            <GridComponent ref={(table) => this.tableObj = table} id='gridcomp' dataSource={this.state.activityData} allowPaging={true} pageSettings={this.pageSettings} editSettings={this.editSettings}>
            <ColumnsDirective>
            {/* format='dd-MMM-yy hh:mm a' */}
                <ColumnDirective field='ActivityID' headerText='ID' width='60' textAlign='Left' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                <ColumnDirective field='Activity' headerText='Activity'></ColumnDirective>
                <ColumnDirective field='CourseCode' headerText='Course Code' validationRules={this.validationRules}></ColumnDirective>
                <ColumnDirective field='Location' headerText='Location' validationRules={this.validationRules}></ColumnDirective>
                <ColumnDirective field='StartDate' headerText='Start Date' format='dd-MMM-yy'></ColumnDirective>
                <ColumnDirective field='EndDate' headerText='EndDate' format='dd-MMM-yy'></ColumnDirective>
                <ColumnDirective field='Hours' headerText='Hours' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={false}></ColumnDirective>
                <ColumnDirective field='Minutes' headerText='Minutes' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={false}></ColumnDirective>
                <ColumnDirective field='Recurrence' headerText='Recurrence' textAlign='Right' isPrimaryKey={false}></ColumnDirective>
                <ColumnDirective field='Comments' headerText='Comments' ></ColumnDirective>
              <ColumnDirective headerText='Manage Activity' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject2 services={[Page, CommandColumn, Edit]}/>
          </GridComponent>
            </div>
        </div>
    )
}
onChangeForm(args) {
    console.log('aggg',args)
    console.log(this.scheduleObj.getEventMaxID())
    // this.ActivityID = 
    // console.log('lets cav:', args.target.name, args.target.value)
    // let key = args.target.name;
    // let value = args.target.value;
    // this.setState({ [key]: value });
    // console.log('hhhhh', { [key]: value })
    // console.log('statefgcjffcfcfccffcfcfcgfcfc ', this.state)
}
onChangeFom1(args){
    // this.listObj.text; //console this
    // for (let a = 0; a < 6; a++){
    //     console.log(this.activityType[a].Id, args.value)
    //     if (this.activityType[a].Id == args.value){
    //         this.itemData = args.itemData
    //         this.value = this.activityType[a].Activity//args.value;
    //         this.setState({ Activity:  this.activityType[a].Activity});
    //         console.log('here',args.itemData, this.state)
    //     }
    // }
    // // let key = args.target.name;
    // // console.log('combo',args)
    // // this.itemData = args.itemData;
    // // this.value = args.value;
    // // this.itemData = {
    // //     Id: value,
    // //     Activity: "m"
    // // }
    // // let value = args.target.value;
    // // this.setState({ [key]: value });
}


SubmitForm(args){
  console.log(this)

  let StartTime = new Date(
    this.StartDate
    // event.start.getHours(),
    // event.start.getMinutes()
  );


  let EndTime = new Date(StartTime);
  EndTime.setHours(EndTime.getHours() + this.Hours);
  EndTime.setMinutes(EndTime.getMinutes() + this.Minutes);

let newData = {
  ActivityID: this.ActivityID,
  Activity: this.Activity,
  'CourseCode': this.CourseCode,
  'Location': this.Location,
  StartTime, 
  'StartDate': StartTime,
  'EndDate': EndTime,
  EndTime,
  'Hours': this.Hours,
  'Minutes': this.Minutes,
  'Recurrence': this.Recurrence,
  'Comments': this.Comments,
  'RecurrenceException': null,
  'RecurrenceID': null,
  'RecurrenceRule': this.Recurrence,
  'StartTimezone': null,
  'Subject': this.Comments,
  CalendarId: 1,
  'Id': this.ActivityID,
  IsReadonly: EndTime < new Date(),
}
this.scheduleObj.addEvent(newData)
this.state.calendarEvents.push(newData)
// this.addActivity(newData);
// this.addData(newData);

if (this.tableObj !== undefined){
  this.tableObj.addRecord(newData)
}else{
  this.state.activityData.push(newData)
}
  console.log(newData)
  console.log('activityData:', this.state.activityData)
  console.log('dreeeeaaaam',this.tableObj)
  
  this.clearForm(true)
}

onChangeActivity () {
  this.Activity = this.listObj.text;
  console.log(this.listObj)
}
onChangeCourseCode (args) {
  this.CourseCode = args.target.value// this.CourseCodeObj.value;
  console.log(args)
}
onChangeLocation () {
  this.Location = this.LocationObj.value;
  console.log(this.LocationObj)
}
onChangeStartDate () {
  this.StartDate = this.datetimepickerInstanceStart.currentDate;
  console.log(this.datetimepickerInstanceStart)
}
onChangeEndDate () {
  console.log(this.datetimepickerInstanceEnd)
  this.EndDate = this.datetimepickerInstanceEnd.currentDate;
}
onChangeRecurrence (args) {
  console.log(args)
  console.log(this.recObject)
  this.Recurrence = this.recObject.getRecurrenceRule()
  // this.Recurrence = args.value;
}
onChangeHours () {
  console.log(this.hourObj.value)
  this.Hours = this.hourObj.value;
}
onChangeMinutes () {
  console.log(this.minuteObj)
  this.Minutes = this.minuteObj.value;
}
onChangeComments () {
  console.log(this.commentObject.value)
  this.Comments += this.commentObject.value;
  this.commentObject.value = this.Comments
}
clearForm (isAdd) {
  this.value = 'Activity1';
  this.ActivityID = (isAdd !== undefined) ? this.ActivityID++ : this.ActivityID;
  this.Activity = 'Lecture'
  this.Comments = ''
  this.CourseCode = ''
  this.EndDate = new Date()
  this.Hours = 0
  // this.hourObj.value = 0
  // this.minuteObj.value = 0
  this.Location = ''
  this.Minutes = 0
  this.Recurrence = ''
  // this.recObject.value = ''
  this.StartDate = new Date()

  this.ActivityIDObj.value = this.ActivityID
  this.listObj.value = this.value;
  this.commentObject.value = this.Comments
  this.CourseCodeObj.value = this.CourseCode
  this.datetimepickerInstanceStart.value = this.StartDate
  this.datetimepickerInstanceEnd.value = this.EndDate
  this.hourObj.value = this.Hours
  this.minuteObj.value = this.Minutes
  this.LocationObj.value = this.Location
  this.recObject.value = this.Recurrence
  // console.log(this.ActivityIDObj)
}

form2 () {
  // let self = this.state;
  // console.log('swasddd', data)
  return (
    <div>
      <div >
        <div className="form-row">
          {/* Activity ID */}
          <div className="form-group col-md-6">
            <div className="e-float-input e-control-wrapper">
                <input 
                className="e-input" 
                // onFocus={this.floatFocus} onBlur={this.floatBlur}
                ref={input => this.ActivityIDObj = input} 
                id="ActivityID" 
                name="ActivityID" 
                type="text" 
                // disabled={!data.isAdd} 
                value={this.ActivityID} 
                onChange={this.onChangeForm.bind(this)}
                // placeholder={self.ActivityID} 
                disabled
            />
                <span className="e-float-line"></span>
                <label className="e-float-text e-label-top">Activity ID</label>
            </div>
        </div>
          {/* Activity */}
          <div className="form-group col-md-6">
            <DropDownListComponent 
              id="Activity"
              value={this.value}
              // placeholder='Select Activity' 
              dataSource={this.activityType} 
              ref={(dropdownlist) => { this.listObj = dropdownlist }} 
              fields={this.fields}
              change={this.onChangeActivity.bind(this)}//this.onChangeFom1.bind(this)}
              popupHeight='300px' 
              floatLabelType='Always'
            />
          </div>
        </div>
        <div className="form-row">
          {/* Course Code */}
          <div className="form-group col-md-6">
              <div className="e-float-input e-control-wrapper">
                  <input 
                    ref={input => this.CourseCodeObj = input} 
                    // value={data.CourseCode} 
                    id="CourseCode" 
                    name="CourseCode" 
                    type="text" 
                    // placeholder='Enter Course Code'
                    required={true}
                    onChange={this.onChangeCourseCode.bind(this)}
                  />
                  <span className="e-float-line"></span>
                  <label className="e-float-text e-label-top">Course Code</label>
              </div>
          </div>
          {/* Location */}
          <div className="form-group col-md-6">
              <div className="e-float-input e-control-wrapper">
                  <input 
                    ref={input => this.LocationObj = input} 
                    value={data.Location} 
                    id="Location" 
                    name="Location" 
                    type="text" 
                    onChange={this.onChangeLocation.bind(this)}
                  />
                  <span className="e-float-line"></span>
                  <label className="e-float-text e-label-top">Location</label>
              </div>
          </div>
      </div>
        <div className="form-row">
          {/* Start Date */}
          <div className="form-group col-md-6">
            <DatePickerComponent 
              id="StartDate" 
              // value={data.StartDate} 
              placeholder="Start Date" 
              floatLabelType='Always'
              change={this.onChangeStartDate.bind(this)} 
              min={
                this.minDate
              } 
              max={this.maxDate} 
              value={this.dateValueStart}
              ref={calendar => this.datetimepickerInstanceStart = calendar}
            ></DatePickerComponent>
          </div>
          {/* End Date */}
          <div className="form-group col-md-6">
            <DatePickerComponent 
              id="EndDate" 
              value={data.EndDate} 
              placeholder="End Date" 
              floatLabelType='Always'
              change={this.onChangeEndDate.bind(this)} 
              // min={(this.minDate < this.StartDate) ? ///////////////////////////////////} 
              max={this.maxDate} 
              ref={calendar => this.datetimepickerInstanceEnd = calendar}
            ></DatePickerComponent>
          </div>
        </div>
        <div className="form-row">
          {/* Hours */}
          <div className="form-group col-md-6">
            <NumericTextBoxComponent 
              id="Hours" 
              ref={hour => this.hourObj = hour} 
              format='number' 
              min={0}
              max={24}
              value={this.Hours} 
              placeholder="Hours" 
              floatLabelType='Always' 
              // step={10}
              onChange={this.onChangeHours.bind(this)}
            ></NumericTextBoxComponent>
          </div>
          {/* Minutes */}
          <div className="form-group col-md-6">
            <NumericTextBoxComponent 
              id="Minutes" 
              ref={minute => this.minuteObj = minute} 
              format='number' 
              min={0}
              max={60}
              value={this.Minutes} 
              // placeholder="Minutes" 
              step={10}
              floatLabelType='Always' 
              onChange={this.onChangeMinutes.bind(this)}
            ></NumericTextBoxComponent>
          </div>
        </div>
        <div className="form-row">
          {/* Recurrence Editor */}
          <div className="form-group col-md-12">
            <RecurrenceEditorComponent 
              id='Recurrence' 
              ref={t => this.recObject = t} 
              change={this.onChangeRecurrence.bind(this)}
              value={this.Recurrence}
            ></RecurrenceEditorComponent>
          </div>
        </div>
        <div className="form-row">
          {/* Comments */}
          <div className="form-group col-md-12">
            <div className="e-float-input e-control-wrapper">
              <textarea id="Comments" name="Comments" ref={comment => this.commentObject = comment} value={this.Comments} onChange={this.onChangeComments.bind(this)}></textarea>
              <span className="e-float-line"></span>
              <label className="e-float-text e-label-top">Comments</label>
            </div>
          </div>
        </div>
      </div>
      <div className="form-row">
        {/* Add button */}
        <div className="form-group col-md-6">
          <button 
            id="submit-btn" 
            className="samplebtn e-control e-btn e-primary e-submit-btn" 
            // onClick={this.onSubmitClick = this.onSubmitClick.bind(this)} 
            onClick={this.SubmitForm.bind(this)}
            // type="submit" 
            // data-ripple="true"
          >Add</button>
        </div>
        {/* Reset */}
        <div className="form-group col-md-6">
          <button 
            id="resetbtn" 
            className="samplebtn e-control e-btn e-reset-btn" 
            // type="reset" 
            // data-ripple="true"
            onClick={this.clearForm.bind(this)}
          >Clear</button>
        </div>
    </div>
  </div>
)}

form () {
    return (
    <div id="formComponents">
        {/* <h4 className="form-title">Add Course details</h4> */}
        <div className='validation_wrapper'>
            <form id="formId" className="form-horizontal">
                <div className="form-group">
                    {this.content2()}
                </div>
                <div className="form-group">
                    <div className="e-float-input">
                        <input type="text" id="name" name="name" data-msg-containerid="nameError"/>
                        <span className="e-float-line"/>
                        <label className="e-float-text e-label-top" htmlFor="name">Course Name</label>
                    </div>
                    <div id="nameError"/>
                </div>
                <div className="form-group">
                    <div className="e-float-input">
                        <input type="text" id="location" name="user" data-msg-containerid="nameError"/>
                        <span className="e-float-line"/>
                        <label className="e-float-text e-label-top" htmlFor="name">Location</label>
                    </div>
                    <div id="nameError"/>
                </div>
                <div className="form-group">
                    <div style={{ display: 'inline-block' }} className='datetimepicker-control-section'>
                        <div className="e-float-input">
                            <label className="e-float-text e-label-top" id="label_StartTime" htmlFor='start'>Start</label>                
                            <DateTimePickerComponent 
                                style={{paddingTop: '25px'}}
                                change={this.onChange3.bind(this)} 
                                // id="calendar" 
                                id='start'
                                min={this.minDate} 
                                max={this.maxDate} 
                                value={this.dateValueStart} 
                                ref={calendar => this.datetimepickerInstance = calendar}
                            ></DateTimePickerComponent>
                        </div>
                    </div>
                    <div style={{ display: 'inline-block', padding:'30px' }}>-</div>
                    <div style={{ display: 'inline-block' }} className='datetimepicker-control-section'>
                        <div className="e-float-input">
                            <label className="e-float-text e-label-top" id="label_StartTime" htmlFor='end'>End</label>                
                            <DateTimePickerComponent 
                                style={{paddingTop: '25px'}}
                                change={this.onChange4.bind(this)} 
                                // id="calendar" 
                                id='end'
                                min={this.minDate} 
                                max={this.maxDate} 
                                value={this.dateValueEnd} 
                                ref={calendar => this.datetimepickerInstance = calendar}
                            ></DateTimePickerComponent>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className='RecurrenceEditor'>
                        <RecurrenceEditorComponent id='RecurrenceEditor' ref={t => this.recObject = t} change={this.onChange.bind(this)}></RecurrenceEditorComponent>
                    </div>
                </div>
                <br />
                <br />  
            </form>
            <div className="row">
                    <div className="submitRow">
                        <div style={{ display: 'inline-block' }}>
                            <button 
                                id="submit-btn" 
                                className="samplebtn e-control e-btn e-primary e-submit-btn" 
                                // onClick={this.onSubmitClick = this.onSubmitClick.bind(this)} 
                                onClick={console.log('iiiiiiiiiiiii')}
                                // type="submit" 
                                // data-ripple="true"
                            >Add</button>
                        </div>
                        <div style={{ float: 'right' }}>
                            <button 
                                id="resetbtn" 
                                className="samplebtn e-control e-btn e-reset-btn" 
                                // type="reset" 
                                // data-ripple="true"
                            >Clear</button>
                        </div>
                    </div>
                </div>
            <br />
            <br />       
        </div>
    </div>
    )
}

content4() {
  return (
    <div className="material body" id='myCalendar'>
            <div id="sample">
               <div className="schedule-control-section">
                 <div className="col-lg-12 control-section">
                   <div className="content-wrapper">
                     <div className="schedule-overview">
                        <div className="overview-header">
                           <div className="overview-titlebar">
                            <div className="left-panel">
                              <div
                                className="schedule-overview-title"
                                style={{ border: "1px solid transparent" }}
                              >
                                Varsity Connect
                              </div>
                            </div>
                            <div className="center-panel">
                              <ButtonComponent
                                id="timezoneBtn"
                                cssClass="title-bar-btn"
                                iconCss="e-icons e-schedule-timezone"
                                disabled={true}
                                content="UTC"
                              />
                              <ButtonComponent
                                id="timeBtn"
                                cssClass="title-bar-btn"
                                iconCss="e-icons e-schedule-clock"
                                disabled={true}
                                content="Time"
                              />
                            </div>
                            <div className="right-panel">
                              <div className="control-panel">
                                <ButtonComponent
                                  id="printBtn"
                                  cssClass="title-bar-btn"
                                  // iconCss="e-icons e-schedule-print"
                                  // onClick={this.buttonClick.bind(this)} id="dialogBtn"
                                  onClick={this.addTestExam.bind(this)}
                                  content="Add Activity"
                                />
                                <ButtonComponent
                                  id="printBtn"
                                  cssClass="title-bar-btn"
                                  // iconCss="e-icons e-schedule-print"
                                  onClick={this.addTestExam.bind(this)}
                                  content="Add Lecture"
                                />
                              </div>
                              <div className="control-panel">
                                <ButtonComponent
                                  id="printBtn"
                                  cssClass="title-bar-btn"
                                  iconCss="e-icons e-schedule-print"
                                  onClick={this.onPrint.bind(this)}
                                  content="Print"
                                />
                              </div>
                              <div
                                className="control-panel"
                                style={{
                                  display: "inline-flex",
                                  paddingLeft: "15px",
                                }}
                              >
                                <div
                                  className="e-icons e-schedule-import e-btn-icon e-icon-left"
                                  style={{ lineHeight: "40px" }}
                                ></div>
                                <UploaderComponent
                                  id="fileUpload"
                                  type="file"
                                  allowedExtensions=".ics"
                                  cssClass="calendar-import"
                                  buttons={{ browse: "Import" }}
                                  multiple={false}
                                  showFileList={false}
                                  selected={this.onImportClick.bind(this)}
                                />
                              </div>
                              <div className="control-panel">
                                <DropDownButtonComponent
                                  id="exporting"
                                  content="Export"
                                  items={this.exportItems}
                                  select={this.onExportClick.bind(this)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="overview-toolbar">
                          <div style={{ height: "70px", width: "calc(100% - 90px)" }}>
                            <ToolbarComponent
                              id="toolbar_options"
                              width="100%"
                              height={70}
                              overflowMode="Scrollable"
                              scrollStep={100}
                              created={() =>
                                setInterval(() => {
                                  this.updateLiveTime();
                                }, 1000)
                              }
                              clicked={this.onToolbarItemClicked.bind(this)}
                            >
                              <ItemsDirective>
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-add-event"
                                  tooltipText="New Event"
                                  text="New Event"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-add-recurrence-event"
                                  tooltipText="New Recurring Event"
                                  text="New Recurring Event"
                                />
                                <ItemDirective type="Separator" />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-day-view"
                                  tooltipText="Day"
                                  text="Day"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-week-view"
                                  tooltipText="Week"
                                  text="Week"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-workweek-view"
                                  tooltipText="WorkWeek"
                                  text="WorkWeek"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-month-view"
                                  tooltipText="Month"
                                  text="Month"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-year-view"
                                  tooltipText="Year"
                                  text="Year"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-agenda-view"
                                  tooltipText="Agenda"
                                  text="Agenda"
                                />
                                <ItemDirective
                                  tooltipText="Timeline Views"
                                  text="Timeline Views"
                                  template={this.timelineTemplate.bind(this)}
                                />
                                <ItemDirective type="Separator" />
                                <ItemDirective
                                  tooltipText="Grouping"
                                  text="Grouping"
                                  template={this.groupTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Gridlines"
                                  text="Gridlines"
                                  template={this.gridlineTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Row Auto Height"
                                  text="Row Auto Height"
                                  template={this.autoHeightTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Tooltip"
                                  text="Tooltip"
                                  template={this.tooltipTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Allow Multi Drag"
                                  text="Allow Multi Drag"
                                  template={this.multiDragTemplate.bind(this)}
                                />
                              </ItemsDirective>
                            </ToolbarComponent>
                          </div>
                          <div style={{ height: "70px", width: "90px" }}>
                            <ButtonComponent
                              id="settingsBtn"
                              cssClass="overview-toolbar-settings"
                              iconCss="e-icons e-schedule-toolbar-settings"
                              iconPosition="Top"
                              content="Settings"
                              onClick={() => {
                                let settingsPanel = document.querySelector(
                                  ".overview-content .right-panel"
                                );
                                if (settingsPanel.classList.contains("hide")) {
                                  removeClass([settingsPanel], "hide");
                                } else {
                                  addClass([settingsPanel], "hide");
                                }
                                this.scheduleObj.refreshEvents();
                              }}
                            />
                          </div>
                        </div>
                        <div className="overview-content">
                          <div className="left-panel">
                            <div className="overview-scheduler">
                              <ScheduleComponent
                                id="scheduler"
                                cssClass="schedule-overview"
                                ref={(schedule) => (this.scheduleObj = schedule)}
                                width="100%"
                                height="100%"
                                group={{ resources: ["Calendars"] }}
                                timezone="UTC"
                                eventSettings={{
                                  dataSource:this.state.calendarEvents
                                }}
                                dateHeaderTemplate={this.dateHeaderTemplate.bind(
                                  this
                                )}
                                quickInfoTemplates={{
                                  header: this.headerTemplate.bind(this),
                                  content: this.contentTemplate.bind(this),
                                  footer: this.footerTemplate.bind(this),
                                }}
                              >
                                <ResourcesDirective>
                                  <ResourceDirective
                                    field="CalendarId"
                                    title="Calendars"
                                    name="Calendars"
                                    dataSource={this.calendarCollections}
                                    query={new Query().where(
                                      "CalendarId",
                                      "equal",
                                      1
                                    )}
                                    textField="CalendarText"
                                    idField="CalendarId"
                                    colorField="CalendarColor"
                                  ></ResourceDirective>
                                </ResourcesDirective>
                                <ViewsDirective>
                                  <ViewDirective option="Day" />
                                  <ViewDirective option="Week" />
                                  <ViewDirective option="WorkWeek" />
                                  <ViewDirective option="Month" />
                                  <ViewDirective option="Year" />
                                  <ViewDirective option="Agenda" />
                                  <ViewDirective option="TimelineDay" />
                                  <ViewDirective option="TimelineWeek" />
                                  <ViewDirective option="TimelineWorkWeek" />
                                  <ViewDirective option="TimelineMonth" />
                                  <ViewDirective option="TimelineYear" />
                                </ViewsDirective>
                                <Inject
                                  services={[
                                    Day,
                                    Week,
                                    WorkWeek,
                                    Month,
                                    Year,
                                    Agenda,
                                    TimelineViews,
                                    TimelineMonth,
                                    TimelineYear,
                                    DragAndDrop,
                                    Resize,
                                    Print,
                                    ExcelExport,
                                    ICalendarImport,
                                    ICalendarExport,
                                  ]}
                                />
                              </ScheduleComponent>
                              <ContextMenuComponent
                                id="ContextMenu"
                                cssClass="schedule-context-menu"
                                ref={(menu) => (this.contextMenuObj = menu)}
                                target=".e-schedule"
                                items={this.contextMenuItems}
                                beforeOpen={(args) => {
                                  let newEventElement =
                                    document.querySelector(".e-new-event");
                                  if (newEventElement) {
                                    remove(newEventElement);
                                    removeClass(
                                      [document.querySelector(".e-selected-cell")],
                                      "e-selected-cell"
                                    );
                                  }
                                  let targetElement = args.event.target;
                                  if (closest(targetElement, ".e-contextmenu")) {
                                    return;
                                  }
                                  this.selectedTarget = closest(
                                    targetElement,
                                    ".e-appointment,.e-work-cells,.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells"
                                  );
                                  if (isNullOrUndefined(this.selectedTarget)) {
                                    args.cancel = true;
                                    return;
                                  }
                                  if (
                                    this.selectedTarget.classList.contains(
                                      "e-appointment"
                                    )
                                  ) {
                                    let eventObj = this.scheduleObj.getEventDetails(
                                      this.selectedTarget
                                    );
                                    if (eventObj.RecurrenceRule) {
                                      this.contextMenuObj.showItems(
                                        [
                                          "EditRecurrenceEvent",
                                          "DeleteRecurrenceEvent",
                                        ],
                                        true
                                      );
                                      this.contextMenuObj.hideItems(
                                        [
                                          "Add",
                                          "AddRecurrence",
                                          "Today",
                                          "Save",
                                          "Delete",
                                        ],
                                        true
                                      );
                                    } else {
                                      this.contextMenuObj.showItems(
                                        ["Save", "Delete"],
                                        true
                                      );
                                      this.contextMenuObj.hideItems(
                                        [
                                          "Add",
                                          "AddRecurrence",
                                          "Today",
                                          "EditRecurrenceEvent",
                                          "DeleteRecurrenceEvent",
                                        ],
                                        true
                                      );
                                    }
                                    return;
                                  }
                                  this.contextMenuObj.hideItems(
                                    [
                                      "Save",
                                      "Delete",
                                      "EditRecurrenceEvent",
                                      "DeleteRecurrenceEvent",
                                    ],
                                    true
                                  );
                                  this.contextMenuObj.showItems(
                                    ["Add", "AddRecurrence", "Today"],
                                    true
                                  );
                                }}
                                select={(args) => {
                                  let selectedMenuItem = args.item.id;
                                  let eventObj = {};
                                  if (
                                    this.selectedTarget &&
                                    this.selectedTarget.classList.contains(
                                      "e-appointment"
                                    )
                                  ) {
                                    eventObj = this.scheduleObj.getEventDetails(
                                      this.selectedTarget
                                    );
                                  }
                                  switch (selectedMenuItem) {
                                    case "Today":
                                      this.scheduleObj.selectedDate = new Date();
                                      break;
                                    case "Add":
                                    case "AddRecurrence":
                                      let selectedCells =
                                        this.scheduleObj.getSelectedElements();
                                      let activeCellsData =
                                        this.scheduleObj.getCellDetails(
                                          selectedCells.length > 0
                                            ? selectedCells
                                            : this.selectedTarget
                                        );
                                      if (selectedMenuItem === "Add") {
                                        this.scheduleObj.openEditor(
                                          activeCellsData,
                                          "Add"
                                        );
                                      } else {
                                        this.scheduleObj.openEditor(
                                          activeCellsData,
                                          "Add",
                                          false,
                                          1
                                        );
                                      }
                                      break;
                                    case "Save":
                                    case "EditOccurrence":
                                    case "EditSeries":
                                      if (selectedMenuItem === "EditSeries") {
                                        let query = new Query().where(
                                          this.scheduleObj.eventFields.id,
                                          "equal",
                                          eventObj.RecurrenceID
                                        );
                                        eventObj = new DataManager(
                                          this.scheduleObj.eventsData
                                        ).executeLocal(query)[0];
                                      }
                                      this.scheduleObj.openEditor(
                                        eventObj,
                                        selectedMenuItem
                                      );
                                      break;
                                    case "Delete":
                                      this.scheduleObj.deleteEvent(eventObj);
                                      break;
                                    case "DeleteOccurrence":
                                    case "DeleteSeries":
                                      this.scheduleObj.deleteEvent(
                                        eventObj,
                                        selectedMenuItem
                                      );
                                      break;
                                  }
                                }}
                              ></ContextMenuComponent>
                            </div>
                          </div>
                          <div className="right-panel hide">
                            <div className="control-panel e-css">
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    First Day of Week
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="weekFirstDay"
                                    width={170}
                                    dataSource={this.weekDays}
                                    fields={{ text: "text", value: "value" }}
                                    value={0}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.firstDayOfWeek = args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Work week
                                  </label>
                                </div>
                                <div className="col-right">
                                  <MultiSelectComponent
                                    id="workWeekDays"
                                    cssClass="schedule-workweek"
                                    width={170}
                                    dataSource={this.weekDays}
                                    mode="CheckBox"
                                    fields={{ text: "text", value: "value" }}
                                    enableSelectionOrder={false}
                                    showClearButton={false}
                                    showDropDownIcon={true}
                                    popupHeight={150}
                                    value={[1, 2, 3, 4, 5]}
                                    change={(args) =>
                                      (this.scheduleObj.workDays = args.value)
                                    }
                                  >
                                    <Inject services={[CheckBoxSelection]} />
                                  </MultiSelectComponent>
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Resources
                                  </label>
                                </div>
                                <div className="col-right">
                                  <MultiSelectComponent
                                    id="resources"
                                    cssClass="schedule-resource"
                                    width={170}
                                    dataSource={this.calendarCollections}
                                    mode="CheckBox"
                                    fields={{
                                      text: "CalendarText",
                                      value: "CalendarId",
                                    }}
                                    enableSelectionOrder={false}
                                    showClearButton={false}
                                    showDropDownIcon={true}
                                    popupHeight={150}
                                    value={[1]}
                                    change={this.onResourceChange.bind(this)}
                                  >
                                    <Inject services={[CheckBoxSelection]} />
                                  </MultiSelectComponent>
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Timezone
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="timezone"
                                    width={170}
                                    dataSource={this.timezoneData}
                                    fields={{ text: "text", value: "value" }}
                                    value="Etc/GMT"
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timezone = args.value;
                                      this.updateLiveTime();
                                      document.querySelector(
                                        ".schedule-overview #timezoneBtn"
                                      ).innerHTML =
                                        '<span class="e-btn-icon e-icons e-schedule-timezone e-icon-left"></span>' +
                                        args.itemData.text;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Day Start Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="dayStartHour"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(0, 0, 0))}
                                    change={(args) =>
                                      (this.scheduleObj.startHour =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Day End Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="dayEndHour"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(23, 59, 59))}
                                    change={(args) =>
                                      (this.scheduleObj.endHour =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Work Start Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="workHourStart"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(9, 0, 0))}
                                    change={(args) =>
                                      (this.scheduleObj.workHours.start =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Work End Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="workHourEnd"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(18, 0, 0))}
                                    change={(args) =>
                                      (this.scheduleObj.workHours.end =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Slot Duration
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="slotDuration"
                                    width={170}
                                    dataSource={this.majorSlotData}
                                    fields={{ text: "Name", value: "Value" }}
                                    value={60}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timeScale.interval =
                                        args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Slot Interval
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="slotInterval"
                                    width={170}
                                    dataSource={this.minorSlotData}
                                    value={2}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timeScale.slotCount =
                                        args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Time Format
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="timeFormat"
                                    width={170}
                                    dataSource={this.timeFormatData}
                                    fields={{ text: "Name", value: "Value" }}
                                    value={"hh:mm a"}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timeFormat = args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Week Numbers
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="weekNumber"
                                    width={170}
                                    dataSource={this.weekNumberData}
                                    fields={{ text: "Name", value: "Value" }}
                                    value={"Off"}
                                    popupHeight={150}
                                    change={(args) => {
                                      if (args.value == "Off") {
                                        this.scheduleObj.showWeekNumber = false;
                                      } else {
                                        this.scheduleObj.showWeekNumber = true;
                                        this.scheduleObj.weekRule = args.value;
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    let renderContainer = <div>Loading events...</div> //By default don't render anything
    
    if(this.state.render) { //If this.state.render == true, which is set to true by the timer.
    console.log("render...", this.state.calendarEvents, 'render------------'); 
      // renderContainer = <div>Look at me! I'm content!</div> //Add dom elements
      renderContainer = 
        <div className="material body" id='myCalendar'>
            <div id="sample">
               <div className="schedule-control-section">
                 <div className="col-lg-12 control-section">
                   <div className="content-wrapper">
                     <div className="schedule-overview">
                        <div className="overview-header">
                           <div className="overview-titlebar">
                            <div className="left-panel">
                              <div
                                className="schedule-overview-title"
                                style={{ border: "1px solid transparent" }}
                              >
                                Varsity Connect
                              </div>
                            </div>
                            <div className="center-panel">
                              <ButtonComponent
                                id="timezoneBtn"
                                cssClass="title-bar-btn"
                                iconCss="e-icons e-schedule-timezone"
                                disabled={true}
                                content="UTC"
                              />
                              <ButtonComponent
                                id="timeBtn"
                                cssClass="title-bar-btn"
                                iconCss="e-icons e-schedule-clock"
                                disabled={true}
                                content="Time"
                              />
                            </div>
                            <div className="right-panel">
                              <div className="control-panel">
                                <ButtonComponent
                                  id="printBtn"
                                  cssClass="title-bar-btn"
                                  // iconCss="e-icons e-schedule-print"
                                  // onClick={this.buttonClick.bind(this)} id="dialogBtn"
                                  onClick={this.addTestExam.bind(this)}
                                  content="Add Activity"
                                />
                                <ButtonComponent
                                  id="printBtn"
                                  cssClass="title-bar-btn"
                                  // iconCss="e-icons e-schedule-print"
                                  onClick={this.addTestExam.bind(this)}
                                  content="Add Lecture"
                                />
                              </div>
                              <div className="control-panel">
                                <ButtonComponent
                                  id="printBtn"
                                  cssClass="title-bar-btn"
                                  iconCss="e-icons e-schedule-print"
                                  onClick={this.onPrint.bind(this)}
                                  content="Print"
                                />
                              </div>
                              <div
                                className="control-panel"
                                style={{
                                  display: "inline-flex",
                                  paddingLeft: "15px",
                                }}
                              >
                                <div
                                  className="e-icons e-schedule-import e-btn-icon e-icon-left"
                                  style={{ lineHeight: "40px" }}
                                ></div>
                                <UploaderComponent
                                  id="fileUpload"
                                  type="file"
                                  allowedExtensions=".ics"
                                  cssClass="calendar-import"
                                  buttons={{ browse: "Import" }}
                                  multiple={false}
                                  showFileList={false}
                                  selected={this.onImportClick.bind(this)}
                                />
                              </div>
                              <div className="control-panel">
                                <DropDownButtonComponent
                                  id="exporting"
                                  content="Export"
                                  items={this.exportItems}
                                  select={this.onExportClick.bind(this)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="overview-toolbar">
                          <div style={{ height: "70px", width: "calc(100% - 90px)" }}>
                            <ToolbarComponent
                              id="toolbar_options"
                              width="100%"
                              height={70}
                              overflowMode="Scrollable"
                              scrollStep={100}
                              created={() =>
                                setInterval(() => {
                                  this.updateLiveTime();
                                }, 1000)
                              }
                              clicked={this.onToolbarItemClicked.bind(this)}
                            >
                              <ItemsDirective>
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-add-event"
                                  tooltipText="New Event"
                                  text="New Event"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-add-recurrence-event"
                                  tooltipText="New Recurring Event"
                                  text="New Recurring Event"
                                />
                                <ItemDirective type="Separator" />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-day-view"
                                  tooltipText="Day"
                                  text="Day"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-week-view"
                                  tooltipText="Week"
                                  text="Week"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-workweek-view"
                                  tooltipText="WorkWeek"
                                  text="WorkWeek"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-month-view"
                                  tooltipText="Month"
                                  text="Month"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-year-view"
                                  tooltipText="Year"
                                  text="Year"
                                />
                                <ItemDirective
                                  prefixIcon="e-icons e-schedule-agenda-view"
                                  tooltipText="Agenda"
                                  text="Agenda"
                                />
                                <ItemDirective
                                  tooltipText="Timeline Views"
                                  text="Timeline Views"
                                  template={this.timelineTemplate.bind(this)}
                                />
                                <ItemDirective type="Separator" />
                                <ItemDirective
                                  tooltipText="Grouping"
                                  text="Grouping"
                                  template={this.groupTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Gridlines"
                                  text="Gridlines"
                                  template={this.gridlineTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Row Auto Height"
                                  text="Row Auto Height"
                                  template={this.autoHeightTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Tooltip"
                                  text="Tooltip"
                                  template={this.tooltipTemplate.bind(this)}
                                />
                                <ItemDirective
                                  tooltipText="Allow Multi Drag"
                                  text="Allow Multi Drag"
                                  template={this.multiDragTemplate.bind(this)}
                                />
                              </ItemsDirective>
                            </ToolbarComponent>
                          </div>
                          <div style={{ height: "70px", width: "90px" }}>
                            <ButtonComponent
                              id="settingsBtn"
                              cssClass="overview-toolbar-settings"
                              iconCss="e-icons e-schedule-toolbar-settings"
                              iconPosition="Top"
                              content="Settings"
                              onClick={() => {
                                let settingsPanel = document.querySelector(
                                  ".overview-content .right-panel"
                                );
                                if (settingsPanel.classList.contains("hide")) {
                                  removeClass([settingsPanel], "hide");
                                } else {
                                  addClass([settingsPanel], "hide");
                                }
                                this.scheduleObj.refreshEvents();
                              }}
                            />
                          </div>
                        </div>
                        <div className="overview-content">
                          <div className="left-panel">
                            <div className="overview-scheduler">
                              <ScheduleComponent
                                id="scheduler"
                                cssClass="schedule-overview"
                                ref={(schedule) => (this.scheduleObj = schedule)}
                                width="100%"
                                height="100%"
                                group={{ resources: ["Calendars"] }}
                                timezone="UTC"
                                eventSettings={{
                                  dataSource:this.state.calendarEvents
                                }} 
                                dateHeaderTemplate={this.dateHeaderTemplate.bind(
                                  this
                                )}
                                quickInfoTemplates={{
                                  header: this.headerTemplate.bind(this),
                                  content: this.contentTemplate.bind(this),
                                  footer: this.footerTemplate.bind(this),
                                }}
                              >
                                <ResourcesDirective>
                                  <ResourceDirective
                                    field="CalendarId"
                                    title="Calendars"
                                    name="Calendars"
                                    dataSource={this.calendarCollections}
                                    query={new Query().where(
                                      "CalendarId",
                                      "equal",
                                      1
                                    )}
                                    textField="CalendarText"
                                    idField="CalendarId"
                                    colorField="CalendarColor"
                                  ></ResourceDirective>
                                </ResourcesDirective>
                                <ViewsDirective>
                                  <ViewDirective option="Day" />
                                  <ViewDirective option="Week" />
                                  <ViewDirective option="WorkWeek" />
                                  <ViewDirective option="Month" />
                                  <ViewDirective option="Year" />
                                  <ViewDirective option="Agenda" />
                                  <ViewDirective option="TimelineDay" />
                                  <ViewDirective option="TimelineWeek" />
                                  <ViewDirective option="TimelineWorkWeek" />
                                  <ViewDirective option="TimelineMonth" />
                                  <ViewDirective option="TimelineYear" />
                                </ViewsDirective>
                                <Inject
                                  services={[
                                    Day,
                                    Week,
                                    WorkWeek,
                                    Month,
                                    Year,
                                    Agenda,
                                    TimelineViews,
                                    TimelineMonth,
                                    TimelineYear,
                                    DragAndDrop,
                                    Resize,
                                    Print,
                                    ExcelExport,
                                    ICalendarImport,
                                    ICalendarExport,
                                  ]}
                                />
                              </ScheduleComponent>
                              <ContextMenuComponent
                                id="ContextMenu"
                                cssClass="schedule-context-menu"
                                ref={(menu) => (this.contextMenuObj = menu)}
                                target=".e-schedule"
                                items={this.contextMenuItems}
                                beforeOpen={(args) => {
                                  let newEventElement =
                                    document.querySelector(".e-new-event");
                                  if (newEventElement) {
                                    remove(newEventElement);
                                    removeClass(
                                      [document.querySelector(".e-selected-cell")],
                                      "e-selected-cell"
                                    );
                                  }
                                  let targetElement = args.event.target;
                                  if (closest(targetElement, ".e-contextmenu")) {
                                    return;
                                  }
                                  this.selectedTarget = closest(
                                    targetElement,
                                    ".e-appointment,.e-work-cells,.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells"
                                  );
                                  if (isNullOrUndefined(this.selectedTarget)) {
                                    args.cancel = true;
                                    return;
                                  }
                                  if (
                                    this.selectedTarget.classList.contains(
                                      "e-appointment"
                                    )
                                  ) {
                                    let eventObj = this.scheduleObj.getEventDetails(
                                      this.selectedTarget
                                    );
                                    if (eventObj.RecurrenceRule) {
                                      this.contextMenuObj.showItems(
                                        [
                                          "EditRecurrenceEvent",
                                          "DeleteRecurrenceEvent",
                                        ],
                                        true
                                      );
                                      this.contextMenuObj.hideItems(
                                        [
                                          "Add",
                                          "AddRecurrence",
                                          "Today",
                                          "Save",
                                          "Delete",
                                        ],
                                        true
                                      );
                                    } else {
                                      this.contextMenuObj.showItems(
                                        ["Save", "Delete"],
                                        true
                                      );
                                      this.contextMenuObj.hideItems(
                                        [
                                          "Add",
                                          "AddRecurrence",
                                          "Today",
                                          "EditRecurrenceEvent",
                                          "DeleteRecurrenceEvent",
                                        ],
                                        true
                                      );
                                    }
                                    return;
                                  }
                                  this.contextMenuObj.hideItems(
                                    [
                                      "Save",
                                      "Delete",
                                      "EditRecurrenceEvent",
                                      "DeleteRecurrenceEvent",
                                    ],
                                    true
                                  );
                                  this.contextMenuObj.showItems(
                                    ["Add", "AddRecurrence", "Today"],
                                    true
                                  );
                                }}
                                select={(args) => {
                                  let selectedMenuItem = args.item.id;
                                  let eventObj = {};
                                  if (
                                    this.selectedTarget &&
                                    this.selectedTarget.classList.contains(
                                      "e-appointment"
                                    )
                                  ) {
                                    eventObj = this.scheduleObj.getEventDetails(
                                      this.selectedTarget
                                    );
                                  }
                                  switch (selectedMenuItem) {
                                    case "Today":
                                      this.scheduleObj.selectedDate = new Date();
                                      break;
                                    case "Add":
                                    case "AddRecurrence":
                                      let selectedCells =
                                        this.scheduleObj.getSelectedElements();
                                      let activeCellsData =
                                        this.scheduleObj.getCellDetails(
                                          selectedCells.length > 0
                                            ? selectedCells
                                            : this.selectedTarget
                                        );
                                      if (selectedMenuItem === "Add") {
                                        this.scheduleObj.openEditor(
                                          activeCellsData,
                                          "Add"
                                        );
                                      } else {
                                        this.scheduleObj.openEditor(
                                          activeCellsData,
                                          "Add",
                                          false,
                                          1
                                        );
                                      }
                                      break;
                                    case "Save":
                                    case "EditOccurrence":
                                    case "EditSeries":
                                      if (selectedMenuItem === "EditSeries") {
                                        let query = new Query().where(
                                          this.scheduleObj.eventFields.id,
                                          "equal",
                                          eventObj.RecurrenceID
                                        );
                                        eventObj = new DataManager(
                                          this.scheduleObj.eventsData
                                        ).executeLocal(query)[0];
                                      }
                                      this.scheduleObj.openEditor(
                                        eventObj,
                                        selectedMenuItem
                                      );
                                      break;
                                    case "Delete":
                                      this.scheduleObj.deleteEvent(eventObj);
                                      break;
                                    case "DeleteOccurrence":
                                    case "DeleteSeries":
                                      this.scheduleObj.deleteEvent(
                                        eventObj,
                                        selectedMenuItem
                                      );
                                      break;
                                  }
                                }}
                              ></ContextMenuComponent>
                            </div>
                          </div>
                          <div className="right-panel hide">
                            <div className="control-panel e-css">
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    First Day of Week
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="weekFirstDay"
                                    width={170}
                                    dataSource={this.weekDays}
                                    fields={{ text: "text", value: "value" }}
                                    value={0}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.firstDayOfWeek = args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Work week
                                  </label>
                                </div>
                                <div className="col-right">
                                  <MultiSelectComponent
                                    id="workWeekDays"
                                    cssClass="schedule-workweek"
                                    width={170}
                                    dataSource={this.weekDays}
                                    mode="CheckBox"
                                    fields={{ text: "text", value: "value" }}
                                    enableSelectionOrder={false}
                                    showClearButton={false}
                                    showDropDownIcon={true}
                                    popupHeight={150}
                                    value={[1, 2, 3, 4, 5]}
                                    change={(args) =>
                                      (this.scheduleObj.workDays = args.value)
                                    }
                                  >
                                    <Inject services={[CheckBoxSelection]} />
                                  </MultiSelectComponent>
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Resources
                                  </label>
                                </div>
                                <div className="col-right">
                                  <MultiSelectComponent
                                    id="resources"
                                    cssClass="schedule-resource"
                                    width={170}
                                    dataSource={this.calendarCollections}
                                    mode="CheckBox"
                                    fields={{
                                      text: "CalendarText",
                                      value: "CalendarId",
                                    }}
                                    enableSelectionOrder={false}
                                    showClearButton={false}
                                    showDropDownIcon={true}
                                    popupHeight={150}
                                    value={[1]}
                                    change={this.onResourceChange.bind(this)}
                                  >
                                    <Inject services={[CheckBoxSelection]} />
                                  </MultiSelectComponent>
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Timezone
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="timezone"
                                    width={170}
                                    dataSource={this.timezoneData}
                                    fields={{ text: "text", value: "value" }}
                                    value="Etc/GMT"
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timezone = args.value;
                                      this.updateLiveTime();
                                      document.querySelector(
                                        ".schedule-overview #timezoneBtn"
                                      ).innerHTML =
                                        '<span class="e-btn-icon e-icons e-schedule-timezone e-icon-left"></span>' +
                                        args.itemData.text;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Day Start Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="dayStartHour"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(0, 0, 0))}
                                    change={(args) =>
                                      (this.scheduleObj.startHour =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Day End Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="dayEndHour"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(23, 59, 59))}
                                    change={(args) =>
                                      (this.scheduleObj.endHour =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Work Start Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="workHourStart"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(9, 0, 0))}
                                    change={(args) =>
                                      (this.scheduleObj.workHours.start =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Work End Hour
                                  </label>
                                </div>
                                <div className="col-right">
                                  <TimePickerComponent
                                    id="workHourEnd"
                                    width={170}
                                    showClearButton={false}
                                    value={new Date(new Date().setHours(18, 0, 0))}
                                    change={(args) =>
                                      (this.scheduleObj.workHours.end =
                                        this.intl.formatDate(args.value, {
                                          skeleton: "Hm",
                                        }))
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Slot Duration
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="slotDuration"
                                    width={170}
                                    dataSource={this.majorSlotData}
                                    fields={{ text: "Name", value: "Value" }}
                                    value={60}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timeScale.interval =
                                        args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Slot Interval
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="slotInterval"
                                    width={170}
                                    dataSource={this.minorSlotData}
                                    value={2}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timeScale.slotCount =
                                        args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Time Format
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="timeFormat"
                                    width={170}
                                    dataSource={this.timeFormatData}
                                    fields={{ text: "Name", value: "Value" }}
                                    value={"hh:mm a"}
                                    popupHeight={150}
                                    change={(args) => {
                                      this.scheduleObj.timeFormat = args.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-row">
                                <div className="col-left">
                                  <label style={{ lineHeight: "34px", margin: "0" }}>
                                    Week Numbers
                                  </label>
                                </div>
                                <div className="col-right">
                                  <DropDownListComponent
                                    id="weekNumber"
                                    width={170}
                                    dataSource={this.weekNumberData}
                                    fields={{ text: "Name", value: "Value" }}
                                    value={"Off"}
                                    popupHeight={150}
                                    change={(args) => {
                                      if (args.value == "Off") {
                                        this.scheduleObj.showWeekNumber = false;
                                      } else {
                                        this.scheduleObj.showWeekNumber = true;
                                        this.scheduleObj.weekRule = args.value;
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      let renderContainer2 = 
          <div>
            <TabComponent id="tab-wizard" ref={(tab) => { this.tabObj = tab; }}>
                  <TabItemsDirective>
                    <TabItemDirective header={this.headerText[0]} content={this.content4.bind(this)}/>
                    <TabItemDirective header={this.headerText[1]} content={this.content0.bind(this)}/>                   
                    <TabItemDirective header={this.headerText[2]} content={this.content3.bind(this)}/>
                    {/* <TabItemDirective header={this.headerText[3]} content={this.content3.bind(this)}/>
                    <TabItemDirective header={this.headerText[4]} content={this.content4.bind(this)}/> */}
                  </TabItemsDirective>
                </TabComponent>
          </div>
  }
    return (
      renderContainer //Render the dom elements, or, when this.state == false, nothing.
    )
  }
}
export default Calendar;

//  render() {

//     console.log("render...");
//     // var data = this.generateEvents()
//     let data;

//     console.log("data before", data);
//     this.generateEvents().then((result) => {
//       console.log("date: ", new Date());
//       this.data = result;
//       data = result;
//       // for (let v = 0; v < result.length; v++) {
//       //   // this.scheduleObj.addEvent(result[v]);
//       //   // console.log(this.scheduleObj.addEvent)
//       // }
//       console.log("inside promise: ", this);
//       console.log("result, date: ", result, new Date());
//       console.log("hsssssjs", this.data);
//       console.log("hsssssjs", data);
//       console.log("out promise: ", this);
//       // while (true){}
//       // console.log('after while true')
//     });
//     console.log("data after", data);
//     // this.generateEvents().then((newData) => data = newData)
//     console.log("render...", data);
//     /**let generateEvents = () => {
//       let eventData = [];
//       let eventSubjects = [
//         "Bering Sea Gold",
//         "Technology",
//         "Maintenance",
//         "Meeting",
//         "Travelling",
//         "Annual Conference",
//         "Birthday Celebration",
//         "Farewell Celebration",
//         "Wedding Aniversary",
//         "Alaska: The Last Frontier",
//         "Deadest Catch",
//         "Sports Day",
//         "MoonShiners",
//         "Close Encounters",
//         "HighWay Thru Hell",
//         "Daily Planet",
//         "Cash Cab",
//         "Basketball Practice",
//         "Rugby Match",
//         "Guitar Class",
//         "Music Lessons",
//         "Doctor checkup",
//         "Brazil - Mexico",
//         "Opening ceremony",
//         "Final presentation",
//       ];
//       let weekDate = new Date(
//         new Date().setDate(new Date().getDate() - new Date().getDay())
//       );
//       let startDate = new Date(
//         weekDate.getFullYear(),
//         weekDate.getMonth(),
//         weekDate.getDate(),
//         10,
//         0
//       );
//       let endDate = new Date(
//         weekDate.getFullYear(),
//         weekDate.getMonth(),
//         weekDate.getDate(),
//         11,
//         30
//       );
//       eventData.push({
//         Id: 1,
//         Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
//         StartTime: startDate,
//         EndTime: endDate,
//         Location: "",
//         Description: "Event Scheduled",
//         RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;",
//         IsAllDay: false,
//         IsReadonly: false,
//         CalendarId: 1,
//       });
      
//       // let data = {
//       //   Id: 1,
//       //   Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
//       //   StartTime: startDate,
//       //   EndTime: endDate,
//       //   Location: "",
//       //   Description: "Event Scheduled",
//       //   RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;",
//       //   IsAllDay: false,
//       //   IsReadonly: false,
//       //   CalendarId: 1,
//       // }
//       // this.addData(data, 1);
//       console.log(this.state.hi)
//       for (let a = 0, id = 2; a < 500; a++) {
//         let month = Math.floor(Math.random() * (11 - 0 + 1) + 0);
//         let date = Math.floor(Math.random() * (28 - 1 + 1) + 1);
//         let hour = Math.floor(Math.random() * (23 - 0 + 1) + 0);
//         let minutes = Math.floor(Math.random() * (59 - 0 + 1) + 0);
//         let start = new Date(
//           new Date().getFullYear(),
//           month,
//           date,
//           hour,
//           minutes,
//           0
//         );
//         let end = new Date(start.getTime());
//         end.setHours(end.getHours() + 2);
//         let startDate = new Date(start.getTime());
//         let endDate = new Date(end.getTime());
//         eventData.push({
//           Id: id,
//           Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
//           StartTime: startDate,
//           EndTime: endDate,
//           Location: "",
//           Description: "Event Scheduled",
//           IsAllDay: id % 10 === 0,
//           IsReadonly: endDate < new Date(),
//           CalendarId: (a % 4) + 1,
//         });
//         // data = {
//         //   Id: id,
//         //   Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
//         //   StartTime: startDate,
//         //   EndTime: endDate,
//         //   Location: "",
//         //   Description: "Event Scheduled",
//         //   IsAllDay: id % 10 === 0,
//         //   IsReadonly: endDate < new Date(),
//         //   CalendarId: (a % 4) + 1,
//         // }
//         // this.addData(data, id);
//         id++;
//       }
//       console.log('eventdata: ', this.state.data)
      

//       if (Browser.isIE) {
//         Timezone.prototype.offset = (date, timezone) =>
//           tz.zone(timezone).utcOffset(date.getTime());
//       }
//       console.log('eventdata: ', eventData)
//       let overviewEvents = extend([], eventData, undefined, true);
//       let timezone = new Timezone();
//       let currentTimezone = timezone.getLocalTimezoneName();
//       for (let event of overviewEvents) {
//         event.StartTime = timezone.convert(
//           event.StartTime,
//           "UTC",
//           currentTimezone
//         );
//         event.EndTime = timezone.convert(event.EndTime, "UTC", currentTimezone);
//       }
//       return overviewEvents;
//     };**/
//     return (
//       <div className="material body">
//         <div id="sample">
//           <div className="schedule-control-section">
//             <div className="col-lg-12 control-section">
//               <div className="content-wrapper">
//                 <div className="schedule-overview">
//                   <div className="overview-header">
//                     <div className="overview-titlebar">
//                       <div className="left-panel">
//                         <div
//                           className="schedule-overview-title"
//                           style={{ border: "1px solid transparent" }}
//                         >
//                           Varsity Connect
//                         </div>
//                       </div>
//                       <div className="center-panel">
//                         <ButtonComponent
//                           id="timezoneBtn"
//                           cssClass="title-bar-btn"
//                           iconCss="e-icons e-schedule-timezone"
//                           disabled={true}
//                           content="UTC"
//                         />
//                         <ButtonComponent
//                           id="timeBtn"
//                           cssClass="title-bar-btn"
//                           iconCss="e-icons e-schedule-clock"
//                           disabled={true}
//                           content="Time"
//                         />
//                       </div>
//                       <div className="right-panel">
//                         <div className="control-panel">
//                           <ButtonComponent
//                             id="printBtn"
//                             cssClass="title-bar-btn"
//                             // iconCss="e-icons e-schedule-print"
//                             onClick={this.addTestExam.bind(this)}
//                             content="Add Text/Exam"
//                           />
//                         </div>
//                         {/* <div className="control-panel">
//                           <ButtonComponent
//                             id="printBtn"
//                             cssClass="title-bar-btn"
//                             iconCss="e-icons e-schedule-print"
//                             onClick={this.onPrint.bind(this)}
//                             content="Print"
//                           />
//                         </div> */}
//                         <div
//                           className="control-panel"
//                           style={{
//                             display: "inline-flex",
//                             paddingLeft: "15px",
//                           }}
//                         >
//                           <div
//                             className="e-icons e-schedule-import e-btn-icon e-icon-left"
//                             style={{ lineHeight: "40px" }}
//                           ></div>
//                           <UploaderComponent
//                             id="fileUpload"
//                             type="file"
//                             allowedExtensions=".ics"
//                             cssClass="calendar-import"
//                             buttons={{ browse: "Import" }}
//                             multiple={false}
//                             showFileList={false}
//                             selected={this.onImportClick.bind(this)}
//                           />
//                         </div>
//                         <div className="control-panel">
//                           <DropDownButtonComponent
//                             id="exporting"
//                             content="Export"
//                             items={this.exportItems}
//                             select={this.onExportClick.bind(this)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="overview-toolbar">
//                     <div style={{ height: "70px", width: "calc(100% - 90px)" }}>
//                       <ToolbarComponent
//                         id="toolbar_options"
//                         width="100%"
//                         height={70}
//                         overflowMode="Scrollable"
//                         scrollStep={100}
//                         created={() =>
//                           setInterval(() => {
//                             this.updateLiveTime();
//                           }, 1000)
//                         }
//                         clicked={this.onToolbarItemClicked.bind(this)}
//                       >
//                         <ItemsDirective>
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-add-event"
//                             tooltipText="New Event"
//                             text="New Event"
//                           />
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-add-recurrence-event"
//                             tooltipText="New Recurring Event"
//                             text="New Recurring Event"
//                           />
//                           <ItemDirective type="Separator" />
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-day-view"
//                             tooltipText="Day"
//                             text="Day"
//                           />
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-week-view"
//                             tooltipText="Week"
//                             text="Week"
//                           />
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-workweek-view"
//                             tooltipText="WorkWeek"
//                             text="WorkWeek"
//                           />
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-month-view"
//                             tooltipText="Month"
//                             text="Month"
//                           />
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-year-view"
//                             tooltipText="Year"
//                             text="Year"
//                           />
//                           <ItemDirective
//                             prefixIcon="e-icons e-schedule-agenda-view"
//                             tooltipText="Agenda"
//                             text="Agenda"
//                           />
//                           <ItemDirective
//                             tooltipText="Timeline Views"
//                             text="Timeline Views"
//                             template={this.timelineTemplate.bind(this)}
//                           />
//                           <ItemDirective type="Separator" />
//                           <ItemDirective
//                             tooltipText="Grouping"
//                             text="Grouping"
//                             template={this.groupTemplate.bind(this)}
//                           />
//                           <ItemDirective
//                             tooltipText="Gridlines"
//                             text="Gridlines"
//                             template={this.gridlineTemplate.bind(this)}
//                           />
//                           <ItemDirective
//                             tooltipText="Row Auto Height"
//                             text="Row Auto Height"
//                             template={this.autoHeightTemplate.bind(this)}
//                           />
//                           <ItemDirective
//                             tooltipText="Tooltip"
//                             text="Tooltip"
//                             template={this.tooltipTemplate.bind(this)}
//                           />
//                           <ItemDirective
//                             tooltipText="Allow Multi Drag"
//                             text="Allow Multi Drag"
//                             template={this.multiDragTemplate.bind(this)}
//                           />
//                         </ItemsDirective>
//                       </ToolbarComponent>
//                     </div>
//                     <div style={{ height: "70px", width: "90px" }}>
//                       <ButtonComponent
//                         id="settingsBtn"
//                         cssClass="overview-toolbar-settings"
//                         iconCss="e-icons e-schedule-toolbar-settings"
//                         iconPosition="Top"
//                         content="Settings"
//                         onClick={() => {
//                           let settingsPanel = document.querySelector(
//                             ".overview-content .right-panel"
//                           );
//                           if (settingsPanel.classList.contains("hide")) {
//                             removeClass([settingsPanel], "hide");
//                           } else {
//                             addClass([settingsPanel], "hide");
//                           }
//                           this.scheduleObj.refreshEvents();
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="overview-content">
//                     <div className="left-panel">
//                       <div className="overview-scheduler">
//                         <ScheduleComponent
//                           id="scheduler"
//                           cssClass="schedule-overview"
//                           ref={(schedule) => (this.scheduleObj = schedule)}
//                           width="100%"
//                           height="100%"
//                           group={{ resources: ["Calendars"] }}
//                           timezone="UTC"
//                           eventSettings={{
//                             dataSource: data,
//                           }} //this.state.calendarEvents }}//generateEvents() }}//
//                           dateHeaderTemplate={this.dateHeaderTemplate.bind(
//                             this
//                           )}
//                           quickInfoTemplates={{
//                             header: this.headerTemplate.bind(this),
//                             content: this.contentTemplate.bind(this),
//                             footer: this.footerTemplate.bind(this),
//                           }}
//                         >
//                           <ResourcesDirective>
//                             <ResourceDirective
//                               field="CalendarId"
//                               title="Calendars"
//                               name="Calendars"
//                               dataSource={this.calendarCollections}
//                               query={new Query().where(
//                                 "CalendarId",
//                                 "equal",
//                                 1
//                               )}
//                               textField="CalendarText"
//                               idField="CalendarId"
//                               colorField="CalendarColor"
//                             ></ResourceDirective>
//                           </ResourcesDirective>
//                           <ViewsDirective>
//                             <ViewDirective option="Day" />
//                             <ViewDirective option="Week" />
//                             <ViewDirective option="WorkWeek" />
//                             <ViewDirective option="Month" />
//                             <ViewDirective option="Year" />
//                             <ViewDirective option="Agenda" />
//                             <ViewDirective option="TimelineDay" />
//                             <ViewDirective option="TimelineWeek" />
//                             <ViewDirective option="TimelineWorkWeek" />
//                             <ViewDirective option="TimelineMonth" />
//                             <ViewDirective option="TimelineYear" />
//                           </ViewsDirective>
//                           <Inject
//                             services={[
//                               Day,
//                               Week,
//                               WorkWeek,
//                               Month,
//                               Year,
//                               Agenda,
//                               TimelineViews,
//                               TimelineMonth,
//                               TimelineYear,
//                               DragAndDrop,
//                               Resize,
//                               Print,
//                               ExcelExport,
//                               ICalendarImport,
//                               ICalendarExport,
//                             ]}
//                           />
//                         </ScheduleComponent>
//                         <ContextMenuComponent
//                           id="ContextMenu"
//                           cssClass="schedule-context-menu"
//                           ref={(menu) => (this.contextMenuObj = menu)}
//                           target=".e-schedule"
//                           items={this.contextMenuItems}
//                           beforeOpen={(args) => {
//                             let newEventElement =
//                               document.querySelector(".e-new-event");
//                             if (newEventElement) {
//                               remove(newEventElement);
//                               removeClass(
//                                 [document.querySelector(".e-selected-cell")],
//                                 "e-selected-cell"
//                               );
//                             }
//                             let targetElement = args.event.target;
//                             if (closest(targetElement, ".e-contextmenu")) {
//                               return;
//                             }
//                             this.selectedTarget = closest(
//                               targetElement,
//                               ".e-appointment,.e-work-cells,.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells"
//                             );
//                             if (isNullOrUndefined(this.selectedTarget)) {
//                               args.cancel = true;
//                               return;
//                             }
//                             if (
//                               this.selectedTarget.classList.contains(
//                                 "e-appointment"
//                               )
//                             ) {
//                               let eventObj = this.scheduleObj.getEventDetails(
//                                 this.selectedTarget
//                               );
//                               if (eventObj.RecurrenceRule) {
//                                 this.contextMenuObj.showItems(
//                                   [
//                                     "EditRecurrenceEvent",
//                                     "DeleteRecurrenceEvent",
//                                   ],
//                                   true
//                                 );
//                                 this.contextMenuObj.hideItems(
//                                   [
//                                     "Add",
//                                     "AddRecurrence",
//                                     "Today",
//                                     "Save",
//                                     "Delete",
//                                   ],
//                                   true
//                                 );
//                               } else {
//                                 this.contextMenuObj.showItems(
//                                   ["Save", "Delete"],
//                                   true
//                                 );
//                                 this.contextMenuObj.hideItems(
//                                   [
//                                     "Add",
//                                     "AddRecurrence",
//                                     "Today",
//                                     "EditRecurrenceEvent",
//                                     "DeleteRecurrenceEvent",
//                                   ],
//                                   true
//                                 );
//                               }
//                               return;
//                             }
//                             this.contextMenuObj.hideItems(
//                               [
//                                 "Save",
//                                 "Delete",
//                                 "EditRecurrenceEvent",
//                                 "DeleteRecurrenceEvent",
//                               ],
//                               true
//                             );
//                             this.contextMenuObj.showItems(
//                               ["Add", "AddRecurrence", "Today"],
//                               true
//                             );
//                           }}
//                           select={(args) => {
//                             let selectedMenuItem = args.item.id;
//                             let eventObj = {};
//                             if (
//                               this.selectedTarget &&
//                               this.selectedTarget.classList.contains(
//                                 "e-appointment"
//                               )
//                             ) {
//                               eventObj = this.scheduleObj.getEventDetails(
//                                 this.selectedTarget
//                               );
//                             }
//                             switch (selectedMenuItem) {
//                               case "Today":
//                                 this.scheduleObj.selectedDate = new Date();
//                                 break;
//                               case "Add":
//                               case "AddRecurrence":
//                                 let selectedCells =
//                                   this.scheduleObj.getSelectedElements();
//                                 let activeCellsData =
//                                   this.scheduleObj.getCellDetails(
//                                     selectedCells.length > 0
//                                       ? selectedCells
//                                       : this.selectedTarget
//                                   );
//                                 if (selectedMenuItem === "Add") {
//                                   this.scheduleObj.openEditor(
//                                     activeCellsData,
//                                     "Add"
//                                   );
//                                 } else {
//                                   this.scheduleObj.openEditor(
//                                     activeCellsData,
//                                     "Add",
//                                     false,
//                                     1
//                                   );
//                                 }
//                                 break;
//                               case "Save":
//                               case "EditOccurrence":
//                               case "EditSeries":
//                                 if (selectedMenuItem === "EditSeries") {
//                                   let query = new Query().where(
//                                     this.scheduleObj.eventFields.id,
//                                     "equal",
//                                     eventObj.RecurrenceID
//                                   );
//                                   eventObj = new DataManager(
//                                     this.scheduleObj.eventsData
//                                   ).executeLocal(query)[0];
//                                 }
//                                 this.scheduleObj.openEditor(
//                                   eventObj,
//                                   selectedMenuItem
//                                 );
//                                 break;
//                               case "Delete":
//                                 this.scheduleObj.deleteEvent(eventObj);
//                                 break;
//                               case "DeleteOccurrence":
//                               case "DeleteSeries":
//                                 this.scheduleObj.deleteEvent(
//                                   eventObj,
//                                   selectedMenuItem
//                                 );
//                                 break;
//                             }
//                           }}
//                         ></ContextMenuComponent>
//                       </div>
//                     </div>
//                     <div className="right-panel hide">
//                       <div className="control-panel e-css">
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               First Day of Week
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <DropDownListComponent
//                               id="weekFirstDay"
//                               width={170}
//                               dataSource={this.weekDays}
//                               fields={{ text: "text", value: "value" }}
//                               value={0}
//                               popupHeight={150}
//                               change={(args) => {
//                                 this.scheduleObj.firstDayOfWeek = args.value;
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Work week
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <MultiSelectComponent
//                               id="workWeekDays"
//                               cssClass="schedule-workweek"
//                               width={170}
//                               dataSource={this.weekDays}
//                               mode="CheckBox"
//                               fields={{ text: "text", value: "value" }}
//                               enableSelectionOrder={false}
//                               showClearButton={false}
//                               showDropDownIcon={true}
//                               popupHeight={150}
//                               value={[1, 2, 3, 4, 5]}
//                               change={(args) =>
//                                 (this.scheduleObj.workDays = args.value)
//                               }
//                             >
//                               <Inject services={[CheckBoxSelection]} />
//                             </MultiSelectComponent>
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Resources
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <MultiSelectComponent
//                               id="resources"
//                               cssClass="schedule-resource"
//                               width={170}
//                               dataSource={this.calendarCollections}
//                               mode="CheckBox"
//                               fields={{
//                                 text: "CalendarText",
//                                 value: "CalendarId",
//                               }}
//                               enableSelectionOrder={false}
//                               showClearButton={false}
//                               showDropDownIcon={true}
//                               popupHeight={150}
//                               value={[1]}
//                               change={this.onResourceChange.bind(this)}
//                             >
//                               <Inject services={[CheckBoxSelection]} />
//                             </MultiSelectComponent>
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Timezone
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <DropDownListComponent
//                               id="timezone"
//                               width={170}
//                               dataSource={this.timezoneData}
//                               fields={{ text: "text", value: "value" }}
//                               value="Etc/GMT"
//                               popupHeight={150}
//                               change={(args) => {
//                                 this.scheduleObj.timezone = args.value;
//                                 this.updateLiveTime();
//                                 document.querySelector(
//                                   ".schedule-overview #timezoneBtn"
//                                 ).innerHTML =
//                                   '<span class="e-btn-icon e-icons e-schedule-timezone e-icon-left"></span>' +
//                                   args.itemData.text;
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Day Start Hour
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <TimePickerComponent
//                               id="dayStartHour"
//                               width={170}
//                               showClearButton={false}
//                               value={new Date(new Date().setHours(0, 0, 0))}
//                               change={(args) =>
//                                 (this.scheduleObj.startHour =
//                                   this.intl.formatDate(args.value, {
//                                     skeleton: "Hm",
//                                   }))
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Day End Hour
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <TimePickerComponent
//                               id="dayEndHour"
//                               width={170}
//                               showClearButton={false}
//                               value={new Date(new Date().setHours(23, 59, 59))}
//                               change={(args) =>
//                                 (this.scheduleObj.endHour =
//                                   this.intl.formatDate(args.value, {
//                                     skeleton: "Hm",
//                                   }))
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Work Start Hour
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <TimePickerComponent
//                               id="workHourStart"
//                               width={170}
//                               showClearButton={false}
//                               value={new Date(new Date().setHours(9, 0, 0))}
//                               change={(args) =>
//                                 (this.scheduleObj.workHours.start =
//                                   this.intl.formatDate(args.value, {
//                                     skeleton: "Hm",
//                                   }))
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Work End Hour
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <TimePickerComponent
//                               id="workHourEnd"
//                               width={170}
//                               showClearButton={false}
//                               value={new Date(new Date().setHours(18, 0, 0))}
//                               change={(args) =>
//                                 (this.scheduleObj.workHours.end =
//                                   this.intl.formatDate(args.value, {
//                                     skeleton: "Hm",
//                                   }))
//                               }
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Slot Duration
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <DropDownListComponent
//                               id="slotDuration"
//                               width={170}
//                               dataSource={this.majorSlotData}
//                               fields={{ text: "Name", value: "Value" }}
//                               value={60}
//                               popupHeight={150}
//                               change={(args) => {
//                                 this.scheduleObj.timeScale.interval =
//                                   args.value;
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Slot Interval
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <DropDownListComponent
//                               id="slotInterval"
//                               width={170}
//                               dataSource={this.minorSlotData}
//                               value={2}
//                               popupHeight={150}
//                               change={(args) => {
//                                 this.scheduleObj.timeScale.slotCount =
//                                   args.value;
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Time Format
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <DropDownListComponent
//                               id="timeFormat"
//                               width={170}
//                               dataSource={this.timeFormatData}
//                               fields={{ text: "Name", value: "Value" }}
//                               value={"hh:mm a"}
//                               popupHeight={150}
//                               change={(args) => {
//                                 this.scheduleObj.timeFormat = args.value;
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="col-row">
//                           <div className="col-left">
//                             <label style={{ lineHeight: "34px", margin: "0" }}>
//                               Week Numbers
//                             </label>
//                           </div>
//                           <div className="col-right">
//                             <DropDownListComponent
//                               id="weekNumber"
//                               width={170}
//                               dataSource={this.weekNumberData}
//                               fields={{ text: "Name", value: "Value" }}
//                               value={"Off"}
//                               popupHeight={150}
//                               change={(args) => {
//                                 if (args.value == "Off") {
//                                   this.scheduleObj.showWeekNumber = false;
//                                 } else {
//                                   this.scheduleObj.showWeekNumber = true;
//                                   this.scheduleObj.weekRule = args.value;
//                                 }
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Calendar;
