export default function hasRequiredFields(
	obj: Record<string, any>,
	requiredFields: string[]
): boolean {
	return requiredFields.every((filed) => {
		return Object.hasOwn(obj, filed);
	});
}
