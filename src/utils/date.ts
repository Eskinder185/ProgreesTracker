/**
 * Returns a human-readable string for time remaining until a target end date.
 * If no date is provided, returns a default message.
 */
export function remainingText(targetEndDate?: Date | string) {
	if (!targetEndDate) return { text: 'No end date' };
	let end: Date;
	if (typeof targetEndDate === 'string') {
		end = parseISO(targetEndDate);
	} else {
		end = targetEndDate;
	}
	const now = new Date();
	const diff = end.getTime() - now.getTime();
	if (diff <= 0) return { text: 'Ended' };
	const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
	return { text: `${days} day${days !== 1 ? 's' : ''} remaining` };
}
import { format, formatDistanceToNowStrict, parseISO } from 'date-fns'
export const fmt = (iso?: string) => iso ? format(parseISO(iso), 'eee, MMM d, yyyy') : ''
export const dueIn = (iso?: string) => iso ? formatDistanceToNowStrict(parseISO(iso), { addSuffix:true }) : ''

