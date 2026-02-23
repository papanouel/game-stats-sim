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
  theme?: 'light' | 'dark';
}

export default function RadarChart({ build, caps, showCurrent = true, theme = 'light' }: RadarChartProps) {
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

  // Indigo colors: 99, 102, 241
  datasets.push({
    label: 'Max Potential',
    data: maxData,
    backgroundColor: showCurrent ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.2)',
    borderColor: showCurrent ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 1)',
    borderWidth: 2,
    borderDash: showCurrent ? [5, 5] : [],
    pointBackgroundColor: showCurrent ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 1)',
    pointBorderColor: theme === 'dark' ? '#1e1e1e' : '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
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
          backdropColor: 'transparent',
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        },
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
