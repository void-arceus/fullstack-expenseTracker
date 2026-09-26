import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function SpendingOverview() {
    const data = [
        { day: "Mon", amount: 120 },
        { day: "Tue", amount: 80 },
        { day: "Wed", amount: 210 },
        { day: "Thu", amount: 150 },
        { day: "Fri", amount: 280 },
        { day: "Sat", amount: 190 },
        { day: "Sun", amount: 240 },
    ];

    return (
        <div className="w-full h-70">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="spendingGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="var(--accent)"
                                stopOpacity={0.2}
                            />
                            <stop
                                offset="100%"
                                stopColor="var(--accent)"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="var(--border)" vertical={false} />

                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                    />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="var(--accent)"
                        strokeWidth={2}
                        fill="url(#spendingGradient)"
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SpendingOverview;
