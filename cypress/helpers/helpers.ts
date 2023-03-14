export const enum StatusesEnum {
    Booked = "Booked",
    NoShow = "No Show",
    RunningLate = "Running Late",
    Confirmed = "Confirmed",
    InProgress = "In Progress",
    Done = "Done",
    Cancelled = "Cancelled"
}

export const enum CancellationReasonEnum {
    PersonalEmergency = "Personal Emergency",
    WorkConflict = "Work Conflict",
    Illness = "Illness",
    NoLongerRequireThisAppointment = "No longer require this appointment",
    OtherPleaseProvideDetails = "Other: please provide details",
}