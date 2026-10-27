import { Project } from '../types.ts';

export const PROJECTS: Project[] = [
  {
    id: 'college-ims',
    index: '01',
    title: 'College IMS with SWOT Analysis',
    subtitle: 'Smart Campus Platform with Role-Based Access & SWOT Intelligence',
    client: 'Campus Platform / Enterprise ERP',
    year: '2025',
    discipline: 'Full-Stack Systems & Smart Campus',
    category: 'fullstack',
    stack: ['React', 'Python', 'Spring Boot (Java 21)', 'JavaScript', 'Docker', 'Vercel'],
    accentColor: '#d4ff00', // Electric Lime
    image: '/assets/aistudio/image_923a47e4.png',
    secondaryImage: '/src/assets/images/cse_compiler_bytecode_1793086787524.jpg',
    description: 'Smart campus platform with SWOT analysis, role-based access for 3 user types, timetable, feedback, PDF export, and classroom booking; deployed on Vercel.',
    manifesto: 'Institutional management requires rigid authorization models paired with actionable institutional intelligence. We architected a unified platform with role-segregated portals, automated SWOT analytics engines, and conflict-free classroom booking dispatch.',
    deliverables: [
      'Role-Based Access Control (RBAC) Architecture for 3 Distinct User Roles',
      'Automated SWOT Analytical Matrix & Campus Feedback Pipeline',
      'Dynamic Classroom Booking & Timetable Conflict Resolution Engine',
      'Client-Side & Server-Side Dynamic PDF Report Generation & Vercel Deployment'
    ],
    metrics: [
      { label: 'User Roles', value: '3 Access Tiers' },
      { label: 'Backend', value: 'Java 21 / Spring' },
      { label: 'Deployment', value: 'Vercel + Docker' }
    ],
    liveUrl: 'https://ims-swot-analysis.vercel.app'
  },
  {
    id: 'dungeon-dash',
    index: '02',
    title: 'Dungeon Dash — Godot 4 Game',
    subtitle: '2D Action Combat Engine with Predictive Multi-Phase Boss AI',
    client: 'Indie Game Engine / Godot 4',
    year: '2025',
    discipline: 'Game Engine Architecture & Enemy AI',
    category: 'game-dev',
    stack: ['Godot 4', 'GDScript', 'Finite State Machine', '2D Combat Physics'],
    accentColor: '#ff007f', // Cyber Magenta
    image: '/assets/aistudio/image_77cc04cf.png',
    secondaryImage: '/src/assets/images/cse_quantum_supercomputer_1793086786785.jpg',
    description: '2D game featuring responsive movement, combat, enemy finite-state machines, and predictive multi-phase boss AI with phase transitions, combo attacks, lunge behavior, and centralized damage handling.',
    manifesto: 'Visceral 2D action games require zero input latency and intelligent adversary choreography. We engineered hierarchical state machines governing multi-phase boss encounter loops, adaptive player tracking, and a centralized damage event dispatcher.',
    deliverables: [
      'Predictive Multi-Phase Boss AI with Dynamic Combo Attacks & Phase Triggers',
      'Hierarchical Finite-State Machine (FSM) Engine for Enemy Swarms',
      'Centralized Damage & Hitbox Event Bus with Frame-Perfect Collision',
      'Sub-Pixel Responsive Character Movement, Dash Physics & Lunge Curves'
    ],
    metrics: [
      { label: 'Engine', value: 'Godot 4 / GDScript' },
      { label: 'AI Architecture', value: 'Multi-Phase FSM' },
      { label: 'Combat Loop', value: 'Centralized Damage Bus' }
    ],
    githubUrl: 'https://github.com/ax1nd/Dungeon-Dash'
  },
  {
    id: 'agentic-video-ai',
    index: '03',
    title: 'Agentic AI for Video Editing & Creation',
    subtitle: 'Autonomous Multi-Agent Swarm for Natural Language Video Assembly',
    client: 'Autonomous AI / Creative Tech',
    year: '2026',
    discipline: 'Agentic Swarms & Video Synthesis',
    category: 'agentic-ai',
    stack: ['AI Agents', 'Plugins', 'Python', 'LLM Tool Calling', 'FFmpeg Pipeline'],
    accentColor: '#00f0ff', // Cyan Tracer
    image: '/assets/aistudio/image_7c07a1c5.png',
    secondaryImage: '/src/assets/images/cse_distributed_kernel_1793086785069.jpg',
    description: 'AI agent designed to cut raw footage and edit videos from natural-language prompts; includes multiple plugins and 12 specialized agents for different tasks.',
    manifesto: 'Video post-production bottlenecks on manual cutting, rough assemblies, and repetitive timeline alignment. By organizing 12 specialized micro-agents across an extensible plugin architecture, prompts translate into rough-cut timeline edits automatically.',
    deliverables: [
      '12 Specialized Task Agents (Cutter, Pacing, Sound, Scene Detector, etc.)',
      'Modular Plugin Architecture for Extensible Toolchain Integrations',
      'Natural-Language Directed Rough-Cut Assembly Pipeline',
      'Automated Multimodal Footage Parsing & Segment Tagging'
    ],
    metrics: [
      { label: 'Swarm Agents', value: '12 Specialists' },
      { label: 'Interface', value: 'Natural Language' },
      { label: 'Architecture', value: 'Modular Plugins' }
    ]
  },
  {
    id: 'edit-style-finder',
    index: '04',
    title: 'Edit Style Finder',
    subtitle: 'LLM Stylometric Decomposition & Social Video Pattern Recognition',
    client: 'Multimodal ML / Social Media Analytics',
    year: '2026',
    discipline: 'Multimodal LLMs & Video Analysis',
    category: 'ml-vision',
    stack: ['LLM', 'Social-Media Data', 'Python', 'Multimodal Embeddings', 'NLP'],
    accentColor: '#1a803b', // Kelly Green
    image: '/src/assets/images/cse_distributed_kernel_1793086785069.jpg',
    secondaryImage: '/src/assets/images/cse_dev_terminal_hover_1793086786789.jpg',
    description: 'LLM concept trained on social-media data to identify editing styles and break down the patterns and core techniques used in an uploaded video.',
    manifesto: 'Content creators convey distinct narrative cadence and stylistic trademarks. Edit Style Finder decompiles stylistic patterns from uploaded footage by benchmarking against fine-tuned LLMs trained on social media editing patterns.',
    deliverables: [
      'Multimodal Video Style Deconstruction & Rhythm Analysis',
      'Fine-Tuned LLM Stylometric Feature Extractor on Social Media Video Data',
      'Core Editing Technique Breakdown (Pacing, Transitions, Audio Ducking)',
      'Actionable Production Pattern Recipes & Workflow Suggestions'
    ],
    metrics: [
      { label: 'Core Intelligence', value: 'Fine-Tuned LLM' },
      { label: 'Training Corpus', value: 'Social Media Datasets' },
      { label: 'Decomposition', value: 'Technique Breakdown' }
    ]
  }
];
