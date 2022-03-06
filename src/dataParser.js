import {DAYS_OF_WEEK} from "./Constants/daysOfWeek";

function getAgeDistributionByDeviceAll(devicesData) {
    let devices = devicesData.data.o;
    let dataObjects = [];

    devices.forEach(function (device) {
        device.o.forEach(function (date) {
            date.o.forEach(function (age) {
                let infoObj = {};

                infoObj.deviceId = device.n;
                infoObj.dayOfWeek = getDayOfWeekNameByStringDate(date.n);
                infoObj.age = age.n;
                infoObj.views = age.v;

                dataObjects.push(infoObj);
            });
        });
    });

    return dataObjects;
}

export function getAgeDistributionByDevices(devicesData, devicesIdArray) {
    let ageDistributionByDeviceAll = getAgeDistributionByDeviceAll(devicesData);
    let ageDistribution = new Map();

    DAYS_OF_WEEK.forEach(function (day) {
        let dailyInfo = ageDistributionByDeviceAll.filter(deviceInfo => deviceInfo.dayOfWeek === day
            && devicesIdArray.includes(deviceInfo.deviceId));
        let ageByDay = new Map();
        let sumViews = 0;

        dailyInfo.forEach(function (infoObj) {
            let infoByAge = dailyInfo.filter(deviceInfo => deviceInfo.age === infoObj.age);

            if (!ageByDay.has(infoObj.age)) {

                infoByAge.forEach(function (viewsInfo) {
                    sumViews += viewsInfo.views;
                })

                ageByDay.set(infoObj.age, sumViews);
            }
        });

        ageDistribution.set(day, ageByDay);
    });

    return ageDistribution;
}

export function getAllAgeGroups(devicesData) {
    let ageGroups = new Set();
    let devices = devicesData.data.o;

    devices.forEach(function (device) {
        device.o.forEach(function (date) {
            date.o.forEach(function (age) {
                ageGroups.add(age.n);
            });
        });
    });

    return Array.from(ageGroups);
}

export function getAllDevices(devicesData) {
    let devices = devicesData.data.o;
    let devicesArray = [];

    devices.forEach(function (device) {
        devicesArray.push(device.n);
    });

    return devicesArray;
}

function getDayOfWeekNameByStringDate(stringDate) {
    const date = new Date(stringDate);
    return getNameOfDayOfWeek(date.getDay());
}

function getNameOfDayOfWeek(dayNumber) {
    if (dayNumber >= 0 && dayNumber < 7) {
        return DAYS_OF_WEEK[dayNumber];
    }

    return null;
}