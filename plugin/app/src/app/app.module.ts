import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { AthleteSettingsConsistencyRibbonComponent } from "./athlete-settings-consistency-ribbon/athlete-settings-consistency-ribbon.component";
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({

	declarations: [
		AppComponent,
		AthleteSettingsConsistencyRibbonComponent,
		CalendarComponent
	],
	imports: [
		CoreModule,
		SharedModule
	],
	bootstrap: [
		AppComponent
	]

})
export class AppModule {
}
