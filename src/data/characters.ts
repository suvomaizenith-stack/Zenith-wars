
export interface Character {
  id: string;
  name: string;
  title: string;
  color: string;
  accent: string;
  health: number;
  power: number;
  speed: number;
  isBoss: boolean;
}

export const characters: Character[] = [
  {
    id: "anoop",
    name: "Anoop Garg",
    title: "THE OUTCOME OVERLORD",
    color: "#7629a8",
    accent: "#e3a7ff",
    health: 100,
    power: 100,
    speed: 75,
    isBoss: true,
  },
  {
    id: "vivekanand",
    name: "Vivekanand Vivek",
    title: "THE ALGORITHM ASSASSIN",
    color: "#2455a8",
    accent: "#82baff",
    health: 90,
    power: 85,
    speed: 95,
    isBoss: false,
  },
  {
    id: "likhilesh",
    name: "Likhilesh Balpande",
    title: "THE FULL-STACK DESTROYER",
    color: "#168b72",
    accent: "#77f4c5",
    health: 95,
    power: 85,
    speed: 80,
    isBoss: false,
  },
  {
    id: "nikhil",
    name: "Nikhil Bhatt",
    title: "THE MYSTERY MACHINE",
    color: "#a44c26",
    accent: "#ffb37e",
    health: 85,
    power: 80,
    speed: 90,
    isBoss: false,
  },
  {
    id: "chandrabhushan",
    name: "Chandrabhushan",
    title: "THE CAMPUS COMMANDER",
    color: "#9a8429",
    accent: "#ffe98b",
    health: 100,
    power: 85,
    speed: 70,
    isBoss: false,
  },
  {
    id: "riya",
    name: "Riya",
    title: "THE CHAOS CONTROLLER",
    color: "#b02e79",
    accent: "#ff9cda",
    health: 85,
    power: 90,
    speed: 100,
    isBoss: false,
  },
  {
    id: "chaitanya",
    name: "Chaitanya",
    title: "THE CODE CRUSADER",
    color: "#287dba",
    accent: "#91d9ff",
    health: 90,
    power: 90,
    speed: 85,
    isBoss: false,
  },
  {
    id: "nalin",
    name: "Nalin",
    title: "THE DEBUGGING BEAST",
    color: "#6950a8",
    accent: "#c6aaff",
    health: 90,
    power: 80,
    speed: 95,
    isBoss: false,
  },
  {
    id: "sarthak",
    name: "Sarthak Sethi",
    title: "THE DEADLINE BREAKER",
    color: "#a34a3d",
    accent: "#ffaaa0",
    health: 95,
    power: 95,
    speed: 75,
    isBoss: false,
  },
  {
    id: "swapnil",
    name: "Swapnil Pandey",
    title: "THE SYSTEM OVERRIDE",
    color: "#397c42",
    accent: "#a5f2a7",
    health: 90,
    power: 90,
    speed: 85,
    isBoss: false,
  },
];
