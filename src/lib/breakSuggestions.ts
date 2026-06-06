export type Category = 'Move' | 'Rest' | 'Reset'

export interface BreakSuggestion {
  title: string
  description: string
  category: Category
}

export const breakSuggestions: BreakSuggestion[] = [
  // ── Move ──────────────────────────────────────────────────────────────────
  {
    title: 'Quick stretch',
    description: 'Stand up and reach both arms overhead. Hold for 10 seconds, then slowly touch your toes.',
    category: 'Move',
  },
  {
    title: 'Shoulder rolls',
    description: 'Roll your shoulders backward 10 times slowly, then forward. Release all that hunched-over tension.',
    category: 'Move',
  },
  {
    title: 'Take a walk',
    description: 'Step away from your desk and take a 3–5 minute walk. Even just around your space counts.',
    category: 'Move',
  },
  {
    title: 'Wall push-ups',
    description: 'Do 10 gentle wall push-ups to wake up your arms and chest. Perfect for small spaces.',
    category: 'Move',
  },
  {
    title: 'Neck stretch',
    description: 'Gently tilt your head to each side, holding for 5 seconds. Roll your head forward slowly.',
    category: 'Move',
  },
  {
    title: 'Wrist relief',
    description: 'Extend your arms and roll your wrists in circles — 10 times each direction. Essential for heavy typists.',
    category: 'Move',
  },
  {
    title: 'March in place',
    description: 'March in place for 60 seconds, lifting your knees high. Get that blood flowing again.',
    category: 'Move',
  },
  {
    title: 'Spine twist',
    description: 'Sit up straight, then slowly rotate your torso to the left, then right. Hold each side for 10 seconds.',
    category: 'Move',
  },
  {
    title: 'Calf raises',
    description: 'Stand near your desk and do 20 slow calf raises. Great for circulation when you have been sitting a while.',
    category: 'Move',
  },
  {
    title: 'Hip circles',
    description: 'Stand with feet hip-width apart and draw 10 big circles with your hips. Your lower back will thank you.',
    category: 'Move',
  },
  {
    title: 'Jumping jacks',
    description: 'Do 20 jumping jacks. It takes under a minute and gets your heart rate up faster than anything else.',
    category: 'Move',
  },
  // ── Rest ──────────────────────────────────────────────────────────────────
  {
    title: 'Rest your eyes',
    description: 'Look at something at least 20 feet away for 20 seconds. Let your focus soften and your eyes recover.',
    category: 'Rest',
  },
  {
    title: 'Deep breathing',
    description: 'Take 5 slow, deep breaths. Inhale for 4 counts, hold for 2, exhale for 6. Feel your body settle.',
    category: 'Rest',
  },
  {
    title: 'Close your eyes',
    description: 'Simply close your eyes for 2 full minutes. No screens, no input. Just rest.',
    category: 'Rest',
  },
  {
    title: 'Progressive relax',
    description: 'Starting from your feet, tense each muscle group for 5 seconds, then release. Work up to your shoulders.',
    category: 'Rest',
  },
  {
    title: 'Mindful minute',
    description: 'Notice 5 things you can see, 4 you can touch, 3 you can hear. Ground yourself in the present.',
    category: 'Rest',
  },
  {
    title: 'Yawn freely',
    description: 'Let yourself yawn as big and loud as you want. It signals your nervous system to relax. Seriously, try it.',
    category: 'Rest',
  },
  {
    title: 'Lie down',
    description: 'If you can, lie flat on the floor or a couch for 5 minutes. Let gravity do the work.',
    category: 'Rest',
  },
  {
    title: 'Box breathing',
    description: 'Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat 4 times. Used to reset under pressure.',
    category: 'Rest',
  },
  {
    title: 'Hum something',
    description: 'Hum your favourite song for a minute. The vibration activates your vagus nerve and genuinely calms you down.',
    category: 'Rest',
  },
  {
    title: 'Do nothing',
    description: 'Sit with no goal, no phone, no input for 3 full minutes. Just exist. It is harder than it sounds.',
    category: 'Rest',
  },
  // ── Reset ─────────────────────────────────────────────────────────────────
  {
    title: 'Drink water',
    description: 'Grab a full glass of water and drink it slowly. Hydration is the most underrated focus tool.',
    category: 'Reset',
  },
  {
    title: 'Quick tidy',
    description: 'Spend 5 minutes organizing your immediate workspace. A clear desk equals a clearer mind.',
    category: 'Reset',
  },
  {
    title: 'Fresh air',
    description: 'Step outside or open a window wide. Take 5 deep breaths of outdoor air.',
    category: 'Reset',
  },
  {
    title: 'Nourishing snack',
    description: 'Grab something small and nourishing — fruit, nuts, dark chocolate. Eat it away from your screen.',
    category: 'Reset',
  },
  {
    title: 'Free doodle',
    description: 'Grab a pen and doodle anything for 3 minutes. No goal, no judgment. Just let your hand move.',
    category: 'Reset',
  },
  {
    title: 'Splash water',
    description: 'Wash your hands and splash cool water on your face. Instant reset.',
    category: 'Reset',
  },
  {
    title: 'Write 3 things',
    description: 'Jot down 3 things you are grateful for right now. Takes 60 seconds and genuinely shifts your mood.',
    category: 'Reset',
  },
  {
    title: 'Text a friend',
    description: 'Send a quick, warm message to someone you have been meaning to check in on.',
    category: 'Reset',
  },
  {
    title: 'One hard delete',
    description: 'Close one browser tab or delete one file you have been ignoring. Tiny wins still count.',
    category: 'Reset',
  },
  {
    title: 'Review your notes',
    description: 'Skim what you have captured in your brain dump. Anything urgent? Anything worth celebrating?',
    category: 'Reset',
  },
  {
    title: 'Change your view',
    description: 'Move to a different chair or spot in the room, even briefly. A physical shift creates a mental one.',
    category: 'Reset',
  },
]
