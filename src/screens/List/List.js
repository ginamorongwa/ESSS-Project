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
import { Base } from "../Calendar/Base";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from '../../API/FirebaseAPI' //"../../api/collections";
import firebase from "firebase";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject as Inject2, Page, Edit,Toolbar as Toolbar2, CommandColumn } from '@syncfusion/ej2-react-grids';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { RecurrenceEditorComponent } from '@syncfusion/ej2-react-schedule';
// import { scheduleData, gridData } from './data';
import { Text, View } from 'react-native';
// import * as data from './dataSource.json';
import { PropertyPane } from '../Calendar/property-pane';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DataUtil } from '@syncfusion/ej2-data';
// import Form from './Form';




import './List.css';
import {Toolbar } from '@syncfusion/ej2-react-grids';




var stringData=[{
    'ActivityID': 1,
    'Activity': 'Lecture',
    'CourseCode': 'CSC1015S',
    'Location': 'Zoom meeting',
    'StartDate': 'Sun Sep 19 2021 00:00:00 GMT+0200 (South Africa Standard Time)',
    'EndDate': 'Thu Sep 30 2021 00:00:00 GMT+0200 (South Africa Standard Time)',
    'Hours': 0,
    'Minutes': 45,
    'Recurrence': 'FREQ=DAILY;INTERVAL=2;COUNT=8',
    'Comments': 'Notes about lecture'
}]



export class List extends Base {
  constructor() {
    super(...arguments);
    console.log("constructor...");

    this.state = {
      data: [],
      calendarEvents: [],
      render: false, //Set render state to false
      hideDialog: true,
      activityData: [],
    };
    
    // this.addData = this.addData.bind(this);
    // this.addActivity = this.addActivity.bind(this)
    // this.getDaysArray = this.getDaysArray.bind(this);

    // this.calendarEventsRef = firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .collection("calendarEvents");
    
    // this.activityDataRef = firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .collection("activityData");

    // this.todoListRef = firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .collection("todoList");
        

    
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

    this.toolbarOptions = ['Add', 'Edit', 'Delete'];
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog', template: this.dialogTemplate };
    this.validationRules = { required: true };
    this.orderidRules = { required: true, number: true };
    this.pageSettings = { pageCount: 5 };

  }

  dialogTemplate(props) {
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

//   addData = (data) => {
//     // const index = this.scheduleObj.getEventMaxID();//.length > 1 ? data[data.length - 1].index + 1 : 0;
//     // console.log("data:", data);
//     // if (data !== undefined) addDoc(this.calendarEventsRef, { data }); //, index });
//     // console.log("calendarEventsRef: ", this.calendarEventsRef);
//   };
//   addActivity = (data) => {
//     // console.log("data:", data);
//     // if (data !== undefined) addDoc(this.activityDataRef, { data }); //, index });
//     // console.log("activityDataRef: ", this.activityDataRef);
//   }
//   componentDidMount() {
//     // const self = this;
//     // this.generateEvents().then((result) => this.state.calendarEvents = result)
//     // console.log("componentDidMount...", this.state.calendarEvents);
//     // setTimeout(function() { //Start the timer
//     //   this.setState({render: true}) //After 1 second, set render to true
//     // }.bind(this), 2000)
    
//   }
 
//   getDaysArray = (start, end) => {
//     // results = []
//     for(var dates=[],date=new Date(start); date<=end; date.setDate(date.getDate()+1)){
//         dates.push(new Date(date));
//         // res = {
//         //   date: date,
//         //   freeHours: 16,
//         //   events: this.scheduleObj.getEvents
//         // }
//         // results.push(res)
//     }
//     return dates;
// };
  

//   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// floatFocus(args) {
//     args.target.parentElement.classList.add('e-input-focus');
//     console.log('focus', args)
// }
// floatBlur(args) {
//     args.target.parentElement.classList.remove('e-input-focus');
//     console.log('blur', args)
// }
// onSubmitClick() {

//     // if (this.formObject.validate()) {
//     //     // this.formObject.element.reset();
//     //     console.log('log')
//     // }
// }

// // onDragStart(args) {
// //     args.navigation.enable = true;
// // }


// buttonClick() {
//     this.dialogInstance.show();
// }


// rendereComplete() {
//     console.log('back')
// }

// table () {
//     return (
//         <div className='control-pane'>
//             <div className='control-section'>
//             <GridComponent ref={(table) => this.tableObj = table} id='gridcomp' dataSource={this.state.activityData} allowPaging={true} pageSettings={this.pageSettings} editSettings={this.editSettings}>
//             <ColumnsDirective>
//             {/* format='dd-MMM-yy hh:mm a' */}
//                 <ColumnDirective field='ActivityID' headerText='ID' width='60' textAlign='Left' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
//                 <ColumnDirective field='Activity' headerText='Activity'></ColumnDirective>
//                 <ColumnDirective field='CourseCode' headerText='Course Code' validationRules={this.validationRules}></ColumnDirective>
//                 <ColumnDirective field='Location' headerText='Location' validationRules={this.validationRules}></ColumnDirective>
//                 <ColumnDirective field='StartDate' headerText='Start Date' format='dd-MMM-yy'></ColumnDirective>
//                 <ColumnDirective field='EndDate' headerText='EndDate' format='dd-MMM-yy'></ColumnDirective>
//                 <ColumnDirective field='Hours' headerText='Hours' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={false}></ColumnDirective>
//                 <ColumnDirective field='Minutes' headerText='Minutes' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={false}></ColumnDirective>
//                 <ColumnDirective field='Recurrence' headerText='Recurrence' textAlign='Right' isPrimaryKey={false}></ColumnDirective>
//                 <ColumnDirective field='Comments' headerText='Comments' ></ColumnDirective>
//               <ColumnDirective headerText='Manage Activity' commands={this.commands}></ColumnDirective>
//             </ColumnsDirective>
//             <Inject2 services={[Page, CommandColumn, Edit]}/>
//           </GridComponent>
//             </div>
//         </div>
//     )
// }

// SubmitForm(args){
// //   console.log(this)

// //   let StartTime = new Date(
// //     this.StartDate
// //     // event.start.getHours(),
// //     // event.start.getMinutes()
// //   );


// //   let EndTime = new Date(StartTime);
// //   EndTime.setHours(EndTime.getHours() + this.Hours);
// //   EndTime.setMinutes(EndTime.getMinutes() + this.Minutes);

// // let newData = {
// //   ActivityID: this.ActivityID,
// //   Activity: this.Activity,
// //   'CourseCode': this.CourseCode,
// //   'Location': this.Location,
// //   StartTime, 
// //   'StartDate': StartTime,
// //   'EndDate': EndTime,
// //   EndTime,
// //   'Hours': this.Hours,
// //   'Minutes': this.Minutes,
// //   'Recurrence': this.Recurrence,
// //   'Comments': this.Comments,
// //   'RecurrenceException': null,
// //   'RecurrenceID': null,
// //   'RecurrenceRule': this.Recurrence,
// //   'StartTimezone': null,
// //   'Subject': this.Comments,
// //   CalendarId: 1,
// //   'Id': this.ActivityID,
// //   IsReadonly: EndTime < new Date(),
// // }
// // this.scheduleObj.addEvent(newData)
// // this.state.calendarEvents.push(newData)
// // // this.addActivity(newData);
// // // this.addData(newData);

// // if (this.tableObj !== undefined){
// //   this.tableObj.addRecord(newData)
// // }else{
// //   this.state.activityData.push(newData)
// // }
// //   console.log(newData)
// //   console.log('activityData:', this.state.activityData)
// //   console.log('dreeeeaaaam',this.tableObj)
  
// //   this.clearForm(true)
// }
// onChangeActivity () {
// //   this.Activity = this.listObj.text;
// //   console.log(this.listObj)
// }
// onChangeCourseCode (args) {
// //   this.CourseCode = args.target.value// this.CourseCodeObj.value;
// //   console.log(args)
// }
// onChangeLocation () {
// //   this.Location = this.LocationObj.value;
// //   console.log(this.LocationObj)
// }
// onChangeStartDate () {
// //   this.StartDate = this.datetimepickerInstanceStart.currentDate;
// //   console.log(this.datetimepickerInstanceStart)
// }
// onChangeEndDate () {
// //   console.log(this.datetimepickerInstanceEnd)
// //   this.EndDate = this.datetimepickerInstanceEnd.currentDate;
// }
// onChangeRecurrence (args) {
// //   console.log(args)
// //   console.log(this.recObject)
// //   this.Recurrence = this.recObject.getRecurrenceRule()
// //   // this.Recurrence = args.value;
// }
// onChangeHours () {
// //   console.log(this.hourObj.value)
// //   this.Hours = this.hourObj.value;
// }
// onChangeMinutes () {
// //   console.log(this.minuteObj)
// //   this.Minutes = this.minuteObj.value;
// }
// onChangeComments () {
// //   console.log(this.commentObject.value)
// //   this.Comments += this.commentObject.value;
// //   this.commentObject.value = this.Comments
// }
// clearForm (isAdd) {
//   this.value = 'Activity1';
//   this.ActivityID = (isAdd !== undefined) ? this.ActivityID++ : this.ActivityID;
//   this.Activity = 'Lecture'
//   this.Comments = ''
//   this.CourseCode = ''
//   this.EndDate = new Date()
//   this.Hours = 0
//   // this.hourObj.value = 0
//   // this.minuteObj.value = 0
//   this.Location = ''
//   this.Minutes = 0
//   this.Recurrence = ''
//   // this.recObject.value = ''
//   this.StartDate = new Date()

//   this.ActivityIDObj.value = this.ActivityID
//   this.listObj.value = this.value;
//   this.commentObject.value = this.Comments
//   this.CourseCodeObj.value = this.CourseCode
//   this.datetimepickerInstanceStart.value = this.StartDate
//   this.datetimepickerInstanceEnd.value = this.EndDate
//   this.hourObj.value = this.Hours
//   this.minuteObj.value = this.Minutes
//   this.LocationObj.value = this.Location
//   this.recObject.value = this.Recurrence
//   // console.log(this.ActivityIDObj)
// }


  dialogTemplate(props) {
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
  render() {
    return (<div className='control-pane'>
    <div className='control-section'>
      <GridComponent dataSource={stringData} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings} actionComplete={this.actionComplete.bind(this)}>
        <ColumnsDirective>     
          <ColumnDirective field='ActivityID' headerText='ID' width='60' textAlign='Left' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
          <ColumnDirective field='Activity' headerText='Activity' width='150'></ColumnDirective>
          <ColumnDirective field='CourseCode' headerText='Course Code' validationRules={this.validationRules}></ColumnDirective>
          <ColumnDirective field='Location' headerText='Location' validationRules={this.validationRules}></ColumnDirective>
          <ColumnDirective field='StartDate' headerText='Start Date' format='dd-MMM-yy'></ColumnDirective>
          <ColumnDirective field='EndDate' headerText='EndDate' format='dd-MMM-yy'></ColumnDirective>
          <ColumnDirective field='Hours' headerText='Hours' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={false}></ColumnDirective>
          <ColumnDirective field='Minutes' headerText='Minutes' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={false}></ColumnDirective>
          <ColumnDirective field='Recurrence' headerText='Recurrence' textAlign='Right' isPrimaryKey={false}></ColumnDirective>
          <ColumnDirective field='Comments' headerText='Comments' ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Edit]}/>
      </GridComponent>

    </div>
  </div>);
  }

}
export default List;

export class Form extends React.Component {
  constructor(props) {
      super(props);
      // this.shipCityDistinctData = DataUtil.distinct(orderData, 'ShipCity', true);
      // this.shipCountryDistinctData = DataUtil.distinct(orderData, 'ShipCountry', true);
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
    
    this.state = {
      activityType: this.activityType,
      itemData: this.itemData,
      fields: this.fields,
      value: this.value
    }
    
    this.state = extend({}, this.state, props, true);
  }
  onChange(args) {
      let key = args.target.name;
      let value = args.target.value;
      this.setState({ [key]: value });
  }
  componentDidMount() {
      let state = this.state;
      // Set initail Focus
      // state.isAdd ? this.orderID.focus() : this.customerName.focus();
  }
  componentWillUnmount() {
    console.log('unmounted');
  }
  render() {
      let data = this.state;
      console.log(data)
      return (
      <div>
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
                value={1}//data.ActivityID} 
                // onChange={this.onChangeForm.bind(this)}
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
              value={data.value}
              // placeholder='Select Activity' 
              dataSource={data.activityType} 
              ref={(dropdownlist) => { this.listObj = dropdownlist }} 
              fields={data.fields}
              // change={this.onChange.bind(this)}
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
                    // onChange={this.onChangeCourseCode.bind(this)}
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
                    // onChange={this.onChangeLocation.bind(this)}
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
              value={data.StartDate} 
              placeholder="Start Date" 
              floatLabelType='Always'
              // change={this.onChangeStartDate.bind(this)} 
              min={
                this.minDate
              } 
              max={this.maxDate} 
              // value={this.dateValueStart}
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
              // change={this.onChangeEndDate.bind(this)} 
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
              // format='number' 
              min={0}
              max={24}
              value={parseInt(data.Hours)} 
              placeholder="Hours" 
              floatLabelType='Always' 
              // step={10}
              // onChange={this.onChangeHours.bind(this)}
            ></NumericTextBoxComponent>
          </div>
          {/* Minutes */}
          <div className="form-group col-md-6">
            <NumericTextBoxComponent 
              id="Minutes" 
              ref={minute => this.minuteObj = minute} 
              // format='number' 
              min={0}
              max={60}
              value={parseInt(data.Minutes)} 
              placeholder="Minutes" 
              step={10}
              floatLabelType='Always' 
              // onChange={this.onChangeMinutes.bind(this)}
            ></NumericTextBoxComponent>
          </div>
        </div>
        <div className="form-row">
          {/* Activity ID */}
          <div className="form-group col-md-12">
            <div className="e-float-input e-control-wrapper">
                <input 
                className="e-input" 
                // onFocus={this.floatFocus} onBlur={this.floatBlur}
                ref={input => this.recObj = input} 
                id="Recurrence" 
                name="Recurrence" 
                type="text" 
                // disabled={!data.isAdd} 
                value={data.Recurrence} 
                // onChange={this.onChangeForm.bind(this)}
                // placeholder={self.ActivityID} 
                disabled
            />
                <span className="e-float-line"></span>
                <label className="e-float-text e-label-top">Recurrence</label>
            </div>
        </div>

        </div>        
        <div className="form-row">          
          {/* Recurrence Editor */}
          <div className="form-group col-md-12">           
            <RecurrenceEditorComponent 
              // id='Recurrence' 
              ref={t => this.recObject = t} 
              change = {(rec) => {
                const element = document.getElementById('Recurrence')
                element.value = rec.value
                console.log(rec)
                // element.innerHTML = rec
              }}
              // change={this.onChangeRecurrence.bind(this)}
              value={this.Recurrence}
            ></RecurrenceEditorComponent>
          </div>
        </div>
        <div className="form-row">
          {/* Comments */}
              <div className="form-group col-md-12">
                  <div className="e-float-input e-control-wrapper">
                      <textarea id="Comments" name="Comments" value={data.Comments} onChange={this.onChange.bind(this)}></textarea>
                      <span className="e-float-line"></span>
                      <label className="e-float-text e-label-top">Comments</label>
                  </div>
              </div>
          </div>
      </div>
      );
  }
}