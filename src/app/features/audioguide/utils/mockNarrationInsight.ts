/** Demo copy for the narrate flow until a real model is wired. */
export function mockLandmarkLabel(city: string): string {
  switch (city) {
    case 'Varanasi':
      return 'Riverside ghat cluster · likely near Dashashwamedh';
    case 'Agra':
      return 'Mughal-era precinct · marble mausoleum sightline';
    case 'Jaipur':
      return 'Heritage quarter · Pink City corridor';
    default:
      return 'Historic landmark · old city fabric';
  }
}

export function mockNarrationExcerpt(city: string): string {
  switch (city) {
    case 'Varanasi':
      return 'Early light on the Ganges brings bells, incense, and slow boats. Locals gather for prayer while pilgrims move toward the main ghats—listen for conches and keep to the upper steps when crowds thicken.';
    case 'Agra':
      return 'Marble glow shifts from cool blue to warm gold as the sun rises. Security lines move quickly with tickets ready; pause at the reflecting pool before exploring the garden axis and symmetry lines.';
    case 'Jaipur':
      return 'Narrow lanes open onto courtyards and craft stalls. Horses and two-wheelers share the road—step toward shop fronts when you hear a horn, and save midday for shaded courtyards or palace interiors.';
    default:
      return 'This corner of the city layers centuries of trade, faith, and craft. Move at walking pace, note doorways and chhatris above the skyline, and let the soundscape guide where you linger next.';
  }
}
