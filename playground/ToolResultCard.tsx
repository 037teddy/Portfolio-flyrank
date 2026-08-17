type WeatherResult = {
  location: string;
  temperature: number;
  condition: string;
  windSpeed: number;
};

type ToolResultCardProps = {
  result: WeatherResult;
};

export default function ToolResultCard({ result }: ToolResultCardProps) {
  return (
    <div
      role="group"
      aria-label={`Weather result for ${result.location}`}
      className="border border-slate-200 rounded-lg p-4 bg-slate-50 max-w-xs"
    >
      <p className="text-sm text-slate-500 mb-1">{result.location}</p>
      <p className="text-2xl font-semibold text-slate-900">
        {result.temperature}°
      </p>
      <p className="text-sm text-slate-600">{result.condition}</p>
      <p className="text-xs text-slate-500 mt-2">
        Wind: {result.windSpeed} km/h
      </p>
    </div>
  );
}