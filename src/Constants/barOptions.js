export const OPTIONS = {
    plugins: {
        title: {
            display: true,
            text: 'Total views: Age (by day of week)',
        },

        legend: {
            position: "bottom",
        }
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};