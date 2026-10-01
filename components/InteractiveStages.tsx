"use client";

import { useState } from "react";
import { Eye, BrainCircuit, Zap, Cpu, Activity, Server } from "lucide-react";
import { ScrollReveal } from "./ui/AnimatedBackground";

const stages = [
  {
    id: "eyes",
    stage: "STAGE 01",
    title: "The Eyes",
    subtitle: "SENSORS & CAMERAS",
    icon: Eye,
    headline: "Real-time perception of the physical environment",
    description:
      "Machines do not see like humans do with intuition. High-frame-rate computer vision cameras and ultrasonic sensors capture real-world light and distance, translating photons and acoustic waves into dense digital arrays.",
    hardware: [
      "Stereo Depth Cameras",
      "Ultrasonic Distance Sensors",
      "IR Proximity Detectors",
      "Ambient Light Array",
    ],
    telemetry: [
      { label: "Capture Rate", value: "60 FPS" },
      { label: "Latency", value: "< 15 ms" },
      { label: "Field of View", value: "120° Wide" },
    ],
    next: "The Brain",
  },
  {
    id: "brain",
    stage: "STAGE 02",
    title: "The Brain",
    subtitle: "EDGE AI & REASONING",
    icon: BrainCircuit,
    headline: "Neural network inference running right on the robot",
    description:
      "No cloud dependency, no internet lag. Edge microprocessors run lightweight neural models that classify objects, predict trajectories, map boundaries, and decide the safest path forward in a fraction of a second.",
    hardware: [
      "Edge Neural Processors",
      "Microcontroller Logic Boards",
      "Spatial Mapping Engine",
      "Trained Object Classifier",
    ],
    telemetry: [
      { label: "Decision Cycle", value: "< 5 ms" },
      { label: "Offline Inference", value: "100% Local" },
      { label: "Model Type", value: "Edge CNN" },
    ],
    next: "The Action",
  },
  {
    id: "action",
    stage: "STAGE 03",
    title: "The Action",
    subtitle: "MOTORS & MOVEMENT",
    icon: Zap,
    headline: "Translating digital decisions into kinetic reality",
    description:
      "The loop is completed when software commands become physical force. High-torque stepper motors, servo controllers, and articulated limbs rotate, steer, brake, or grip with millimeter precision.",
    hardware: [
      "Precision Stepper Motors",
      "Dual H-Bridge Motor Drivers",
      "Rotary Wheel Encoders",
      "Actuator Grippers",
    ],
    telemetry: [
      { label: "Torque Precision", value: "0.1 mm" },
      { label: "Feedback Loop", value: "1000 Hz" },
      { label: "Power Efficiency", value: "High" },
    ],
    next: "The Eyes",
  },
];

export function InteractiveStages() {
  const [activeStage, setActiveStage] = useState(0);
  const data = stages[activeStage];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-display)] mb-4 leading-tight">
              See AI Come Alive: <span className="text-[var(--ocean-500)]">Perception</span> ➔<br />
              <span className="text-[var(--ocean-500)]">Brain</span> ➔ <span className="text-[#818cf8]">Action</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-3xl mx-auto">
              Most people only interact with AI as text on a screen. In this workshop, you will discover what
              happens when an artificial intelligence is given eyes to see and motors to move.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "bg-[rgba(14,165,233,0.05)] border-[var(--ocean-500)] shadow-[0_0_30px_rgba(14,165,233,0.15)]"
                      : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--ocean-500)] to-[#818cf8]" />
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-mono font-bold tracking-wider ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                      {stage.stage}
                    </span>
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[rgba(14,165,233,0.1)] text-[var(--ocean-500)]' : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)]'}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                    {stage.title}
                  </h3>
                  <p className={`text-xs font-mono font-bold tracking-wide uppercase ${isActive ? 'text-[var(--ocean-500)]' : 'text-[var(--ocean-500)] opacity-70'}`}>
                    {stage.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Content Area */}
        <ScrollReveal>
          <div className="bg-[rgba(15,23,42,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.05)] rounded-3xl p-6 sm:p-10 relative overflow-hidden min-h-[450px]">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12">
              {/* Left Column (Text & Hardware) */}
              <div key={activeStage} className="flex-1 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(14,165,233,0.1)] border border-[rgba(14,165,233,0.2)] text-[var(--ocean-500)] text-xs font-mono font-bold mb-6">
                  <span>{data.stage}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--ocean-500)]" />
                  <span>{data.subtitle}</span>
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)] mb-6 leading-tight">
                  {data.headline}
                </h3>
                
                <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
                  {data.description}
                </p>

                <div>
                  <p className="text-xs font-mono font-bold text-[var(--text-muted)] tracking-wider mb-4 uppercase">
                    Demonstrated with live lab hardware:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {data.hardware.map((item) => (
                      <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-sm text-[var(--text-primary)]">
                        <Server size={14} className="text-[var(--ocean-500)]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Telemetry Dashboard) */}
              <div key={activeStage + "-telemetry"} className="w-full lg:w-[400px] shrink-0 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-[#0b1120] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 shadow-2xl relative">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-2 text-[var(--ocean-500)]">
                      <Cpu size={18} />
                      <span className="text-xs font-mono font-bold tracking-wider">REAL-TIME TELEMETRY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-green-500 uppercase tracking-widest">ONLINE</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {data.telemetry.map((stat) => (
                      <div key={stat.label} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center flex flex-col justify-center min-h-[80px]">
                        <p className="text-[10px] font-mono text-[var(--text-muted)] mb-1 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-sm font-bold text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[rgba(14,165,233,0.08)] border border-[rgba(14,165,233,0.2)] rounded-xl p-4 mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-[var(--ocean-500)] uppercase tracking-wider mb-1">PHYSICAL LOOP STATUS</p>
                      <p className="text-sm font-bold text-white">Continuous 60Hz Perception-Action Cycle</p>
                    </div>
                    <Activity size={20} className="text-[var(--ocean-500)] shrink-0" />
                  </div>

                  <button
                    onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                    className="w-full py-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.05)] transition-colors text-sm font-medium text-[var(--text-muted)] hover:text-white flex items-center justify-center gap-2"
                  >
                    Explore Next: {data.next} ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
