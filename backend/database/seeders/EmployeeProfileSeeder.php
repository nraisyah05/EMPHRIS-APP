<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeeProfile;

class EmployeeProfileSeeder extends Seeder
{
    public function run()
    {
        EmployeeProfile::create([
            'user_id' => 1,
            'employee_code' => 'EMP001',
            'full_name' => 'John Doe',
            'department' => 'IT',
            'position' => 'Software Engineer',
            'work_schedule_id' => 1,
        ]);

        EmployeeProfile::create([
            'user_id' => 2,
            'employee_code' => 'EMP002',
            'full_name' => 'Jane Smith',
            'department' => 'HR',
            'position' => 'HR Manager',
            'work_schedule_id' => 2,
        ]);
    }
}
