const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getAgeDistributionByDeviceAll (devicesData) {
    let devices = devicesData.o;
    let dataObjects = [];

    devices.forEach(function (device) {
        let infoObj = {};
        infoObj.deviceId = device.n;

        device.o.forEach(function (date) {
            infoObj.dayOfWeek = getDayOfWeekNameByStringDate(date.n);

            date.o.forEach(function (age) {
                infoObj.age = age.n;
                infoObj.views = age.v;
            });
        });

        dataObjects.push(infoObj);
    });

    return dataObjects;
}

function getAgeDistributionByDevice (devicesData, deviceId) {
    let ageDistributionByDevice = [];
    let ageDistributionByDeviceAll = getAgeDistributionByDeviceAll(devicesData);

    ageDistributionByDeviceAll.forEach(function (deviceInfo) {
        if (deviceInfo.deviceId === deviceId) {
            ageDistributionByDevice.push(deviceInfo);
        }
    });

    return ageDistributionByDevice;
}

function getTotalAgeDistribution (devicesData) {
    let ageDistributionByDeviceAll = getAgeDistributionByDeviceAll(devicesData);
    let totalAgeDistribution = new Map();

    DAYS_OF_WEEK.forEach(function (day) {
        let infoByDay = {};

        let dailyInfo = ageDistributionByDeviceAll.filter(deviceInfo => deviceInfo.dayOfWeek === day);

        let ageByDay = new Map();

        dailyInfo.forEach(function (infoObj) {
            let infoByAge = dailyInfo.filter(deviceInfo => deviceInfo.age === infoObj.age);

            if (!ageByDay.has(infoObj.age)) {
                let sumViews = 0;

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

function getDayOfWeekNameByStringDate (stringDate) {
    const date = new Date(stringDate);
    return getNameOfDayOfWeek(date.getDay());
}

function getNameOfDayOfWeek (dayNumber) {
    if (dayNumber >= 0 && dayNumber < 7) {
        return DAYS_OF_WEEK[dayNumber];
    }

    return null;
}

export default getTotalAgeDistribution;