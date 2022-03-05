const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getAgeDistributionByDeviceAll (devicesData) {
    let devices = devicesData.o;
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

export function getAgeDistributionByDevice (devicesData, deviceId) {
    let ageDistributionByDevice = [];
    let ageDistributionByDeviceAll = getAgeDistributionByDeviceAll(devicesData);

    ageDistributionByDeviceAll.forEach(function (deviceInfo) {
        if (deviceInfo.deviceId === deviceId) {
            ageDistributionByDevice.push(deviceInfo);
        }
    });

    return ageDistributionByDevice;
}

export function getTotalAgeDistribution (devicesData) {
    let ageDistributionByDeviceAll = getAgeDistributionByDeviceAll(devicesData);
    let totalAgeDistribution = new Map();

    DAYS_OF_WEEK.forEach(function (day) {
        let infoByDay = {};

        let dailyInfo = ageDistributionByDeviceAll.filter(deviceInfo => deviceInfo.dayOfWeek === day);

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

        totalAgeDistribution.set(day, ageByDay);
    });

    return totalAgeDistribution;
}

export function getAllAgeGroups (devicesData) {
    let ageGroups = new Set();
    let devices = devicesData.o;

    devices.forEach(function (device) {
        device.o.forEach(function (date) {
            date.o.forEach(function (age) {
                ageGroups.add(age.n);
            });
        });
    });

    return Array.from(ageGroups);
}

export function getDayOfWeekNameByStringDate (stringDate) {
    const date = new Date(stringDate);
    return getNameOfDayOfWeek(date.getDay());
}

export function getNameOfDayOfWeek (dayNumber) {
    if (dayNumber >= 0 && dayNumber < 7) {
        return DAYS_OF_WEEK[dayNumber];
    }

    return null;
}