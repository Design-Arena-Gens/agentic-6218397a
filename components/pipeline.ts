export type PipelineInput = {
  topic: string;
  audience: string;
  goal: string;
  tone: 'Bold' | 'Friendly' | 'Inspirational' | 'Educational' | 'Humorous';
  runtime: 15 | 30 | 45 | 60;
};

export type AgentLog = {
  name: string;
  decision: string;
  confidence: number;
};

export type ScriptBeat = {
  timestamp: string;
  line: string;
};

export type CaptionEntry = {
  timestamp: string;
  text: string;
};

export type TimelineEntry = {
  day: string;
  task: string;
};

export type PipelineResult = {
  hook: string;
  heroStatement: string;
  talkingPoints: string[];
  script: ScriptBeat[];
  pacingNotes: string[];
  brollIdeas: string[];
  transitions: string[];
  callToAction: string;
  captions: CaptionEntry[];
  titleOptions: string[];
  hashtags: string[];
  releaseTimeline: TimelineEntry[];
  repurposeIdeas: string[];
  agentLog: AgentLog[];
  summary: string;
};

type PRNG = {
  next: () => number;
};

function createPRNG(seed: string): PRNG {
  let s = 0;
  for (const char of seed) s = (s << 5) - s + char.charCodeAt(0);
  return {
    next: () => {
      s = Math.imul(48271, s) % 0x7fffffff;
      return (s & 0x7fffffff) / 0x7fffffff;
    }
  };
}

const tonalities: Record<PipelineInput['tone'], { hookFrames: string[]; ctas: string[] }> = {
  Bold: {
    hookFrames: [
      'You are wasting {runtime}s and here is how to fix it—',
      'Stop scrolling. {topic} is changing {audience} forever.',
      'This {runtime}s hack flips {topic} upside down.'
    ],
    ctas: [
      'Join the movement—hit subscribe before it vanishes.',
      'Double tap if you are done playing small.',
      'Drop a 🔥 if you are claiming your edge today.'
    ]
  },
  Friendly: {
    hookFrames: [
      'Hey {audience}, let us unlock {topic} together.',
      'If {audience} wants {goal}, watch these {runtime}s tips.',
      'Here is a cozy walkthrough to nail {topic} fast.'
    ],
    ctas: [
      'Save this so you can replay it tomorrow.',
      'Share with a friend who needs this boost.',
      'Comment “I am in” if you are trying this today.'
    ]
  },
  Inspirational: {
    hookFrames: [
      'Imagine {audience} owning {topic} in just {runtime}s.',
      'This story proves {goal} starts with a single step.',
      'You already have what you need for {topic}.'
    ],
    ctas: [
      'Believe it—follow for your daily spark.',
      'Tag someone who is ready to rise with you.',
      'Save this as your reminder to keep going.'
    ]
  },
  Educational: {
    hookFrames: [
      'Here is the science of {topic} in {runtime}s.',
      'Three data-backed moves for {audience} chasing {goal}.',
      'This framework simplifies {topic} instantly.'
    ],
    ctas: [
      'Download the checklist from the link in bio.',
      'Follow for the full breakdown tomorrow.',
      'Comment which step you want me to expand next.'
    ]
  },
  Humorous: {
    hookFrames: [
      'POV: {audience} trying {topic} the hard way 😂',
      'You would not believe how {goal} actually happens.',
      '{runtime}s of chaos that ends with {goal}.'
    ],
    ctas: [
      'Smash like if you felt this struggle.',
      'Send this to the friend who needs motivation.',
      'Drop your funniest fail in the comments.'
    ]
  }
};

const agentVoices = [
  {
    name: 'Research Strategist',
    perspective:
      'Synthesized trending keywords, questions, and retention curves across Shorts within the last 30 days.'
  },
  {
    name: 'Narrative Architect',
    perspective:
      'Structured a three-act micro-story while keeping cuts inside a {runtime}s window for platform retention.'
  },
  {
    name: 'Visual Director',
    perspective:
      'Mapped B-roll and on-screen text to align with dopamine peaks at seconds 0, 5, 11, and {runtime}.'
  },
  {
    name: 'Growth Producer',
    perspective:
      'Optimized packaging, metadata, and repurposing angles to extend the short across Instagram Reels and TikTok.'
  }
];

const talkingPointTemplates = [
  'Frame the problem {audience} faces when chasing {goal}.',
  'Reveal the counter-intuitive insight about {topic}.',
  'Demonstrate the quick win anyone can execute today.',
  'Highlight the transformation when {goal} clicks.',
  'Close with a cliffhanger that invites interaction.'
];

const pacingNotesPool = [
  'Open with an aggressive J-cut: start narration before the visual smash cut.',
  'Hold the punchline on screen for 0.8s—shorter kills comprehension.',
  'Stack captions in kinetic typography with key verbs in uppercase.',
  'Use a sound design swell at second 9 to set up the CTA transition.',
  'Animate the on-screen text with a 120% scale pop synced to the beat drop.'
];

const transitionsPool = [
  'Snap zoom with a whoosh SFX into the reveal shot.',
  'Match cut using hand swipe to bridge two locations.',
  'Glitch text overlay to introduce the proof step.',
  'Speed ramp from 50% to 150% to accent the aha moment.',
  'Quick whip pan into the CTA with confetti particle overlay.'
];

const repurposeOptions = [
  'Convert hook and CTA into a looping Instagram Reel carousel.',
  'Expand script into a 60s TikTok with deeper anecdote in the middle beat.',
  'Strip audio and publish as a trending sound bite for collaborators.',
  'Adapt into an email micro-story with embedded GIF preview.',
  'Schedule a LinkedIn post sharing behind-the-scenes learnings.'
];

const timelineSteps = [
  'Draft cold open storyboard & finalize talking points.',
  'Shoot A-roll with vertical framing and 60fps capture.',
  'Record crisp voiceover pass and align beats in timeline.',
  'Design motion graphics pack & finalize kinetic captions.',
  'Publish, pin top comment, and respond to the first 10 viewers.'
];

function formatSecondsFrame(index: number, total: number, runtime: number, prng: PRNG) {
  const base = Math.round((runtime / total) * index);
  const variance = Math.floor(prng.next() * 2);
  const seconds = Math.min(runtime - 1, Math.max(0, base + variance));
  return `${seconds}s`;
}

function buildScript(input: PipelineInput, prng: PRNG): ScriptBeat[] {
  const beats = [
    'Set an immediate hook that dramatizes the audience pain point.',
    'Deliver the unexpected insight that flips the script.',
    'Show the actionable micro-step with a prop or on-screen overlay.',
    'Illustrate the before/after transformation with high-energy motion.',
    'Land the CTA tied directly to the viewer\'s next micro-commitment.'
  ];

  return beats.map((beat, index) => ({
    timestamp: formatSecondsFrame(index * 2 + 1, beats.length * 2, input.runtime, prng),
    line: beat
      .replace('{audience}', input.audience)
      .replace('{goal}', input.goal)
      .replace('{topic}', input.topic)
  }));
}

function buildHook(input: PipelineInput, prng: PRNG): string {
  const variations = tonalities[input.tone].hookFrames;
  const chosen = variations[Math.floor(prng.next() * variations.length)] ?? variations[0];
  return chosen
    .replace('{audience}', input.audience)
    .replace('{goal}', input.goal)
    .replace('{topic}', input.topic)
    .replace('{runtime}', `${input.runtime}s`);
}

function buildCTA(input: PipelineInput, prng: PRNG): string {
  const variations = tonalities[input.tone].ctas;
  const chosen = variations[Math.floor(prng.next() * variations.length)] ?? variations[0];
  return chosen.replace('{goal}', input.goal);
}

function buildHeroStatement(input: PipelineInput): string {
  return `Deliver a ${input.runtime}s vertical story proving ${input.goal} is achievable by ${input.audience} using ${input.topic}.`;
}

function buildTalkingPoints(input: PipelineInput, prng: PRNG): string[] {
  return talkingPointTemplates.map(template =>
    template
      .replace('{audience}', input.audience)
      .replace('{goal}', input.goal)
      .replace('{topic}', input.topic)
  ).slice(0, 4 + Math.floor(prng.next() * 2));
}

function pickUnique<T>(pool: T[], count: number, prng: PRNG): T[] {
  const copy = [...pool];
  const result: T[] = [];
  while (result.length < count && copy.length > 0) {
    const index = Math.floor(prng.next() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
}

function buildCaptions(script: ScriptBeat[], prng: PRNG): CaptionEntry[] {
  return script.map(beat => ({
    timestamp: beat.timestamp,
    text: beat.line
      .replace('Deliver', 'Deliver')
      .replace('Show', 'Show')
      .replace('Illustrate', 'See')
  }));
}

function buildAgentLog(input: PipelineInput, prng: PRNG): AgentLog[] {
  return agentVoices.map(voice => ({
    name: voice.name,
    decision: voice.perspective
      .replace('{runtime}', `${input.runtime}`)
      .replace('{topic}', input.topic)
      .replace('{audience}', input.audience)
      .replace('{goal}', input.goal),
    confidence: Math.round((0.72 + prng.next() * 0.25) * 100) / 100
  }));
}

function buildHashtags(input: PipelineInput, prng: PRNG): string[] {
  const baseTags = [
    '#shorts',
    '#ytshorts',
    '#contentstrategy',
    '#creator',
    `#${input.topic.toLowerCase().replace(/[^a-z0-9]+/g, '')}`,
    `#${input.goal.toLowerCase().split(' ')[0]}`,
    `#${input.audience.toLowerCase().split(' ')[0]}`
  ];

  const extra = ['#viralvideo', '#growth', '#storytelling', '#videohacks', '#trendwatch', '#creatoreconomy'];
  const uniqueExtra = pickUnique(extra, 3, prng);
  return Array.from(new Set([...baseTags, ...uniqueExtra])).slice(0, 8);
}

function buildTimeline(prng: PRNG): TimelineEntry[] {
  const days = ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Launch Day'];
  return timelineSteps.map((task, index) => ({
    day: days[index] ?? `Day ${index}`,
    task
  }));
}

function buildSummary(result: PipelineResult): string {
  return [
    `Hook: ${result.hook}`,
    `CTA: ${result.callToAction}`,
    `Top talking point: ${result.talkingPoints[0]}`,
    `Primary hashtag: ${result.hashtags[0]}`
  ].join(' | ');
}

export function runPipeline(input: PipelineInput): PipelineResult {
  const seed = `${input.topic}:${input.audience}:${input.goal}:${input.tone}:${input.runtime}`;
  const prng = createPRNG(seed);
  const script = buildScript(input, prng);
  const result: PipelineResult = {
    hook: buildHook(input, prng),
    heroStatement: buildHeroStatement(input),
    talkingPoints: buildTalkingPoints(input, prng),
    script,
    pacingNotes: pickUnique(pacingNotesPool, 4, prng),
    brollIdeas: [
      `High-energy opener: macro shot representing ${input.topic}.`,
      'Mid-sequence cutaway: fast-paced overhead edit montage.',
      'Proof visual: screenshot or stat overlay to validate claim.',
      'CTA close-up: creator on camera with energy leaning into lens.'
    ],
    transitions: pickUnique(transitionsPool, 3, prng),
    callToAction: buildCTA(input, prng),
    captions: buildCaptions(script, prng),
    titleOptions: [
      `${input.runtime}s ${input.topic} trick for ${input.audience}`,
      `${input.goal} in ${input.runtime}s`,
      `Why ${input.audience} miss ${input.topic}`
    ],
    hashtags: buildHashtags(input, prng),
    releaseTimeline: buildTimeline(prng),
    repurposeIdeas: pickUnique(repurposeOptions, 3, prng),
    agentLog: buildAgentLog(input, prng),
    summary: ''
  };
  result.summary = buildSummary(result);
  return result;
}
