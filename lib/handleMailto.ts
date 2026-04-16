export function handleEmailClick(email: string): void {
	window.open(`mailto:${email}`, '_blank');
}
