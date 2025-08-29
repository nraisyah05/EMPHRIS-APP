<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TimesheetController extends Controller
{
    public function index()
    {
        return Timesheet::with(['employee', 'entries'])->get();
    }

    public function store(Request $request)
    {
        $timesheet = Timesheet::create($request->all());
        return response()->json($timesheet, 201);
    }

    public function show($id)
    {
        return Timesheet::with(['employee', 'entries'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $timesheet = Timesheet::findOrFail($id);
        $timesheet->update($request->all());
        return response()->json($timesheet, 200);
    }

    public function destroy($id)
    {
        Timesheet::destroy($id);
        return response()->json(null, 204);
    }
}
