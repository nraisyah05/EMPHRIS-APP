<?php
use App\Http\Controllers\TimesheetController;
use App\Http\Controllers\TimesheetEntryController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\EmployeeProfileController;
use App\Http\Controllers\WorkScheduleController;

Route::apiResource('timesheets', TimesheetController::class);
Route::apiResource('timesheet-entries', TimesheetEntryController::class);
Route::apiResource('leave-requests', LeaveRequestController::class);
Route::apiResource('employees', EmployeeProfileController::class);
Route::apiResource('work-schedules', WorkScheduleController::class);
