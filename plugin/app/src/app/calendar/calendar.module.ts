import { NgModule } from "@angular/core";
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';

import { CoreModule } from "../core/core.module";

@NgModule({
	imports: [
		CoreModule,
		CalendarRoutingModule
	],
	declarations: [
		CalendarComponent,

	],
	entryComponents: [

	],
	providers: [

	]
})
export class CalendarModule {
}
