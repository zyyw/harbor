import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Output,
  Input
} from "@angular/core";
const SCHEDULE_TYPE = {
  NONE: "None",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  HOURLY: "Hourly",
  CUSTOM: "Custom"
};
@Component({
  selector: "cron-selection",
  templateUrl: "./cron-schedule.component.html",
  styleUrls: ["./cron-schedule.component.scss"]
})
export class CronScheduleComponent implements OnInit, OnChanges {
  @Input() originCron: string;
  @Input() label: string;
  dateInvalid: boolean;
  originScheduleType: any;
  cronstring: string;
  isEditMode: boolean = false;
  SCHEDULE_TYPE = SCHEDULE_TYPE;
  scheduleType: string;
  private _childTitle: string = "";
  @Output() inputvalue = new EventEmitter<string>();
  @Input()
  set childTitle(childTitle: string) {
    this._childTitle = childTitle;
  }
  get childTitle(): string {
    return this._childTitle;
  }
  blurInvalid() {
    if (!this.cronstring) {
      this.dateInvalid = true;
    }
  }
  inputInvalid() {
    if (
      /^a{3}$/.test(
        this.cronstring
      )) {
        this.dateInvalid = false;
      } else {
      console.log(111);
      this.dateInvalid = true;
      }
    // this.dateInvalid = this.cronstring ? false : true;
  }
  ngOnInit() {}
  ngOnChanges(): void {
    this.getSchedule();
  }
  getSchedule() {
    console.log(this.originCron);
    if (this.originCron && this.originCron === "00****") {
      this.originScheduleType = SCHEDULE_TYPE.HOURLY;
    } else if (this.originCron && this.originCron === "000***") {
      this.originScheduleType = SCHEDULE_TYPE.DAILY;
    } else if (this.originCron && this.originCron === "000**0") {
      this.originScheduleType = SCHEDULE_TYPE.WEEKLY;
    } else if (this.originCron === "") {
      this.originScheduleType = SCHEDULE_TYPE.NONE;
    } else {
      this.originScheduleType = SCHEDULE_TYPE.CUSTOM;
    }
  }
  editSchedule() {
    this.isEditMode = true;
    this.scheduleType = this.originScheduleType;
    if (this.scheduleType && this.scheduleType === SCHEDULE_TYPE.CUSTOM) {
      this.cronstring = this.originCron;
    } else {
      this.cronstring = "";
    }
  }

  private resetSchedule() {
    this.originScheduleType = this.scheduleType;
    this.originCron = this.cronstring;
    this.isEditMode = false;
  }

  save(): void {
    if (this.dateInvalid && this.scheduleType === SCHEDULE_TYPE.CUSTOM) {
      return;
    }
    let scheduleTerm: string = "";
    this.resetSchedule();
    if (this.scheduleType && this.scheduleType === SCHEDULE_TYPE.NONE) {
      scheduleTerm = "";
    } else if (
      this.scheduleType &&
      this.scheduleType === SCHEDULE_TYPE.HOURLY
    ) {
      scheduleTerm = "00****";
    } else if (this.scheduleType && this.scheduleType === SCHEDULE_TYPE.DAILY) {
      scheduleTerm = "000***";
    } else if (
      this.scheduleType &&
      this.scheduleType === SCHEDULE_TYPE.WEEKLY
    ) {
      scheduleTerm = "000**0";
    } else {
      scheduleTerm = this.cronstring;
    }
    this.inputvalue.emit(scheduleTerm);
    // console.log(scheduleTerm);
  }
}
