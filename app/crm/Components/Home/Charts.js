// components/ExamplePieChart.js

import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6D60FF', '#57EA54'];

class ExamplePieChart extends PureComponent {
  render() {
    const { Bal, Tot } = this.props;

    const data = [
      { name: 'Group A', value: Bal },
      { name: 'Group B', value: Tot-Bal }
    ];

    return (
      <PieChart width={500} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={140} 
          innerRadius={90}
          outerRadius={130}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}

export default ExamplePieChart;
