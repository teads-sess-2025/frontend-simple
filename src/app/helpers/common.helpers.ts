export function isDefined(item: any): boolean {
    return item !== null && item !== undefined;
}

export function getDefinedProps<T>(value: T): Partial<T> {
    if (!isDefined(value)) {
        return {};
    }

    return filterProps(value, entry => isDefined(entry[1]));
}

function filterProps<T>(
    value: T,
    propFilter: (entry: [string, any]) => boolean
): Partial<T> {
    return <Partial<T>>(
        Object.fromEntries(Object.entries(value).filter(propFilter))
    );
}
