<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('batch:run')->everyThirtySeconds()->withoutOverlapping();
