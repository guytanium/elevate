import { CalendarRoutingModule } from './../../calendar/calendar-routing.module';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutesModel } from "../models/app-routes.model";
import { GlobalSettingsComponent } from "../../global-settings/global-settings.component";
import { ZonesSettingsComponent } from "../../zones-settings/zones-settings.component";
import { DonateComponent } from "../../donate/donate.component";
import { ShareComponent } from "../../share/share.component";
import { ReportComponent } from "../../report/report.component";
import { AdvancedMenuComponent } from "../../advanced-menu/advanced-menu.component";
import { FaqComponent } from "../../faq/faq.component";
import { ActivitiesComponent } from "../../activities/activities.component";
import { PromoteDesktopComponent } from "../../promote-desktop/promote-desktop.component";

const redirectTo = (localStorage.getItem(PromoteDesktopComponent.NO_PROMOTE_DESKTOP_MENU_LC_KEY)) ? AppRoutesModel.activities : AppRoutesModel.newAppInProgress;

const routes: Routes = [
	{
		path: AppRoutesModel.newAppInProgress,
		component: PromoteDesktopComponent
	},
	{
		path: AppRoutesModel.activities,
		component: ActivitiesComponent
	},
	{
		path: AppRoutesModel.fitnessTrend,
		loadChildren: () => import("../../fitness-trend/fitness-trend.module").then(module => module.FitnessTrendModule)
	},
	{
		path: AppRoutesModel.yearProgressions,
		loadChildren: () => import("../../year-progress/year-progress.module").then(module => module.YearProgressModule)
	},
	{
		path: AppRoutesModel.calendar,
		loadChildren: () => import("../../calendar/calendar.module").then(module => module.CalendarModule) //todo fix
	},
	{
		path: AppRoutesModel.globalSettings,
		component: GlobalSettingsComponent
	},
	{
		path: AppRoutesModel.athleteSettings,
		loadChildren: () => import("../../athlete-settings/athlete-settings.module").then(module => module.AthleteSettingsModule)
	},
	{
		path: AppRoutesModel.zonesSettings,
		component: ZonesSettingsComponent
	},
	{
		path: AppRoutesModel.zonesSettings + "/:zoneValue",
		component: ZonesSettingsComponent
	},
	{
		path: AppRoutesModel.donate,
		component: DonateComponent
	},
	{
		path: AppRoutesModel.releasesNotes,
		loadChildren: () => import("../../releases-notes/releases-notes.module").then(module => module.ReleasesNotesModule)
	},
	{
		path: AppRoutesModel.share,
		component: ShareComponent
	},
	{
		path: AppRoutesModel.report,
		component: ReportComponent
	},
	{
		path: AppRoutesModel.advancedMenu,
		component: AdvancedMenuComponent
	},
	{
		path: AppRoutesModel.frequentlyAskedQuestions,
		component: FaqComponent
	},
	{
		path: "", redirectTo: redirectTo, pathMatch: "full"
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {enableTracing: false, useHash: true})
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {
}
