export const userSelectedInstance = "0w0.is";
export const userSelectedInstanceUrl = "https://" + userSelectedInstance;

export const accountsPath = "users";
export const statusesPath = "statuses";

export const emojiCSS = `
.emoji {
	vertical-align: middle;
	/* stares at https://bugzilla.mozilla.org/show_bug.cgi?id=1310170 */
	height: 1.375rem;
	min-width: 1.375rem;
	transition: transform 0.1s ease-in-out;
	max-width: 100%;
	object-fit: contain;
}

.emoji:hover {
	z-index: 1;
	transform: scale(2);
}
`;

export const postCSS = `
	width: calc(100% - 1rem);
	padding: 0.5rem 0.5rem 0.5rem 0.5rem;
	margin: 0.5rem 0.5rem 0 0.5rem;
	background: transparent;
	transition: background 0.2s ease-in-out;
	border-radius: 8px;
`;
