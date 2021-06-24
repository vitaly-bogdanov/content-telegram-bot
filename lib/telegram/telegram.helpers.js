export const getActionNameHelper = ctx => ctx.text[0] === '/' ? ctx.text.substr(1) : ctx.text;
export const getUserHelper = ctx => ctx.from;