export const groupByDay = (orders) => {
    const map = {};

    orders.forEach(o => {
        const date = new Date(o.createdAt)
            .toLocaleDateString("vi-VN");

        map[date] = (map[date] || 0) + o.total;
    });

    return Object.keys(map).map(date => ({
        date,
        revenue: map[date]
    }));
};
export const groupByMonth = (orders) => {
    const map = {};

    orders.forEach(o => {
        const month = new Date(o.createdAt).getMonth() + 1;

        map[month] = (map[month] || 0) + o.total;
    });

    return Object.keys(map).map(month => ({
        date: `Tháng ${month}`,
        revenue: map[month]
    }));
};