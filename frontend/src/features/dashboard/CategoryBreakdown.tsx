import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function CategoryBreakdown() {
    const data = [
        { category: "Food", amount: 320 },
        { category: "Transport", amount: 180 },
        { category: "Shopping", amount: 250 },
        { category: "Bills", amount: 140 },
        { category: "Entertainment", amount: 90 },
    ];

    const colors = [
        "var(--accent)",
        "var(--success)",
        "var(--warning)",
        "var(--danger)",
        "var(--info)",
    ];
    const total = data.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="w-full flex items-center gap-2">
            <div className="relative w-full h-70">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={105}
                            paddingAngle={3}
                            stroke="none"
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-sm font-bold text-(--text-secondary)">
                        Total
                    </span>

                    <span className="text-2xl font-bold text-(--text-primary)">
                        ${total}
                    </span>
                </div>
            </div>
            <div className="w-full flex flex-col items-start gap-3">
                {data.map((d, index) => (
                    <div
                        key={index}
                        className="w-full flex items-center justify-between pr-2"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{
                                    background: colors[index % colors.length],
                                }}
                            />
                            <p className="text-sm font-semibold text-(--text-primary)">
                                {d.category}
                            </p>
                        </div>
                        <p className="text-sm font-semibold text-(--text-primary)">
                            {((d.amount / total) * 100).toFixed(1)}%
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryBreakdown;
