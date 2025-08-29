<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employee_code',
        'full_name',
        'department',
        'position',
        'work_schedule_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workSchedule()
    {
        return $this->belongsTo(WorkSchedule::class, 'work_schedule_id');
    }

    public function timesheets()
    {
        return $this->hasMany(Timesheet::class, 'employee_id');
    }

    public function leaves()
    {
        return $this->hasMany(LeaveRequest::class, 'employee_id');
    }
}
