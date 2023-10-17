export const basicIconStyle = {
    strokeWidth   : 2,
    strokeLinecap : "butt",
    strokeLinejoin: "miter",
} as const ;

// 填充图标的样式。填充颜色跟随顶层 svg 的 color 属性
export const filledIconStyle = {
    fill: "currentColor",
} ;

export const strokeReactiveStyle = {
    stroke: "currentColor",
} ;

// 轮廓图标的样式。轮廓颜色跟随顶层 svg 的 color 属性
export const outlinedIconStyle = {
    fill: "transparent",
    ...strokeReactiveStyle,
} ;

// 旋转180°图标
export const reverseIconStyle = {
    transform: "rotate(180, 12, 12)",
} ;
