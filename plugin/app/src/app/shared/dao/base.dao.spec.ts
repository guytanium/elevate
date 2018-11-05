import { TestBed } from "@angular/core/testing";

import { BaseDao } from "./base.dao";
import { DataStore } from "../data-store/data-store";
import { StorageLocation } from "../data-store/storage-location";
import { Injectable } from "@angular/core";
import { AppStorageType } from "@elevate/shared/models";

describe("BaseDao", () => {

	class Foo {
		bar: string;
	}

	@Injectable()
	class RealBaseDao extends BaseDao<Foo> {

		public static readonly STORAGE_LOCATION: StorageLocation = {
			key: "syncedActivities",
			type: AppStorageType.LOCAL
		};

		public init(): void {
			this.storageLocation = RealBaseDao.STORAGE_LOCATION;
		}
	}

	@Injectable()
	class MockDataStore extends DataStore {

		fetch<Foo>(storageLocation: StorageLocation): Promise<Foo[]> {
			return Promise.resolve<Foo[]>(null);
		}

		save<Foo>(storageLocation: StorageLocation, value: Foo[]): Promise<Foo[]> {
			return Promise.resolve<Foo[]>(null);
		}

		clear<Foo>(storageLocation: StorageLocation): Promise<Foo[]> {
			return Promise.resolve(null);
		}
	}

	let baseDao: BaseDao<Foo>;
	let dataStore: DataStore;

	let checkStorageLocationSpy: jasmine.Spy;
	let dataStoreFetchSpy: jasmine.Spy;
	let dataStoreSaveSpy: jasmine.Spy;
	let dataStoreClearSpy: jasmine.Spy;

	beforeEach((done: Function) => {

		TestBed.configureTestingModule({
			providers: [
				{provide: BaseDao, useClass: RealBaseDao},
				{provide: DataStore, useClass: MockDataStore}
			]
		});

		baseDao = TestBed.get(BaseDao);
		dataStore = TestBed.get(DataStore);

		checkStorageLocationSpy = spyOn(baseDao, "checkStorageLocation").and.callThrough();
		dataStoreFetchSpy = spyOn(dataStore, "fetch").and.callThrough();
		dataStoreSaveSpy = spyOn(dataStore, "save").and.callThrough();
		dataStoreClearSpy = spyOn(dataStore, "clear").and.callThrough();

		done();
	});

	it("should resolve StorageLocation provided", (done: Function) => {

		// Given, When
		const promise: Promise<void> = baseDao.checkStorageLocation();

		// Then
		promise.then(() => {
			done();

		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

	it("should reject StorageLocation not provided", (done: Function) => {

		// Given
		baseDao.storageLocation = null; // Remove storage location

		// When
		const promise: Promise<void> = baseDao.checkStorageLocation();

		// Then
		promise.then(() => {
			expect(false).toBeTruthy("Whoops! I should not be here!");
			done();

		}, error => {
			expect(error).toEqual("StorageLocation not set in 'RealBaseDao'. Please override init method to assign a StorageLocation.");
			expect(dataStoreFetchSpy).not.toHaveBeenCalled();
			done();
		});
	});

	it("should fetch data", (done: Function) => {

		// Given,  When
		const promise: Promise<Foo[]> = baseDao.fetch<Foo>();

		// Then
		promise.then(() => {

			expect(checkStorageLocationSpy).toHaveBeenCalledTimes(1);
			expect(dataStoreFetchSpy).toHaveBeenCalledTimes(1);
			done();
		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

	it("should save data", (done: Function) => {

		// Given
		const foo: Foo[] = [{
			bar: "john doe"
		}];

		// When
		const promise: Promise<Foo[]> = baseDao.save<Foo>(foo);

		// Then
		promise.then(() => {

			expect(checkStorageLocationSpy).toHaveBeenCalledTimes(1);
			expect(dataStoreSaveSpy).toHaveBeenCalledTimes(1);
			done();
		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

	it("should clear data", (done: Function) => {

		// Given,  When
		const promise: Promise<Foo[]> = baseDao.clear<Foo>();

		// Then
		promise.then(() => {

			expect(checkStorageLocationSpy).toHaveBeenCalledTimes(1);
			expect(dataStoreClearSpy).toHaveBeenCalledTimes(1);
			done();
		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

});