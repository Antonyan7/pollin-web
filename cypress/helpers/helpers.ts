export const enum StatusesEnum {
  Booked = 'Booked',
  NoShow = 'No Show',
  RunningLate = 'Running Late',
  Confirmed = 'Confirmed',
  InProgress = 'In Progress',
  Done = 'Done',
  Cancelled = 'Cancelled'
}

export const enum CancellationReasonEnum {
  PersonalEmergency = 'Personal Emergency',
  WorkConflict = 'Work Conflict',
  Illness = 'Illness',
  NoLongerRequireThisAppointment = 'No longer require this appointment',
  OtherPleaseProvideDetails = 'Other: please provide details'
}

export const enum TemplateStatus {
  Draft = 'Draft',
  Complete = 'Complete'
}

export const enum LabDestinations {
  SickKids = 'Sick Kids',
  DynacareLaboratory = 'Dynacare Laboratory'
}
export const enum TransportStatus {
  ReadyForTransport = 'Ready for transport',
  InTransit = 'In-Transit'
}
export const enum AddToTransport {
  AddToNewExistingTransport = 'Add to New/Existing Transport',
  ReceiveInHouse = 'Receive In-House'
}
