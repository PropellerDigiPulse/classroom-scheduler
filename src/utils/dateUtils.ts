export const formatTime = (timeString: string): string => {
  // Convert 24-hour format to 12-hour format with AM/PM
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const isPM = hour >= 12;
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${isPM ? 'PM' : 'AM'}`;
};

export const getDayOfWeek = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

export const isTimeInRange = (time: string, start: string, end: string): boolean => {
  const timeDate = new Date(`2000-01-01T${time}`);
  const startDate = new Date(`2000-01-01T${start}`);
  const endDate = new Date(`2000-01-01T${end}`);
  
  return timeDate >= startDate && timeDate < endDate;
};

export const getTimeSlots = (): string[] => {
  const slots = [];
  for (let i = 8; i <= 20; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`);
    slots.push(`${i.toString().padStart(2, '0')}:30`);
  }
  return slots;
};