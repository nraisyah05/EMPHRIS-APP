<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'work_days',
        'off_days',
    ];

    public function employees()
    {
        return $this->hasMany(EmployeeProfile::class, 'work_schedule_id');
    }
}
