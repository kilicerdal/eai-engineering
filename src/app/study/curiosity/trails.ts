// Editorial routes through existing sourced discoveries. IDs and order are stable
// so Resume and backups can retain a trail without duplicating personal data.
export type DiscoveryTrail={id:string;title:string;description:string;steps:readonly {id:string;connection:string}[]};
export const discoveryTrails:readonly DiscoveryTrail[]=[
 {id:'stone-to-code',title:'From stone to code',description:'Follow five ways people turn ideas into things that work.',steps:[
  {id:'gobekli-builders',connection:'Begin with planning and cooperation.'},
  {id:'mesa-chinking',connection:'Look closer at the details that hold a structure together.'},
  {id:'antikythera-gears',connection:'Move from building a structure to building a model.'},
  {id:'jacquard-patterns',connection:'Now separate the instructions from the machine.'},
  {id:'first-transistor',connection:'Finish by thinking about a tiny building block and what it makes possible.'}]},
 {id:'hidden-signals',title:'Hidden signals',description:'Explore how information reaches us through sound, touch, and codes.',steps:[
  {id:'okapi-hidden-calls',connection:'Begin with a signal outside human hearing.'},
  {id:'bat-echoes',connection:'Consider how a returning signal can reveal surroundings.'},
  {id:'hearing-signals',connection:'Follow the translation from movement into information.'},
  {id:'braille-cell',connection:'Switch senses: how can positions carry a message?'},
  {id:'navajo-code-layer',connection:'Finish with the distinction between a language and a designed code.'}]},
 {id:'water-hidden-worlds',title:'Water’s hidden worlds',description:'Travel from a river mouth to a possible ocean beneath alien ice.',steps:[
  {id:'estuary-floating-river',connection:'Begin where two waters meet without fully mixing.'},
  {id:'salt-density',connection:'Look at the property that helps explain the layers.'},
  {id:'ice-floats',connection:'Ask what changes when water freezes.'},
  {id:'europa-salty-below',connection:'Take the question of ice and water to another world.'},
  {id:'europa-flex-heat',connection:'Finish by asking where an ocean’s warming energy could come from.'}]},
 {id:'flower-to-flavor',title:'From a flower to flavor',description:'Discover the plant structures and human work behind familiar ingredients.',steps:[
  {id:'vanilla-orchid',connection:'Begin by identifying the plant behind a familiar flavor.'},
  {id:'vanilla-handwork',connection:'Consider the work that connects a flower to a crop.'},
  {id:'saffron-stigmas',connection:'Compare a different flower and a different edible part.'},
  {id:'saffron-flower-gram',connection:'Zoom out from a thread to the harvest behind it.'},
  {id:'dough-bubbles',connection:'Finish with another living process at work in the kitchen.'}]},
 {id:'time-in-motion',title:'Time in motion',description:'Connect repeating motions with the challenge of measuring time.',steps:[
  {id:'moon-rotation',connection:'Begin by distinguishing two repeating motions.'},
  {id:'foucault-moving-floor',connection:'Change viewpoint to notice the motion beneath us.'},
  {id:'clock-laser-cooling',connection:'Move to a laboratory where slowing motion helps measurement.'},
  {id:'clock-two-pulses',connection:'Look at how an instrument compares two moments.'},
  {id:'gps-clocks',connection:'Finish by connecting precise timing with finding a position.'}]},
];
export function discoveryTrail(id:unknown){return typeof id==='string'?discoveryTrails.find(trail=>trail.id===id):undefined;}
