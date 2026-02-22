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
  build: BuildState;
  caps: StatCaps;
}

export default function RadarChart({ build, caps }: RadarChartProps) {
  const categories = ['Finishing', 'Creativity', 'Physicals', 'Shooting', 'Defense', 'Rebound'];
  const categoryKeys: Array<'finishing' | 'creativity' | 'physicals' | 'shooting' | 'defense' | 'rebound'> =
    ['finishing', 'creativity', 'physicals', 'shooting', 'defense', 'rebound'];

  const currentData = categoryKeys.map(key =>
    calculateCategoryAverage(key, build)
  );

  const maxData = categoryKeys.map(key =>
    calculateCategoryMax(key, caps)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Current Build',
        data: currentData,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 197, 94, 1)',
      },
      {
        label: 'Max Potential',
        data: maxData,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(59, 130, 246, 0.5)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
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
