import React from "react";
import { Activity } from "lucide-react";

// 类型定义
export interface Actor {
  name: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

export interface Step {
  from: number;
  to: number;
  message: string;
  type: "request" | "response";
  highlight?: boolean;
}

export interface SequenceDiagramProps {
  title?: string;
  subtitle?: string;
  actors: Actor[];
  steps: Step[];
  defaultSpeed?: number;
  width?: number; // 控制画布宽度
  height?: number; // 控制画布高度
}

export const SequenceDiagram: React.FC<SequenceDiagramProps> = ({
  title = "时序流程图",
  subtitle = "组件化流程展示",
  actors,
  steps,
  defaultSpeed = 1000,
  width = 800,
  height,
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(defaultSpeed);

  const actorSpacing = width / actors.length;
  const startOffset = actorSpacing / 2;

  // 自动计算高度：顶部留白 + 步骤数量 * 每步高度 + 底部留白
  const stepHeight = 45;
  const topPadding = 40;
  const bottomPadding = 20;
  const calculatedHeight = height || (topPadding + steps.length * stepHeight + bottomPadding);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length) {
      interval = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, speed, steps.length]);

  const handlePlay = () => {
    if (currentStep >= steps.length) setCurrentStep(0);
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500 rounded-lg">
            <Activity className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-3 py-1 border rounded-lg text-sm"
          >
            <option value={500}>快速</option>
            <option value={1000}>正常</option>
            <option value={2000}>慢速</option>
          </select>
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {isPlaying ? "暂停" : "播放"}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            重置
          </button>
        </div>
      </div>

      {/* Actors */}
      <div
        className="relative mb-8"
        style={{ width: `${width}px`, margin: "0 auto" }}
      >
        <div className="flex justify-between">
          {actors.map((actor, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{ width: `${100 / actors.length}%` }}
            >
              <div
                className={`${
                  actor.color
                } text-white p-4 rounded-lg shadow-lg mb-2 ${
                  steps
                    .slice(0, currentStep)
                    .some((step) => step.from === i || step.to === i)
                    ? "ring-4 ring-yellow-300"
                    : ""
                }`}
              >
                {actor.icon}
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800">{actor.name}</div>
                <div className="text-sm text-gray-600">{actor.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        className="relative"
        style={{ width: `${width}px`, height: `${calculatedHeight}px`, margin: "0 auto" }}
      >
        {actors.map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-gray-300 top-0 bottom-0"
            style={{
              left: `${startOffset + i * actorSpacing}px`,
              transform: "translateX(-1px)",
            }}
          />
        ))}
        {steps.map((step, i) => {
          const fromX = startOffset + step.from * actorSpacing;
          const toX = startOffset + step.to * actorSpacing;
          const y = 40 + i * 45;
          const visible = i < currentStep;
          const isCurrent = i === currentStep - 1;
          const isToRight = toX > fromX;
          const width = Math.abs(toX - fromX);
          const left = Math.min(fromX, toX);

          return (
            <div
              key={i}
              className={`absolute transition-all duration-500 ${
                visible ? "opacity-100" : "opacity-30"
              }`}
              style={{ top: `${y}px` }}
            >
              <div
                className={`h-0.5 ${
                  step.highlight ? "bg-yellow-500" : "bg-blue-500"
                } relative`}
                style={{ left: `${left}px`, width: `${width}px` }}
              >
                <div
                  className={`absolute w-0 h-0 ${
                    step.highlight ? "border-yellow-500" : "border-blue-500"
                  } ${
                    isToRight
                      ? "border-l-8 border-t-4 border-b-4 border-t-transparent border-b-transparent -right-2"
                      : "border-r-8 border-t-4 border-b-4 border-t-transparent border-b-transparent -left-2"
                  }`}
                  style={{ top: "-4px" }}
                />
              </div>
              <div
                className={`absolute text-xs px-2 py-1 rounded shadow-sm ${
                  step.highlight
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    : "bg-white text-gray-700 border border-gray-200"
                } ${isCurrent ? "ring-2 ring-blue-400" : ""}`}
                style={{
                  left: `${left + width / 2}px`,
                  transform: "translateX(-50%)",
                  top: "-25px",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {step.message}
              </div>
              {isCurrent && (
                <div
                  className="absolute w-3 h-3 bg-red-500 rounded-full animate-pulse"
                  style={{
                    left: `${isToRight ? toX : fromX}px`,
                    transform: "translateX(-50%)",
                    top: "-6px",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 进度条 */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>
            进度: {currentStep}/{steps.length}
          </span>
          <span>{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
