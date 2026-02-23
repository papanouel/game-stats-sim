import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { BuildState, StatCaps } from '../types';
import { calculateCategoryAverage, calculateCategoryMax } from '../utils/calculations';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  build?: BuildState;
  caps: StatCaps;
  showCurrent?: boolean;
}

export default function RadarChart({ build, caps, showCurrent = true }: RadarChartProps) {
  const categories = ['Finishing', 'Creativity', 'Physicals', 'Shooting', 'Defense'];
  const categoryKeys: Array<'finishing' | 'creativity' | 'physicals' | 'shooting' | 'defense'> =
    ['finishing', 'creativity', 'physicals', 'shooting', 'defense'];

  const currentData = showCurrent && build
    ? categoryKeys.map(key => calculateCategoryAverage(key, build))
    : [];

  const maxData = categoryKeys.map(key =>
    calculateCategoryMax(key, caps)
  );

  const datasets = [];

  if (showCurrent && build) {
    datasets.push({
      label: 'Current Build',
      data: currentData,
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(34, 197, 94, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(34, 197, 94, 1)',
    });
  }

  datasets.push({
    label: 'Max Potential',
    data: maxData,
    backgroundColor: showCurrent ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)',
    borderColor: showCurrent ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 1)',
    borderWidth: 2,
    borderDash: showCurrent ? [5, 5] : [],
    pointBackgroundColor: showCurrent ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
  });

  const data = {
    labels: categories,
    datasets,
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="w-full h-full">
      <Radar data={data} options={options} />
    </div>
  );
}
