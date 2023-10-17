export type PickRecordPartialKeys<T extends Record<string, any>> =
    NonNullable<{
        [K in keyof T]: T[K] extends Record<string, unknown>
                        ? T[K] extends (...args: any) => any
                          ? never
                          : { key: K }
                        : T[K] extends NonNullable<T[K]>
                          ? never
                          : { key: K }
    }[keyof T]>["key"]

export type PickRecordPartial<T extends Record<string, any>> = {
    [K in PickRecordPartialKeys<T>]-?: NonNullable<T[K]> extends Record<string, unknown>
                                       ? PickRecordPartial<NonNullable<T[K]>>
                                       : NonNullable<T[K]>
}

export type PickRecordRequired<T extends Record<string, any>> = {
    [K in Exclude<keyof T, PickRecordPartialKeys<T>>]?: T[K] extends Record<string, unknown>
                                                        ? T[K] extends (...args: any) => any
                                                          ? T[K]
                                                          : PickRecordRequired<T[K]>
                                                        : T[K]
}

export type DefaultProps<T extends Record<string, any>> = PickRecordPartial<T>

export type Prettify<T> = {
                              [K in keyof T]: T[K]
                          } & {}
